"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Wand2, Download, Share2 } from "lucide-react";
import Image from "next/image";

export function DreamForgeComponent() {
  const [guidance, setGuidance] = useState(7.5);
  const [strength, setStrength] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsImageGenerated(false);
    try {
      const res = await fetch(
        `https://img.subha9-5roy350-40b.workers.dev/?prompt=${encodeURIComponent(
          prompt
        )}&guidance=${guidance}&strength=${strength}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsGenerating(false);
      setIsImageGenerated(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#0D001A] text-purple-50">
      <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            DreamForge AI
          </h1>
          <p className="text-lg mb-6 text-purple-300">
            Create stunning visuals with AI
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium mb-1 text-purple-200"
              >
                Prompt
              </label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image..."
                className="w-full bg-purple-900/30 border-purple-600 text-purple-50 placeholder-purple-400 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium mb-1 text-purple-200"
              >
                AI Model
              </label>
              <Select>
                <SelectTrigger
                  id="model"
                  className="w-full bg-purple-900/30 border-purple-600 text-purple-50 py-2"
                >
                  <SelectValue placeholder="Choose model" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-600">
                  <SelectItem value="stable-diffusion">
                    Stable Diffusion ⚡
                  </SelectItem>
                  <SelectItem value="dall-e">DALL-E 3</SelectItem>
                  <SelectItem value="midjourney">Midjourney</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="guidance"
                className="block text-sm font-medium mb-1 text-purple-200"
              >
                Guidance: {guidance.toFixed(1)}
              </label>
              <Slider
                id="guidance"
                min={4}
                max={10}
                step={0.1}
                value={[guidance]}
                onValueChange={(value) => setGuidance(value[0])}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="strength"
                className="block text-sm font-medium mb-1 text-purple-200"
              >
                Strength: {strength.toFixed(2)}
              </label>
              <Slider
                id="strength"
                min={0}
                max={2}
                step={0.1}
                value={[strength]}
                onValueChange={(value) => setStrength(value[0])}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white rounded-md py-2 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-5 w-5" />
              )}
              {isGenerating ? "Generating..." : "Create Image"}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#080010] p-6 lg:p-8 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={isGenerating ? "generating" : "result"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl aspect-square rounded-lg overflow-hidden shadow-2xl"
          >
            {isGenerating ? (
              <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-purple-300 animate-pulse" />
              </div>
            ) : image ? (
              <Image
                width={400}
                height={400}
                src={image}
                alt="Generated Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
                <p className="text-purple-200">No image generated</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {isImageGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex space-x-4"
          >
            <Button
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="ghost"
              className="text-purple-50 hover:bg-purple-800/50"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
