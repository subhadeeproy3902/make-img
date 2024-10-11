"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wand2,
  Download,
  Share2,
  Zap,
  Smile,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import Gallery from "./gallery";
import { getImageByUrl, getImages, postImage } from "@/actions/images.actions";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

export interface ImageProps {
  id: string;
  url: string;
  prompt: string;
  createdAt: Date;
}

export function DreamForgeComponent() {
  const [guidance, setGuidance] = useState(7.5);
  const [strength, setStrength] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [allImages, setAllImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    } else {
      setError("");
    }

    setIsGenerating(true);
    setIsImageGenerated(false);
    try {
      const res = await fetch(
        `${apiUrl}/?prompt=${encodeURIComponent(
          prompt
        )}&guidance=${guidance}&strength=${strength}&model=${aiModel}`,
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

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = `${prompt}.png`;
    a.click();
  };

  const uploadImage = async (base64data: string) => {
    console.log(base64data);
    const upload = await postImage(base64data, prompt);

    if (upload) {
      toast.success("Image published successfully", {
        icon: <Smile className="w-6 h-6" />,
      });
    } else {
      toast.error("Failed to publish image", {
        icon: <Zap className="w-6 h-6" />,
      });
    }

    getAllImages();
    setLoading(false);
  };

  const publishImage = async () => {
    setLoading(true);
    // Image is in format of blob, so we need to convert it to base64 using readAsDataURL
    const response = await fetch(image);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const data = reader.result;
      const isPublished = await getImageByUrl(data as string);
      if (isPublished) {
        toast.error("Image already published", {
          icon: <Zap className="w-6 h-6" />,
        });
        setLoading(false);
        return;
      }
      await uploadImage(data as string);
    };
  };

  useEffect(() => {
    setLoading(true);
    getAllImages();
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const getAllImages = async () => {
    const allImages = await getImages();
    setAllImages(allImages);
  };

  const [aiModel, setAiModel] = useState("sdxl-best");

  return (
    <>
      <div className="bg-[#040107] text-purple-50 flex justify-center items-center w-full">
        <div className="max-w-7xl mt-20 sm:mt-0 w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-start mt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-green-950/40 bg-clip-text text-transparent mont">
                AI Image Generator
              </h1>
              <p className="text-lg mb-6 text-gray-300">
                Create stunning visuals with AI
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="prompt"
                    className="block text-lg mont mb-1 font-bold text-gray-300"
                  >
                    Prompt
                  </label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your image..."
                    className="w-full bg-green-900/30 border-green-600 text-purple-50 placeholder-green-400 py-2.5 h-32 resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 text-red-500 text-sm p-2 rounded-md">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="model"
                    className="block text-lg font-bold mb-1 text-gray-200 mont"
                  >
                    AI Model
                  </label>
                  <Select value={aiModel} onValueChange={(e) => setAiModel(e)}>
                    <SelectTrigger
                      id="model"
                      className="w-full mont bg-green-900/30 border-green-600 text-purple-50 py-5"
                    >
                      <SelectValue
                        placeholder="Select a model"
                        defaultValue={aiModel}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[#011503] border-green-700 text-gray-300 py-1 text-lg font-medium mont">
                      <SelectItem value="sdxl-best" defaultValue="sdxl-best">
                        Stable Diffusion Lightning (Fastest) ⚡
                      </SelectItem>
                      <SelectItem value="sdxl-base">
                        Stable Diffusion Normal 😎
                      </SelectItem>
                      <SelectItem value="dream">The Dreamshaper 🪄</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="guidance"
                    className="block text-lg font-bold mont mb-1 text-purple-200"
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
                    className="w-full mt-1"
                  />
                </div>

                <div className="pb-6">
                  <label
                    htmlFor="strength"
                    className="block text-lg font-bold mont mb-1 text-purple-200"
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
                  className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 hover:from-emerald-700 hover:via-green-700 hover:to-lime-700 text-white rounded-md py-5 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col items-center justify-center">
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
                  <div className="w-full h-full bg-[#011503]  flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-lime-300 animate-pulse" />
                  </div>
                ) : image ? (
                  <Image
                    width={400}
                    height={400}
                    src={image}
                    alt="Generated Image"
                    className="w-full h-full object-cover"
                    id="ai-image"
                  />
                ) : (
                  <div className="w-full h-full bg-green-950/40 flex items-center justify-center">
                    <p className="text-gray-50 text-xl mont font-semibold">
                      No image generated
                    </p>
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
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={downloadImage}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
                  onClick={publishImage}
                >
                  {loading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Share2 className="mr-2 h-4 w-4" />
                  )}
                  Publish
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#040107] text-purple-50 flex justify-center items-center w-full">
        <div className="flex justify-center items-center w-full flex-col mb-36">
          <h1 className="text-4xl lg:text-5xl font-bold my-20 bg-gradient-to-b from-white to-green-900/30 bg-clip-text text-transparent mont">
            View Gallery
          </h1>
          {loading && (
            <div className="flex items-center justify-center">
              <Loader className="w-10 h-10 animate-spin" />
            </div>
          )}
          <Gallery items={allImages} />
        </div>
      </div>
    </>
  );
}
