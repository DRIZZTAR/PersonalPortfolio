export default function AiResponse({ role, content }) {
  // Determine the prefix and styles based on the role
  const isUser = role === "user";
  const prefix = isUser ? "You: " : "My AI: ";

  const messageStyle = isUser
    ? // User message styles
      "bg-blue-100/10 text-slate-300 border-l-4 border-slate-400"
    : // AI message styles
      "bg-green-100/10 text-green-300 border-l-4 border-green-700";

  return (
    <div
      style={{ fontFamily: "Cal Sans, sans-serif" }}
      className={`p-2 my-2 rounded shadow ${messageStyle}`}
    >
      <p className="text-lg md:text-xl font-semibold leading-relaxed tracking-tight">
        {prefix}
        <span>{content}</span>
      </p>
    </div>
  );
}
