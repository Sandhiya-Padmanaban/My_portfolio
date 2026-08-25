import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Link as LinkIcon, 
  Check, 
  X, 
  AlertCircle, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { useTheme } from '../theme';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string | null;
  onUpdatePhoto: (photoData: string) => void;
  onRemovePhoto: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  currentPhoto,
  onUpdatePhoto,
  onRemovePhoto
}) => {
  const { currentTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(currentPhoto);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync preview when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPreviewPhoto(currentPhoto);
      setErrorMsg(null);
      setUrlInput('');
    }
  }, [isOpen, currentPhoto]);

  if (!isOpen) return null;

  // Process & compress image to standard resolution for storage with crisp quality
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 800; // Crisp resolution for high DPI screens & resume zoom
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while resizing
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          setPreviewPhoto(compressedDataUrl);
          onUpdatePhoto(compressedDataUrl);
          setIsProcessing(false);
          onClose();
        } else {
          const rawUrl = event.target?.result as string;
          setPreviewPhoto(rawUrl);
          onUpdatePhoto(rawUrl);
          setIsProcessing(false);
          onClose();
        }
      };
      img.onerror = () => {
        setErrorMsg('Failed to process the image file.');
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the file from your device.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg('Please enter a valid image URL.');
      return;
    }
    setErrorMsg(null);
    setPreviewPhoto(urlInput.trim());
    onUpdatePhoto(urlInput.trim());
    onClose();
  };

  const handleRemovePhoto = () => {
    onRemovePhoto();
    setPreviewPhoto(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-lg rounded-3xl ${currentTheme.cardBg} ${currentTheme.cardText} border ${currentTheme.cardBorder} shadow-2xl p-6 sm:p-8 flex flex-col gap-5`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${currentTheme.accentBadgeBg} ${currentTheme.accentBadgeText} border ${currentTheme.accentBadgeBorder}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-black ${currentTheme.cardHeading}`}>
                Your Profile Photo
              </h3>
              <p className={`text-xs ${currentTheme.cardSubtext}`}>
                Upload your real photo or manage your avatar
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-700/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Photo Preview Card */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-black/10 border border-slate-700/20">
          <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 ${currentTheme.isLight ? 'border-blue-500 ring-4 ring-blue-100' : 'border-teal-400 ring-4 ring-blue-950'} overflow-hidden shadow-xl shrink-0 bg-slate-800 flex items-center justify-center`}>
            {previewPhoto ? (
              <img
                src={previewPhoto}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`w-full h-full ${currentTheme.accentGradient} flex items-center justify-center text-2xl font-black text-white`}>
                SP
              </div>
            )}
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div>
              <h4 className={`text-sm font-black ${currentTheme.cardHeading}`}>
                {PERSONAL_INFO.name}
              </h4>
              <p className={`text-xs ${currentTheme.accentText} font-semibold`}>
                {previewPhoto ? 'Custom Personal Photo Active' : 'Professional Monogram Avatar'}
              </p>
            </div>
            <p className={`text-[11px] ${currentTheme.cardSubtext} leading-relaxed`}>
              {previewPhoto 
                ? 'Your photo is visible on your hero card and live interactive resume.'
                : 'Upload your own photo from your device or paste an image link to show your portrait.'}
            </p>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex gap-2 p-1 rounded-xl bg-black/15 border border-slate-700/20 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? `${currentTheme.accentGradient} text-white shadow-xs`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Phone / PC</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'url'
                ? `${currentTheme.accentGradient} text-white shadow-xs`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image Link URL</span>
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab 1: Upload from Device */}
        {activeTab === 'upload' && (
          <div className="space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl ${
                currentTheme.isLight ? 'border-blue-300 hover:border-blue-500 bg-blue-50/50' : 'border-teal-500/30 hover:border-teal-400/70 bg-teal-950/10'
              } flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all hover:scale-[1.01]`}
            >
              <div className={`p-3 rounded-full ${currentTheme.accentBadgeBg} ${currentTheme.accentBadgeText}`}>
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-sm font-bold ${currentTheme.cardHeading}`}>
                  {isProcessing ? 'Processing Image...' : 'Click to select your photo'}
                </span>
                <p className={`text-[11px] ${currentTheme.cardSubtext}`}>
                  Choose a picture from your phone gallery or computer (JPG, PNG, WEBP)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Image URL (Permanent for all visitors) */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-3">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs leading-relaxed space-y-1">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Permanent Worldwide Visibility
              </span>
              <p className={currentTheme.cardSubtext}>
                When you use a direct web link (from GitHub, Google Drive, LinkedIn, or Imgur), your photo is <strong>visible to all visitors and recruiters</strong> on your published website link.
              </p>
            </div>

            <div>
              <label className={`block text-xs font-bold ${currentTheme.cardSubtext} mb-1.5`}>
                Paste Direct Link to Your Photo (HTTPS URL):
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/sandhiya.jpg"
                className={`w-full px-3.5 py-2.5 rounded-xl border ${currentTheme.innerBoxBorder} ${currentTheme.innerBoxBg} ${currentTheme.cardText} text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              <p className="text-[10.5px] text-slate-400 mt-1">
                Supported: Any public image link ending in .jpg / .png or direct cloud link.
              </p>
            </div>
            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl ${currentTheme.accentGradient} text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer`}
            >
              <Check className="w-4 h-4" />
              <span>Apply & Save Permanent Photo</span>
            </button>
          </form>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/20 text-xs">
          {currentPhoto ? (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Custom Photo</span>
            </button>
          ) : (
            <span className="text-slate-400 text-[11px]">
              Tip: You can change or update your photo anytime
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl bg-slate-700/40 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition-all cursor-pointer`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
