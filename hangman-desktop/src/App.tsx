import { useCallback } from "react";
import { useEffect } from "react";
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
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  ); // This filters through the letters that are NOT in the word to guess.

  const isLoser = incorrectLetters.length >= 6; // There are only 6 body parts that can be shown, so if the user is wrong 6 times, the game will end.
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter)); // This line of code states that if every iteration of this loop returns true, then 'every' is true.

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner)
        return; // If a letter is already guessed, the user will not be punished twice. Nothing will happen. If user wins or loses, nothing further happens.

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  ); // Guessing the same incorrect letter more than once no longer progresses the hangman.

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return; // If a letter between a-z was pressed, it will continue on with the process. If an invalid character was entered, it will not continue on.

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}></div>

      {isWinner && "You win! Refresh to try a new word."}
      {isLoser && "Nice try! Refresh to try a new word."}

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser} // Reveals the word if user loses.
        guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
