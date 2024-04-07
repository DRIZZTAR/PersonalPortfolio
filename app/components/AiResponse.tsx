export default function AiResponse({ role, content }) {
  // Determine the prefix and styles based on the role
  const isUser = role === "user";
  const prefix = isUser ? "You: " : "My AI: ";

  // Dynamic styling with gradients and animations
  const containerStyles = `p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
    isUser
      ? "bg-gradient-to-r from-green-200 via-green-300/50 to-green-400/10 text-green-300 border-l-4 border-green-700"
      : "bg-gradient-to-r from-purple-300 via-blue-300/50 to-blue-400/10 text-slate-300 border-l-4 border-slate-400"
  }`;

  // Enhancing text style for better readability and appearance
  const textStyle =
    "text-lg md:text-xl font-semibold leading-relaxed tracking-tight drop-shadow-md";

  return (
    <div className={`${containerStyles} font-sans animate-fade-in-chat`}>
      <p className={textStyle}>
        {prefix}
        <span>{content}</span>
      </p>
    </div>
  );
}
