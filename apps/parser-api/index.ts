import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express()
app.use(cors())
app.use(express.json())

interface ParseRequestBody {
    story: string
}

app.get('/', async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ message: 'yup' });
});

app.post('/parse', async (req: Request, res: Response): Promise<any> => {
    const { story } = req.body
    if (!story) {
        return res.status(400).json({ message: 'Missing story text' })
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI that breaks down stories into interactive text-based adventure scenes.',
                },
                {
                    role: 'user',
                    content: `Here is the story:\n\n${story}`,
                },
            ],
        })

        const reply = completion.choices[0].message?.content || ''
        res.json({ message: 'Parsed', content: reply })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({ message: 'Failed to parse story', error: err.message })
    }
});


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Parser API running on port ${port}`))
