import React, { useState } from "react";

function RadioExample() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h3>Select an option:</h3>

      <label>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleChange}
        />
        Ambulance Service
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleChange}
        />
        Police Station
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleChange}
        />
        Fire Brigade
      </label>

      <p>Selected: {selectedOption}</p>
    </div>
  );
}

export default RadioExample;