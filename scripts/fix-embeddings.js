const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔧 Fixing Embeddings...\n');

// Initialize client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixEmbeddings() {
  try {
    // 1. Get all records with string embeddings
    console.log('📊 Getting all records...');
    const { data: allRecords, error: fetchError } = await supabase
      .from('knowledge_chunks')
      .select('id, content, embedding');

    if (fetchError) {
      console.error('❌ Fetch error:', fetchError);
      return;
    }

    console.log(`✅ Found ${allRecords.length} records`);

    // 2. Process each record
    console.log('🔧 Converting string embeddings to vectors...');
    let processed = 0;
    let errors = 0;

    for (const record of allRecords) {
      try {
        if (typeof record.embedding === 'string') {
          // Convert string to array and then to proper vector format
          const embeddingArray = JSON.parse(record.embedding);
          
          // Update the record with the proper vector
          const { error: updateError } = await supabase
            .from('knowledge_chunks')
            .update({ 
              embedding: `[${embeddingArray.join(',')}]` // Proper PostgreSQL vector format
            })
            .eq('id', record.id);

          if (updateError) {
            console.error(`❌ Error updating record ${record.id}:`, updateError);
            errors++;
          } else {
            processed++;
            if (processed % 5 === 0) {
              console.log(`✅ Processed ${processed}/${allRecords.length} records...`);
            }
          }
        }
      } catch (parseError) {
        console.error(`❌ Error parsing embedding for record ${record.id}:`, parseError);
        errors++;
      }
    }

    console.log(`\n🎉 Processing complete!`);
    console.log(`✅ Successfully processed: ${processed} records`);
    console.log(`❌ Errors: ${errors} records`);

    // 3. Test the fix
    console.log('\n🧪 Testing the fix...');
    const { data: testResults, error: testError } = await supabase
      .from('knowledge_chunks')
      .select('id, embedding')
      .limit(2);

    if (testError) {
      console.error('❌ Test error:', testError);
    } else {
      console.log('📋 Test results:');
      testResults.forEach((result, index) => {
        console.log(`${index + 1}. ID: ${result.id}`);
        console.log(`   Embedding type: ${typeof result.embedding}`);
        console.log(`   Embedding length: ${result.embedding ? result.embedding.length : 'null'}`);
        if (result.embedding && Array.isArray(result.embedding)) {
          console.log(`   Embedding array length: ${result.embedding.length}`);
          console.log(`   First 5 values: [${result.embedding.slice(0, 5).join(', ')}...]`);
        }
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Fix error:', error);
  }
}

fixEmbeddings(); 