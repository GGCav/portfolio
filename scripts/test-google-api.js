const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🧪 Testing Google AI API Key...\n');

// Check if API key exists
if (!process.env.GOOGLE_API_KEY) {
  console.log('❌ GOOGLE_API_KEY not found in .env.local');
  process.exit(1);
}

console.log(`🔑 API Key found: ${process.env.GOOGLE_API_KEY.substring(0, 10)}...`);
console.log(`📏 Key length: ${process.env.GOOGLE_API_KEY.length} characters`);

// Check if it's a placeholder
if (process.env.GOOGLE_API_KEY.includes('your_') || process.env.GOOGLE_API_KEY.length < 30) {
  console.log('\n⚠️  This appears to be a placeholder API key, not a real Google API key.');
  console.log('Real Google API keys:');
  console.log('- Start with "AIza"');
  console.log('- Are typically 39 characters long');
  console.log('- Don\'t contain placeholder text like "your_"');
  console.log('\nPlease get a real API key from https://aistudio.google.com/');
  process.exit(1);
}

// Test with Google Generative AI
async function testGoogleAPI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const modelName = process.env.GOOGLE_GENAI_MODEL || 'gemini-1.5-flash-001';
    
    // Test 1: Test text generation
    console.log('\n🤖 Testing text generation...');
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Hello, this is a test.');
    const response = await result.response;
    console.log('✅ Text generation successful');
    console.log(`📝 Response: ${response.text()}`);
    
    // Test 2: Test embeddings (this is what we need)
    console.log('\n🔍 Testing embeddings...');
    const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
    });
    
    const testEmbedding = await embeddings.embedQuery("Test text for embeddings");
    console.log('✅ Embeddings successful');
    console.log(`📏 Embedding dimensions: ${testEmbedding.length}`);
    console.log(`🔢 Sample values: [${testEmbedding.slice(0, 3).join(', ')}...]`);
    
    console.log('\n🎉 All tests passed! Your Google AI API key is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Error testing Google AI API:');
    console.error('Error:', error.message);
    
    if (error.message.includes('API key not valid')) {
      console.error('\n🔍 This means your API key is invalid or expired.');
      console.error('Please:');
      console.error('1. Go to https://aistudio.google.com/');
      console.error('2. Create a new API key');
      console.error('3. Update your .env.local file');
    } else if (error.message.includes('quota')) {
      console.error('\n🔍 This means you\'ve exceeded your API quota.');
      console.error('Please check your Google AI Studio usage.');
    } else {
      console.error('\n🔍 Unknown error. Please check your internet connection and try again.');
    }
  }
}

testGoogleAPI(); 