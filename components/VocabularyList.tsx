"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VocabularyList({ onGenerate }: { onGenerate: (words: string[]) => void }) {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [story, setStory] = useState<string>("");

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
    setSelectedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(word)) {
        // Remove the word if it already exists in the Set
        newSet.delete(word);
      } else {
         // Add the word if it's not in the Set
        newSet.add(word);
      }
      return newSet;
    });
  };

  const handleGenerateStory = async () => {
    // Checks if any words have been selected
    if (selectedWords.size === 0) return alert("Please select some words.");

    const response = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Convert Set to array
      body: JSON.stringify({ words: Array.from(selectedWords) }),
    });

    const data = await response.json();

    // If the API returns a story, process it
    if (data?.story) {
      // Treat words as literal characters, NOT as special regex characters
      const escapeRegex = (word: string) => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

      let highlightedStory = data.story;

      // Highlight each selected word in the story
      selectedWords.forEach((word) => {
        const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "gi");
        highlightedStory = highlightedStory.replace(
          regex,
          `<mark class="bg-yellow-200 px-1">${word}</mark>`
        );
      });

      // Store the modified (highlighted) story in the state
      setStory(highlightedStory);
    } else {
      setStory("Failed to generate story.");
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((word, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedWords.has(word) ? "bg-blue-600" : "bg-gray-500"
            }`}
            onClick={() => toggleWord(word)}
          >
            {word}
          </button>
        ))}
      </div>
      <h3 className="text-lg font-bold mt-4">Selected Words:</h3>
      <p className="mb-4">{Array.from(selectedWords).join(", ") || "No words selected"}</p>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
        onClick={handleGenerateStory}
      >
        Generate Story
      </button>
      {story && (
          <div className="mt-6 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold">Generated Story:</h3>
            <p dangerouslySetInnerHTML={{ __html: story }} />
          </div>
        )}
      </div>
  );
}
