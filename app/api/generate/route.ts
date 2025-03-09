import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { ReplicateResponse } from '@/app/types/api';
import { saveImage } from '@/lib/saveImage';

export async function POST(request: Request) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'REPLICATE_API_TOKEN is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('1. Starting prediction with prompt:', prompt);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // First, let's create the prediction
    const prediction = await replicate.predictions.create({
      version: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      input: {
        prompt: prompt.trim(),
        apply_watermark: false
      }
    });

    console.log('2. Initial prediction response:', JSON.stringify(prediction, null, 2));

    // Wait for the prediction to complete
    let finalPrediction = await replicate.wait(prediction);
    
    console.log('3. Final prediction state:', finalPrediction.status);
    console.log('4. Final prediction data:', JSON.stringify(finalPrediction, null, 2));

    if (finalPrediction.status !== 'succeeded') {
      throw new Error(`Prediction failed with status: ${finalPrediction.status}`);
    }

    const output = finalPrediction.output;
    console.log('5. Output data:', JSON.stringify(output, null, 2));

    const str1: string = Array.isArray(output) ? output[0] : output;
    if (typeof str1 !== 'string' || !str1.startsWith('http')) {
      throw new Error('Invalid output format from prediction');
    }

    // Save the image and get the local path
    const savedImagePath = await saveImage(str1, prompt);
    console.log('Image saved to:', savedImagePath);

    // Still return the original URL for the frontend
    return NextResponse.json({ 
      output: str1,
      localPath: savedImagePath 
    });

  } catch (error) {
    console.error('API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    });

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error
      },
      { status: 500 }
    );
  }
}