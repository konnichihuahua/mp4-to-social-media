import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import "dotenv/config";

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});
router.use(cors());
const getSummary = async (transcript) => {
  let geneRatedsummary = "";
  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Would you please summarize this for further processing on GPT?

          "${transcript[i]}"
          `,
          },
        ],
      })
      .then((result) => {
        geneRatedsummary =
          geneRatedsummary + result.data.choices[0].message.content;
      });
  }

  return geneRatedsummary;
};

const getTimestamps = async (transcript) => {
  let generatedTimestamps = [];

  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please generate 3 summaries with timestamps from the podcast transcript using the following EXACT JSON format: 
            [
              {
                "topic": "...",
                "timestamp": "..."
              },
              ...
            ]
            Use 1 short, concise sentence for each topic. Focus on what the readers will learn. Don't enclose the timestamps with brackets or parenthesis. The timestamp must only include the beginning not the end. The podcast transcript is provided below: ${transcript[i]}
          `,
          },
        ],
      })
      .then((result) => {
        generatedTimestamps = generatedTimestamps.concat(
          result.data.choices[0].message.content
        );
      });
  }

  return generatedTimestamps;
};
const getBio = async (summary) => {
  let generatedBio = "";
  // let generatedTimestamps = "";
  let result = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you generate a 1 paragrap, with 3 - 5 sentences guest bio? Make it short and concise. Write like a native american english speaker. Send the result only.`,
        },
      ],
    })
    .then((result) => {
      generatedBio = result.data.choices[0].message.content;
    });

  return generatedBio;
};

const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  const summary = await getSummary(req.body);
  const generatedTimestamps = await getTimestamps(req.body);
  const generatedBio = await getBio(summary);
  res.json({ bio: generatedBio, timestamps: generatedTimestamps });
});

export default router;
