import logo from "./logo.svg";
import "./App.css";
import SocialMediaForm from "./components/SocialMediaForm";
import Results from "./components/Results";
import Transcribe from "./components/Transcribe";
import AtomicSpinner from "atomic-spinner";
import Podcast from "./components/Podcast";

import { useState } from "react";

function App() {
  const [title, setTitle] = useState("------------------");
  const [caption, setCaption] = useState("------------------");
  const [showForm, setShowForm] = useState("podcast");
  const [resultIsLoaded, setResultIsLoaded] = useState(true);

  const onSubmit = (data) => {
    setResultIsLoaded(false);
    getTitle(data);
    getCaption(data);
  };

  const getTitle = (data) => {
    fetch(`https://fine-shorts-tuna.cyclic.app/get/title/${data}`)
      .then((response) => response.json())
      .then((data) => setTitle(data.title));
  };
  const getCaption = (data) => {
    fetch(`https://fine-shorts-tuna.cyclic.app/get/description/${data}`)
      .then((response) => response.json())
      .then((data) => {
        setCaption(data.description);
        setResultIsLoaded(true);
      });
  };

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <nav className="bg-white dark:bg-gray-900 static w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 sm: fixed md:fixed lg:fixed">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center" href="/">
            <img src={logo} className="h-12" alt="Clip2Gram Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Clip2Gram
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Contact
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li onClick={() => setShowForm("video")}>
                <b
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Generate From Video
                </b>
              </li>
              <li onClick={() => setShowForm("text")}>
                <b className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Generate From Text
                </b>
              </li>
              <li onClick={() => setShowForm("podcast")}>
                <b className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Generate From Podcast (ongoing..)
                </b>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="min-w-min main-content mt-5 flex flex-col md:flex-row items-center lg:flex-row">
        {showForm === "text" ? (
          <SocialMediaForm
            onSubmit={onSubmit}
            setResultIsLoaded={setResultIsLoaded}
          />
        ) : showForm === "video" ? (
          <Transcribe
            setCaption={setCaption}
            setTitle={setTitle}
            setResultIsLoaded={setResultIsLoaded}
          />
        ) : showForm === "podcast" ? (
          <Podcast
            setCaption={setCaption}
            setTitle={setTitle}
            setResultIsLoaded={setResultIsLoaded}
          />
        ) : null}

        {resultIsLoaded ? (
          <Results title={title} caption={caption} />
        ) : (
          <div className="loader-container flex justify-center items-center">
            <AtomicSpinner />
            <p> Generating Magic...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
