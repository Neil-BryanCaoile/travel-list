import { useState } from "react";

// The main App, that will be use in index.js
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

// Header
function Logo() {
  return <h1>WanderList</h1>;
}

// Form that will let you add a list
// * Quantity - select
// * Item Name - text input box
function Form({ onAddItems }) {
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
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      {/* e.target.value will always return a string -> need numbers  */}
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
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
