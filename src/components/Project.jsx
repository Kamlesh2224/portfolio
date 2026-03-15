import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  index,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <motion.div
        className="sticky w-full max-w-5xl px-4 md:px-0"
        style={{
          top: `${200 + index * 25}px`,
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ margin: "-100px" }}
      >
        <div className="relative group bg-[#16161a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-sand/50">
          <div className="flex flex-col md:flex-row h-full md:h-[480px]">
            <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-midnight to-transparent">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-white tracking-tight">
                      {title}
                    </h3>
                    <div className="flex gap-3 mt-3">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[10px] uppercase tracking-widest text-sand border border-sand/20 px-2 py-1 rounded-md"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-white/20 font-mono text-xl">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-neutral-400 line-clamp-4 leading-relaxed">
                  {description}
                </p>
              </div>

              <button
                onClick={() => setIsHidden(true)}
                className="mt-8 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white text-black font-bold uppercase text-sm transition-all hover:bg-sand active:scale-95 group/btn"
              >
                Read More
                <img
                  src="assets/arrow-right.svg"
                  className="w-5 transition-transform group-hover/btn:translate-x-1"
                  alt="Arrow right"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="h-[20vh] md:h-[30vh]" />

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
