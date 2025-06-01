import React from 'react';
import { Project } from '../types/Project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="w-full h-[400px] overflow-hidden group bg-black rounded-lg shadow-lg">
      <div
        className="transition-transform duration-[5000ms] ease-in-out group-hover:-translate-y-[60%]"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full object-cover"
          width={400}
          height={400}
        />
      </div>
      {/* Optionally, you can show title/description here */}
      {/* <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>
      </div> */}
    </div>
  );
};

export default ProjectCard;