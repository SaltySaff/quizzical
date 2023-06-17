import { useState, useEffect } from "react";
import "./App.css";
import Intro from "./Intro.jsx";
import Question from "./Question.jsx"

export default function App() {
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((questionsRes) => {
        setQuestions(questionsRes.results.map((question) => question));
      });
  }

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <main>
      {questions.length === 0 && <Intro getQuestions={getQuestions} />}
      {questions.length > 0 && 
        <div>
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
      }
    </main>
  );
}
