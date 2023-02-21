import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';
//list of words to be guessed
const words = ["inelegantly",
  "ineligibility",
  "ineligible",
  "ineloquently",
  "ineluctable",
  "ineluctably",
  "inept",
  "ineptitude",
  "ineptly",
  "ineptness",
  "inequality",
  "inequitable",
  "inequitably",
  "inequity",
  "ineradicable",
  "inerrable",
  "inerrancy",
  "inerrant",
  "inert",
  "inertia",
  "inertial",
  "inertness",
  "inescapable",
  "inescapably",
  "inessential",
  "inessentiality",
  "inestimable",
  "inevitability",
  "inevitable",
  "inevitableness",
  "inevitably",
  "inexact",
  "inexactitude",
  "inexactly",
  "inexactness",
  "inexcusable",
  "inexcusably",
  "inexhaustible",
  "inexhaustibly",
  "inexorability",
  "inexorable",
  "inexorableness",
  "inexorably",
  "inexpedience",
  ];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
