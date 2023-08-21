import React from "react";
import { useState } from "react";
import FileUploadHighlight from "./FileUploadHighlight";
import HighlightResults from "./HighlightResults";
import AtomicSpinner from "atomic-spinner";

function Highlight() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("------------------");
  const [caption, setCaption] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div className="mt-7">
      <FileUploadHighlight
        setCaption={setCaption}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoading={setResultIsLoading}
      />
      {!resultIsLoading ? (
        <HighlightResults title={title} caption={caption} />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default Highlight;
