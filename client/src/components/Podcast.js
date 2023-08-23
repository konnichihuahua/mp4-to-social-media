import React from "react";
import { useState } from "react";
import FileUploadPodcast from "./FileUploadPodcast";
import PodcastResults from "./PodcastResults";
import AtomicSpinner from "atomic-spinner";

function Podcast() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState("------------------");
  const [tags, setTags] = useState("------------------");
  const [showNotes, setShowNotes] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);

  return (
    <div>
      <FileUploadPodcast
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoading={setResultIsLoading}
        setTags={setTags}
      />

      {!resultIsLoading ? (
        <PodcastResults
          description={description}
          title={title}
          tags={tags}
          showNotes={showNotes}
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

export default Podcast;
