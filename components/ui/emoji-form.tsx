'use client';

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Loader2 } from 'lucide-react';

export function EmojiForm({ onSubmit }: { onSubmit: (prompt: string) => Promise<void> }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(prompt);
      setPrompt(''); // Clear input on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate emoji');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        placeholder="Describe your emoji..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <Button type="submit" disabled={isLoading || !prompt.trim()}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Emoji'
        )}
      </Button>
    </form>
  );
}