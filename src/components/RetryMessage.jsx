export default function RetryMessage({ startNewGame }) {
  return (
    <div>
      <h2 className="failing">
        Oops!
        <br />
        Another shot?
      </h2>
      <button
        onClick={() => startNewGame()}
        style={{
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          marginTop: "3rem",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
