const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Debugging Vector Format...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function debugVectorFormat() {
  try {
    // 1. Check raw database content
    console.log('📊 Checking raw database content...');
    const { data: rawData, error: rawError } = await supabase
      .from('knowledge_chunks')
      .select('id, content, embedding')
      .limit(2);

    if (rawError) {
      console.error('❌ Raw data error:', rawError);
      return;
    }

    console.log(`✅ Found ${rawData.length} records`);
    
    if (rawData.length > 0) {
      console.log('📝 Raw data:');
      rawData.forEach((record, index) => {
        console.log(`${index + 1}. ID: ${record.id}`);
        console.log(`   Content: ${record.content.substring(0, 50)}...`);
        console.log(`   Embedding type: ${typeof record.embedding}`);
        console.log(`   Embedding length: ${record.embedding ? record.embedding.length : 'null'}`);
        if (record.embedding && typeof record.embedding === 'string') {
          console.log(`   Embedding start: ${record.embedding.substring(0, 50)}...`);
          console.log(`   Embedding end: ...${record.embedding.substring(record.embedding.length - 20)}`);
        }
        console.log('');
      });
    }

    // 2. Test basic vector operations
    console.log('🧪 Testing basic vector operations...');
    const testEmbedding = await embeddings.embedQuery("test");
    console.log(`✅ Created test embedding with ${testEmbedding.length} dimensions`);
    console.log(`📏 Sample values: [${testEmbedding.slice(0, 5).join(', ')}...]`);

    // 3. Test a simple SQL query to see if vectors work at all
    console.log('\n🔧 Testing simple vector query...');
    const { data: simpleResults, error: simpleError } = await supabase
      .from('knowledge_chunks')
      .select('id, content')
      .limit(1);

    if (simpleError) {
      console.error('❌ Simple query error:', simpleError);
    } else {
      console.log(`✅ Simple query returned ${simpleResults.length} results`);
      if (simpleResults.length > 0) {
        console.log(`📋 First record ID: ${simpleResults[0].id}`);
      }
    }

    // 4. Test vector casting
    console.log('\n🔧 Testing vector casting...');
    const { data: castResults, error: castError } = await supabase
      .rpc('match_documents', {
        query_embedding: testEmbedding,
        match_threshold: 0.0,
        match_count: 1
      });

    if (castError) {
      console.error('❌ Cast error:', castError);
    } else {
      console.log(`✅ Cast query returned ${castResults.length} results`);
      if (castResults.length > 0) {
        console.log(`📋 First result similarity: ${castResults[0].similarity}`);
      }
    }

    // 5. Check if embeddings are actually vectors
    console.log('\n🔧 Checking if embeddings are proper vectors...');
    const { data: vectorCheck, error: vectorError } = await supabase
      .from('knowledge_chunks')
      .select('embedding::text')
      .limit(1);

    if (vectorError) {
      console.error('❌ Vector check error:', vectorError);
    } else {
      console.log(`✅ Vector check returned ${vectorCheck.length} results`);
      if (vectorCheck.length > 0) {
        console.log(`📋 Vector as text: ${vectorCheck[0].embedding.substring(0, 100)}...`);
      }
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugVectorFormat(); 