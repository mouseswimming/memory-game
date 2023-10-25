import Confetti from "react-confetti";

export default function WinningMessage({ handleLevelUp }) {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerWidth} />
      <h2>Great! You Win!</h2>
      <button onClick={handleLevelUp}>Level Up</button>
    </>
  );
}
