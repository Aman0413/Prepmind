"use client";

import React, { useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import OverallRatingChart from "./_components/OverallRatingChart";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BotMessageSquareIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import Loader2 from "@/components/loader/Loader2";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const { user } = useUser();
  if (!user) return null;

  const handleAskBot = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/dashboard/interview/chatbot", {
        question: question,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      }
      setQuestion("");
      setResponse(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data.message || "Error in chat-bot interview"
      );
      console.log(error);
    }
  };

  return (
    <div className="py-10 px-2 relative">
      <h1 className="font-bold text-2xl">Dashboard Page</h1>
      <h2 className="text-gray-500 mt-5">
        Create and start your AI Mockup Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 my-5  items-center gap-8  ">
        <AddNewInterview />
        <OverallRatingChart userId={user.id} />
      </div>

      {/* Previoud interview questions*/}
      <InterviewList />

      {/* Chat bot */}
      <Drawer>
        <DrawerTrigger>
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-center z-50  p-2 right-5 fixed bottom-5 "
          >
            <span> Ask Our AI Chatbot Anything !</span>
            <BotMessageSquareIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle>Ask Our AI Chatbot Anything!</DrawerTitle>
            <DrawerDescription>
              <Input
                placeholder="Type your question here"
                className="my-5"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />

              <Textarea
                id="mytextwriter"
                placeholder="AI Chatbot response will be displayed here"
                className="my-5 h-48 overflow-y-auto text-gray-800"
                value={response}
                readOnly
              />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleAskBot}>
              {loading ? <Loader2 text={"Generating...."} /> : "  Submit"}
            </Button>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Dashboard;
