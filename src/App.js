import "./App.css";
import { rand } from "./helpers.js";
import { Half } from "./Half.js";
import { Ball } from "./Ball.js";
import { useState } from "react";
// Sukurti aplikaciją su mygtuku “Reset” ir į dvi dalis apačioje
// padalintą ekraną. Paspaudus mygtuką “Reset” kairėje pusėje atsiranda
// rand 5, 15 kiekis apskritimų sunumeruoti nuo 1 eilės tvarka, o dešinė
// pusė tuščia. Paspaudus ant bet kokio apskritimo kairėje pusėje jis
// atsiranda dešinėje pusėje, o kairėje išnyksta. Taip iš kairės į dešinę
// turi būti galima perkelti visus apskritimus. Paspaudus ant dešinėje
// pusėje esančio apskritimo jis sugrįžta į kairę pusę ir t.t.
// Apskritimai abiejuose pusėse turi rikiuotis pagal eilės numerį
// didėjimo tvarka. Tvarka turi išlikti dėliojant apskritimus iš vienos
// pusės į kitą.
// Vėl paspaudus mygtuką “Reset” seni apskritimai išnyksta, kairėje
// pusėje vėl atsiranda naujas apskritimų kiekis, dešinė pusė- tuščia.

//pabandymas
function App() {
  const [leftBalls, setLeftBalls] = useState(genBalls());
  const [rightBalls, setRightBalls] = useState([...Array(15)].fill(null));

  function genBalls() {
    let ballsArr = [...Array(rand(5, 15))].map((_, ind) => ind + 1);
    return [...ballsArr, ...[...Array(15 - ballsArr.length)].fill(null)];
  }
  function handleReset() {
    setLeftBalls(genBalls());
    setRightBalls([]);
  }
  function handleLeftClick(id, num) {
    setRightBalls((old) => {
      let newState = [...old];
      newState[Number(id)] = num;
      return newState;
    });
    setLeftBalls((old) => {
      let newState = [...old];
      newState[Number(id)] = null;
      return newState;
    });
  }
  function handleRightClick(id, num) {
    setLeftBalls((old) => {
      let newState = [...old];
      newState[Number(id)] = num;
      return newState;
    });
    setRightBalls((old) => {
      let newState = [...old];
      newState[Number(id)] = null;
      return newState;
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Testas #6</h1>
        <p>Pabandymas su react </p>
        <p>Move balls from one side to another by clicking</p>
      </header>
      <main>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
        <div className="stage">
          <div>
            <Half side="left" balls={leftBalls} handleClick={handleLeftClick}></Half>
          </div>
          <div>
            <Half side="right" balls={rightBalls} handleClick={handleRightClick}></Half>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
