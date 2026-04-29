export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, jumlahSoal } = req.body

  if (!topic) {
    return res.status(400).json({ error: 'Topik tidak boleh kosong' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `Buatkan ${jumlahSoal} soal pilihan ganda tentang "${topic}".

              Balas HANYA dengan JSON array murni, tanpa teks lain, tanpa backtick, tanpa markdown, langsung mulai dengan karakter "[" seperti ini:
              [
                {
                  "pertanyaan": "...",
                  "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
                  "jawaban_benar": "A. ...",
                  "penjelasan": "..."
                }
              ]`
          }
        ],
        temperature: 0.7
      })
    })

    const aiData = await response.json()
    console.log('Response Groq:', JSON.stringify(aiData, null, 2))

    const rawText = aiData.choices[0].message.content
    const cleaned = rawText.replace(/```json|```/g, '').trim()
    const questions = JSON.parse(cleaned)

    return res.status(200).json({ questions })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Gagal generate soal' })
  }
}