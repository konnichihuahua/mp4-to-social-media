import express from "express";
import * as path from "path";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import "dotenv/config";

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});
router.use(cors());
const summarizeTranscript = async (transcript) => {
  let summary = "";
  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Would you please summarize this?

          "${transcript[i]}"
          `,
          },
        ],
      })
      .then((result) => {
        summary = summary + result.data.choices[0].message.content;
      });
  }
  const titles = await getTitles(summary);
  return titles;
};

const getTitles = async (summary) => {
  let generatedTitles = {};
  let generatedDescription = {};
  let results = [];
  let generatedTags = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please send me 5 title ideas from a podcast summary in array format? Each title should be a child of an array. Write the guest name at the end of the titles.
          
          Here are examples of our published titles, that you can use as reference. Please generate titles similar to this style. 
          • Learning Beyond the Classroom: From Pool Tech to Tech Solutions Engineer with [Guest Name]
          • Breaking into Code: How to Launch Your Software Engineering Career with No Experience with [Guest Name]
          • Future-Proof Your Career: Positioning Yourself for Success in the AI Era with [Guest Name]
          • Debunking ’Follow Your Passion’ as Career Advice, The Rise of Downcredentialing & Skill Based Hiring
          • How to Break into Marketing with No Degree or Experience with [Guest Name]
          • Unlock Opportunities in Operations - No Degree Needed! with [Guest Name]
          • Level Up Your Career: Achieving Tech Success Without a Degree with [Guest Name]
          • How To Get a $100,000+ IT Job with Bootcamps & Certifications with [Guest Name]
          • Breaking Into Cybersecurity: The Power of Accidents & Saying Yes To Everything with [Guest Name]
          
          Here's the summary: 
          "${summary}"
          `,
        },
      ],
    })
    .then((result) => {
      generatedTitles = result.data.choices[0].message.content;
      console.log(generatedTitles);
      results.push([generatedTitles]);
    });
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please send me a podcast description in JSON format from a podcast summary with intro, key discussion points and outro? Write like a native english speaker. The podcast name is 'Degree Free Podcast'. Make it short and concise. Here's the summary: "${summary}"
          Here are examples that you can use as reference:
          { 
            "intro": "Join us for an insightful episode as we unravel the journey of Colton Sakamoto, co-founder and former CEO of Infection Points, and currently the Chief Party Officer at Office Party. In this jam-packed conversation, Colton takes us through his remarkable path to success, from humble beginnings to building thriving ventures.  Colton Sakamoto is the Chief Party Officer at The Office Party. Prior to The Office Party, he co-founded Inflection Points, an employment-focused company that helped 1,500+ job seekers start new careers.",
            "key_discussion_points": ['How Colton started his entrepreneurial adventure from the comfort of his childhood bedroom, overcoming challenges and eventually selling his company, Inflection Points.', ' Valuable insights into the world of content creation and its synergies with entrepreneurship, as Colton shares his experiences transitioning from a content creator to co-founding Office Party.', 'The impact of Colton's decision to pursue an MBA on his career trajectory, with candid reflections if it really added value to his professional growth and decision-making.', 'Strategies and secrets behind building a loyal following and nurturing a thriving community for aspiring entrepreneurs and content creators.', 'A glimpse into Colton's visionary ideas for the future of Office Party, including innovative approaches to monetization and platform expansion.'],
            "outro": "We dive deep into the nuances of entrepreneurship, content creation, and starting a business from scratch. Whether you're an experienced business owner or contemplating starting a side hustle, there's something valuable for everyone in this episode. Don't miss the chance to learn from Colton Sakamoto’s journey and insights to elevate your own path to success. Enjoy the episode!"
          }
          
          --------
          Send the result in the following JSON structure
          { "intro": "..",
            "key_discussion_points": [],
            "outro": ".."}`,
        },
      ],
    })
    .then((result) => {
      generatedDescription = result.data.choices[0].message.content;
      console.log(generatedDescription);
      results.push(generatedDescription);
    });

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you please generate 10 youtube tags from that summary? Write 10 youtube tags only. Make sure it's hyper-targeted. Separate the results by comma. Use all lowercase. Send the result only as this is for a web app.`,
        },
      ],
    })
    .then((result) => {
      generatedTags = result.data.choices[0].message.content;
      results.push(generatedTags);
    });
  return results;
};
const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  const response = await summarizeTranscript(req.body);
  res.json(response);
});

export default router;
