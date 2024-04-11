import React, { FC } from "react";
import { FaAngellist } from "react-icons/fa";

interface AiResponseProps {
  role: string;
  content: string;
}

const AiResponse: FC<AiResponseProps> = ({ role, content }) => {
  const isUser = role === "user";
  const containerStyles = `p-3 m-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 flex text-center items-center ${
    isUser
      ? "bg-gradient-to-r from-green-200 via-green-300/50 to-green-400/10 text-green-200 border-l-4 border-green-700"
      : "bg-gradient-to-r from-sky-200 via-stone-300/30 to-slate-300/10 text-fuchsia-200 border-l-4 border-slate-400"
  }`;

  return (
    <div
      style={{ fontFamily: "Apple Garamond Light, sans-serif" }}
      className={`${containerStyles} animate-fade-in-chat text-white`}
    >
      {isUser ? (
        <iframe
          src="https://lottie.host/embed/8dbff227-9281-4263-82a3-d2be36924b65/J2XOtqMYxz.json"
          style={{ width: "80px", height: "80px", border: "none" }} // Adjust the size and style as needed
          className="mr-2 flex-shrink-0"
        ></iframe>
      ) : (
        // Embed the Lottie animation using an iframe for non-user messages
        <iframe
          src="https://lottie.host/embed/54c729d1-f61f-4c5f-9296-5244ec4dfc82/dsJxsC1XnH.json"
          style={{ width: "80px", height: "80px", border: "none" }} // Adjust the size and style as needed
          className="mr-2 flex-shrink-0"
        ></iframe>
      )}
      <div className="flex-grow">
        <span className="text-lg md:text-xl font-semibold leading-relaxed tracking-wide drop-shadow-md">
          {content}
        </span>
      </div>
    </div>
  );
};

export default AiResponse;
