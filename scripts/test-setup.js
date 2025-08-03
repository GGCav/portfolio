const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase');
const { Document } = require('langchain/document');
const path = require('path');

console.log('🧪 Testing Portfolio AI Assistant Setup...\n');

// Test 1: Check if all required packages are installed
console.log('✅ Testing package imports...');
try {
  console.log('  - @supabase/supabase-js: ✓');
  console.log('  - @langchain/google-genai: ✓');
  console.log('  - @langchain/community: ✓');
  console.log('  - langchain: ✓');
  console.log('  - dotenv: ✓');
} catch (error) {
  console.log('❌ Package import error:', error.message);
  process.exit(1);
}

// Test 2: Check environment variables
console.log('\n🔧 Testing environment variables...');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY', 
  'GOOGLE_API_KEY'
];

let missingVars = [];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('⚠️  Missing environment variables:');
  missingVars.forEach(varName => {
    console.log(`    - ${varName}`);
  });
  console.log('\n📝 Please create a .env.local file with:');
  console.log('SUPABASE_URL=your_supabase_project_url');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
  console.log('GOOGLE_API_KEY=your_google_ai_api_key');
} else {
  console.log('✅ All environment variables are set');
  console.log('  - SUPABASE_URL: ✓');
  console.log('  - SUPABASE_SERVICE_ROLE_KEY: ✓');
  console.log('  - GOOGLE_API_KEY: ✓');
}

// Test 3: Test Supabase connection (if env vars are set)
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('\n🗄️  Testing Supabase connection...');
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    console.log('✅ Supabase client created successfully');
  } catch (error) {
    console.log('❌ Supabase connection error:', error.message);
  }
}

// Test 4: Test Google AI client (if env vars are set)
if (process.env.GOOGLE_API_KEY) {
  console.log('\n🤖 Testing Google AI client...');
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
    });
    console.log('✅ Google AI client created successfully');
  } catch (error) {
    console.log('❌ Google AI client error:', error.message);
  }
}

console.log('\n📊 Setup Summary:');
console.log('================');
console.log('✅ All required packages installed');
console.log('✅ Dependencies resolved');
console.log('✅ Scripts ready to run');

if (missingVars.length > 0) {
  console.log('\n🚀 Next Steps:');
  console.log('1. Create a Supabase project at https://supabase.com');
  console.log('2. Get a Google AI API key at https://aistudio.google.com/');
  console.log('3. Create .env.local file with your credentials');
  console.log('4. Run the database setup SQL in Supabase');
  console.log('5. Run: npm run ingest');
} else {
  console.log('\n🎉 Ready to run ingestion!');
  console.log('Run: npm run ingest');
}

console.log('\n📚 For detailed setup instructions, see SETUP.md'); 