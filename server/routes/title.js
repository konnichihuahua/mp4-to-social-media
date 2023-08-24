import express from "express";
import * as path from "path";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import "dotenv/config";

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});
const getTitle = async (data) => {
  let generatedTitle = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a youtube shorts title about ${data}. Make it only 5 words. Don't include other message as this is for a web app.`,
        },
      ],
    })
    .then((result) => {
      generatedTitle = result.data.choices[0].message.content;
    });
  return generatedTitle;
};

const getDescription = async (data) => {
  let generatedDescription = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a 1 sentence tiktok caption about ${data}. This is for an episode sneak peek and don't use emojis. Write like a native english speaker and do not include hashtags.`,
        },
      ],
    })
    .then((result) => {
      generatedDescription = result.data.choices[0].message.content;
    });
  return generatedDescription;
};

const getTags = async (data) => {
  let generatedTags = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write 5 relevant hashtags about ${data}.  The hashtags must be in lowercase and separate each hashtag with a space.`,
        },
      ],
    })
    .then((result) => {
      generatedTags = result.data.choices[0].message.content;
    });
  return generatedTags;
};
const openai = new OpenAIApi(configuration);
router.use(cors());
router.get("/title/:data", async (req, res) => {
  res.json({ title: await getTitle(req.params.data) });
});

router.get("/description/:data", async (req, res) => {
  res.json({ description: await getDescription(req.params.data) });
});

router.get("/tags/:data", async (req, res) => {
  res.json({ tags: await getTags(req.params.data) });
});
export default router;
