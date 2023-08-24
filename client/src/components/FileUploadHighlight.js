import React, { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const FileUploadHighlight = ({
  setTitle,
  setCaption,
  setResultIsLoading,
  file,
  setFile,
  setEpNumber,
  setTags,
}) => {
  function removeOuterQuotes(inputString) {
    if (typeof inputString !== "string") {
      throw new Error("Input must be a string");
    }

    const trimmedString = inputString.trim();

    if (
      trimmedString.length >= 2 &&
      trimmedString[0] === '"' &&
      trimmedString[trimmedString.length - 1] === '"'
    ) {
      return trimmedString.slice(1, -1);
    }

    return inputString;
  }
  const ffmpegRef = useRef(new FFmpeg());
  function extractLastNumber(filename) {
    const regex = /(\d+)\.mp4$/;
    const match = filename.match(regex);
    if (match) {
      return parseInt(match[1]);
    } else {
      return null;
    }
  }
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
    setEpNumber(extractLastNumber(file.name));
  };
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
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
    setResultIsLoading(true);
    await load();
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.mp4", await fetchFile(file));
    await ffmpeg.exec(["-i", "input.mp4", "output.mp3"]);
    const data = await ffmpeg.readFile("output.mp3");
    const formData = new FormData(event.target);
    formData.append("file", new Blob([data.buffer]));
    await fetch("/mp4", {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(removeOuterQuotes(data.caption[0]));
        setCaption(removeOuterQuotes(data.caption[1]));
        setTags(removeOuterQuotes(data.caption[2]));
        setResultIsLoading(false);
      });
  };
  return (
    <form
      className="drop-container flex flex-col items-center justify-center "
      id="transcription-form"
      encType="multipart/form-data"
      onSubmit={transcodeFile}
    >
      <label className="flex flex-col gap-2 p-5" id="dropcontainer">
        <span className="drop-title">Drop highlight here (.mp4)</span>
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

export default FileUploadHighlight;
