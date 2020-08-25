import React from "react";
import ReactDOM from "react-dom";
import Card from "./components/card";

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [color, setColor] = React.useState("A");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.scryfall.com/cards/search?order=name&q=${searchTerm}`
    );
    const json = await response.json();
    setCards(json.data);
  };

  const filteredCards = cards.filter((card) => {
    return color === "A" || card.colors.includes(color);
  });

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          autoComplete="off"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button>Search</button>
      </form>
      <section id="filters">
        <select
          value={color}
          onChange={(event) => setColor(event.target.value)}
        >
          <option value="A">All</option>
          <option value="R">Red</option>
          <option value="W">White</option>
          <option value="U">Blue</option>
          <option value="G">Green</option>
          <option value="B">Black</option>
        </select>
      </section>
      <ul id="cards">
        {filteredCards.map((card) => {
          const image = card.image_uris
            ? card.image_uris.small
            : card.card_faces[0].image_uris.small;
          return (
            <Card
              key={card.id}
              title={card.name}
              image={image}
              colors={card.colors}
            />
          );
        })}
      </ul>
    </main>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
