export const ttsConfig = {
  // 일본어 음성 우선순위
  preferredVoices: {
    textToSpeech: [
      'Microsoft Ayumi - Japanese (Japan)',
      'Kyoko',
      'Otoya',
      'Haruka'
    ],
    ttsService: [
      'Kyoko',           // macOS 일본어 여성
      'Otoya',           // macOS 일본어 남성 (대안)
      'Google 日本語',    // Google 일본어
      'Microsoft Haruka', // Windows 일본어 여성
      'Microsoft Sayaka', // Windows 일본어 여성
    ]
  },

  // 기본 음성 설정
  defaultSettings: {
    language: 'ja-JP',
    rate: 0.8,     // 조금 느리게
    pitch: {
      default: 1.0,
      feminine: 1.2  // 조금 높게 (여성스럽게)
    },
    volume: 1.0
  },

  // 언어 감지 패턴
  languagePatterns: {
    japanese: ['ja', 'JP', 'Japan'],
    romaji: {
      language: 'en-US',
      rate: 0.6
    }
  },

  // TTS 초기화 타임아웃
  initializationTimeout: 3000,

  // 특정 음성 이름 필터
  voiceNameFilters: ['Kyoko', 'Otoya', 'Japan']
};