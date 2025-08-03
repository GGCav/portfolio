const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Checking Function Signature...\n');

// Initialize client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkFunction() {
  try {
    // Try different function signatures to see which one exists
    console.log('🧪 Testing different function signatures...\n');

    // Test 1: Original signature
    console.log('1. Testing: match_documents(filter, match_count, query_embedding)');
    try {
      const { data: result1, error: error1 } = await supabase.rpc('match_documents', {
        filter: {},
        match_count: 1,
        query_embedding: [0.1, 0.1, 0.1] // Short test vector
      });
      if (error1) {
        console.log('   ❌ Error:', error1.message);
      } else {
        console.log('   ✅ Works!');
      }
    } catch (e) {
      console.log('   ❌ Exception:', e.message);
    }

    // Test 2: New signature
    console.log('\n2. Testing: match_documents(query_embedding, match_threshold, match_count)');
    try {
      const { data: result2, error: error2 } = await supabase.rpc('match_documents', {
        query_embedding: [0.1, 0.1, 0.1], // Short test vector
        match_threshold: 0.1,
        match_count: 1
      });
      if (error2) {
        console.log('   ❌ Error:', error2.message);
      } else {
        console.log('   ✅ Works!');
      }
    } catch (e) {
      console.log('   ❌ Exception:', e.message);
    }

    // Test 3: Just query_embedding
    console.log('\n3. Testing: match_documents(query_embedding)');
    try {
      const { data: result3, error: error3 } = await supabase.rpc('match_documents', {
        query_embedding: [0.1, 0.1, 0.1] // Short test vector
      });
      if (error3) {
        console.log('   ❌ Error:', error3.message);
      } else {
        console.log('   ✅ Works!');
      }
    } catch (e) {
      console.log('   ❌ Exception:', e.message);
    }

  } catch (error) {
    console.error('❌ Check error:', error);
  }
}

checkFunction(); 