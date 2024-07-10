import React, { FC, useState } from "react";
import { motion } from "framer-motion"; // Ensure Framer Motion is installed: npm install framer-motion

interface AiResponseProps {
  role: string;
  content: string;
}

const AiResponse: FC<AiResponseProps> = ({ role, content }) => {
  const [hover, setHover] = useState(false);
  const isUser = role === "user";

  // Dynamically change styles based on hover state
  const containerStyles = `p-3 m-4 rounded-lg shadow-lg transition duration-500 flex text-center items-center ${
    isUser
    //User message styles
      ? "bg-gradient-to-r from-green-200 via-green-300/50 to-green-400/10 text-green-200 border-l-4 border-green-700"
    //AI message styles
      : "bg-gradient-to-r from-sky-200 via-stone-300/30 to-slate-300/10 text-fuchsia-200 border-l-4 border-slate-400"
  } ${hover ? "scale-105" : "scale-100"}`; // Applying scale change on hover

  // Define the text animation variants
  const textVariants = {
    hidden: { opacity: 0, x: isUser ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ fontFamily: "Apple Garamond Light, sans-serif" }}
      className={`${containerStyles} animate-fade-in-chat text-white`}
    >
      <iframe
        src={`https://lottie.host/embed/${
          isUser
            ? "8dbff227-9281-4263-82a3-d2be36924b65/J2XOtqMYxz"
            : "54c729d1-f61f-4c5f-9296-5244ec4dfc82/dsJxsC1XnH"
        }.json`}
        style={{ width: "50px", height: "50px", border: "none" }}
        className="mr-2 flex-shrink-0"
      ></iframe>
      <motion.div
        className="flex-grow"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        style={{ willChange: "transform" }}
      >
        <span
          className="text-lg md:text-xl font-semibold leading-relaxed tracking-wide drop-shadow-md"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {content}
        </span>
      </motion.div>
    </div>
  );
};

export default AiResponse;
