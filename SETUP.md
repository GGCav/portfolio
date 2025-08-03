# Portfolio AI Assistant Setup Guide

## 🚀 Secure Server-Centric RAG Architecture (FREE!)

This portfolio now uses a **professional-grade, secure RAG system** that's **completely free** with:
- **Next.js** for server-side processing
- **Supabase** with vector database for semantic search
- **Google text-embedding-004** for free semantic understanding
- **Google Gemini** for AI responses
- **Complete security** - no API keys exposed to client
- **Zero cost** - uses Google's generous free tier

## 📋 Prerequisites (Simplified!)

1. **Node.js** (v18 or higher)
2. **Supabase Account** (free tier available)
3. **Google AI API Key** (free tier - 60 requests/minute)

**That's it! No OpenAI key needed! 🎉**

## 🔧 Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Vector Database

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier)
3. Note your **Project URL** and **Service Role Key**

#### B. Create Database Table
Run this SQL in your Supabase SQL Editor:

```sql
-- Drop existing table and function if they exist
DROP TABLE IF EXISTS knowledge_chunks CASCADE;
DROP FUNCTION IF EXISTS match_documents(vector, double precision, integer);
DROP FUNCTION IF EXISTS match_documents(jsonb, integer, vector);

-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge chunks table with CORRECT dimensions for Google embeddings
CREATE TABLE knowledge_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB, -- Required by LangChain
  embedding vector(768) NOT NULL -- Google text-embedding-004 uses 768 dimensions
);

-- Create the similarity search function that LangChain expects
CREATE OR REPLACE FUNCTION match_documents(
  filter jsonb DEFAULT '{}'::jsonb,
  match_count int DEFAULT 5,
  query_embedding vector(768) DEFAULT NULL
)
RETURNS TABLE (
  id int,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_chunks.id,
    knowledge_chunks.content,
    knowledge_chunks.metadata,
    1 - (knowledge_chunks.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks
  WHERE 1 - (knowledge_chunks.embedding <=> query_embedding) > 0.1
  ORDER BY knowledge_chunks.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create index for fast similarity search
CREATE INDEX ON knowledge_chunks USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### 3. Configure Environment Variables (Simplified!)

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google AI Configuration (for embeddings AND responses - same key!)
GOOGLE_API_KEY=your_google_ai_api_key
```

**That's it! Only 3 environment variables needed! 🎯**

### 4. Ingest Knowledge Base

Run the ingestion script to populate your vector database:

```bash
npm run ingest
```

This will:
- Process all 29 knowledge chunks
- Create embeddings using **Google's free text-embedding-004 model**
- Store them in Supabase with vector search capabilities
- Show progress with detailed logging
- **Cost: $0** - completely free! 🆓

### 5. Start the Development Server

```bash
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## 🔍 How It Works

### **Secure Architecture**
- **Client**: Only sends user queries to server
- **Server**: Handles all AI processing securely
- **Database**: Stores embeddings and performs vector search
- **No API Keys**: Exposed to client-side code

### **True Semantic Search (FREE!)**
1. **Query Processing**: User question → Google text-embedding-004
2. **Vector Search**: Find similar chunks in database
3. **Context Retrieval**: Get most relevant information
4. **AI Generation**: Google Gemini creates response
5. **Response**: Return personalized answer

### **Performance Benefits**
- **Instant Search**: Vector database with indexes
- **Accurate Results**: True semantic understanding
- **Scalable**: Handles thousands of queries
- **Secure**: All processing on server
- **Free**: Uses Google's generous free tier

## 🎯 AI Assistant Features

### **AI Mode** (Default)
- **Advanced semantic search** using Google embeddings
- **Persona-driven responses** from Google Gemini
- **Comprehensive knowledge** from all 29 chunks
- **Context-aware** understanding
- **Completely free** to use! 🆓

### **Fallback Mode**
- **Instant responses** with keyword matching
- **No API calls** - works offline
- **Basic but reliable** answers
- **Toggle available** in chat interface

## 💰 Cost Breakdown

### **Google AI Free Tier**
- **text-embedding-004**: 60 requests/minute (more than enough!)
- **Gemini 1.5 Flash**: 15 requests/minute
- **Total Cost**: $0 for personal use! 🆓

### **Supabase Free Tier**
- **Database**: 500MB storage
- **Vector Search**: Unlimited queries
- **Total Cost**: $0! 🆓

### **Total Monthly Cost**: $0 🎉

## 🔧 Troubleshooting

### **Common Issues**

#### 1. "API Key not configured"
- Check your `.env.local` file
- Ensure `GOOGLE_API_KEY` is set correctly
- Restart the development server

#### 2. "Vector database error"
- Verify Supabase connection
- Check if table exists with 768 dimensions and metadata column
- Ensure service role key has proper permissions

#### 3. "Rate limit exceeded"
- Google free tier: 60 requests/minute
- Wait a minute and try again
- Consider upgrading to paid tier if needed

#### 4. "Embedding creation failed"
- Verify Google AI API key
- Check API quota and billing
- Ensure network connectivity

### **Debug Mode**

Enable detailed logging by checking the browser console and server logs:

```bash
# Server logs will show:
# - Query processing
# - Google embedding creation
# - Vector search results
# - AI response generation
```

## 🔒 Security Notes

### **What's Secure**
- ✅ API keys stored on server only
- ✅ All AI processing on server
- ✅ Vector database on secure cloud
- ✅ No sensitive data in client code

### **What's Public**
- ✅ User queries (sent to server)
- ✅ AI responses (returned to client)
- ✅ UI components and styling

## 📊 Performance Considerations

### **Optimization Features**
- **LangChain Integration**: Professional vector store management
- **Batch Processing**: Efficient document ingestion
- **Rate Limiting**: Respects Google API limits
- **Caching**: Vector database provides fast retrieval
- **Indexing**: Optimized for similarity search

### **Scaling**
- **Horizontal**: Can handle multiple concurrent users
- **Vertical**: Server resources scale with demand
- **Database**: Supabase handles scaling automatically

## 🚀 Deployment

### **Vercel Deployment** (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**
- **Netlify**: Supports serverless functions
- **Railway**: Good for Node.js applications
- **Heroku**: Traditional hosting option

## 📈 Monitoring

### **What to Monitor**
- **API Usage**: Google AI quotas (60 req/min)
- **Database Performance**: Supabase metrics
- **Response Times**: User experience
- **Error Rates**: System reliability

### **Cost Optimization**
- **Free Tier**: More than sufficient for personal use
- **Rate Limiting**: Built-in protection
- **Usage Monitoring**: Track API usage
- **Upgrade Path**: Available if needed

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Ingestion completes without errors
- ✅ AI responses are detailed and accurate
- ✅ Fallback mode works for basic queries
- ✅ No API keys visible in browser
- ✅ Fast response times (< 2 seconds)
- ✅ **Total cost: $0** 🆓

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify Google AI API key
3. Review server logs for errors
4. Test with simple queries first
5. Ensure all dependencies are installed

## 🆓 Why This Approach is Better

### **Cost Benefits**
- ❌ **OpenAI**: $0.0001 per 1K tokens (embeddings)
- ✅ **Google**: Free tier (60 requests/minute)
- **Savings**: $100+ per year for personal use

### **Simplicity Benefits**
- ❌ **OpenAI**: Requires separate API key
- ✅ **Google**: Single API key for everything
- **Reduction**: 50% fewer environment variables

### **Quality Benefits**
- ✅ **Google text-embedding-004**: State-of-the-art model
- ✅ **768 dimensions**: Optimal for semantic search
- ✅ **LangChain integration**: Professional-grade

---

**🎯 Your portfolio now has a professional-grade, secure AI assistant that's completely FREE! 🆓** 