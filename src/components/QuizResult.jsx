import { useState } from 'react'

function QuizResult({ quizData }) {
  const [jawaban, setJawaban] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handlePilih = (nomorSoal, pilihan) => {
    if (submitted) return
    setJawaban({ ...jawaban, [nomorSoal]: pilihan })
  }

  const handleSubmit = () => {
    if (Object.keys(jawaban).length < quizData.length) {
      return alert('Jawab semua soal dulu!')
    }
    setSubmitted(true)
  }

  const handleReset = () => {
    setJawaban({})
    setSubmitted(false)
  }

  const hitungSkor = () => {
    let benar = 0
    quizData.forEach((soal, i) => {
      if (jawaban[i] === soal.jawaban_benar) benar++
    })
    return benar
  }

  return (
    <div className="quiz-result w-full px-30 gap-6 flex flex-col justify-center items-start">
      {quizData.map((soal, i) => (
        <div key={i} className="soal-card w-full h-auto gap-2 flex flex-col justify-center items-start">
          <p className="nomor-soal py-2 px-4 rounded-md border-2 border-gray-600 text-gray-400 text-sm text-center">Soal {i + 1}</p>
          <p className="pertanyaan text-gray-100 text-left text-base">{soal.pertanyaan}</p>

          <div className="pilihan-container gap-4 flex justify-center items-center">
            {soal.pilihan.map((pilihan, j) => {
              let className = 'pilihan py-2 px-4 rounded-md text-gray-200 transition-all'

              if (submitted) {
                if (pilihan === soal.jawaban_benar) className += ' bg-green-500 text-white border-green-500'
                else if (pilihan === jawaban[i]) className += ' bg-red-500 text-white border-red-500'
                else className += ' bg-gray-600  border-gray-300'
              } else if (jawaban[i] === pilihan) {
                className += ' bg-blue-500 text-white border-blue-500'
              } else {
                className += ' bg-gray-600 border-gray-300 hover:bg-gray-800'
              }

              return (
                <button
                  key={j}
                  className={className} 
                  onClick={() => handlePilih(i, pilihan)}
                >
                  {pilihan}
                </button>
              )
            })}
          </div>

          {submitted && (
            <p className="penjelasan text-left">💡 {soal.penjelasan}</p>
          )}
        </div>
      ))}

      {!submitted ? (
        <div className='w-full flex justify-center items-center'>
          <button className="btn-submit py-2 px-4 rounded bg-blue-600 text-white" onClick={handleSubmit}>
            Kumpulkan Jawaban
          </button>
        </div>
      ) : (
        <div className="skor-container w-full flex flex-col justify-center items-center">
          <h2>Skor lo: {hitungSkor()} / {quizData.length} 🎉</h2>
          <button className="btn-reset py-2 px-4 rounded bg-blue-600 text-white" onClick={handleReset}>
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizResult