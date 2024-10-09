"use client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MarQuee from "react-fast-marquee";

type Props = {};

const rowOneImages = [
  {
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/one.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/two.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/three.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/five.png",
  },
];

const rowTwoImages = [
  {
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/one.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/two.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/three.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/four.png",
  },
  {
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/five.png",
  },
];

const Hero = (props: Props) => {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setmounted(true);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="banner relative overflow-x-hidden w-full md:min-h-screen flex items-center justify-center bg-[#030015] text-gray-50">
      <div className="overflow-x-hidden mt-5">
        <h1 className="mont text-5xl py-5 xl:text-6xl 2xl:text-7xl font-[700] text-center xl:leading-[60px] 2xl:leading-[80px] sm:mt-20 mx-4">
          Make <span className="text-[#64FF4B]">AI image</span> <br /> With Your{" "}
          Imagination
        </h1>
        <div className="text-base mx-auto mt-1 sm:text-lg flex justify-center w-full text-center mb-12 text-gray-300">
          <p className="max-w-3xl">
            Transform your ideas into stunning visuals with our AI-powered image
            generation tool. Unleash your creativity and bring your imagination
            to life.
          </p>
        </div>
        <div className="flex mx-6 flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/about"
            className="w-full sm:w-auto flex gap-2 items-center justify-center px-8 py-2 rounded-lg font-semibold text-lg transition-colors bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
          >
            About <MoveRight size={24} />
          </Link>
          <Link
            href="#get-started"
            className="w-full flex gap-2 items-center justify-center sm:w-auto px-8 py-2 rounded-lg bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
        <div className="w-[100vw] mb-5 md:mb-20 relative">
          <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem]">
            <MarQuee>
              {rowOneImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[300px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>
            <MarQuee>
              {rowTwoImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[300px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;