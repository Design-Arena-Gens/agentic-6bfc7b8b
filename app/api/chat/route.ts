import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Enhanced system prompt for an AI calling agent
    const systemPrompt: Message = {
      role: 'system',
      content: `You are a helpful AI calling agent. Your purpose is to:
1. Ask relevant questions to gather information from users
2. Listen carefully to user responses
3. Provide helpful, conversational answers
4. Remember context from the conversation
5. Be polite, friendly, and professional

When asking for information, be specific and clear. When receiving information, acknowledge it and use it appropriately in the conversation. Keep responses concise and natural for voice interaction.`
    }

    // Simple AI response logic (can be enhanced with OpenAI API)
    const conversationMessages: Message[] = [systemPrompt, ...messages]
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

    // Basic conversation logic
    let responseText = ''

    // Information gathering responses
    if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi')) {
      responseText = "Hello! I'm your AI calling agent. How can I help you today? I can answer questions, gather information, or just have a conversation with you."
    } else if (lastUserMessage.includes('name')) {
      if (lastUserMessage.includes('my name') || lastUserMessage.includes("i'm") || lastUserMessage.includes('i am')) {
        responseText = "Nice to meet you! I'll remember that. How can I assist you today?"
      } else {
        responseText = "I'm an AI calling agent, here to help you. May I ask your name?"
      }
    } else if (lastUserMessage.includes('help')) {
      responseText = "I'm here to help! I can answer questions, gather information about various topics, or assist with scheduling. What would you like to know?"
    } else if (lastUserMessage.includes('weather')) {
      responseText = "I'd be happy to help with weather information. What location are you interested in?"
    } else if (lastUserMessage.includes('time') || lastUserMessage.includes('date')) {
      const now = new Date()
      responseText = `The current time is ${now.toLocaleTimeString()} and today's date is ${now.toLocaleDateString()}.`
    } else if (lastUserMessage.includes('schedule') || lastUserMessage.includes('appointment')) {
      responseText = "I can help you with scheduling. What date and time would work best for you?"
    } else if (lastUserMessage.includes('thank')) {
      responseText = "You're welcome! Is there anything else I can help you with?"
    } else if (lastUserMessage.includes('bye') || lastUserMessage.includes('goodbye')) {
      responseText = "Goodbye! Feel free to reach out anytime you need assistance. Have a great day!"
    } else if (lastUserMessage.includes('email') || lastUserMessage.includes('phone') || lastUserMessage.includes('address')) {
      responseText = "Thank you for sharing that information. I've noted it. Is there anything else you'd like to tell me?"
    } else {
      // Generic helpful response
      responseText = "I understand. Could you tell me more about that? I'm here to listen and help with any information you need."
    }

    return NextResponse.json({
      message: responseText,
      status: 'success'
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
