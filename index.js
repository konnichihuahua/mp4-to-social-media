import express from "express";
import cors from "cors";
import titleRoute from "./server/routes/title.js";
import transcribeRoute from "./server/routes/transcribe.js";
import transcribeMp4Route from "./server/routes/transcribemp4.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/get", titleRoute);
app.use("/transcribe", transcribeRoute);
app.use("/mp4", transcribeMp4Route);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
