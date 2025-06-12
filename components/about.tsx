"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I'm a <span className="font-medium">Computer Science student</span> passionate about software development, with strong interests in{" "}
        <span className="font-medium">programming, machine learning, AI, mobile programming, and data mining</span>.{" "}
        <span className="italic">I'm a fast learner</span> who enjoys exploring new technologies and continuously seeks to build{" "}
        <span className="underline">innovative and impactful solutions</span>.
      </p>

     
    </motion.section>
  );
}
