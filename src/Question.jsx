/* eslint-disable react/prop-types */
import "./Question.css";
import { nanoid } from "nanoid";

export default function Question(props) {
  const answerElements = props.possibleAnswers.map((answer) => {
    const styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "transparent",
      border: answer.isSelected ? "none" : "0.794239px solid #4D5B9E",
    };
    return (
      <button
        key={nanoid()}
        onClick={() => props.selectQuestion(props.question, answer)}
        className="question--answer-btn"
        style={styles}
      >
        {answer.text}
      </button>
    );
  });

  return (
    <section className="question-container">
      <h2 className="question--title">{props.question.question}</h2>
      <div className="question--choice-container">{answerElements}</div>
      <hr />
    </section>
  );
}
