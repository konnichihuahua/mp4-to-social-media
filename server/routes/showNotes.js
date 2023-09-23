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
            Use 1 short, concise sentence for each topic. Focus on what the readers will learn. Don't enclose the timestamps with brackets or parenthesis. The timestamp must only include the beginning not the end. The podcast transcript is provided below: "${transcript[i]}"
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

const getResources = async (summary) => {
  let generatedResources = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: "${summary}", would you please send me suggested reading, resources and studies from this summary in JSON format?
          --------
          Send the result in the following JSON structure
          [{
            "resources": ["resource 1", "resource 2", "resource 3"]
          }]
          `,
        },
      ],
    })
    .then((result) => {
      generatedResources = result.data.choices[0].message.content;
      console.log(generatedResources);
    });

  return generatedResources;
};

const getMinifiedSummary = async (summary) => {
  let geneRatedsummary = "";

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Rewrite this in 1 paragraph for the podcast show notes from this transcript summary. "${summary}? Write in short, concise sentences. Start wtih "In this podcast episode,...". Rewrite like a native american english speaker.

          `,
        },
      ],
    })
    .then((result) => {
      geneRatedsummary =
        geneRatedsummary + result.data.choices[0].message.content;
    });

  return geneRatedsummary;
};

const getActionSteps = async (summary) => {
  let generatedActionSteps = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From this transcript summary: '${summary}', could you please provide me  with 7 action steps and recommendations in JSON Format?

          And here's the corresponding JSON structure:
          
          [{
            "steps": "["Step 1", "Step 2", "Step 3", ...]"
          }]`,
        },
      ],
    })
    .then((result) => {
      generatedActionSteps = result.data.choices[0].message.content;
    });

  return generatedActionSteps;
};
const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  const summary = await getSummary(req.body);
  console.log(summary);
  const generatedTimestamps = await getTimestamps(req.body);
  console.log(generatedTimestamps);
  const generatedBio = await getBio(summary);
  console.log(generatedBio);
  const generatedResources = await getResources(summary);
  console.log(generatedResources);
  const generatedActionSteps = await getActionSteps(summary);
  console.log(generatedActionSteps);
  const generatedSummary = await getMinifiedSummary(summary);
  console.log(generatedSummary);

  res.json({
    bio: generatedBio,
    timestamps: generatedTimestamps,
    resources: generatedResources,
    summary: generatedSummary,
    steps: generatedActionSteps,
  });
});

router.post("/summary", async (req, res) => {
  const summary = await getSummary(req.body);
  console.log(summary);

  const generatedSummary = await getMinifiedSummary(summary);
  console.log(generatedSummary);

  res.json({
    summary: generatedSummary,
  });
});

export default router;
