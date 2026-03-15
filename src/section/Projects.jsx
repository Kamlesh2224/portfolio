import { useRef } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";

const Projects = () => {
return (
<section className="relative c-space my-32 pb-40 bg-midnight">
<div className="sticky top-0 z-30 bg-midnight pt-24 pb-12">
<h2 className="text-5xl font-extrabold text-white tracking-tight">
My <span className="text-sand">Projects</span>
</h2>

<div className="absolute bottom-[-60px] left-0 w-full h-[60px] bg-gradient-to-b from-midnight to-transparent pointer-events-none" />
</div>

<div className="relative flex flex-col items-center gap-20 mt-10">
{myProjects.map((project, index) => (
<Project
key={project.id}
{...project}
index={index}
total={myProjects.length}
/>
))}
</div>
</section>
);
};

export default Projects;