import { useState } from 'react';

export interface Emoji {
  id: string;
  url: string;
  liked?: boolean;
}

export function useEmojiGenerator() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmoji = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      // Better error handling
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.output) {
        throw new Error('Invalid response format');
      }

      const newEmoji: Emoji = {
        id: Date.now().toString(),
        url: data.output,
        liked: false
      };

      setEmojis(prev => [newEmoji, ...prev]);
      return newEmoji;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Generation failed';
      console.error('Emoji generation error:', error);
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = (id: string) => {
    setEmojis(prev => prev.map(emoji => 
      emoji.id === id ? { ...emoji, liked: !emoji.liked } : emoji
    ));
  };

  const downloadEmoji = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'emoji.png';
      link.click();
      
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      setError('Download failed');
    }
  };

  return {
    emojis,
    isLoading,
    error,
    generateEmoji,
    toggleLike,
    downloadEmoji
  };
}