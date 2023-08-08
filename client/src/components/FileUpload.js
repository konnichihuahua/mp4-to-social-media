import React, { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const FileUpload = ({
  setTitle,
  setCaption,
  setResultIsLoaded,
  file,
  setFile,
}) => {
  const ffmpegRef = useRef(new FFmpeg());
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
  };
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };
  const transcodeFile = async (event) => {
    event.preventDefault();
    setResultIsLoaded(false);
    await load();
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.mp4", await fetchFile(file));
    await ffmpeg.exec(["-i", "input.mp4", "output.mp3"]);
    const data = await ffmpeg.readFile("output.mp3");
    const formData = new FormData(event.target);
    formData.append("file", new Blob([data.buffer]));
    await fetch("http://localhost:5000/mp4", {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(data.caption[0]);
        setCaption(data.caption[1]);
        setResultIsLoaded(true);
      });
  };
  return (
    <form
      className="flex flex-col items-center justify-center"
      id="transcription-form"
      encType="multipart/form-data"
      onSubmit={transcodeFile}
    >
      <label className="drop-container" id="dropcontainer">
        <span className="drop-title">Drop files here</span>
        or
        <input
          id="file-upload"
          type="file"
          name="file"
          accept=".mp4,.mp3"
          onChange={handleFileChange}
        />
        <input
          type="submit"
          value="GENERATE"
          className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </label>
    </form>
  );
};

export default FileUpload;
