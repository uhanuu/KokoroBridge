export type MascotType = 'success' | 'error' | 'thinking' | 'celebrating' | 'encouraging' | 'hint';

interface MascotConfig {
  imageSrc: string;
  imageAlt: string;
  defaultMessage: string;
  animationClass: string;
  showParticles?: boolean;
  particleType?: string;
}

export const MASCOT_CONFIGS: Record<MascotType, MascotConfig> = {
  success: {
    imageSrc: '/images/mascot/success.png',
    imageAlt: '성공한 마스코트',
    defaultMessage: '잘했어요! 👏',
    animationClass: 'bounce',
    showParticles: true,
    particleType: 'star',
  },
  error: {
    imageSrc: '/images/mascot/error.png',
    imageAlt: '실망한 마스코트',
    defaultMessage: '다시 한번 시도해보세요!',
    animationClass: 'shake',
  },
  thinking: {
    imageSrc: '/images/mascot/thinking.png',
    imageAlt: '생각하는 마스코트',
    defaultMessage: '생각중...',
    animationClass: 'thinking',
  },
  celebrating: {
    imageSrc: '/images/mascot/celebrating.png',
    imageAlt: '축하하는 마스코트',
    defaultMessage: '완벽해요! 🎊',
    animationClass: 'celebrate',
    showParticles: true,
    particleType: 'confetti',
  },
  encouraging: {
    imageSrc: '/images/mascot/encouraging.png',
    imageAlt: '응원하는 마스코트',
    defaultMessage: '힘내세요! 거의 다 왔어요!',
    animationClass: 'cheer',
  },
  hint: {
    imageSrc: '/images/mascot/hint.png',
    imageAlt: '힌트를 주는 마스코트',
    defaultMessage: '힌트를 확인해보세요!',
    animationClass: 'point',
  },
};

export const PARTICLE_CONFIGS = {
  star: {
    emoji: '✨',
    count: 8,
  },
  confetti: {
    emoji: '🎊',
    count: 12,
  },
  heart: {
    emoji: '💖',
    count: 6,
  },
};