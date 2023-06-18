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
      possibleAnswers: formatAnswers(
        question.incorrect_answers,
        question.correct_answer
      ),
      correct_answer: decode(question.correct_answer),
    };
  }

  function formatAnswers(incorrectAnswers, correctAnswer) {
    const answers = shuffleArray([
      ...decodeArray(incorrectAnswers),
      decode(correctAnswer),
    ]);
    return answers.map((answer) => ({ text: answer, isSelected: false, result: "default" }));
  }

  function selectQuestion(question, selectedAnswer) {
    const questionToUpdate = questions.find((q) => q.id === question.id);
    questionToUpdate.possibleAnswers = questionToUpdate.possibleAnswers.map(
      (answer) => {
        return {
          ...answer,
          isSelected: answer.text === selectedAnswer.text,
        };
      }
    );
    setQuestions(questions.map(q => q.id === question.id ? questionToUpdate : q))
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      correctAnswer={question.correct_answer}
      possibleAnswers={question.possibleAnswers}
      selectQuestion={selectQuestion}
    />
  ));

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

  return (
    <main>
      {questions.length === 0 && <Intro getQuestions={getQuestions} />}
      {questions.length > 0 && (
        <div className="question-form-container">
          {questionElements}
          <button className="check-answers">Check Answers</button>
        </div>
      )}
    </main>
  );
}
