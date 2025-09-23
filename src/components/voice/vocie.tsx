"use client";

import { useState, useEffect } from "react";
import { voiceConfig } from "@/mock/voice-mock";

const CatSpeech: React.FC = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [text, setText] = useState(voiceConfig.defaultText);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices.filter((v) => v.lang.includes(voiceConfig.languageFilter)));
    };

    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const handleSpeak = () => {
    if (!text) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceConfig.speech.language;
    utterance.rate = voiceConfig.speech.rate;
    utterance.pitch = voiceConfig.speech.pitch;

    // 일본어 여성 음성 우선 선택 (Mac/Windows 호환)
    const japaneseVoice =
      voiceConfig.preferredVoices.reduce((found, voiceName) => {
        return found || voices.find((v) => v.name === voiceName);
      }, undefined as SpeechSynthesisVoice | undefined) ||
      voices.find((v) => v.lang === voiceConfig.speech.language); // fallback: 첫번째 일본어 음성

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "20px auto", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="일본어 텍스트를 입력하세요"
        style={{
          width: "100%",
          height: 100,
          fontSize: 16,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSpeak}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          backgroundColor: isReading ? voiceConfig.colors.speaking : voiceConfig.colors.ready,
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {isReading ? voiceConfig.buttons.stop : voiceConfig.buttons.speak}
      </button>

      <div
        style={{
          marginTop: 20,
          fontSize: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          transition: "0.3s",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: isReading ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s",
          }}
        >
          🐱
        </span>
        <span style={{ fontSize: 18 }}>{isReading ? voiceConfig.statusMessages.speaking : voiceConfig.statusMessages.waiting}</span>
      </div>
    </div>
  );
};

export default CatSpeech;
