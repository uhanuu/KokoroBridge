export const voiceConfig = {
  // 기본 텍스트
  defaultText: "こんにちはにゃん！",

  // 음성 설정
  speech: {
    language: "ja-JP",
    rate: 0.8,     // 조금 느리게
    pitch: 1.1,    // 귀여운 톤
  },

  // 일본어 여성 음성 우선순위
  preferredVoices: [
    "O-Ren",
    "Google 日本語",
    "Kyoko"
  ],

  // UI 텍스트
  buttons: {
    stop: "にゃん止め",
    speak: "にゃん읽기"
  },

  // 상태 메시지
  statusMessages: {
    speaking: "にゃん、話してる...",
    waiting: "待機중にゃん"
  },

  // 스타일 색상
  colors: {
    speaking: "#f28b82",
    ready: "#8ab6f2"
  },

  // 언어 필터
  languageFilter: "ja"
};