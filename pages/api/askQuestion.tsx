// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '../../lib/queryApi'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin'
import sanitizeHtml from 'sanitize-html';


type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { prompt, chatId, model, session } = req.body
    if (!prompt) {
      res.status(400).json({ answer: 'Please provide a prompt' })
      return
    }
    if (!chatId) {
      res.status(400).json({ answer: 'Please provide a valid chat ID' })
      return
    }

    // sanitize prompt to avoid malicious code execution
    const sanitizedPrompt = sanitizeHtml(prompt, {
      allowedTags: [],
      allowedAttributes: {},
    })

    const response = await query(sanitizedPrompt, chatId, model)

    const message: Message = {
      text: response || 'chatGPT was unable to find an answer for that',
      createAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://links.papareact.com/2i6',
      },
    }

    await adminDb
      .collection('users')
      .doc(session?.user?.email)
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message)

    res.status(200).json({ answer: message.text })
  } catch (error) {
    console.error('Error occurred in askQuestion API:', error)
    res.status(500).json({ answer: 'Internal server error' })
  }
}
