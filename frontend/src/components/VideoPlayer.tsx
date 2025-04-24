import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  width = '100%',
  height = 'auto',
  autoPlay = false,
}) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const seekTime = (clickPosition / progressBarWidth) * videoRef.current.duration;
      
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <Paper
      elevation={3}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'relative',
        width,
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box
        component="video"
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        sx={{
          width: '100%',
          height,
          display: 'block',
          cursor: 'pointer',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Video title */}
      {title && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            color: 'white',
            transition: 'opacity 0.3s ease',
            opacity: showControls ? 1 : 0,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      )}

      {/* Video controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'opacity 0.3s ease',
          opacity: showControls ? 1 : 0,
        }}
      >
        {/* Progress bar */}
        <Box
          sx={{
            width: '100%',
            height: 8,
            bgcolor: 'rgba(255,255,255,0.3)',
            borderRadius: 4,
            mb: 1,
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onClick={handleProgressClick}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: '100%',
              bgcolor: theme.palette.primary.main,
              transition: 'width 0.1s linear',
            }}
          />
        </Box>

        {/* Control buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <IconButton
              size="small"
              onClick={togglePlay}
              sx={{ color: 'white' }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              size="small"
              onClick={toggleMute}
              sx={{ color: 'white' }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Box>

          <IconButton
            size="small"
            onClick={handleFullscreen}
            sx={{ color: 'white' }}
          >
            <Fullscreen />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default VideoPlayer;
