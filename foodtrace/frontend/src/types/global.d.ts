// Add TypeScript declarations for browser APIs that might not be recognized

interface Window {
  ImageCapture?: any;
}

// Extend MediaTrackConstraints for torch mode
interface MediaTrackConstraintSet {
  torch?: boolean;
}
