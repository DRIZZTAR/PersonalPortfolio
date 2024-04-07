export default function AiResponse({ role, content }) {
  // Determine the prefix based on the role directly within the component
  const prefix = role === "user" ? "You: " : "My AI: ";

  return (
    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-indigo-500 dark:text-indigo-400 leading-relaxed tracking-tight shadow-lg">
      {prefix}
      <span className="text-slate-100 dark:text-slate-200">{content}</span>
    </p>
  );
}
