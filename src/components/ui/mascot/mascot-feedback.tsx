"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { MASCOT_CONFIGS, PARTICLE_CONFIGS } from "@/mock/mascot-mock";

import styles from "./mascot-feedback.module.css";

export type MascotType = 'success' | 'error' | 'thinking' | 'celebrating' | 'encouraging' | 'hint';

interface MascotConfig {
  imageSrc: string;
  imageAlt: string;
  defaultMessage: string;
  animationClass: string;
  showParticles?: boolean;
  particleType?: string;
}

interface MascotFeedbackProps {
  type: MascotType;
  message?: string;
  visible: boolean;
  duration?: number; // 표시 시간 (ms), 0이면 수동으로 닫기
  onHide?: () => void;
  className?: string;
  position?: 'center' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large';
  showCloseHint?: boolean;
  customImage?: {
    src: string;
    alt: string;
  };
}


export default function MascotFeedback({
  type,
  message,
  visible,
  duration = 3000,
  onHide,
  className = "",
  position = 'center',
  size = 'medium',
  showCloseHint = true,
  customImage,
}: MascotFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const handleHide = () => {
    setAnimationClass(styles.fadeOut || '');
    setTimeout(() => {
      setIsVisible(false);
      setAnimationClass('');
      onHide?.();
    }, 300);
  };

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setAnimationClass(styles.fadeIn || '');

      if (duration > 0) {
        const timer = setTimeout(() => {
          setAnimationClass(styles.fadeOut || '');
          setTimeout(() => {
            setIsVisible(false);
            setAnimationClass('');
            onHide?.();
          }, 300);
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setAnimationClass(styles.fadeOut || '');
      setTimeout(() => {
        setIsVisible(false);
        setAnimationClass('');
        onHide?.();
      }, 300);
    }
    // onHide는 의존성에서 제외 (부모 컴포넌트에서 변경될 수 있음)
  }, [visible, duration]);

  const config = MASCOT_CONFIGS[type];
  const imageSrc = customImage?.src || config.imageSrc;
  const imageAlt = customImage?.alt || config.imageAlt;
  const displayMessage = message || config.defaultMessage;

  // 이미지 크기 설정
  const getImageSize = (size: string) => {
    switch (size) {
      case 'small':
        return { width: 80, height: 80 };
      case 'large':
        return { width: 160, height: 160 };
      default:
        return { width: 120, height: 120 };
    }
  };

  const imageSize = getImageSize(size);

  if (!isVisible) return null;

  return (
    <div
      className={`
        ${styles.overlay}
        ${styles[position]}
        ${styles[size]}
        ${animationClass}
        ${className}
      `.trim()}
      onClick={handleHide}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mascot-message"
    >
      <div className={`${styles.mascotContainer} ${styles[type]}`}>
        <div className={`${styles.mascot} ${styles[config.animationClass]}`}>
          {/* 마스코트 이미지 */}
          <div className={styles.mascotImage}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageSize.width}
              height={imageSize.height}
              priority={type === 'success' || type === 'error'} // 자주 사용되는 이미지 우선 로드
              className={styles.image}
              sizes={`${imageSize.width}px`}
            />
          </div>

          {/* 말풍선 */}
          <div className={styles.speechBubble}>
            <div className={styles.bubbleContent} id="mascot-message">
              {displayMessage}
            </div>
            <div className={styles.bubbleArrow}></div>
          </div>
        </div>

        {/* 파티클 효과 */}
        {config.showParticles && config.particleType && (
          <ParticleEffect type={config.particleType} />
        )}

        {/* 클릭하여 닫기 안내 */}
        {showCloseHint && (
          <div className={styles.closeHint}>
            화면을 터치하여 계속하기
          </div>
        )}
      </div>
    </div>
  );
}

// 파티클 효과 컴포넌트 분리
interface ParticleEffectProps {
  type: string;
}

function ParticleEffect({ type }: ParticleEffectProps) {
  const particleConfig = PARTICLE_CONFIGS[type as keyof typeof PARTICLE_CONFIGS];

  if (!particleConfig) return null;

  return (
    <div className={styles.particles}>
      {Array.from({ length: particleConfig.count }).map((_, i) => (
        <div
          key={i}
          className={`${styles.particle} ${styles[`particle${i + 1}`]}`}
          style={{
            '--particle-delay': `${i * 0.1}s`,
          } as React.CSSProperties}
        >
          {particleConfig.emoji}
        </div>
      ))}
    </div>
  );
}

// Hook for easy usage
export function useMascotFeedback() {
  const [feedback, setFeedback] = useState<{
    type: MascotType;
    message?: string;
    visible: boolean;
  }>({
    type: 'success',
    visible: false,
  });

  const showFeedback = (type: MascotType, message?: string, _duration?: number) => {
    setFeedback({ type, message, visible: true });
  };

  const hideFeedback = () => {
    setFeedback(prev => ({ ...prev, visible: false }));
  };

  return {
    feedback,
    showFeedback,
    hideFeedback,
  };
}