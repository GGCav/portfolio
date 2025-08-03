const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🧪 Testing Without Threshold...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function testNoThreshold() {
  try {
    console.log('🔍 Creating test embedding...');
    const testEmbedding = await embeddings.embedQuery("Python programming");
    console.log(`✅ Created embedding with ${testEmbedding.length} dimensions`);

    // Test with NO threshold (0.0) to see all results
    console.log('\n🔧 Testing with NO threshold...');
    const { data: allResults, error: allError } = await supabase.rpc('match_documents', {
      query_embedding: testEmbedding,
      match_threshold: 0.0, // No threshold - get everything
      match_count: 10
    });

    if (allError) {
      console.error('❌ Error:', allError);
      return;
    }

    console.log(`✅ Found ${allResults.length} results with no threshold`);
    
    if (allResults.length > 0) {
      console.log('📋 All results (sorted by similarity):');
      allResults.forEach((result, index) => {
        console.log(`${index + 1}. ID: ${result.id}`);
        console.log(`   Similarity: ${result.similarity.toFixed(4)}`);
        console.log(`   Content: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️  No results even with no threshold - this suggests a deeper issue');
    }

    // Test with very low threshold
    console.log('\n🔧 Testing with very low threshold (0.01)...');
    const { data: lowResults, error: lowError } = await supabase.rpc('match_documents', {
      query_embedding: testEmbedding,
      match_threshold: 0.01, // Very low threshold
      match_count: 10
    });

    if (lowError) {
      console.error('❌ Low threshold error:', lowError);
    } else {
      console.log(`✅ Found ${lowResults.length} results with 0.01 threshold`);
      if (lowResults.length > 0) {
        console.log('📋 Low threshold results:');
        lowResults.forEach((result, index) => {
          console.log(`${index + 1}. ID: ${result.id}, Similarity: ${result.similarity.toFixed(4)}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testNoThreshold(); 