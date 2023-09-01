import React from "react";
import { useState } from "react";
import AtomicSpinner from "atomic-spinner";
import FileUploadShowNotes from "./FileUploadShowNotes";
import ShowNotesResults from "./ShowNotesResults";

function ShowNotes() {
  const [file, setFile] = useState(null);
  const [timestamps, setTimestamps] = useState([
    [
      {
        topic:
          "Garrett's background and journey to becoming a degree-free software engineer",
        timestamp: "00:01:50",
      },
      {
        topic: "His inspiration from Steve Jobs' story",
        timestamp: "00:03:01",
      },
    ],
  ]);
  const [guestInfo, setGuestInfo] = useState(["---------------"]);
  const [description, setDescription] = useState({
    intro: "------------------",
    key_discussion_points: [
      "------------------",
      "------------------",
      "------------------",
    ],
    outro: "------------------",
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const [tags, setTags] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadShowNotes
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setTimestamps={setTimestamps}
        setResultIsLoading={setResultIsLoading}
        setTags={setTags}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setGuestInfo={setGuestInfo}
      />

      {!resultIsLoading ? (
        <ShowNotesResults
          description={description}
          timestamps={timestamps}
          tags={tags}
          guestInfo={guestInfo}
        />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default ShowNotes;
