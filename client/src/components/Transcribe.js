import React from "react";
import { useState } from "react";
import FileUpload from "./FileUpload";

function Transcribe({ setCaption, setTitle, setResultIsLoaded }) {
  const [file, setFile] = useState(null);
  return (
    <div>
      <FileUpload
        setCaption={setCaption}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoaded={setResultIsLoaded}
      />
    </div>
  );
}

export default Transcribe;
