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
const getDescriptions = async (data) => {
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
  let generatedTitles = "";
  let generatedDescription = "";
  let results = [];
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please send me 5 title ideas from a podcast summary? Write the guest name at the end of the titles.
          
          Here are examples of our published titles, that you can use as reference. Please generate titles similar to this style. Use bullet format when sending the results.
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
      results.push(generatedTitles);
    });
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please send me a podcast description from a podcast summary? Write in short concise paragraphs and separate using bullet points. Write like a native english speaker. 
          
          Here are examples of our published descriptions that you can use as reference. Please generate the description similar to this style.
         Description 1: 
         "In this episode of Degree Free, get ready to be inspired by Matt Walters, a Technology Solutions Engineer who shares his “unconventional” path to success.

         Join us as we go over his journey, starting from humble beginnings as a pool technician and HVAC technician, and ultimately becoming a 6-figure engineer.
         
         Throughout our conversation, Matt shares invaluable insights into his career trajectory and the invaluable lessons he learned along the way.
         
         Key Discussion Points:
         
         - Breaking Through Boundaries: Matt Walters defied societal norms and traditional educational pathways to forge his unique career in technology solutions engineering, no degree needed.
         - The Evolution of a Career: Learn about the challenges and opportunities Matt encountered during his transition from working on trades, as a hands-on technician to a high-paying engineering role.
         - Learning and Unlearning: Discover the secrets behind Matt's success, and how he describes how being a good engineer means unlearning how you were taught to learn in school.
         - Career Growth Strategies: Matt provides valuable tips for anyone aspiring to advance their careers and break into the tech industry without a formal degree.
         - Overcoming Obstacles: Hear about the obstacles Matt faced and how he turned them into stepping stones towards achieving his professional goals.
         
         Listen to Matt’s story, a testament to the power of determination and perseverance.
         
         Don't miss this engaging conversation with a remarkable individual who proves that anything is possible with the right mindset and the courage to forge your own path.
         
         Enjoy the episode!" 

         Description 2: 
         "
         In this episode, join us as we sit down with AWS Software Engineer, Matthew Young, to delve into his inspiring journey of breaking into the tech industry without a traditional background in software engineering. If you're someone aspiring to enter the world of tech but don't know where to start, this episode is a goldmine of actionable advice and motivation.

        In this episode we discuss:

        Matthew's Unconventional Path:
        How he transitioned from a finance degree to forging a successful career in software engineering. Learn about his unique trajectory, which led him from scoring an internship to leveraging platforms like Upwork to establish his presence as a freelancer before landing a role at AWS.

        Non-Tech Companies as a Stepping Stone:
        Understand why Matthew advocates for breaking into the tech industry by first working at "non-tech companies." He shares valuable insights into how these experiences can offer valuable skills and perspectives that prove invaluable in the tech world and how it can be your way to getting work at tech companies.

        Becoming a Software Engineer without a Degree or Experience:
        Matthew's story is an encouraging testament to aspiring software engineers without formal degrees or prior experience. Tune in as he reveals the key strategies and resources that helped him overcome challenges and build a solid foundation in the tech realm.

        Contracting vs. Freelancing:
        Get a detailed comparison of contracting and freelancing in the tech industry. Matthew shares his personal experiences and offers guidance on how to decide which path might be more suitable for your career goals.

        Embracing AI in a Changing World:
        Matthew sheds light on the importance of embracing AI and its impact on the ever-changing world. As technology continues to progress, he emphasizes the value of staying adaptable and open to new advancements.

        Finding Your Niche in Tech:
        Choosing a specific direction within the vast tech landscape can be overwhelming. Matthew provides practical tips on how to discover your passion and decide on a tech path that aligns with your interests and strengths.

        Join us for this thought-provoking episode, filled with invaluable advice, and the wisdom of an accomplished software engineer who defied the odds to carve his own path in the tech industry.

        Enjoy the episode!"

        Description 3: 
        "
        In this episode, we sit down with Garrett Graves, a software engineer at Twitch who has built a thriving career without a college degree. Garrett shares his valuable insights, practical advice, and proven steps for aspiring back end developers who are eager to kickstart their careers but don't hold a traditional degree.

        In this episode, we talk about:

        - How to break into the software engineering industry, even without a college degree or work experience. Garret provides practical steps and resources to help individuals navigate their way through self-learning and gain the skills needed to succeed.
        - How to stand out and get hired as a software engineer. He shares strategies to make a strong impression on potential employers and increase your chances of securing a job.
        - Garrett's personal journey from dropping out of college to securing a position at Twitch, a leading technology company. He discusses the challenges he faced along the way and the lessons he learned, providing inspiration and motivation to those who may be considering alternative education paths.
        - Invaluable career advice from Garrett for individuals just starting their careers or looking to break into the software engineering industry. He shares insights on building a strong professional network, seeking mentorship, and staying motivated in the face of challenges.

        Tune in to this episode and gain valuable insights and guidance from Garrett Graves, as he shares his journey, tips, and advice to help aspiring software engineers carve their own path to success in the dynamic and ever-evolving world of technology.

        Enjoy the episode!"
          
          Here's the summary: 
          "${summary}"
          `,
        },
      ],
    })
    .then((result) => {
      generatedDescription = result.data.choices[0].message.content;
      results.push(generatedDescription);
    });
  return results;
};
const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  const response = await summarizeTranscript(req.body);
  res.json(response);
});

export default router;
