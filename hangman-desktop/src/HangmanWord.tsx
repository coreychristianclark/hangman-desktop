export function HangmanWord() {
  const word = "text";
  const guessedLetters = ["t","e", "g"];
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {word.split("").map(
        (
          letter,
          index // This will split the word into each letter and give us the index of each letter so we can work with the characters individually.
        ) => (
          <span style={{ borderBottom: "0.1em solid black" }} key={index}>
            <span
              style={{
                visibility: guessedLetters.includes(letter)
                  ? "visible"
                  : "hidden",
              }}
            >
              {letter}
            </span>
          </span> // Gives us our bottom platform that will serve as a 'highlight' for each character.
        )
      )}
    </div>
  );
}
