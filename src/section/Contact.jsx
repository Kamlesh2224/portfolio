import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.send("service_x75vtct", "template_yv8069e",
      { from_name: formData.name, to_name: "Kamlesh", from_email: formData.email, message: formData.message }, 
      "UTrRYL33rqMc7NfkC");
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      setAlertType("success");
      setAlertMessage("Message sent!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      setIsLoading(false);
      setAlertType("danger");
      setAlertMessage("Failed to send.");
      setShowAlert(true);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-[80vh] py-10 overflow-hidden bg-primary">
      
      
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles quantity={100} color="#ffffff" refresh />
      </div>

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 w-full max-w-lg p-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-3xl mx-4"
      >
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="relative flex flex-col items-center justify-center w-full p-6 md:p-10 overflow-hidden border border-white/5 rounded-[1.4rem] bg-[#0d0d0d]/90 backdrop-blur-xl shadow-2xl"
        >
          <div className="relative z-10 w-full mb-6 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Let's <span className="text-royal">Connect</span>
            </h2>
            <p className="text-sm text-neutral-400">Drop a message below.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 w-full space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500 ml-1">Name</label>
              <input
                name="name" type="text" required value={formData.name} onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 text-sm transition-all border outline-none bg-white/5 border-white/10 rounded-xl focus:border-royal/50 text-white placeholder:text-neutral-600"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500 ml-1">Email</label>
              <input
                name="email" type="email" required value={formData.email} onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 text-sm transition-all border outline-none bg-white/5 border-white/10 rounded-xl focus:border-royal/50 text-white placeholder:text-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-neutral-500 ml-1">Message</label>
              <textarea
                name="message" required rows="3" value={formData.message} onChange={handleChange}
                placeholder="How can I help?"
                className="w-full px-4 py-2.5 text-sm transition-all border outline-none bg-white/5 border-white/10 rounded-xl focus:border-royal/50 text-white resize-none placeholder:text-neutral-600"
              />
            </div>

            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="relative w-full py-3 mt-2 font-bold text-white text-sm uppercase rounded-xl bg-royal shadow-lg shadow-royal/20 overflow-hidden group cursor-pointer"
            >
            
              <div className="absolute inset-0 transition-transform duration-500 -translate-x-full bg-white/20 group-hover:translate-x-0" />
              
              <span className="relative z-10">
                {isLoading ? "Sending Digital Signal..." : "Send Message"}
              </span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;