import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { ReplicateResponse } from '@/app/types/api';

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

    if (!output) {
      throw new Error('No output received from prediction');
    }

    let outputUrl: string | null = null;

    if (Array.isArray(output) && output.length > 0) {
      outputUrl = output[0];
    } else if (typeof output === 'string') {
      outputUrl = output;
    }

    console.log('6. Extracted URL:', outputUrl);

    if (!outputUrl || typeof outputUrl !== 'string' || !outputUrl.startsWith('http')) {
      throw new Error('Failed to get valid image URL from response');
    }

    return NextResponse.json({ output: outputUrl });

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