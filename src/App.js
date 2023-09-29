import { useState } from "react";

// The main App, that will be use in index.js
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        Total Items :
        <b className={numItems > 0 ? "numItems" : ""}>{numItems}</b> <br />
        Total Packed:
        <b className={numPacked > 0 ? "numItems" : ""}>{numPacked}</b>
        <br />
        <b className={percentage > 0 ? "numItems" : ""}>{percentage}</b>% <br />
      </em>
    </footer>
  );
}

// Child Components
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
