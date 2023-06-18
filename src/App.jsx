import { useState, useEffect } from "react";
import "./App.css";
import Intro from "./Intro.jsx";
import Question from "./Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function App() {
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((questionsRes) => {
        setQuestions(
          questionsRes.results.map((question) => formatQuestion(question))
        );
      });
  }

  function formatQuestion(question) {
    return {
      id: nanoid(),
      question: decode(question.question),
      possibleAnswers: shuffleArray(
        decodeArray([...question.incorrect_answers, question.correct_answer])
      ),
      correct_answer: decode(question.correct_answer),
    };
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      possibleAnswers={question.possibleAnswers}
    />
  ));

  console.log(questionElements);

  function shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function decodeArray(array) {
    return array.map((element) => decode(element));
  }

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <main>
      {questions.length === 0 && <Intro getQuestions={getQuestions} />}
      {questions.length > 0 && 
      <div className="question-form-container">
        {questionElements}
        <button className="check-answers">Check Answers</button>
      </div>
      }
    </main>
  );
}
