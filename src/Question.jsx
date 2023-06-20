/* eslint-disable react/prop-types */
import "./Question.css";
import { nanoid } from "nanoid";

export default function Question(props) {
  const answerElements = props.possibleAnswers.map((answer) => {
    const styles = {
      backgroundColor: decideBackgroundColor(),
      border: decideBorder(),
      opacity: props.gameFinished ? (answer.isCorrect ? "1" : "0.5") : "1",
    };

    function decideBackgroundColor() {
      if (props.gameFinished) {
        if (answer.isCorrect) {
          return "#94D7A2";
        } else if (answer.isSelected) {
          return "#F8BCBC";
        } else {
          return "transparent";
        }
      } else {
        return answer.isSelected ? "#D6DBF5" : "transparent";
      }
    }

    function decideBorder() {
      if (props.gameFinished) {
        return answer.isCorrect || (!answer.isCorrect && answer.isSelected)
          ? "none"
          : "0.794239px solid #4D5B9E";
      } else {
        return answer.isSelected ? "none" : "0.794239px solid #4D5B9E";
      }
    }

    return (
      <button
        key={nanoid()}
        onClick={
          props.gameFinished
            ? null
            : () => props.selectAnswer(props.question, answer)
        }
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
