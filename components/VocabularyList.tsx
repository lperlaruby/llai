"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VocabularyList({ onGenerate }: { onGenerate: (words: string[]) => void }) {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  // Fetches words from the Supabase "messages" table
  useEffect(() => {
    const fetchWords = async () => {
      // Fetches 'text' column from "messages"
      const { data, error } = await supabase.from("messages").select("text");
      
      if (error) {
        console.error("Error fetching words:", error);
      } else {
        setWords(data.map((row) => row.text));
      }
    };

    fetchWords();
  }, []);

  // This function toggles the selection of a word
  const toggleWord = (word: string) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  return (
    <div className="text-center">
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((word, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedWords.includes(word) ? "bg-blue-600" : "bg-gray-500"
            }`}
            onClick={() => toggleWord(word)}
          >
            {word}
          </button>
        ))}
      </div>
      <h3 className="text-lg font-bold mt-4">Selected Words:</h3>
      <p className="mb-4">{selectedWords.join(", ") || "No words selected"}</p>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
        onClick={() => onGenerate(selectedWords)}
      >
        Generate Story
      </button>
    </div>
  );
}
