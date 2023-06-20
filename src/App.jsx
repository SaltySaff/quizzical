import { useState } from "react";
import "./App.css";
import Intro from "./Intro.jsx";
import Question from "./Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
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
    return answers.map((answer) => ({
      text: answer,
      isSelected: false,
      isCorrect: answer === correctAnswer ? true : false,
    }));
  }

  function selectAnswer(question, selectedAnswer) {
    const questionToUpdate = questions.find((q) => q.id === question.id);
    questionToUpdate.possibleAnswers = questionToUpdate.possibleAnswers.map(
      (answer) => {
        return {
          ...answer,
          isSelected: answer.text === selectedAnswer.text,
        };
      }
    );
    setQuestions(
      questions.map((q) => (q.id === question.id ? questionToUpdate : q))
    );
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      correctAnswer={question.correct_answer}
      possibleAnswers={question.possibleAnswers}
      selectAnswer={selectAnswer}
      gameFinished={gameFinished}
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

  function checkQuestions() {
    setGameFinished(true);
  }

  function calculateCorrectAnswers() {
    let counter = 0
    questions.forEach(question => {
      question.possibleAnswers.forEach(answer => {
        if (answer.isSelected && answer.isCorrect) {
          counter += 1
        }
      })
    })
    return counter
  }

  function playAgain() {
    setQuestions([])
    setGameFinished(false)
  }

  return (
    <main>
      {questions.length === 0 && <Intro getQuestions={getQuestions} />}
      {questions.length > 0 && (
        <div className="question-form-container">
          {questionElements}
          {!gameFinished && (
            <button
              onClick={() => checkQuestions(questions)}
              className="check-answers"
            >
              Check Answers
            </button>
          )}
          {gameFinished && (
            <div className="correct-answers-container">
              <h4 className="correct-answers--text">
                You scored {calculateCorrectAnswers()}/4 correct answers.
              </h4>
              <button
                onClick={playAgain}
                className="check-answers correct-answers--btn"
              >
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
