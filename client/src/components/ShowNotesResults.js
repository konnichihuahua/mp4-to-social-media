import React from "react";
import { AiFillCopy } from "react-icons/ai";
function ShowNotesResults({
  summary,
  timestamps,
  resources,
  guestInfo,
  steps,
}) {
  const copyContent = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="results p-5 flex flex-col gap-2">
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Show Notes:
        </h3>{" "}
        <div className="flex flex-col">
          <span className="font-bold">Episode Summary: </span>
          <div>{summary} </div> <br /> <br />
          <span className="font-bold">About Our Guest:</span>
          {guestInfo} <br /> <br />
          <span className="font-bold"> Connect With Our Guest: </span>
          <ul>
            <li> • LinkedIn</li>
            <li> • Instagram</li>
            <li> • TikTok</li>
            <li> • Twitter</li>
            <br />
          </ul>
          <div>
            <span className="font-bold"> Action Steps & Recommendations:</span>
            <ul className="">
              {" "}
              {steps.steps.map((step) => (
                <li> • {step}</li>
              ))}
              <br />
            </ul>
            <span className="font-bold">Timestamps:</span>
            <ul>
              {timestamps.map((outerTimestamps) =>
                outerTimestamps.map((data) => {
                  const { topic, timestamp } = data;
                  return (
                    <li>
                      {" "}
                      {timestamp} - {topic}{" "}
                    </li>
                  );
                })
              )}
            </ul>
            <br />
          </div>
          <span className="font-bold">
            {" "}
            References, Resources Mentioned & Suggested Reading:
          </span>
          <ul className="">
            {" "}
            {resources.resources.map((resource) => (
              <li> • {resource}</li>
            ))}
            <li>
              {" "}
              <a href="https://www.degreefree.co/jobchange" target="_blank">
                • Degree Free Job Change Accelerator Course{" "}
              </a>
            </li>
            <li>
              {" "}
              <a href="https://www.degreefree.co/pathways" target="_blank">
                • Join the 5 Degree Free Pathways Course
              </a>
            </li>
            <li>
              <a href="https://www.degreefree.co/network" target="_blank">
                • Join the Degree Free Community!{" "}
              </a>
            </li>
            <li>
              <a href="https://www.degreefree.co/gethired" target="_blank">
                • 7 Day Get Hired Challenge{" "}
              </a>
            </li>
            <br />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShowNotesResults;
