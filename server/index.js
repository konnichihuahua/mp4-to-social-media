import express from "express";
import cors from "cors";
import titleRoute from "./routes/title.js";
import transcribeRoute from "./routes/transcribe.js";
import transcribeMp4Route from "./routes/transcribemp4.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/get", titleRoute);
app.use("/transcribe", transcribeRoute);
app.use("/mp4", transcribeMp4Route);
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
