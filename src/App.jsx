import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use-window-size";

function App() {
  function allNewDice() {
    return [
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
      { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() },
    ];
  }
  const { width, height } = useWindowSize();
  const [numbers, setNumbers] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = numbers.every((number) => number.isHeld);
    const firstValue = numbers[0].value;
    const allSameValue = numbers.every((number) => number.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [numbers]);

  function rollNewGame() {
    setNumbers(allNewDice());
    setTenzies(false);
  }

  function roll() {
    setNumbers(
      numbers.map((number) => {
        return number.isHeld
          ? number
          : {
              value: Math.floor(Math.random() * 6 + 1),
              isHeld: false,
              id: nanoid(),
            };
      })
    );
  }

  function holdDice(id) {
    setNumbers(
      numbers.map((number) => {
        return number.id === id
          ? { ...number, isHeld: !number.isHeld }
          : number;
      })
    );
  }

  const numberElements = numbers.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      holdDice={() => holdDice(number.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{numberElements}</div>

      {tenzies ? (
        <button onClick={rollNewGame} className="button">
          New Game
        </button>
      ) : (
        <button onClick={roll} className="button">
          Roll
        </button>
      )}

      {tenzies && <Confetti width={width} height={height} />}
    </main>
  );
}

export default App;
