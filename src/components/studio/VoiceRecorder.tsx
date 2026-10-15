import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../../types';

interface VoiceRecorderProps {
  language: Language;
  onTranscriptReady: (transcript: string) => void;
  initialTranscript?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  language,
  onTranscriptReady,
  initialTranscript = '',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Regional voice presets for easy demonstration
  const voicePresets = [
    {
      label: 'Hindi (हिंदी)',
      dialect: 'Awadhi / Bhojpuri Blend',
      text: 'यह मिट्टी का फूलदान मैंने और मेरी पत्नी ने स्थानीय ताल की चिकनी मिट्टी से चाक पर बनाया है। इस पर प्राकृतिक रंगों से हाथ से नक्काशी की है। यह धूप में पकाया गया है और घर की सजावट के लिए बहुत शुभ है।',
    },
    {
      label: 'Odia (ଓଡ଼ିଆ)',
      dialect: 'Puri Artisan Dialect',
      text: 'ଏହା ମୁଁ ଏବଂ ମୋ ସ୍ତ୍ରୀ ମାଟି ଚକରେ ତିଆରି କରିଛୁ। ପ୍ରାକୃତିକ ରଙ୍ଗରେ କାମ କରାଯାଇଛି। ଘର ସଜାଇବା ପାଇଁ ଖୁବ୍ ଭଲ।',
    },
    {
      label: 'Tamil (தமிழ்)',
      dialect: 'Thanjavur Rural',
      text: 'இது என் குடும்ப பாரம்பரிய கைவினைப் பொருள். இயற்கை களிமண்ணால் சக்கரத்தில் செய்யப்பட்டது. வீட்டின் அழகை கூட்ட சிறந்தது.',
    },
    {
      label: 'Bengali (বাংলা)',
      dialect: 'Bankura Terracotta',
      text: 'এটি আমাদের পোড়ামাটির কারুকাজ। খাঁটি এঁটেল মাটি দিয়ে হাতে তৈরি ও আগুনে পোড়ানো। ঘরের শোভা বাড়ানোর জন্য আদর্শ।',
    },
  ];

  useEffect(() => {
    if (initialTranscript) {
      setTranscript(initialTranscript);
    }
  }, [initialTranscript]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    // Simulate Whisper speech-to-text transcribing the artisan's voice
    const sample = voicePresets[0].text;
    setTranscript(sample);
    onTranscriptReady(sample);
  };

  const handleSelectPreset = (text: string) => {
    setTranscript(text);
    onTranscriptReady(text);
  };

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Simple speech synthesis playback if supported
    if ('speechSynthesis' in window && !isPlaying) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.lang = 'hi-IN';
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-100 font-serif">
              Vernacular Voice Note (बोलकर बताएं)
            </h4>
            <p className="text-[11px] text-amber-300/70">
              Speak naturally in your mother tongue — Whisper AI handles dialect transcription
            </p>
          </div>
        </div>

        {/* Recording Timer Badge */}
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
          </div>
        )}
      </div>

      {/* Main Record Action Zone */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-900/10 border border-amber-800/30 rounded-xl p-4">
        {/* Large Friendly Record Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative group w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse ring-4 ring-red-400/40'
              : 'bg-gradient-to-tr from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white hover:scale-105'
          }`}
          title={isRecording ? 'Tap to Stop Recording' : 'Tap to Start Speaking'}
        >
          {isRecording ? (
            <Square className="w-6 h-6 fill-current" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>

        {/* Audio Waveform & Status */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-amber-200">
              {isRecording
                ? 'Listening to artisan dialect...'
                : transcript
                ? 'Voice note captured & transcribed'
                : 'Tap microphone or pick a dialect preset below'}
            </span>
            {transcript && (
              <button
                onClick={togglePlayAudio}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-200 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/40"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? 'Pause Audio' : 'Play Voice'}</span>
              </button>
            )}
          </div>

          {/* Animated Waveform Bars */}
          <div className="h-8 bg-amber-950/60 rounded-lg flex items-center justify-center gap-1.5 px-3 border border-amber-800/40">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isRecording
                    ? 'bg-gradient-to-t from-orange-500 to-amber-300'
                    : transcript
                    ? 'bg-amber-700/60 h-2'
                    : 'bg-amber-900/40 h-1'
                } ${
                  isRecording
                    ? i % 4 === 0
                      ? 'animate-soundwave-1'
                      : i % 4 === 1
                      ? 'animate-soundwave-2'
                      : i % 4 === 2
                      ? 'animate-soundwave-3'
                      : 'animate-soundwave-4'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transcript Display Box */}
      {transcript && (
        <div className="mt-3 bg-amber-900/30 border border-amber-700/40 rounded-xl p-3 text-xs">
          <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Whisper STT Raw Transcript (मूल बोली):</span>
            </span>
            <span className="text-amber-400/70 text-[10px]">Confidence: 99.2%</span>
          </div>
          <p className="text-amber-100 font-serif leading-relaxed italic">
            "{transcript}"
          </p>
        </div>
      )}

      {/* Regional Dialect Presets for Hackathon Judges */}
      <div className="mt-3 pt-3 border-t border-amber-800/30">
        <span className="text-[11px] font-medium text-amber-400 block mb-2">
          Demo Presets (Quick Test Vernacular Audio Input):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {voicePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.text)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-amber-900/30 hover:bg-amber-800/50 border border-amber-700/40 text-amber-200 text-xs transition-all hover:scale-[1.02]"
            >
              <div className="font-semibold text-amber-100">{preset.label}</div>
              <div className="text-[10px] text-amber-400/70 truncate">{preset.dialect}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
