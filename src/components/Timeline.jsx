"use client";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="relative w-full py-16 bg-[#050505] overflow-hidden" ref={containerRef}>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <header className="mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 mb-2">
            <span className="h-[2px] w-10 bg-royal" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Work <span className="text-neutral-600">Experiences</span>
          </h2>
        </header>

        <div className="relative" ref={contentRef}>
          {data.map((item, index) => (
            <TimelineEntry 
              key={index} 
              item={item} 
              index={index} 
              progress={smoothProgress} 
              total={data.length}
            />
          ))}

          
          <motion.div 
            style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute left-[-20px] right-[-20px] h-[1px] bg-royal/60 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-royal blur-[10px] opacity-40" />
            <div className="absolute right-0 top-0 -translate-y-full px-2 py-0.5 bg-royal/20 text-[10px] font-mono text-royal border border-royal/30 backdrop-blur-md uppercase tracking-widest">
              Live_Scan
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ item, index, progress, total }) => {
  const start = index / total;
  const center = (index + 0.5) / total;
  const end = (index + 1) / total;

  
  const opacity = useTransform(progress, [start - 0.1, center, end + 0.1], [0.3, 1, 0.3]);
  const blur = useTransform(progress, [start - 0.1, center, end + 0.1], ["3px", "0px", "3px"]);

  return (
    <motion.div 
      style={{ opacity, filter: blur }}
      className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 mb-24 last:mb-0 items-start"
    >
      
      <div className="md:sticky md:top-1/2 md:-translate-y-1/2">
        <div className="font-mono text-royal text-xl md:text-2xl font-bold tracking-tighter">
          {item.date}
        </div>
        <div className="text-xs text-neutral-400 uppercase tracking-widest mt-1 font-medium">
          {item.title}
        </div>
      </div>

      
      <div className="space-y-5">
        
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
          {item.job}
        </h3>
        
        
        <div className="space-y-3 border-l-2 border-royal/30 pl-6">
          {item.contents.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-neutral-200 leading-relaxed font-normal">
              {p}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};