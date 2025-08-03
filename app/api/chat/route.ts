import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

// Initialize clients securely on the server
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY!,
  model: "text-embedding-004", // Free Google embedding model
});

// Persona-driven prompt template
const createPersonaPrompt = (context: string, query: string) => `
You are not a generic AI assistant. You are Jinfeng He, and you are speaking directly to a visitor on your personal website.

Your personality should be: friendly, enthusiastic, clear, and slightly informal. You're passionate about technology, innovation, and making a positive impact through your work.

RULES:
1. **Always speak in the first person.** Use "I," "my," and "me." Never refer to Jinfeng in the third person.
2. **Base your answers strictly on the provided CONTEXT.** The context is your knowledge—it's what you "remember."
3. **If the answer is not in the context, you MUST NOT make one up.** Instead, say something friendly and honest like: "That's a great question! I haven't written down my thoughts on that yet, but I'm glad you asked." or "Good question! That specific detail isn't in my current knowledge base."
4. **Keep answers concise and to the point, but feel free to add a touch of personal flair.** Use emojis where appropriate. 😉
5. **Show enthusiasm for your work and projects.** You're genuinely excited about what you do.
6. **Be humble but confident.** You're proud of your achievements but always learning.
7. **Connect with the visitor.** Make them feel welcome and engaged.

Here is the relevant context from your memory to help you answer:
CONTEXT:
${context}

Now, answer the following question as Jinfeng He:
QUESTION:
${query}
`;

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('=== Server-Side RAG Processing ===');
    console.log('Query:', query);

    // 1. Create vector store instance
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "knowledge_chunks",
      queryName: "match_documents",
    });

    // 2. Retrieve relevant context using semantic search
    console.log('Performing semantic search...');
    const retriever = vectorStore.asRetriever({
      k: 10, // Increased from 5 to get more results
      searchType: "similarity",
    });

    const relevantDocs = await retriever.invoke(query);
    console.log('Found relevant documents:', relevantDocs.length);
    
    // Debug: Log the first few documents found
    if (relevantDocs.length > 0) {
      console.log('Top documents found:');
      relevantDocs.slice(0, 3).forEach((doc: any, index: number) => {
        console.log(`${index + 1}. Content preview: ${doc.pageContent.substring(0, 150)}...`);
        console.log(`   Metadata:`, doc.metadata);
      });
    }

    // 3. Prepare context from relevant chunks
    const context = relevantDocs
      .map((doc: any) => doc.pageContent)
      .join('\n\n') || '';

    if (!context) {
      return NextResponse.json({
        response: "That's a great question! I haven't written down my thoughts on that specific topic yet, but I'm glad you asked. I can tell you about my work experience, research projects, technical skills, education, personal background, interests, or contact information. What would you like to know? 😊"
      });
    }

    // 4. Create persona-driven prompt
    const personaPrompt = createPersonaPrompt(context, query);

    // 5. Generate response using Google Gemini
    console.log('Generating AI response...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(personaPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('AI response generated successfully');

    return NextResponse.json({
      response: text,
      context: relevantDocs.map((doc: any) => ({
        content: doc.pageContent.substring(0, 100) + '...',
        metadata: doc.metadata
      }))
    });

  } catch (error) {
    console.error('API route error:', error);
    
    // Provide helpful error messages based on the type of error
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error. Please try again later.' },
          { status: 500 }
        );
      }
      if (error.message.includes('embedding')) {
        return NextResponse.json(
          { error: 'Search service temporarily unavailable. Please try again.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
} 