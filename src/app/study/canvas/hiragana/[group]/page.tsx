"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";

import { EnhancedWritingCanvas } from "@/components/canvas";
import StudyCanvasHeader from "@/components/ui/header/study-canvas-header";
import { ValidationResult } from "@/services/stroke-validation.service";
import { ttsService } from "@/services/tts.service";

import styles from "./page.module.css";

const hiraganaGroups: Record<string, { name: string; characters: string[] }> = {
  a: { name: "あ단", characters: ["あ", "い", "う", "え", "お"] },
  ka: { name: "か단", characters: ["か", "き", "く", "け", "こ"] },
  sa: { name: "さ단", characters: ["さ", "し", "す", "せ", "そ"] },
  ta: { name: "た단", characters: ["た", "ち", "つ", "て", "と"] },
  na: { name: "な단", characters: ["な", "に", "ぬ", "ね", "の"] },
  ha: { name: "は단", characters: ["は", "ひ", "ふ", "へ", "ほ"] },
  ma: { name: "ま단", characters: ["ま", "み", "む", "め", "も"] },
  ya: { name: "や행", characters: ["や", "ゆ", "よ"] },
  ra: { name: "ら단", characters: ["ら", "り", "る", "れ", "ろ"] },
  wa: { name: "わ행", characters: ["わ", "を", "ん"] },
  dakuten: {
    name: "탁음",
    characters: ["が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ"],
  },
  handakuten: { name: "반탁음", characters: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"] },
};

export default function HiraganaGroupPage() {
  const router = useRouter();
  const params = useParams();
  const groupKey = params?.group as string;

  const currentGroup = hiraganaGroups[groupKey];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCharacters, setCompletedCharacters] = useState<Set<number>>(new Set());

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentGroup && currentIndex < currentGroup.characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentGroup, currentIndex]);

  const handleValidationResult = useCallback((result: ValidationResult) => {
    if (result.isCorrect && result.completedStrokes === result.totalStrokes) {
      // 현재 문자를 완료로 표시
      setCompletedCharacters(prev => new Set([...prev, currentIndex]));
    }
  }, [currentIndex]);

  const handleCharacterComplete = useCallback(async () => {
    // 완료 사운드 재생
    try {
      await ttsService.speak('よくできました', { rate: 0.9, pitch: 1.1 }); // "잘했습니다"
    } catch (error) {
      console.error('TTS Error:', error);
    }

    // 자동으로 다음 문자로 이동 (마지막 문자가 아닌 경우)
    setTimeout(() => {
      if (currentIndex < (currentGroup?.characters.length || 0) - 1) {
        handleNext();
      } else {
        // 모든 문자 완료시 완료 페이지로 이동
        router.push("/study/hiragana");
      }
    }, 2000);
  }, [currentIndex, currentGroup, handleNext, router]);

  if (!currentGroup) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <h2>잘못된 그룹입니다.</h2>
          <button onClick={() => router.push("/study/hiragana")}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentCharacter = currentGroup.characters[currentIndex];
  const completedCount = completedCharacters.size;
  const progress = (completedCount / currentGroup.characters.length) * 100;

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <StudyCanvasHeader
        title={`${currentGroup.name} 학습`}
        subtitle={currentCharacter}
        currentIndex={currentIndex}
        totalCount={currentGroup.characters.length}
        progress={progress}
        backRoute="/study/hiragana"
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < currentGroup.characters.length - 1}
      />

      {/* 캔버스 영역 */}
      <div className={styles.canvasContainer}>
        <EnhancedWritingCanvas
          character={currentCharacter || ""}
          onValidationResult={handleValidationResult}
          onCharacterComplete={handleCharacterComplete}
          autoPlayTTS={true}
          showStrokeDemo={true}
          className={styles.canvas}
        />
      </div>
    </div>
  );
}
