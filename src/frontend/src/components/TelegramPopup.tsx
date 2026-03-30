import { Send, X } from "lucide-react";

interface TelegramPopupProps {
  onClose: () => void;
}

export default function TelegramPopup({ onClose }: TelegramPopupProps) {
  const handleJoin = () => {
    window.open(
      "https://t.me/fifaworldcup2026h5",
      "_blank",
      "noopener,noreferrer",
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
      data-ocid="telegram.modal"
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4 shadow-2xl">
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={onClose}
            data-ocid="telegram.close_button"
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telegram icon */}
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
          <Send className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h3 className="text-blue-700 font-bold text-lg leading-tight">
            Join Telegram for latest news and updates
          </h3>
          <p className="text-gray-500 text-sm">
            Stay updated with offers, announcements and important notifications
          </p>
        </div>

        {/* Join button */}
        <button
          type="button"
          onClick={handleJoin}
          data-ocid="telegram.primary_button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          Join Channel
        </button>

        {/* Maybe later */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="telegram.cancel_button"
          className="text-gray-400 text-sm hover:text-gray-600 transition-colors py-1"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
