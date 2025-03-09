import dotenv from 'dotenv';
import fetch from 'node-fetch';

async function validateEnvironment() {
  dotenv.config();

  console.log('Validating environment setup...');

  // Check REPLICATE_API_TOKEN
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN is missing');
    process.exit(1);
  }

  // Validate Replicate API Token
  try {
    const response = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error('❌ REPLICATE_API_TOKEN is invalid');
      process.exit(1);
    }

    console.log('✅ REPLICATE_API_TOKEN is valid');
  } catch (error) {
    console.error('❌ Failed to validate REPLICATE_API_TOKEN:', error);
    process.exit(1);
  }

  console.log('✅ Environment validation complete');
}

validateEnvironment().catch(console.error);