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
  const [tags, setTags] = useState("");
  const [epNumber, setEpNumber] = useState("");
  return (
    <div className="mt-7 flex items-center justify-center">
      <div>
        <FileUploadHighlight
          setCaption={setCaption}
          file={file}
          setFile={setFile}
          setTitle={setTitle}
          setResultIsLoading={setResultIsLoading}
          setEpNumber={setEpNumber}
          setTags={setTags}
        />
        <div className="m-3"> --- OR --- </div>
        <SocialMediaForm
          setCaption={setCaption}
          setTitle={setTitle}
          setResultIsLoading={setResultIsLoading}
          setTags={setTags}
          epNumber={epNumber}
          setEpNumber={setEpNumber}
        />
      </div>
      {!resultIsLoading ? (
        <HighlightResults
          title={title}
          caption={caption}
          tags={tags}
          epNumber={epNumber}
          resultIsLoading={resultIsLoading}
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

export default Highlight;
