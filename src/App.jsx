import { useEffect, useRef, useState } from "react";
import "./App.css";
import DeckCard from "./components/DeckCard";
import WinningMessage from "./components/WinningMessage";
import RetryMessage from "./components/RetryMessage";

const cards = [
  { src: "/img/poke1.png" },
  { src: "/img/poke2.png" },
  { src: "/img/poke3.png" },
  { src: "/img/poke4.png" },
  { src: "/img/poke5.png" },
  { src: "/img/poke6.png" },
  { src: "/img/poke7.png" },
  { src: "/img/poke8.png" },
  { src: "/img/poke9.png" },
  { src: "/img/poke10.png" },
  { src: "/img/poke11.png" },
  { src: "/img/poke12.png" },
  { src: "/img/poke13.png" },
  { src: "/img/poke14.png" },
  { src: "/img/poke15.png" },
  { src: "/img/poke16.png" },
  { src: "/img/poke17.png" },
  { src: "/img/poke18.png" },
  { src: "/img/poke19.png" },
  { src: "/img/poke20.png" },
];

const cardNumOptions = [2, 4, 6, 8, 9, 10, 12, 15, 18];

const fourColumns = [2, 4, 6, 8];
const fiveColumns = [10];
const sixColumns = [9, 12, 15, 18];

function App() {
  const [cardNumber, setCardNumber] = useState(0);
  const [deck, setDeck] = useState([]);
  const [disableCard, setDisableCard] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [tryNumber, setTryNumber] = useState(0);
  const [maxTry, setMaxTry] = useState(0);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winFeedback, setWinFeedback] = useState("");
  const [level, setLevel] = useState(0);

  const cardContainer = useRef(null);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisableCard(true);
      setTryNumber((currentTryNumber) => currentTryNumber + 1);
      if (choiceOne.src === choiceTwo.src) {
        // match found
        setDeck((currentDeck) => {
          return currentDeck.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    } else {
      if (tryNumber !== 0 && maxTry === tryNumber) {
        setGameOver(true);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setCardNumber(cardNumOptions[0]);
  }, []);

  useEffect(() => {
    const pairedNum = deck.filter((card) => card.matched).length;
    if (pairedNum === cardNumber * 2) {
      setWin(true);
      findNextLevel();
    }
  }, [deck]);

  useEffect(() => {
    startNewGame();
  }, [cardNumber]);

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisableCard(false);
  }

  function shuffleCards(cards) {
    return [...cards].sort(() => Math.random() - 0.5);
  }

  function findGridCol() {
    if (fourColumns.includes(cardNumber)) return 4;
    if (fiveColumns.includes(cardNumber)) return 5;
    if (sixColumns.includes(cardNumber)) return 6;
  }

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function startNewGame() {
    const _deck = shuffleCards(cards).slice(0, cardNumber);
    let shuffledDeck = [..._deck, ..._deck].map((card) => ({
      ...card,
      id: crypto.randomUUID(),
      matched: false,
    }));
    shuffledDeck = shuffleCards(shuffleCards(shuffledDeck));
    setDeck(shuffledDeck);

    setMaxTry(Math.round(cardNumber * Math.sqrt(cardNumber) + cardNumber));
    setTryNumber(0);
    setWin(false);
    setGameOver(false);
    resetTurn();

    const colNum = findGridCol();
    const rowNum = (cardNumber * 2) / colNum;
    const maxWidth = Math.min((80 - rowNum) / rowNum);

    cardContainer.current.style.setProperty("--grid-column", colNum);
    cardContainer.current.style.setProperty(
      "--grid-column-width",
      `${maxWidth}vh`
    );
  }

  function findNextLevel() {
    const curIndex = cardNumOptions.findIndex((num) => {
      return num === cardNumber;
    });

    if (gameOver) return setWinFeedback("That is okay, let's try agian!");

    if (curIndex === cardNumOptions.length - 1) {
      setWinFeedback(
        "You have compolished the most difficult level, Do you want to challenge again?"
      );
      setLevel(cardNumOptions.length);
    } else {
      setWinFeedback("Let's try something more challenging!");
      setLevel(curIndex + 1);
    }
  }

  function handleRestartGame() {
    if (level < cardNumOptions.length) {
      setCardNumber(cardNumOptions[level]);
    } else {
      startNewGame();
    }
  }

  return (
    <>
      <h1>Memory Game for Hanbin</h1>
      {!gameOver && !win && (
        <div className="game-console">
          <div>
            <select
              name="select pokemon number"
              id="pokemonNum"
              className="pokeman-select"
              value={cardNumber}
              onChange={(e) => setCardNumber(Number(e.target.value))}
            >
              {cardNumOptions.map((num) => (
                <option value={num} key={num}>
                  {num * 2} Cards
                </option>
              ))}
            </select>
            <button onClick={startNewGame}>New Game</button>
          </div>
          <div style={{ color: "yellow" }}>
            Tries left: {maxTry - tryNumber}
          </div>
        </div>
      )}
      <div
        className={`card-container ${win || gameOver ? "hidden" : ""}`}
        id="card-container"
        ref={cardContainer}
      >
        <div className="card-grid">
          {deck.map((card) => (
            <DeckCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={choiceOne === card || choiceTwo === card || card.matched}
              disableCard={disableCard}
            />
          ))}
        </div>
      </div>
      {win && (
        <WinningMessage
          handleRestartGame={handleRestartGame}
          winFeedback={winFeedback}
        />
      )}
      {gameOver && !win && <RetryMessage startNewGame={startNewGame} />}
    </>
  );
}

export default App;
