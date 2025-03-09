'use client';

import Image from 'next/image';
import { Download, Heart } from 'lucide-react';
import { useState } from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface EmojiGridProps {
  emojis: { id: string; url: string }[];
  isGenerating?: boolean;
}

export function EmojiGrid({ emojis, isGenerating = false }: EmojiGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedEmojis, setLikedEmojis] = useState<Set<string>>(new Set());

  if (!Array.isArray(emojis) && !isGenerating) {
    console.error('Invalid emojis prop:', emojis);
    return null;
  }

  const validEmojis = emojis.filter(emoji => {
    if (!emoji || typeof emoji.id !== 'string' || typeof emoji.url !== 'string') {
      console.error('Invalid emoji object:', JSON.stringify(emoji, null, 2));
      return false;
    }
    return true;
  });

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'emoji.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading emoji:', error);
    }
  };

  const toggleLike = (id: string) => {
    setLikedEmojis(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (!validEmojis.length && !isGenerating) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Generated emojis will appear here
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isGenerating && (
        <div className="col-span-1">
          <LoadingSkeleton />
        </div>
      )}
      {validEmojis.map((emoji) => (
        <div 
          key={emoji.id}
          className="relative aspect-square rounded-lg overflow-hidden bg-muted transition-transform hover:scale-105"
          onMouseEnter={() => setHoveredId(emoji.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Image
            src={emoji.url}
            alt={`Generated emoji ${emoji.id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={false}
          />
          {hoveredId === emoji.id && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
              <button
                onClick={() => handleDownload(emoji.url)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                aria-label="Download emoji"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => toggleLike(emoji.id)}
                className={`p-2 rounded-full transition ${
                  likedEmojis.has(emoji.id) 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                aria-label="Like emoji"
              >
                <Heart 
                  className={`w-5 h-5 ${
                    likedEmojis.has(emoji.id) ? 'text-white fill-current' : 'text-white'
                  }`} 
                />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}