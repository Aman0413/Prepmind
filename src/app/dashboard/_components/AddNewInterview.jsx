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
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

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

    try {
      const res = await axios.post("/api/v1/dashboard/interview", {
        jobRole: data.jobRole,
        jobDescription: data.jobDescription,
        yearsOfExperience: data.yearsOfExperience,
        userId: user.id,
      });

      if (res.data.success) {
        router.push(`/dashboard/interview/${res.data.data._id}`);
      }

      toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
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
                      className="my-2"
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
                      className="my-2"
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
                      className="my-2"
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
