import React from "react";
import { useState } from "react";
import FileUploadPodcast from "./FileUploadPodcast";

function Podcast({ setCaption, setTitle, setResultIsLoaded }) {
  const [file, setFile] = useState(null);
  return (
    <div>
      <FileUploadPodcast
        setCaption={setCaption}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoaded={setResultIsLoaded}
      />
    </div>
  );
}

export default Podcast;
