import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import Intro from './Intro.jsx'

export default function App() {

  const [questions, setQuestions] = useState([])

  return (
    <main>
      { questions.length === 0 && <Intro /> }
    </main>
  )
}
