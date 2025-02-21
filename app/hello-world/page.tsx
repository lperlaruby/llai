"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import VocabularyList from "@/components/VocabularyList";

export default function HelloWorldPage() {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [story, setStory] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // This function fetches words from the Supabase database
  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase.from("messages").select("text");
      if (error) console.error("Error fetching words:", error);
      else setWords(data.map((row) => row.text));
    };

    fetchWords();
  }, []);

  // This function handles word selection and triggers story generation
  const handleGenerateStory = async (words: string[]) => {
    if (words.length === 0) return alert("Please select some words.");

    const response = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words }),
    });

    const data = await response.json();
    if (data?.story) {
      setStory(data.story);
    } else {
      setStory("Failed to generate story.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <VocabularyList onGenerate={handleGenerateStory} />
      {selectedWords.length > 0 && (
        <div className="text-lg font-semibold mt-4">{selectedWords.join(", ")}</div>
      )}
      {story && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Generated Story:</h3>
          <p>{story}</p>
        </div>
      )}
      <div className="space-x-4 mt-6">
        <p className="text-xl mb-8">You've successfully signed in or signed up.</p>
        <Link href="/login">
          <Button variant="outline">Go back to Login</Button>
        </Link>
        <Link href="/">
          <Button variant="default" className="bg-black">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}