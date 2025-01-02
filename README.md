![](https://i.postimg.cc/y88DYVKn/940-1x-shots-so-1.webp)

# AI Image Generator

An AI-powered image generation platform where users can create stunning images using advanced models such as **Stable Diffusion SDXL - Lightning**, **SDXL-Base**, or **DreamShaper**. This platform allows users to **publish** their generated images for others to explore and download.

## Features

- **AI-Powered Image Generation**: Generate high-quality images using Stable Diffusion SDXL models and DreamShaper.
- **Image Sharing & Discovery**: Publish your generated images for others to see, explore a gallery of creations by other users, and download the images you like.
- **Multiple AI Models**: Choose from a variety of image generation models, including SDXL-Lightning, SDXL-Base, and DreamShaper.
- **Simple & Intuitive UI**: A clean interface built with **Next.js**, **Tailwind CSS**, and **TypeScript** for easy interaction.
- **Cloudflare Workers & Hono**: Fast and scalable serverless backend powered by Cloudflare Workers and Hono framework.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React framework)
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
  - [TypeScript](https://www.typescriptlang.org/) (Typed JavaScript)
  
- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/) (Serverless platform for fast deployment)
  - [Hono](https://hono.dev/) (Minimal and fast web framework for the Edge)
  
- **AI Models**:
  - Stable Diffusion SDXL - Lightning
  - Stable Diffusion SDXL-Base
  - DreamShaper

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [Cloudflare Workers CLI](https://developers.cloudflare.com/workers/get-started/guide/) for deploying serverless backend

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-image-generator.git
   cd ai-image-generator
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env.local` file in the root of your project.
    ```bash
    DATABASE_URL="Your mongo url"
    NEXT_PUBLIC_SERVER_URL="your deployed cloudflare api"
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Deploy the Cloudflare Workers backend:

    - Follow the steps in the **Cloudflare Workers** guide to deploy your backend.

### Usage

- Select the AI model you want to use (SDXL-Lightning, SDXL-Base, DreamShaper).

- Enter a prompt to generate the image.

- Click "Generate" and wait for the magic to happen!

- Publish your generated image to share it with others, or explore the gallery to download images you like.

--- 

### Made with ❤️ by [Subhadeep Roy](http://mvp-subha.me/)
