import { useState } from "react";

// Form that will let you add a list
// * Quantity - select
// * Item Name - text input box
export default function Form({ onAddItems }) {
  // state that will be use to change
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  //This is a handle function that prevent reloading the browser when enter
  //Used in forms
  function handleSubmit(e) {
    e.preventDefault();

    //If no description return nothing
    if (!description) return;
    //Creating new object and storing the current values of the inputs
    onAddItems({ description, quantity, packed: false, id: Date.now() });
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* e.target.value will always return a string -> need numbers  */}
      <div className="form-items">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {/* Array.from({ length: 20 }, (_, i) => i + 1) -> Creating an array of 20 digits -> map the array storing the value to num -> use num to create 20 options*/}
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {/* This is the input where you can add item */}
        <input
          type="text"
          placeholder="Item..."
          value={description}
          //Listening an event t
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </div>
    </form>
  );
}
