import { useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]; // This is giving us a value between 0 and 1, multiplying it by the length of our word list (so, 0 and the length of our list), and then rounding the value down. This is how our words will be generated.
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Type set to string array.
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter)); // This filters through the letters that are NOT in the word to guess.

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem", // Gap set between the keys.
        margin: "0 auto", // Centers everything.
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard />
        </div>
    </div>
  );
}

export default App;
