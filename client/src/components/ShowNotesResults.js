import React from "react";
import { AiFillCopy } from "react-icons/ai";
function ShowNotesResults({ title, timestamps, tags, guestInfo }) {
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
          <span className="font-bold">About Our Guest:</span>
          {guestInfo} <br /> <br />
          <span className="font-bold"> Connect With Our Guest: </span>
          <ul>
            <li> • Social Link 1</li>
            <li> • Social Link 2</li>
            <br />
          </ul>
          <div>
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
          <span className="font-bold">Links & Resources Mentioned:</span>
          <ul className="">
            {" "}
            <li>• Resource 1</li>
            <li>• Resource 2</li>
            <li>• Resource 3</li>
            <br />
          </ul>
          <div> Suggested Reading: </div>
          <ul className="">
            {" "}
            <li>• Article 1</li>
            <li>• Article 2</li>
            <br />
          </ul>
          <div>
            Contact Us:
            <ul className="">
              <li>• Email</li>
              <li>• Contact Form</li>
              <br />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowNotesResults;
