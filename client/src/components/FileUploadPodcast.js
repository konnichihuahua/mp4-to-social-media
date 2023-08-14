import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const FileUploadPodcast = ({
  setTitle,
  setCaption,
  setResultIsLoaded,
  file,
  setFile,
}) => {
  const ffmpegRef = useRef(new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  let audioDuration = 0;
  const audioRef = useRef();
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
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
    setResultIsLoaded(false);
    await load();
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.mp3", await fetchFile(file));
    await ffmpeg.exec([
      "-i",
      "input.mp3",
      "-ss",
      "0",
      "-t",
      "60",
      "output.mp3",
    ]);
    await ffmpeg.exec(["i", "input.mp3", ""]);
    const data = await ffmpeg.readFile("output.mp3");
    const formData = new FormData(event.target);
    formData.append("file", new Blob([data.buffer]));
    audioRef.current = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/ogg" })
    );
    audioPlayer.onloadedmetadata = function () {
      const durationInSeconds = Math.floor(audioPlayer.duration);
      audioDuration = durationInSeconds;
      console.log(audioDuration);
    };
    setLoaded(true);

    const audioPlayer = document.getElementById("audio-player");

    // await fetch("http://localhost:3000/podcast", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((result) => result.json())
    //   .then((data) => {
    //     setTitle(data.caption[0]);
    //     setCaption(data.caption[1]);
    //     console.log(data);
    //     setResultIsLoaded(true);
    //   });
  };
  return (
    <div>
      <audio
        id="audio-player"
        controls
        preload="metadat"
        src={audioRef.current}
      ></audio>
      <form
        className="drop-container flex flex-col items-center justify-center "
        id="transcription-form"
        encType="multipart/form-data"
        onSubmit={transcodeFile}
      >
        <label className="flex flex-col gap-2 p-5" id="dropcontainer">
          <span className="drop-title">Drop .mp3 audio file here</span>

          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".mp3,.mp4"
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
