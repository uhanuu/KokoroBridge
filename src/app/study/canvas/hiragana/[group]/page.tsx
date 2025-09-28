"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useCallback, useMemo } from "react";

import FullscreenStrokeCanvas from "@/components/canvas/fullscreen-stroke-canvas";
import GroupCompletionModal from "@/components/ui/modal/group-completion-modal";
import { hiraganaGroups } from "@/mock/hiragana-mock";
import { hiraganaStrokeData, CharacterStrokeData, StrokePoint } from "@/mock/study-canvas-mock";

import styles from "./page.module.css";

export default function HiraganaGroupPage() {
  const router = useRouter();
  const params = useParams();
  const groupKey = params?.group as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGroupCompletionModal, setShowGroupCompletionModal] = useState(false);
  const [groupAccuracyHistory, setGroupAccuracyHistory] = useState<number[]>([]);

  // 현재 그룹 찾기
  const currentGroup = useMemo(() => {
    return hiraganaGroups.find((group) => {
      const routeParts = group.route.split("/");
      return routeParts[routeParts.length - 1] === groupKey;
    });
  }, [groupKey]);

  // 획순 데이터 매핑
  const strokeDataMap = useMemo(() => {
    const map = new Map<string, CharacterStrokeData>();
    hiraganaStrokeData.forEach(data => {
      map.set(data.char, data);
    });
    return map;
  }, []);

  const handlePrevious = useCallback(() => {
    // console.log('Previous clicked, currentIndex:', currentIndex);i
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    // console.log('Next clicked, currentIndex:', currentIndex, 'total:', currentGroup?.characters.length);
    if (currentGroup && currentIndex < currentGroup.characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentGroup, currentIndex]);

  const handleComplete = useCallback((accuracy: number) => {
    // 비동기적으로 상태 업데이트 처리
    const isLastCharacter = currentGroup && currentIndex === currentGroup.characters.length - 1;

    // 다음 렌더 사이클에서 상태 업데이트
    setTimeout(() => {
      const newAccuracyHistory = [...groupAccuracyHistory, Math.round(accuracy * 100)];
      setGroupAccuracyHistory(newAccuracyHistory);

      // 마지막 문자 완료시는 성공 모달이 자동으로 사라진 후 그룹 완료 모달 표시
      if (isLastCharacter) {
        // 성공 모달이 1.5초 후에 사라지므로 그에 맞춰 조정 (1.5초 + 애니메이션 시간 + 여유시간)
        setTimeout(() => {
          setShowGroupCompletionModal(true);
        }, 2000);
      }
    }, 0);
  }, [currentGroup, currentIndex, groupAccuracyHistory]);

  const handleBack = useCallback(() => {
    router.push("/study/hiragana");
  }, [router]);

  // 그룹 완료 모달 핸들러들
  const handleNextGroup = useCallback(() => {
    if (!currentGroup) return;
    const currentGroupIndex = hiraganaGroups.findIndex(group => group.id === currentGroup.id);
    const nextGroup = hiraganaGroups[currentGroupIndex + 1];
    if (nextGroup) {
      router.push(nextGroup.route);
    }
  }, [currentGroup, router]);

  const handleRestartGroup = useCallback(() => {
    setCurrentIndex(0);
    setGroupAccuracyHistory([]);
    setShowGroupCompletionModal(false);
  }, []);

  const handleBackToSelection = useCallback(() => {
    router.push("/study/hiragana");
  }, [router]);

  const handleCloseGroupModal = useCallback(() => {
    setShowGroupCompletionModal(false);
  }, []);

  if (!currentGroup) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <h2>잘못된 그룹입니다.</h2>
          <button onClick={() => router.push("/study/hiragana")}>돌아가기</button>
        </div>
      </div>
    );
  }

  const currentCharacter = currentGroup.characters[currentIndex];

  // 안전성 체크
  if (!currentCharacter) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <h2>문자를 찾을 수 없습니다.</h2>
          <button onClick={handleBack}>돌아가기</button>
        </div>
      </div>
    );
  }

  // 획순 데이터 가져오기 (없으면 기본값 사용)
  const baseStrokeData = strokeDataMap.get(currentCharacter.char);
  const strokeData: CharacterStrokeData = baseStrokeData || {
    char: currentCharacter.char,
    romaji: currentCharacter.romaji,
    type: "hiragana",
    completed: currentCharacter.completed || false,
    strokeCount: (currentCharacter as { strokeOrder?: unknown[] }).strokeOrder?.length || 1,
    strokes: (currentCharacter as { strokePoints?: StrokePoint[][] }).strokePoints || [],
    animationFrames: [],
    difficulty: "medium",
    practiceCount: 0,
    accuracy: 0
  };

  // 다음 그룹 존재 여부 확인
  const currentGroupIndex = hiraganaGroups.findIndex(group => group.id === currentGroup.id);
  const hasNextGroup = currentGroupIndex < hiraganaGroups.length - 1;
  const averageAccuracy = groupAccuracyHistory.length > 0
    ? Math.round(groupAccuracyHistory.reduce((sum, acc) => sum + acc, 0) / groupAccuracyHistory.length)
    : 0;

  return (
    <>
      <FullscreenStrokeCanvas
        character={strokeData}
        onComplete={handleComplete}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onBack={handleBack}
        hasNext={currentIndex < currentGroup.characters.length - 1}
        hasPrevious={currentIndex > 0}
        currentIndex={currentIndex}
        totalCount={currentGroup.characters.length}
      />

      <GroupCompletionModal
        isOpen={showGroupCompletionModal}
        groupName={currentGroup.name}
        totalCharacters={currentGroup.characters.length}
        averageAccuracy={averageAccuracy}
        hasNextGroup={hasNextGroup}
        characterType="hiragana"
        onNextGroup={handleNextGroup}
        onRestartGroup={handleRestartGroup}
        onBackToSelection={handleBackToSelection}
        onClose={handleCloseGroupModal}
      />
    </>
  );
}
