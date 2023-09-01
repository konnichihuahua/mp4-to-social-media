import { result } from "lodash";
import React, { useState } from "react";

const FileUploadShowNotes = ({
  setTimestamps,
  setResultIsLoading,
  setFile,
  fileUploaded,
  setGuestInfo,
  setFileUploaded,
}) => {
  const [transcript, setTranscript] = useState({});

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      const textFromFile = reader.result;
      setTranscript(textFromFile);
      setFileUploaded(true);
    };
  };

  function splitTranscriptIntoParagraphs(transcript) {
    const paragraphs = [];
    const words = transcript.split(" ");
    let currentParagraph = "";

    for (const word of words) {
      if ((currentParagraph + " " + word).trim().split(" ").length <= 2000) {
        currentParagraph += " " + word;
      } else {
        // Check if we are in the middle of a paragraph
        const lastSpaceIndex = currentParagraph.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
          // Split at the last space in the current paragraph
          const splitIndex = lastSpaceIndex + 1;
          paragraphs.push(currentParagraph.substring(0, splitIndex).trim());
          currentParagraph = currentParagraph.substring(splitIndex);
        } else {
          // If no space found, split by word count
          paragraphs.push(currentParagraph.trim());
          currentParagraph = word;
        }
      }
    }

    if (currentParagraph.trim() !== "") {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  }

  const readFile = async (event) => {
    event.preventDefault();
    const separatedTranscripts = splitTranscriptIntoParagraphs(transcript);
    console.log(separatedTranscripts);
    setResultIsLoading(true);
    await fetch("http://localhost:3000/shownotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(separatedTranscripts),
    })
      .then((result) => result.json())
      .then((data) => {
        setGuestInfo(data.bio);
        console.log(data.bio);
        console.log(data.timestamps);
        const jsonObjects = [];
        for (const timestamp of data.timestamps) {
          try {
            console.log(timestamp);
            const jsonObj = JSON.parse(timestamp);
            jsonObjects.push(jsonObj);
          } catch (error) {
            console.error(`Error parsing JSON: ${timestamp}`);
          }
        }
        console.log(jsonObjects);
        setTimestamps(jsonObjects);
        setResultIsLoading(false);
      });
  };
  return (
    <div>
      <form
        className="drop-container flex flex-col items-center justify-center "
        id="transcription-form"
        encType="multipart/form-data"
        onSubmit={readFile}
      >
        <label className="flex flex-col gap-2 p-5" id="dropcontainer">
          <span className="drop-title">Drop Transcript file here (.txt)</span>

          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".txt"
            onChange={handleFileChange}
          />

          {fileUploaded && (
            <input
              type="submit"
              value="GENERATE"
              className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          )}
        </label>
      </form>
    </div>
  );
};

export default FileUploadShowNotes;
