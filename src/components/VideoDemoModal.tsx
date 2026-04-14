import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string; // For YouTube
  localVideoSrc?: string; // For local files
}

const VideoDemoModal = ({ isOpen, onClose, title, videoUrl, localVideoSrc }: VideoDemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-md border border-winmax-orange/20 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-0">
          <div className="relative rounded-xl overflow-hidden border-4 border-gray-300 bg-black shadow-2xl">
            {videoUrl ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : localVideoSrc ? (
              <video
                className="w-full h-auto max-h-[600px] object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={localVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 text-white/50 italic">
                Video demonstration currently undergoing technical maintenance.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDemoModal;
