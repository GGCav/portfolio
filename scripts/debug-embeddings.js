const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Debugging Embeddings in Database...\n');

// Initialize client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debugEmbeddings() {
  try {
    // Check if embeddings column exists and has data
    console.log('📊 Checking embeddings column...');
    const { data: embeddingData, error: embeddingError } = await supabase
      .from('knowledge_chunks')
      .select('id, embedding')
      .limit(3);

    if (embeddingError) {
      console.error('❌ Embedding query error:', embeddingError);
      return;
    }

    console.log(`✅ Found ${embeddingData.length} records with embeddings`);
    
    if (embeddingData.length > 0) {
      console.log('📝 Embedding samples:');
      embeddingData.forEach((record, index) => {
        console.log(`${index + 1}. ID: ${record.id}`);
        if (record.embedding) {
          console.log(`   Embedding type: ${typeof record.embedding}`);
          console.log(`   Embedding length: ${record.embedding.length}`);
          
          if (Array.isArray(record.embedding)) {
            console.log(`   First 5 values: [${record.embedding.slice(0, 5).join(', ')}...]`);
            console.log(`   Last 5 values: [...${record.embedding.slice(-5).join(', ')}]`);
          } else {
            console.log(`   Embedding value: ${record.embedding.substring(0, 100)}...`);
          }
        } else {
          console.log(`   ❌ No embedding found!`);
        }
        console.log('');
      });
    }

    // Test the function with a simple query
    console.log('🧪 Testing function with simple query...');
    const testVector = new Array(768).fill(0.1); // Simple test vector
    
    const { data: functionResults, error: functionError } = await supabase.rpc('match_documents', {
      filter: {},
      match_count: 3,
      query_embedding: testVector
    });

    if (functionError) {
      console.error('❌ Function error:', functionError);
      return;
    }

    console.log(`✅ Function returned ${functionResults.length} results`);
    
    if (functionResults.length > 0) {
      console.log('📋 Function results:');
      functionResults.forEach((result, index) => {
        console.log(`${index + 1}. ID: ${result.id}`);
        console.log(`   Similarity: ${result.similarity}`);
        console.log(`   Content preview: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️  Function returned no results - this indicates a problem with the function logic');
    }

    // Check the function definition
    console.log('🔧 Checking function definition...');
    const { data: functionDef, error: defError } = await supabase
      .from('pg_proc')
      .select('proname, prosrc')
      .eq('proname', 'match_documents');

    if (defError) {
      console.log('⚠️  Could not check function definition (this is normal for non-admin users)');
    } else {
      console.log('✅ Function definition found');
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugEmbeddings(); 