import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import tugas1grafikom from "@/public/tugas1grafikom.png";
import tugas2grafikom from "@/public/tugas2grafikom.png";
import tugas3grafikom from "@/public/tugas3grafikom.png";
import tugas4grafikom from "@/public/tugas4grafikom.png";


export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Tokoh Perintis Grafika Komputer",
    description:
      "This assignment highlights John Whitney, Sr., one of the pioneers in computer graphics and a key figure in the development of computer animation. Known for integrating mathematics, music, and visual art, Whitney created groundbreaking abstract animations using analog computers and later digital techniques. His work laid the foundation for modern motion graphics and visual effects.",
    tags: ["John Whitney", "computer animation", "motion graphics", "visual art", "abstract animation", "computer graphics pioneer", "digital media history"],
    imageUrl: tugas1grafikom,
    type: "project",
    pdfUrl: "/pdfs/toko-perintis-grafika.pdf",
  },
  {
    title: "Algoritma Pembentukan Garis",
    "description": "This assignment covers fundamental algorithms used to draw lines on a pixel-based display, such as the Digital Differential Analyzer (DDA) and Bresenham's Line Algorithm. Students are required to understand the mathematical concepts behind line generation and implement them using code or pseudocode.",
    "tags": ["graphics algorithm", "line drawing", "DDA", "Bresenham", "rendering", "pixels", "computer graphics"],
    imageUrl: tugas2grafikom,
    type: "project",
    pdfUrl: "/pdfs/algoritma-pembentukan-garis.pdf",
  },
  {
    title: "Algoritma Pembentukan Lingkaran",
    "description": "This task introduces techniques for drawing circles using pixels, including Bresenham’s Circle Algorithm and the Midpoint Circle Algorithm. The focus is on computational efficiency and exploiting symmetry in raster displays.",
    "tags": ["graphics algorithm", "circle", "Bresenham Circle", "Midpoint Circle", "pixel drawing", "symmetry", "raster graphics"],
    imageUrl: tugas3grafikom,
    type: "project",
    pdfUrl: "/pdfs/algoritma-pembentukan-lingkaran.pdf",
  },
   {
    title: "Algoritma Pembentukan Kurva",
     "description": "This assignment focuses on methods for constructing curves in computer graphics, such as Bezier Curves and B-Splines. Students are expected to learn about control points, mathematical properties, and applications in graphic design and animation.",
    "tags": ["curve algorithm", "Bezier", "B-Spline", "vector graphics", "control points", "design", "computer graphics"],
    imageUrl: tugas4grafikom,
    type: "project",
    pdfUrl: "/pdfs/algoritma-pembentukan-kurva.pdf",
    
  },
   {
    title: "Kuis 1 - Persamaan Misteri",
    description:
    "This quiz assesses basic understanding of computer graphics, including fundamental concepts, history, and real-world applications.",
    tags: ["Computer Graphics", "Fundamentals"],
    type: "kuis",
    videoUrl: "https://youtu.be/6QmOyiCONk8",
  },
  {
    title: "Kuis 2 - Transformasi 2D",
    description:
    "This quiz tests your understanding of line drawing algorithms in computer graphics.",
    tags: ["Algorithm", "2D Transformation"],
    type: "kuis",
    videoUrl: "https://youtu.be/6Hodxx_yIvc",
  },
  {
    title: "Kuis 3 - Line Clipping Algorithm",
    description:
    "This quiz evaluates your knowledge of circle drawing algorithms in computer graphics.",
    tags: ["Algorithm", "Circle Drawing"],
    type: "kuis",
    videoUrl: "https://youtu.be/KVgJWVB42vI",
  },
  {
    title: "Kuis 4 - Polygon Clipping Algorithm",
    description:
    "This quiz tests your understanding of curve drawing algorithms in computer graphics.",
    tags: ["Algorithm", "Curve Drawing","Polygon Clipping"],
    type: "kuis",
    videoUrl: "https://youtu.be/LNOtAb6Zsj8",
  },
] as const;


export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
] as const;
