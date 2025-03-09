export type ReplicateResponse = 
  | string[] 
  | { output: string | string[] }
  | { output: { [key: string]: any } };

export interface EmojiResponse {
  output: string;
  error?: string;
  details?: unknown;
}