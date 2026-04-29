import { useState } from 'react'

function QuizForm({ setQuizData, setLoading }) {
  const [topic, setTopic] = useState('')
  const [jumlahSoal, setJumlahSoal] = useState(5)

  const handleSubmit = async () => {
    if (!topic.trim()) return alert('Topik tidak boleh kosong!')

    setLoading(true)
    setQuizData(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, jumlahSoal })
      })

      const data = await response.json()
      setQuizData(data.questions)
    } catch (error) {
      alert('Gagal generate soal, coba lagi!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="quiz-form gap-5 flex flex-col justify-center items-center">
      <div className='w-full h-auto gap-3 flex justify-center items-center'>
        <input className='w-80 py-2 pl-3 border-2 border-gray-600 focus:border-gray-100 rounded-md focus:shadow-md shadow-gray-100 text-white text-base transition-all' type="text" placeholder="Masukkan Topik..." value={topic} onChange={(e) => setTopic(e.target.value)}/>

        <select className='py-2 pr-30 pl-3 border-2 border-gray-600 focus:border-gray-100 rounded-md focus:shadow-md shadow-gray-100 text-white text-base transition-all' value={jumlahSoal} onChange={(e) => setJumlahSoal(e.target.value)}>
          <option className='text-gray-800' value={3}>3 Soal</option>
          <option className='text-gray-800' value={5}>5 Soal</option>
          <option className='text-gray-800' value={10}>10 Soal</option>
        </select>
      </div>

      <button className='py-2 px-4 rounded bg-blue-600 text-white' onClick={handleSubmit}>Generate Soal ✨</button>
    </div>
  )
}

export default QuizForm