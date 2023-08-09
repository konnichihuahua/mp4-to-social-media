import React, { useState } from "react";

const SocialMediaForm = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== "") {
      onSubmit(description);
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="drop-container">
      <div className="flex flex-col gap-4" id="dropcontainer">
        <span className="drop-title">Write title and caption about:</span>
        <input
          type="text"
          id="description"
          className="text-black p-2"
          placeholder="Certifications vs college degrees"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="submit"
          value="Generate"
          className="text-xl text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </div>
    </form>
  );
};

export default SocialMediaForm;
