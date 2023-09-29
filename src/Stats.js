export default function Stats({ items }) {
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
