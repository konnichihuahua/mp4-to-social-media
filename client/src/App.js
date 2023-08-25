import logo from "./logo.svg";
import "./App.css";
import Highlight from "./components/Highlight";
import Podcast from "./components/Podcast";

import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState("highlights");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightIsActive, setHighlightIsActive] = useState(true);
  const highlightedClass =
    "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
  const unHighlightedClass =
    "block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("roar");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <nav className="bg-white dark:bg-gray-900 static w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 sm: fixed md:fixed lg:fixed">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center" href="/">
            <img src={logo} className="h-12" alt="Clip2Gram Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DF AI Tools
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
              onClick={toggleModal}
              aria-expanded={isMenuOpen}
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
            {isMenuOpen && (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li
                  onClick={() => {
                    setShowForm("highlights");
                    setHighlightIsActive(true);
                  }}
                >
                  <b
                    className={
                      highlightIsActive ? "text-blue-500" : "text-white"
                    }
                    aria-current="page"
                  >
                    Highlights
                  </b>
                </li>

                <li
                  onClick={() => {
                    setShowForm("podcast");
                    setHighlightIsActive(false);
                  }}
                >
                  <b
                    className={
                      !highlightIsActive ? "text-blue-500" : "text-white"
                    }
                  >
                    Podcast
                  </b>
                </li>
              </ul>
            )}
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li
                  onClick={() => {
                    setShowForm("highlights");
                    setHighlightIsActive(true);

                    toggleModal();
                  }}
                >
                  <b
                    className={
                      highlightIsActive ? highlightedClass : unHighlightedClass
                    }
                    aria-current="page"
                  >
                    Highlights
                  </b>
                </li>

                <li
                  onClick={() => {
                    setShowForm("podcast");
                    setHighlightIsActive(false);

                    toggleModal();
                  }}
                >
                  <b
                    className={
                      highlightIsActive ? unHighlightedClass : highlightedClass
                    }
                  >
                    Podcast
                  </b>
                </li>
              </ul>
              <button onClick={toggleModal}>Close Modal</button>
            </div>
          </div>
        )}
      </nav>

      <div className="min-w-min main-content mt-5 flex flex-col md:flex-row items-center lg:flex-row">
        {showForm === "highlights" ? (
          <Highlight />
        ) : showForm === "podcast" ? (
          <Podcast />
        ) : null}
      </div>
    </div>
  );
}

export default App;
