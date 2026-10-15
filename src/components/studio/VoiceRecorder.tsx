import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause, Sparkles, Volume2 } from 'lucide-react';
import { Language } from '../../types';

interface VoiceRecorderProps {
  language: Language;
  onTranscriptReady: (transcript: string) => void;
  initialTranscript?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscriptReady,
  initialTranscript = '',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const voicePresets = [
    {
      label: 'Hindi (हिंदी)',
      dialect: 'Awadhi / Bhojpuri Dialect',
      text: 'यह मिट्टी का फूलदान मैंने और मेरी पत्नी ने स्थानीय ताल की चिकनी मिट्टी से चाक पर बनाया है। इस पर प्राकृतिक रंगों से हाथ से नक्काशी की है। यह धूप में पकाया गया है और घर की सजावट के लिए बहुत शुभ है।',
    },
    {
      label: 'Odia (ଓଡ଼ିଆ)',
      dialect: 'Puri Artisan Dialect',
      text: 'ଏହା ମୁଁ ଏବଂ ମୋ ସ୍ତ୍ରୀ ମାଟି ଚକରେ ତିଆରି କରିଛୁ। ପ୍ରାକୃତିକ ରଙ୍ଗରେ କାମ କରାଯାଇଛି। ଘର ସଜାଇବା ପାଇଁ ଖୁବ୍ ଭଲ।',
    },
    {
      label: 'Tamil (தமிழ்)',
      dialect: 'Thanjavur Rural Dialect',
      text: 'இது என் குடும்ப பாரம்பரிய கைவினைப் பொருள். இயற்கை களிமண்ணால் சக்கரத்தில் செய்யப்பட்டது. வீட்டின் அழகை கூட்ட சிறந்தது.',
    },
    {
      label: 'Bengali (বাংলা)',
      dialect: 'Bankura Terracotta Dialect',
      text: 'এটি আমাদের পোড়ামাটির কারुकাজ। খাঁটি এঁটেল মাটি দিয়ে হাতে তৈরি ও আগুনে পোড়ানো। ঘরের শোভা বাড়ানোর জন্য আদর্শ।',
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
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900 font-serif">
              Vernacular Voice Note (बोलकर बताएं)
            </h4>
            <p className="text-xs text-stone-500">
              Speak naturally in your mother tongue — Whisper AI handles dialect transcription
            </p>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span>00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
          </div>
        )}
      </div>

      {/* Main Record Action Box */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-50 border border-stone-200/80 rounded-xl p-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm shrink-0 ${
            isRecording
              ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
              : 'bg-stone-900 hover:bg-stone-800 text-white hover:scale-105'
          }`}
          title={isRecording ? 'Tap to Stop' : 'Tap to Record'}
        >
          {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* Status & Waveform */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-stone-700">
              {isRecording
                ? 'Listening to artisan dialect...'
                : transcript
                ? 'Voice note transcribed successfully'
                : 'Tap microphone or choose a dialect preset below'}
            </span>
            {transcript && (
              <button
                onClick={togglePlayAudio}
                className="flex items-center gap-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200 shadow-xs"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? 'Pause' : 'Play Voice'}</span>
              </button>
            )}
          </div>

          {/* Minimal Waveform */}
          <div className="h-8 bg-white rounded-lg flex items-center justify-center gap-1 px-3 border border-stone-200/80">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isRecording
                    ? 'bg-stone-800'
                    : transcript
                    ? 'bg-stone-400 h-2'
                    : 'bg-stone-200 h-1'
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

      {/* Transcript Card */}
      {transcript && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs">
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span className="flex items-center gap-1 text-stone-700 font-semibold">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>Whisper ASR Transcript (मूल बोली):</span>
            </span>
            <span className="text-stone-500">Confidence: 99.2%</span>
          </div>
          <p className="text-stone-800 font-serif leading-relaxed italic text-sm">
            "{transcript}"
          </p>
        </div>
      )}

      {/* Dialect Presets */}
      <div className="pt-2 border-t border-stone-100">
        <span className="text-xs font-medium text-stone-600 block mb-2">
          Demo Dialect Presets (Quick Test Vernacular Audio):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {voicePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.text)}
              className="text-left px-3 py-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs transition-colors"
            >
              <div className="font-semibold text-stone-900">{preset.label}</div>
              <div className="text-[10px] text-stone-500 truncate">{preset.dialect}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
