import React from "react";
import { Gi3DGlasses, GiAbstract010 } from "react-icons/gi";
import { FaAngellist } from "react-icons/fa";

export default function AiResponse({ role, content }) {
  // Determine the styles based on the role
  const isUser = role === "user";
  const containerStyles = `p-3 m-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 flex text-center items-center ${
    isUser
      ? "bg-gradient-to-r from-green-200 via-green-300/50 to-green-400/10 text-green-300 border-l-4 border-green-700"
      : " text-slate-300 border-l-4 border-slate-400"
  }`;

  return (
    <div
      style={{ fontFamily: "Apple Garamond Light, sans-serif" }}
      className={`${containerStyles} animate-fade-in-chat text-white`}
    >
      {isUser ? (
        <FaAngellist
          color="#5F6A73"
          className="mr-2 text-green-500 w-6 h-6 flex-shrink-0"
        />
      ) : (
        <GiAbstract010 className="mr-2 text-blue-500 w-6 h-6 flex-shrink-0" />
      )}
      <div className="flex-grow">
        <span className="text-lg md:text-xl font-semibold leading-relaxed tracking-tight drop-shadow-md">
          {content}
        </span>
      </div>
    </div>
  );
}
