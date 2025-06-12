"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const projects = projectsData.filter(item => item.type === "project");
  const kuis = projectsData.filter(item => item.type === "kuis");

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 px-4 sm:px-8 lg:px-16">
      {/* Projects Section */}
      <SectionHeading>My GRAFIKOM Projects</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>

      {/* Kuis Section */}
      <div className="mt-20">
        <SectionHeading>Kuis Grafikom</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {kuis.map((kuisItem, index) => (
            <React.Fragment key={index}>
              <Project {...kuisItem} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
