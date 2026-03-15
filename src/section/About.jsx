import { useRef } from "react";
import { motion } from "motion/react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="c-space section-spacing relative">
      <div className="flex flex-col mb-12">
        <h2 className="text-heading">About Me</h2>
        <div className="h-1 w-24 bg-indigo-600 mt-2 rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="md:col-span-8 relative h-[24rem] bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden group p-10 flex flex-col justify-end"
        >
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.5] -right-20 -top-20 opacity-10 grayscale group-hover:opacity-20 transition-all duration-1000 pointer-events-none"
          />
          <div className="relative z-10 pointer-events-none">
            <h3 className="text-white text-4xl font-bold">Kamlesh Behera</h3>
            <p className="text-gray-400 mt-6 max-w-xl text-lg leading-relaxed">
              Over the last 4 years, I've developed my full-stack skills to
              deliver dynamic and responsive software and web applications.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-4 relative h-[24rem] bg-black border border-white/10 rounded-[2.5rem] overflow-hidden"
        >
          <div className="p-8 relative z-20 pointer-events-none">
            <p className="text-white text-xl font-bold">Time Zone</p>
            <p className="text-gray-500 text-sm">
              I'm based in Mars, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[20%] top-[15%] z-10 cursor-grab active:cursor-grabbing">
            <Globe />
          </figure>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-4 relative h-[22rem] bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden"
        >
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative z-10"
          >
            <p className="absolute text-5xl font-black text-white/[0.03] rotate-[-10deg] pointer-events-none">
              CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", top: "30%", left: "70%" }}
              text="Design Pattern"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-8 relative h-[22rem] bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden group"
        >
          <div className="p-10 relative z-20 pointer-events-none">
            <p className="text-white text-2xl font-bold">Tech Stack</p>
            <p className="text-gray-500 text-sm mt-2">
              I specialize in a variety of modern web technologies.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full start-[55%] h-full md:scale-125 lg:scale-150 z-10">
            <Frameworks />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-12 h-32 bg-indigo-600/5 border border-indigo-500/20 rounded-[2rem] flex items-center justify-between px-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-indigo-600/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />

          <p className="text-white text-2xl font-semibold relative z-10">
            Do you want to start a Project together?
          </p>
          <div className="relative z-10">
            <CopyEmailButton />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
