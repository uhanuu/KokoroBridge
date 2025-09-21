"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useCallback, useMemo } from "react";

import PremiumWritingCanvas from "@/components/canvas/premium-writing-canvas";
import { katakanaGroups } from "@/mock/katakana-mock";

import styles from "./page.module.css";

export default function KatakanaGroupPage() {
  const router = useRouter();
  const params = useParams();
  const groupKey = params?.group as string;

  const [currentIndex, setCurrentIndex] = useState(0);

  // 현재 그룹 찾기
  const currentGroup = useMemo(() => {
    return katakanaGroups.find(group => {
      const routeParts = group.route.split('/');
      return routeParts[routeParts.length - 1] === groupKey;
    });
  }, [groupKey]);

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

  const handleComplete = useCallback((accuracy: number) => {
    console.log(`Character completed with accuracy: ${accuracy}`);
  }, []);

  if (!currentGroup) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <h2>잘못된 그룹입니다.</h2>
          <button onClick={() => router.push("/study/katakana")}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentCharacter = currentGroup.characters[currentIndex];

  return (
    <div className={styles.container}>
      <PremiumWritingCanvas
        character={currentCharacter}
        onComplete={handleComplete}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentIndex < currentGroup.characters.length - 1}
        hasPrevious={currentIndex > 0}
        currentIndex={currentIndex}
        totalCount={currentGroup.characters.length}
      />
    </div>
  );
}