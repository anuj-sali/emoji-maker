


# AI Emoji Generator

Generate custom emojis using AI powered by Replicate's SDXL Emoji model. Built with Next.js, Tailwind CSS, and ShadcnUI.

![Emoji Generator Demo](public/emoji-demo.png)

## Features

- 🎨 Generate custom emojis from text descriptions
- 💾 Download generated emojis
- ❤️ Like and save favorite emojis
- 📱 Responsive grid layout
- ⚡ Real-time generation status updates
- 🎯 Error handling and loading states

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ShadcN UI](https://ui.shadcn.com/) - UI components
- [Clerk](https://clerk.com/) - Authentication
- [Replicate](https://replicate.com/) - AI model hosting
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Lucide Icons](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Replicate API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/emoji-maker.git
cd emoji-maker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
emoji-maker/
├── app/                   # Next.js app directory
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   └── ui/              # UI components
├── lib/                  # Utility functions
├── public/              # Static assets
└── types/               # TypeScript types
```

## Usage

1. Enter a text description of the emoji you want to generate
2. Click "Generate Emoji" and wait for the AI to create your emoji
3. Download or like generated emojis
4. View all your generated emojis in the grid below

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Replicate](https://replicate.com/) for hosting the SDXL Emoji model
- [ShadcN](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/emoji-maker](https://github.com/yourusername/emoji-maker)