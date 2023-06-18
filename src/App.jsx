import { useState, useEffect } from "react";
import "./App.css";
import Intro from "./Intro.jsx";
import Question from "./Question.jsx";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((questionsRes) => {
        setQuestions(questionsRes.results.map((question) => formatQuestion(question)));
      });
  }

  function formatQuestion(question) {
    return {
      id: nanoid(),
      question: question.question,
      possibleAnswers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
      correct_answer: question.correct_answer,
    };
  }

  const questionElements = questions.map(question => (
    <Question 
      key={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      possibleAnswers={question.possibleAnswers}
    />
  ))

  console.log(questionElements)

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

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <main>
      {questions.length === 0 && <Intro getQuestions={getQuestions} />}
      {questions.length > 0 && (
        <div>
          {questionElements}
        </div>
      )}
    </main>
  );
}
