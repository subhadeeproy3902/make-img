// inspired by tom is loading
"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { Download, X } from "lucide-react";
import { ImageProps } from "./dream-forge";

function Gallery({ items }: { items: ImageProps[] }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="container mx-auto p-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
          <>
            {items.map((item, index) => (
              <ImageItem
                key={item.id}
                item={item}
                index={index}
                setSelected={setSelected}
              />
            ))}
          </>
        </div>
      </div>
      <Modal selected={selected} setSelected={setSelected} />
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

  return (
    <motion.figure
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full relative dark:bg-black bg-white  before:absolute before:top-0 before:content-[''] before:h-full before:w-full hover:before:bg-gradient-to-t dark:before:from-gray-900  before:from-gray-200/90 before:from-5% before:to-transparent before:to-90% cursor-pointer rounded-md"
      onClick={() => setSelected(item)}
    >
      <motion.img
        layoutId={`card-${item.id}`}
        whileHover={{ scale: 1.025 }}
        src={item.url}
        className="w-full bg-base-100 shadow-xl image-full cursor-pointer rounded-md"
      />
      <div className="flex flex-wrap mt-2 absolute bottom-0 left-0 p-2 group-hover:opacity-100 opacity-0 font-semibold ">
        <h1>{item.prompt}</h1>
      </div>
    </motion.figure>
  );
}

interface ModalProps {
  selected: ImageProps | null;
  setSelected: any;
}
function Modal({ selected, setSelected }: ModalProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2, // Adjust the stagger delay as needed
      },
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  };
  useEffect(() => {
    if (selected) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = selected!.url;
    link.download = `${selected!.prompt}.png`;
    document.body.appendChild(link);
    link.click();
  }

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer overflow-y-scroll"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            layoutId={`card-${selected.id}`}
            className="w-full max-w-[1000px] relative overflow-x-hidden mx-auto my-8 cursor-default"
          >
            <button
              className="absolute top-2 right-2  p-2"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <motion.div className=" p-2 h-[70vh]  rounded-md">
              <Image
                width={400}
                height={400}
                alt="img"
                src={selected.url}
                className="w-full h-full object-contain rounded-md dark:bg-black bg-white"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white dark:bg-black dark:text-white text-black p-4  rounded-md  px-8"
            >
              <motion.p variants={itemVariants} className="my-4">
                {selected.prompt}
              </motion.p>
              <motion.button
                variants={itemVariants}
                className="flex  w-fit gap-2 cursor-pointer px-4 py-2 dark:hover:bg-black bg-black hover:bg-white hover:text-black text-white border-black dark:hover:text-white transition-colors border-2 dark:border-white dark:bg-white dark:text-black rounded-full font-semibold"
                onClick={downloadImage}
              >
                Download
                <Download />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Gallery;
