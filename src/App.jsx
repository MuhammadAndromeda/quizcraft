import { useState } from 'react'
import QuizForm from './components/QuizForm'
import QuizResult from './components/QuizResult'
import './App.css'

function App() {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(false)

  return(
    <main className="app-container w-full h-max py-10 flex flex-col justify-start items-center">
      <header className='w-full h-auto mb-4 flex flex-col justify-center items-center'>
        <img 
          src="/logo.svg" 
          alt="QuizCraft AI Logo" 
          className="w-30 h-auto"
        />
        <p className='text-white text-7xl text-center font-bold capitalize leading-snug'>QuizCraft AI</p>
        <p className='text-gray-400 text-base text-center font-medium capitalize'>Ketik topik apapun, langsung dapat soal latihan!</p>
      </header>

      <div>
        <QuizForm setQuizData={setQuizData} setLoading={setLoading} />
        {loading && <p className="loading">⏳ Generating soal...</p>}
        {quizData && !loading && <QuizResult quizData={quizData} />}
      </div>
    </main>
  );
}

export default App
