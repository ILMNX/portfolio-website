"use client";

import { useRef, useState } from "react";
import { projectsData } from "@/lib/data";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoModal from "./video-modal";
import PdfModal from "./pdf-modal";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  type,
  videoUrl,
  pdfUrl,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl?: StaticImageData;
  type?: "project" | "kuis";
  videoUrl?: string;
  pdfUrl?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const handleVideoClick = () => {
    if (type === "kuis" && videoUrl) {
      setIsVideoModalOpen(true);
    }
  };

  const handleProjectClick = () => {
    if (type === "project" && pdfUrl) {
      setIsPdfModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        ref={ref}
        style={{
          scale: scaleProgess,
          opacity: opacityProgess,
        }}
        className="group"
      >
        <section className="bg-gray-100 border border-black/5 rounded-lg overflow-hidden hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 h-full flex flex-col">
          {/* Media Section - Image or Video */}
          <div className="relative h-48 overflow-hidden">
            {type === "kuis" && videoUrl ? (
              // YouTube thumbnail for kuis - clickable to open modal
              <div
                className="relative w-full h-full cursor-pointer group/video"
                onClick={handleVideoClick}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoUrl.split('/').pop()}/maxresdefault.jpg`}
                  alt={title}
                  className="w-full h-full object-cover transition group-hover/video:scale-105"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover/video:bg-opacity-40 transition">
                  <div className="bg-red-600 rounded-full p-4 transform group-hover/video:scale-110 transition">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : imageUrl ? (
              // Regular image for projects - clickable to open PDF
              <div
                className="relative w-full h-full cursor-pointer group/project"
                onClick={handleProjectClick}
              >
                <Image
                  src={imageUrl}
                  alt="Project I worked on"
                  quality={95}
                  className="w-full h-full object-cover transition group-hover/project:scale-105"
                />
                {/* PDF overlay */}
                {type === "project" && pdfUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover/project:bg-opacity-40 transition opacity-0 group-hover:opacity-100">
                    <div className="bg-blue-600 rounded-full p-4 transform group-hover/project:scale-110 transition">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Placeholder for items without images
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 mb-4 flex-grow line-clamp-3">
              {description}
            </p>
            <ul className="flex flex-wrap gap-1 mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="bg-black/[0.7] px-2 py-1 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </motion.div>

      {/* Video Modal for Kuis */}
      {type === "kuis" && videoUrl && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={videoUrl}
          title={title}
        />
      )}

      {/* PDF Modal for Projects */}
      {type === "project" && pdfUrl && (
        <PdfModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          pdfUrl={pdfUrl}
          title={title}
        />
      )}
    </>
  );
}
