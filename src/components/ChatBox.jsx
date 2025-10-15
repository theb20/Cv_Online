import { useState } from "react";
import { Bot , Send, CornerRightDown  } from "lucide-react";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {/* Boîte de chat (sort du bouton) */}
      <div
        className={`transition-all duration-500 ease-out transform ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {isOpen && (
          <div className="
             mb-4 w-[70vw] sm:w-[400px] h-[60vh] sm:h-[28rem] relative mb-3 rounded-2xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-purple-700/20 to-blue-800/10 shadow-2xl border border-white/10">
            {/* Header */}
            <h2 className="text-3xl flex items-center justify-between font-bold px-4 py-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-400">
                Chat
                <CornerRightDown
                onClick={() => setIsOpen(!isOpen)}
                size={18}
                className="text-white transition-transform duration-300 hover:scale-125 hover:rotate-12"
                />
            </h2>

            {/* Messages */}
            <div className="h-64 p-4 overflow-y-auto text-sm text-gray-100 space-y-2">
              <p>👋 Salut ! Comment puis-je t’aider ?</p>
            </div>

            {/* Input Footer */}
            <div className="absolute bottom-0 w-full p-3 bg-white/20 backdrop-blur-lg border-t border-white/30 flex items-center gap-2">
              <input
                type="text"
                placeholder="Écris ton message..."
                className="flex-1 px-4 py-3 bg-white/60 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
               <Send
                size={22}
                className="text-white transition-transform duration-300 hover:scale-125 hover:rotate-12"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bouton flottant animé */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center bg-purple-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-purple-700 transition-all duration-300"
      >
        {/* Animation d’onde */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></span>

       <Bot
        size={30}
        className="text-purple-400 animate-bounce drop-shadow-lg"
        />
      </button>
    </div>
  );
}
