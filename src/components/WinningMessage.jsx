import Confetti from "react-confetti";

export default function WinningMessage({ handleRestartGame, winFeedback }) {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerWidth} />
      <h2 className="success">Great! You Win!</h2>
      <p style={{ fontSize: "2rem" }}>{winFeedback}</p>
      <button
        onClick={() => handleRestartGame()}
        style={{ padding: "1rem 2rem", borderRadius: "0.5rem" }}
      >
        New Game
      </button>
    </>
  );
}
