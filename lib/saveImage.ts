import fs from 'fs';
import path from 'path';

export async function saveImage(
  imageUrl: string,
  prompt: string,
  outputDirName: string = 'outputs'
): Promise<string> {
  try {
    // Create absolute path for outputs directory
    const outputDir = path.join(process.cwd(), outputDirName);
    console.log('Output directory:', outputDir);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('Created output directory');
    }

    // Validate URL
    if (typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      throw new Error('Invalid image URL format');
    }

    // Fetch image with proper headers
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename
    const sanitizedPrompt = prompt
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
      .substring(0, 50);
    const timestamp = Date.now();
    const outputFileName = `emoji_${sanitizedPrompt}_${timestamp}.png`;
    const outputPath = path.join(outputDir, outputFileName);

    // Write file
    fs.writeFileSync(outputPath, buffer);
    console.log(`Image saved successfully to: ${outputPath}`);

    // Verify file exists
    if (!fs.existsSync(outputPath)) {
      throw new Error('File was not saved successfully');
    }

    const stats = fs.statSync(outputPath);
    console.log(`File size: ${stats.size} bytes`);

    return outputPath;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}