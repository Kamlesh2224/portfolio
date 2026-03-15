import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-start w-48 font-mono select-none">
        
        <div className="flex justify-between w-full mb-1 text-[10px] text-blue-500 uppercase tracking-widest">
          <span>Boot_Sequence</span>
          <span className="animate-pulse">Active</span>
        </div>

        
        <div className="relative w-full border border-white/10 p-4 bg-black/20 backdrop-blur-sm">
          <motion.div 
            className="text-4xl font-black text-white"
            key={Math.round(progress)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {Math.round(progress)}<span className="text-blue-500 text-xl">%</span>
          </motion.div>
          
          
          <div className="mt-2 h-1 w-full bg-white/5 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

       
        <div className="mt-2 space-y-1">
          {[
            "FETCHING_ASSETS...",
            "INITIALIZING_VULKAN...",
            "SYNCING_MODELS..."
          ].map((text, i) => (
            <motion.p 
              key={i}
              className="text-[8px] text-neutral-600 uppercase tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > (i * 30) ? 1 : 0 }}
            >
              {`> ${text}`}
            </motion.p>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default Loader;