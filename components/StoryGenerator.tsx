import { useState, useEffect } from "react";

export default function StoryGenerator() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [story, setStory] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);

  // Fetch words from the Supabase database
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("/api/generate-story");
      const data = await response.json();
      setWords(data.words || []);
    };
    fetchWords();
  }, []);

  // This function toggles the selection of a word
  const toggleWord = (word: string) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  // This function generates a story based on selected words
  const generateStory = async () => {
    if (selectedWords.length === 0) return alert("Select at least one word!");

    const response = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words: selectedWords }),
    });

    const data = await response.json();
    setStory(data.story || "Failed to generate story.");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Select Words for Your Story</h2>
      {words.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          {words.map((word) => (
            <button
              key={word}
              className={`px-3 py-1 border rounded ${
                selectedWords.includes(word) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => toggleWord(word)}
            >
              {word}
            </button>
          ))}
        </div>
      ) : (
        <p>Loading words...</p>
      )}

      <button onClick={generateStory} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Generate Story
      </button>

      {story && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Generated Story:</h3>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}
