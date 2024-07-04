"use client";

import React, { useState } from "react";

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
import { Button } from "../ui/button";
import { BotMessageSquareIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import Loader2 from "../loader/Loader2";

function ChatBot() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAskBot = async (e) => {
    try {
      e.preventDefault();
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
    <div>
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
          <form onSubmit={handleAskBot}>
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
              <Button type="submit">
                {loading ? <Loader2 text={"Generating...."} /> : "  Submit"}
              </Button>

              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ChatBot;
