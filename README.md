# N8N AI Workflow Builder 🚀

An AI-powered interface to create, configure, and execute N8N workflows using natural language.

## Features

✄ **AI-Powered Workflow Generation** - Describe what you want in plain English  
🔤 **N8N Integration** - Direct API connection to your N8N instance  
⚡ **Real-time Execution** - Create and run workflows instantly  
🎨 **Modern UI** - Clean, intuitive interface built with Next.js  
📊 **Workflow Management** - List, view, and manage all your workflows  

## Quick Start

### Prerequisites

- Node.js 18+ installed
- N8N instance (cloud or self-hosted)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/W3JDev/n8n-ai-workflow-builder.git
cd n8n-ai-workflow-builder

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your keys
```

### Environment Variables

```env
N8N_BASE_URL=https://n8n.aixlabs.fun
N8N_API_KEY=your_n8n_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel (Recommended)

[!Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/W3JDev/n8n-ai-workflow-builder)

1. Click the button above
2. Add your environment variables
3. Deploy!

## Usage

1. **Describe Your Workflow**: Tell the AI what you want to automate
2. **Review Generated Workflow**: Check the N8N workflow JSON
3. **Execute**: Run the workflow directly from the UI
4. **Monitor**: View execution results and logs

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT4-
- **API**: N8N REST API

## Author

Built by [W3JDev](https://github.com/W3JDev) with ❤️
