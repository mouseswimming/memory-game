import "./DeckCard.css";

export default function DeckCard({ card, handleChoice, flipped, disableCard }) {
  function handleClick() {
    if (disableCard) return;
    handleChoice(card);
  }
  return (
    <div className={`deck-card ${flipped ? "flipped" : ""}`}>
      <img className="card-front" src={card.src} alt="" />
      <img
        className="card-back"
        onClick={handleClick}
        src="/img/cover.png"
        alt=""
      />
    </div>
  );
}
