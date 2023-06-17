import './Question.css'

export default function Question() {
    return (
        <section className="question-container">
            <h2 className="question--title">How would one say goodbye in Spanish?</h2>
            <div className="question--choice-container">
                <button className="question--answer-btn">Adios</button>
                <button className="question--answer-btn">Hola</button>
                <button className="question--answer-btn">Au Revoir</button>
                <button className="question--answer-btn">Salir</button>
            </div>
            <hr />
        </section>
    )
}