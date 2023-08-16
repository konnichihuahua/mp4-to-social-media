import React, { useEffect, useState } from "react";

const FileUploadPodcast = ({
  setTitle,
  setCaption,
  setResultIsLoaded,
  file,
  setFile,
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
      setTranscript({ textFromFile });
    };
  };
  const readFile = async (event) => {
    event.preventDefault();
    console.log(transcript);

    await fetch("http://localhost:3000/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transcript),
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(data.caption[0]);
        setCaption(data.caption[1]);
        console.log(data);
        setResultIsLoaded(true);
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
          <span className="drop-title">Drop .txt file here</span>

          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".txt"
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value="GENERATE"
            className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          />
        </label>
      </form>
    </div>
  );
};

export default FileUploadPodcast;
