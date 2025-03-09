'use client';

import { useState } from 'react';
import { EmojiForm } from '@/components/ui/emoji-form';
import { EmojiGrid } from '@/components/ui/emoji-grid';

export default function Home() {
  const [emojis, setEmojis] = useState<{ id: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEmoji = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending request with prompt:', prompt);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.output) {
        throw new Error('No output URL in response');
      }

      const newEmoji = {
        id: Date.now().toString(),
        url: data.output
      };

      setEmojis(prev => [newEmoji, ...prev]);
      return newEmoji;

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate emoji';
      console.error('Generation failed:', message);
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Emoji Generator</h1>
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        <div className="flex justify-center">
          <EmojiForm onSubmit={handleGenerateEmoji} isLoading={isLoading} />
        </div>
        <EmojiGrid emojis={emojis} />
      </div>
    </div>
  );
}
