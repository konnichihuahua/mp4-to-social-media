import React from "react";
import { useState } from "react";
import FileUploadPodcast from "./FileUploadPodcast";
import PodcastResults from "./PodcastResults";
function Podcast() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("------------------");
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
      />
      <PodcastResults
        description={description}
        title={title}
        tags={tags}
        showNotes={showNotes}
      />
    </div>
  );
}

export default Podcast;
