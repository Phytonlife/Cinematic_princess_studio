import React from 'react';
import { X, Share, PlusSquare, Smartphone, Monitor } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  onInstallChromium: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  onInstallChromium,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#121624] border border-slate-700/60 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Install Studio App</h3>
            <p className="text-xs text-slate-400">For iPad, iPhone, Mac & Windows</p>
          </div>
        </div>

        {isIOS ? (
          <div className="space-y-4 text-sm">
            <p className="text-slate-300">
              Install <strong>Animation Studio Academy</strong> on your iPad or iPhone home screen to run in distraction-free fullscreen beside Procreate:
            </p>
            <ol className="space-y-3 bg-[#0d0f17] border border-slate-800 rounded-xl p-4 text-xs">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span>Open this link in <strong>Safari</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span className="flex items-center gap-1.5">
                  Tap the <Share className="w-4 h-4 text-blue-400 inline" /> <strong>Share</strong> button in the Safari toolbar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span className="flex items-center gap-1.5">
                  Scroll and select <PlusSquare className="w-4 h-4 text-amber-400 inline" /> <strong>Add to Home Screen</strong>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <span>Tap <strong>Add</strong> in the top-right corner</span>
              </li>
            </ol>
            <p className="text-xs text-slate-400">
              The app icon will appear on your home screen and launch instantly in full standalone mode.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <p className="text-slate-300">
              Install the studio academy directly on your desktop or Android device for quick launching and offline production access.
            </p>
            <div className="bg-[#0d0f17] border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <Monitor className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <div className="font-medium text-white">Full Desktop & Mobile Support</div>
                <div className="text-slate-400">Standalone window without browser tabs or address bar</div>
              </div>
            </div>
            <button
              onClick={() => {
                onInstallChromium();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
            >
              Install App Now
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
