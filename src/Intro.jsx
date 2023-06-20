/* eslint-disable react/prop-types */
import './Intro.css'

export default function Intro(props) {
  return (
    <div className="intro-container">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--description">Your engaging journey through trivia!</p>
      <button onClick={props.getQuestions} className="intro--btn">Start Quiz</button>
    </div>
  );
}
