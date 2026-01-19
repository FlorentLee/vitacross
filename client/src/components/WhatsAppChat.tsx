import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/message/2XHSAU56KCOSG1", "_blank");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-all duration-300 hover:scale-110"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-40 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">VitaCross Support</h3>
              <p className="text-xs text-green-100">Usually replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-600 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 flex flex-col justify-between bg-gray-50">
            <div className="space-y-3">
              <div className="bg-green-100 text-green-900 p-3 rounded-lg text-sm max-w-xs">
                👋 Hello! How can we help you today?
              </div>
              <div className="bg-green-100 text-green-900 p-3 rounded-lg text-sm max-w-xs">
                We're here to answer any questions about our medical services.
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <a
                href="https://wa.me/message/2XHSAU56KCOSG1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 text-center font-medium transition-colors"
              >
                Chat on WhatsApp
              </a>
              <p className="text-xs text-gray-500 text-center">
                Click to open WhatsApp chat
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
