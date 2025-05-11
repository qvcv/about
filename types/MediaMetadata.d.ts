// Type definitions for MediaSession API which is not fully covered by standard TypeScript types
interface MediaMetadataInit {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: MediaImage[];
}

interface MediaImage {
  src: string;
  sizes?: string;
  type?: string;
}

declare class MediaMetadata {
  constructor(init?: MediaMetadataInit);
  title: string;
  artist: string;
  album: string;
  artwork: MediaImage[];
}

interface Navigator {
  MediaSession: MediaSession;
}

interface MediaSession {
  metadata: MediaMetadata | null;
  playbackState: MediaSessionPlaybackState;
  setActionHandler(action: MediaSessionAction, handler: MediaSessionActionHandler | null): void;
}

type MediaSessionPlaybackState = 'none' | 'paused' | 'playing';
type MediaSessionAction = 'play' | 'pause' | 'seekbackward' | 'seekforward' | 'previoustrack' | 'nexttrack' | 'skipad' | 'stop';
type MediaSessionActionHandler = (details: any) => void;

// Extend the HTMLAudioElement interface to include potential metadata properties
interface HTMLAudioElement {
  title?: string;
  // Other potential metadata fields that might be available in some browsers
  artist?: string;
  album?: string;
}