"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { Loader2, LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/models/schema";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const { user } = useUser();

  const [data, setData] = useState({
    jobRole: "",
    jobDescription: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const inputPrompt = `Job Role: ${data.jobRole} ,\n Job Description: ${data.jobDescription} ,\n Years of Experience: ${data.yearsOfExperience} ,\n Depends on Job Role and Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview Questions along with Answers in JSON format , Give us Question and Answer field in JSON`;

    const res = await chatSession.sendMessage(inputPrompt);

    const mockJsonRes = res.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(JSON.parse(mockJsonRes));
    setResponse(mockJsonRes);

    if (mockJsonRes) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jobPosition: data.jobRole,
          jobDesc: data.jobDescription,
          jobExperience: data.yearsOfExperience,
          jsonMockResp: mockJsonRes,
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("Inserted Mock Interview", response);
    } else {
      console.log("Error in generating Interview Questions");
    }

    setLoading(false);
  };

  return (
    <div className="AddNewInterview">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all ease-in-out"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+Add New </h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label className="">Job Role/Job Position</label>
                    <Input
                      name="jobRole"
                      placeholder="Ex. Full Stack Developer"
                      value={data.jobRole}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="">
                      Job Description/Tech Stack (In short)
                    </label>
                    <Textarea
                      name="jobDescription"
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      value={data.jobDescription}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="">Years of Experience</label>
                    <Input
                      name="yearsOfExperience"
                      placeholder="Ex. 5"
                      value={data.yearsOfExperience}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        `Generating Interview Questions`
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
