import { ttsConfig } from "@/mock/tts-mock";

export class TextToSpeechService {
  private synthesis: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
    }
  }

  /**
   * 음성 목록 로드
   */
  private loadVoices(): void {
    if (!this.synthesis) return;

    const loadVoicesImpl = () => {
      this.voices = this.synthesis!.getVoices();
    };

    loadVoicesImpl();

    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoicesImpl;
    }
  }

  /**
   * 일본어 음성 찾기
   */
  private getJapaneseVoice(): SpeechSynthesisVoice | null {
    const preferredVoices = ttsConfig.preferredVoices.textToSpeech;

    // 우선순위에 따라 음성 찾기
    for (const voiceName of preferredVoices) {
      const voice = this.voices.find(v => v.name.includes(voiceName));
      if (voice) return voice;
    }

    // 일본어 음성 찾기 (언어 코드 기반)
    const japaneseVoice = this.voices.find(voice =>
      ttsConfig.languagePatterns.japanese.some(pattern =>
        voice.lang.startsWith('ja') || voice.lang.includes(pattern)
      )
    );

    return japaneseVoice || null;
  }

  /**
   * 히라가나/가타카나 발음
   */
  speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: Error) => void;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // 기존 음성 중지
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const japaneseVoice = this.getJapaneseVoice();

      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
        utterance.lang = japaneseVoice.lang;
      } else {
        // 일본어 음성이 없으면 기본 설정
        utterance.lang = ttsConfig.defaultSettings.language;
      }

      // 옵션 설정
      utterance.rate = options.rate ?? ttsConfig.defaultSettings.rate;
      utterance.pitch = options.pitch ?? ttsConfig.defaultSettings.pitch.default;
      utterance.volume = options.volume ?? ttsConfig.defaultSettings.volume;

      // 이벤트 핸들러
      utterance.onend = () => {
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        // canceled, interrupted, not-allowed는 정상적인 동작이므로 에러로 처리하지 않음
        if (event.error === 'canceled' || event.error === 'interrupted' || event.error === 'not-allowed') {
          resolve();
          return;
        }

        const error = new Error(`Speech synthesis failed: ${event.error}`);
        options.onError?.(error);
        reject(error);
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * 로마지 발음 (영어)
   */
  speakRomaji(romaji: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: Error) => void;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(romaji);
      utterance.lang = ttsConfig.languagePatterns.romaji.language;
      utterance.rate = options.rate ?? ttsConfig.languagePatterns.romaji.rate;
      utterance.pitch = options.pitch ?? ttsConfig.defaultSettings.pitch.default;
      utterance.volume = options.volume ?? ttsConfig.defaultSettings.volume;

      utterance.onend = () => {
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        // canceled, interrupted, not-allowed는 정상적인 동작이므로 에러로 처리하지 않음
        if (event.error === 'canceled' || event.error === 'interrupted' || event.error === 'not-allowed') {
          resolve();
          return;
        }

        const error = new Error(`Speech synthesis failed: ${event.error}`);
        options.onError?.(error);
        reject(error);
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * 음성 재생 중지
   */
  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * 음성 지원 여부 확인
   */
  isSupported(): boolean {
    return !!this.synthesis;
  }

  /**
   * 일본어 음성 지원 여부 확인
   */
  hasJapaneseVoice(): boolean {
    return !!this.getJapaneseVoice();
  }

  /**
   * 사용 가능한 일본어 음성 목록 반환
   */
  getAvailableJapaneseVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice =>
      ttsConfig.languagePatterns.japanese.some(pattern =>
        voice.lang.startsWith('ja') || voice.lang.includes(pattern)
      )
    );
  }
}