"use client";

import { ArrowBack, ArrowForward, ArrowBack as PrevIcon } from "@mui/icons-material";
import { Typography, IconButton, LinearProgress } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useCallback } from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";
import WritingCanvas from "@/components/canvas";

import styles from "./page.module.css";

const katakanaGroups: Record<string, { name: string; characters: string[] }> = {
  a: { name: "ア단", characters: ["ア", "イ", "ウ", "エ", "オ"] },
  ka: { name: "カ단", characters: ["カ", "キ", "ク", "ケ", "コ"] },
  sa: { name: "サ단", characters: ["サ", "シ", "ス", "セ", "ソ"] },
  ta: { name: "タ단", characters: ["タ", "チ", "ツ", "テ", "ト"] },
  na: { name: "ナ단", characters: ["ナ", "ニ", "ヌ", "ネ", "ノ"] },
  ha: { name: "ハ단", characters: ["ハ", "ヒ", "フ", "ヘ", "ホ"] },
  ma: { name: "マ단", characters: ["マ", "ミ", "ム", "メ", "モ"] },
  ya: { name: "ヤ행", characters: ["ヤ", "ユ", "ヨ"] },
  ra: { name: "ラ단", characters: ["ラ", "リ", "ル", "レ", "ロ"] },
  wa: { name: "ワ행", characters: ["ワ", "ヲ", "ン"] },
  dakuten: {
    name: "탁음",
    characters: ["ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ"],
  },
  handakuten: { name: "반탁음", characters: ["パ", "ピ", "プ", "ペ", "ポ"] },
};

export default function KatakanaGroupPage() {
  const router = useRouter();
  const params = useParams();
  const groupKey = params?.group as string;

  const currentGroup = katakanaGroups[groupKey];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);

  const handleBackClick = useCallback(() => {
    router.push("/study/katakana");
  }, [router]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setHasDrawing(false);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentGroup && currentIndex < currentGroup.characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasDrawing(false);
    }
  }, [currentGroup, currentIndex]);

  const handleDrawingComplete = useCallback((drawing: boolean) => {
    setHasDrawing(drawing);
  }, []);

  const handleComplete = useCallback(() => {
    // 학습 완료 처리 (향후 진도 저장 등)
    router.push("/study/katakana");
  }, [router]);

  if (!currentGroup) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <Typography variant="h6">잘못된 그룹입니다.</Typography>
          <ActionButton text="돌아가기" onClick={handleBackClick} />
        </div>
      </div>
    );
  }

  const currentCharacter = currentGroup.characters[currentIndex];
  const progress = ((currentIndex + 1) / currentGroup.characters.length) * 100;
  const isLastCharacter = currentIndex === currentGroup.characters.length - 1;

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <IconButton onClick={handleBackClick} className={styles.backButton}>
            <ArrowBack />
          </IconButton>
          <div className={styles.headerContent}>
            <Typography variant="h5" className={styles.title}>
              {currentGroup.name} 학습
            </Typography>
            <Typography variant="body2" className={styles.subtitle}>
              {currentIndex + 1} / {currentGroup.characters.length}
            </Typography>
          </div>
        </div>

        {/* 진행도 바 */}
        <div className={styles.progressSection}>
          <LinearProgress variant="determinate" value={progress} className={styles.progressBar} />
          <Typography variant="caption" className={styles.progressText}>
            {Math.round(progress)}% 완료
          </Typography>
        </div>
      </div>

      {/* 학습 영역 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.learningCard}
      >
          {/* 현재 문자 표시 */}
          <div className={styles.characterDisplay}>
            <Typography variant="h2" className={styles.currentCharacter}>
              {currentCharacter}
            </Typography>
          </div>

          {/* Canvas 영역 */}
          <div className={styles.canvasSection}>
            <WritingCanvas
              character={currentCharacter}
              width={300}
              height={300}
              onDrawingComplete={handleDrawingComplete}
              className={styles.canvas}
            />
          </div>

          {/* 안내 텍스트 */}
          <div className={styles.instructionText}>
            <Typography variant="body1" className={styles.instruction}>
              위의 문자를 보고 따라 그려보세요
            </Typography>
          </div>
      </Card>

      {/* 네비게이션 */}
      <div className={styles.navigation}>
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={styles.navButton}
        >
          <PrevIcon />
        </IconButton>

        <div className={styles.characterList}>
          {currentGroup.characters.map((char, index) => (
            <button
              key={index}
              className={`${styles.characterButton} ${
                index === currentIndex ? styles.active : ""
              } ${index < currentIndex ? styles.completed : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              {char}
            </button>
          ))}
        </div>

        <IconButton onClick={handleNext} disabled={isLastCharacter} className={styles.navButton}>
          <ArrowForward />
        </IconButton>
      </div>

      {/* 완료 버튼 */}
      {isLastCharacter && (
        <div className={styles.completeSection}>
          <ActionButton
            text="학습 완료"
            variant={hasDrawing ? "primary" : "locked"}
            disabled={!hasDrawing}
            onClick={handleComplete}
          />
        </div>
      )}
    </div>
  );
}
