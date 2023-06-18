import './Question.css'

export default function Question(props) {
    const answerElements = props.possibleAnswers.map(answer => (
        <button className="question--answer-btn">{answer}</button>
    ));

    return (
        <section className="question-container">
            <h2 className="question--title">{props.question}</h2>
            <div className="question--choice-container">
                {answerElements}    
            </div>
            <hr />
        </section>
    )
}