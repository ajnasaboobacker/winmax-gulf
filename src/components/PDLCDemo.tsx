import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

const PDLCDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Demo Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-background/20 to-background/40 backdrop-blur-sm border border-winmax-orange/20 p-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real PDLC Smart Film Demonstration
          </h3>
          <p className="text-lg text-muted-foreground">
            Watch actual PDLC smart film technology in action - switching from opaque to transparent instantly
          </p>
        </div>

        {/* Video Demo Area */}
        <div className="relative rounded-xl overflow-hidden border-4 border-gray-300 bg-black shadow-2xl">
          
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[600px] object-cover"
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted={isMuted}
            playsInline
            preload="metadata"
          >
            <source src="/assets/pdlc-demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay Controls */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-white/90 text-black hover:bg-white rounded-full w-16 h-16 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border border-winmax-orange/20">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm font-medium">
              {isPlaying ? 'Playing Demo' : 'Demo Ready'}
            </span>
          </div>

          {/* Video Progress Indicator */}
          {isPlaying && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-winmax-orange animate-pulse rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:opacity-90 px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isPlaying ? 'Pause Demo' : 'Play Demo'}
          </Button>
          
          <Button
            onClick={restartVideo}
            variant="outline"
            size="lg"
            className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/10 px-10 py-4 text-lg font-semibold rounded-full"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Restart Demo
          </Button>

          <Button
            onClick={toggleMute}
            variant="outline"
            size="lg"
            className="border-2 border-tech-blue text-tech-blue hover:bg-tech-blue/10 px-10 py-4 text-lg font-semibold rounded-full"
          >
            {isMuted ? <VolumeX className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
        </div>

        {/* Technical Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-background/40 backdrop-blur-sm rounded-xl border border-winmax-orange/10 hover:border-winmax-orange/30 transition-colors">
            <div className="text-sm font-medium text-muted-foreground mb-2">Switch Time</div>
            <div className="text-2xl font-bold text-winmax-orange">0.1s</div>
          </div>
          <div className="p-6 bg-background/40 backdrop-blur-sm rounded-xl border border-tech-blue/10 hover:border-tech-blue/30 transition-colors">
            <div className="text-sm font-medium text-muted-foreground mb-2">Power Usage</div>
            <div className="text-2xl font-bold text-tech-blue">5W/m²</div>
          </div>
          <div className="p-6 bg-background/40 backdrop-blur-sm rounded-xl border border-tech-purple/10 hover:border-tech-purple/30 transition-colors">
            <div className="text-sm font-medium text-muted-foreground mb-2">Transparency</div>
            <div className="text-2xl font-bold text-tech-purple">85%</div>
          </div>
          <div className="p-6 bg-background/40 backdrop-blur-sm rounded-xl border border-tech-cyan/10 hover:border-tech-cyan/30 transition-colors">
            <div className="text-sm font-medium text-muted-foreground mb-2">Operating Voltage</div>
            <div className="text-2xl font-bold text-tech-cyan">48V AC</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            See the technology in action at your location
          </p>
          <Button
            onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20see%20a%20PDLC%20smart%20film%20demonstration', '_blank')}
            size="lg"
            className="bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90 px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Request Live Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDLCDemo;