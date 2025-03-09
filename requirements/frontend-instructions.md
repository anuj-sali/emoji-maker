

# Project Overview
Use this guide to build a web app where users can give a text prompt to generate an emoji using model hosted on 
Replicate.


# Feature Requirements
- We will use Next.js, ShadCN, Lucid, Supabase, Clerk, Tailwind CSS.
- Create a form where users can enter a text prompt and click a button that calls the Replicate model to generate an emoji.
- Have a nice UI & animations when the emoji is blank or generating
- Display all the images over generated in grid structure.
- When user hovers over each emoji image, an icon button for download and an icon button for like should be shown up. 


# Relevant Documentation
## Set the REPLICATE_API_TOKEN environment variable

```bash
export REPLICATE_API_TOKEN=<paste-your-token-here>
```

[Learn more about authentication](https://replicate.com/docs/get-started/authentication)

## Install Replicate's Node.js client library

```bash
npm install replicate
```

[Learn more about setup](https://replicate.com/docs/get-started/nodejs)

## Run fofr/sdxl-emoji using Replicate's API

Check out the [model's schema](https://replicate.com/fofr/sdxl-emoji/api) for an overview of inputs and outputs.

```javascript
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });

import { writeFile } from "node:fs/promises";
for (const [index, item] of Object.entries(output)) {
  await writeFile(`output_${index}.png`, item);
}
//=> output_0.png written to disk
```

# Current File Structure:
## Please refer below file structure:
📦 emoji-maker
 ┣ 📂 app
 ┃ ┣ 📜 globals.css
 ┃ ┣ 📜 layout.tsx
 ┃ ┗ 📜 page.tsx
 ┣ 📂 components
 ┃ ┣ 📂 ui
 ┃ ┗ 📂 hooks
 ┣ 📂 lib
 ┃ ┗ 📜 utils.ts
 ┣ 📂 public
 ┃ ┣ 📜 file.svg
 ┃ ┣ 📜 next.svg
 ┃ ┣ 📜 window.svg
 ┃ ┗ 📜 vercel.svg
 ┣ 📂 requirements
 ┃ ┗ 📜 frontend-instructions.md
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 components.json
 ┣ 📜 eslint.config.mjs
 ┣ 📜 next.config.js
 ┣ 📜 package.json
 ┣ 📜 package-lock.json
 ┣ 📜 README.md
 ┣ 📜 tailwind.config.ts
 ┗ 📜 tsconfig.json

# Rules
- All new components should go in /components and be named like example component TSX unless otherwise specified. 
- All new pages should go in /app. 

