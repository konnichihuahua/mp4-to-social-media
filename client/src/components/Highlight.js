import React from "react";
import { useState } from "react";
import FileUploadHighlight from "./FileUploadHighlight";
import HighlightResults from "./HighlightResults";
import AtomicSpinner from "atomic-spinner";
import SocialMediaForm from "./SocialMediaForm";

function Highlight() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("------------------");
  const [caption, setCaption] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div className="mt-7 flex items-center justify-center">
      <div>
        <FileUploadHighlight
          setCaption={setCaption}
          file={file}
          setFile={setFile}
          setTitle={setTitle}
          setResultIsLoading={setResultIsLoading}
        />
        <SocialMediaForm
          setCaption={setCaption}
          setTitle={setTitle}
          setResultIsLoading={setResultIsLoading}
        />
      </div>
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
