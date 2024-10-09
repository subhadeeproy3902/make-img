"use client";
// inspired by tom is loading
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ImageProps } from "./dream-forge";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

function Gallery({ images }: { images: ImageProps[] }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="columns-2 md:columns-3 2xl:columns-4 gap-4">
          <>
            {images.map((item, index) => (
              <ImageItem
                key={index}
                item={item}
                index={index}
                setSelected={setSelected}
              />
            ))}
          </>
        </div>
      </div>
    </>
  );
}

interface ImageItemProps {
  item: ImageProps;
  index: number | string;
  setSelected: any;
}

function ImageItem({ item, index, setSelected }: ImageItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const downloadThatImage = async () => {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = "make-img-" + index;
    a.click();
  };

  return (
    <motion.figure
      whileTap={{ scale: 0.9 }}
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full rounded-md  relative dark:bg-black bg-green-500 overflow-hidden before:absolute before:top-0 before:content-[''] before:h-full before:w-full hover:before:bg-gradient-to-t dark:before:from-gray-900  before:from-green-950/50 before:from-5% before:to-transparent before:to-90% cursor-pointer"
      onClick={() => setSelected(item)}
    >
      <motion.img
        layoutId={`card-${item.id}`}
        whileHover={{ scale: 1.025 }}
        src={item.url}
        className="w-full h-full bg-base-100 shadow-xl image-full cursor-pointer"
      />
      <div className="flex flex-wrap mt-2 absolute bottom-0 left-0 p-2 group-hover:opacity-100 opacity-0 font-semibold ">
        {/* Download button */}
        <Button onClick={downloadThatImage} size={"icon"}>
          <Download size={24} />
        </Button>
      </div>
    </motion.figure>
  );
}

export default Gallery;
