import { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Mic, MicOff, Monitor, CheckCircle, CameraOff, MonitorOff, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

interface PermissionState {
  camera: boolean;
  microphone: boolean;
  fullscreen: boolean;
}


function CheckPermissions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { active, url, formData } = location.state || {};
  const [permissions, setPermissions] = useState<PermissionState>({
    camera: false,
    microphone: false,
    fullscreen: false
  });

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [microphoneLoading, setMicrophoneLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for the hidden canvas
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to stop all tracks on the current stream
  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Request camera permission and set up the stream
  const requestCameraPermission = useCallback(async (): Promise<void> => {
    setCameraLoading(true);
    setCapturedImage(null); // Clear previous image
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      setStream(videoStream);
      setPermissions(prev => ({ ...prev, camera: true }));
    } catch (err) {
      toast({
        description: "Camera access denied. Please allow camera access in browser settings.",
      });
      setPermissions(prev => ({ ...prev, camera: false }));
    } finally {
      setCameraLoading(false);
    }
  }, []);

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async (): Promise<void> => {
    setMicrophoneLoading(true);
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      // We don't need to hold onto the audio stream, just confirm permission
      audioStream.getTracks().forEach(track => track.stop());
      setPermissions(prev => ({ ...prev, microphone: true }));
    } catch (err) {
      toast({
        description: "Microphone access denied. Please allow microphone access in browser settings.",
      });
      setPermissions(prev => ({ ...prev, microphone: false }));
    } finally {
      setMicrophoneLoading(false);
    }
  }, []);

  // Request fullscreen permission
  const requestFullscreenPermission = useCallback(async (): Promise<void> => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setPermissions(prev => ({ ...prev, fullscreen: true }));
      }
    } catch (err) {
      toast({
        description: "Failed to enter fullscreen. Please grant permission.",
      });
    }
  }, []);

  // PHOTO CAPTURE LOGIC
  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Get the image as a data URL
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      // Stop the camera stream after taking the photo
      stopStream();
    }
  }, [videoRef, canvasRef, stopStream]);

  // RETAKE PHOTO LOGIC
  const retakePhoto = () => {
    setCapturedImage(null);
    requestCameraPermission(); // Re-enable the camera
  };

  // This effect correctly attaches the stream to the video element once it's available.
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setPermissions(prev => ({ ...prev, fullscreen: !!document.fullscreenElement }));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    return () => {
      stopStream();
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
      }
    };
  }, [stopStream]);

  // Condition to check if all setup steps are complete
  const allSetupComplete = !!capturedImage && permissions.microphone && permissions.fullscreen;

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Final Check Before We Begin
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We're almost there! Let's make sure everything is ready to go.
          </p>
        </div>
        {/* A hidden canvas for capturing photos */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left Column: Video Preview & Capture */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-lg aspect-video">
              {capturedImage ? (
                <img src={capturedImage} alt="Your captured photo" className="w-full h-full object-cover" />
              ) : stream && permissions.camera ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <div className="text-center">
                    <CameraOff className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <p className="font-medium text-slate-600">
                      {cameraLoading ? 'Requesting access...' : 'Camera is off'}
                    </p>
                    <p className="text-sm text-slate-500">Enable camera access to continue</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons for the camera view */}
            <div className="flex justify-center">
              {permissions.camera && !capturedImage && (
                <button
                  onClick={takePhoto}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg shadow-red-500/30 transform hover:scale-105"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
              )}
              {capturedImage && (
                <button
                  onClick={retakePhoto}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-all duration-300 font-semibold shadow-lg shadow-slate-500/30 transform hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Photo
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Status Panel */}
          <div className="lg:col-span-2 space-y-4 bg-white border border-slate-200 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-3 mb-2">System Status</h2>

            {/* Camera Status */}
            <div className={`p-4 rounded-lg transition-all duration-300 ${capturedImage ? 'bg-green-500/10 ring-1 ring-green-400' : 'bg-slate-100 ring-1 ring-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {permissions.camera ? <Camera className="w-6 h-6 text-indigo-600" /> : <CameraOff className="w-6 h-6 text-slate-400" />}
                  <span className="font-medium text-slate-700">Photo Captured</span>
                </div>
                {capturedImage ? (
                  <CheckCircle className="w-7 h-7 text-green-500" />
                ) : (
                  <button onClick={requestCameraPermission} disabled={cameraLoading} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-wait">
                    {cameraLoading ? 'Checking...' : 'Check'}
                  </button>
                )}
              </div>
            </div>

            {/* Microphone Status */}
            <div className={`p-4 rounded-lg transition-all duration-300 ${permissions.microphone ? 'bg-green-500/10 ring-1 ring-green-400' : 'bg-slate-100 ring-1 ring-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {permissions.microphone ? <Mic className="w-6 h-6 text-indigo-600" /> : <MicOff className="w-6 h-6 text-slate-400" />}
                  <span className="font-medium text-slate-700">Microphone</span>
                </div>
                {permissions.microphone ? (
                  <CheckCircle className="w-7 h-7 text-green-500" />
                ) : (
                  <button onClick={requestMicrophonePermission} disabled={microphoneLoading} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-wait">
                    {microphoneLoading ? 'Checking...' : 'Check'}
                  </button>
                )}
              </div>
            </div>

            {/* Fullscreen Status */}
            <div className={`p-4 rounded-lg transition-all duration-300 ${permissions.fullscreen ? 'bg-green-500/10 ring-1 ring-green-400' : 'bg-slate-100 ring-1 ring-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {permissions.fullscreen ? <Monitor className="w-6 h-6 text-indigo-600" /> : <MonitorOff className="w-6 h-6 text-slate-400" />}
                  <span className="font-medium text-slate-700">Fullscreen</span>
                </div>
                {permissions.fullscreen ? (
                  <CheckCircle className="w-7 h-7 text-green-500" />
                ) : (
                  <button onClick={requestFullscreenPermission} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
                    Enter
                  </button>
                )}
              </div>
            </div>

            {/* Final Action Button/Message */}
            <div className="pt-4">
              {allSetupComplete ? (
                <div className="p-4 bg-green-500/10 border border-green-400 rounded-lg text-center flex flex-col items-center gap-2">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <p className="font-semibold text-green-800 text-lg">
                    All systems are ready!
                  </p>
                  <button
                    onClick={() => navigate(url)}
                    className="mt-2 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-bold shadow-lg shadow-green-500/30"
                  >
                    Start Interview
                  </button>
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-500">Please complete all steps to proceed.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckPermissions;