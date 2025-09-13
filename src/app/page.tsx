"use client";

import React, { useState } from "react";

import styles from "@/app/page.module.css";
import CanvasBoard from "@/components/canvas-board";
import CharacterDisplay from "@/components/character-display";
import Controls from "@/components/controls";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import ProgressBar from "@/components/progress-bar";
import StrokeOrder from "@/components/stroke-order";
import { hiraganaData, katakanaData } from "@/mock/kana";

const KanaPracticePage: React.FC = () => {
  const [currentKanaIndex, setCurrentKanaIndex] = useState(0);
  const [currentMode, setCurrentMode] = useState<"hiragana" | "katakana">("hiragana");
  const [showStrokeOrder, setShowStrokeOrder] = useState(true);
  const currentData = currentMode === "hiragana" ? hiraganaData : katakanaData;

  const currentKana: KanaData = currentData[currentKanaIndex] ?? {
    char: "",
    romaji: "",
    type: currentMode,
    strokes: [],
  };

  return (
    <div className={styles.container}>
      <Header
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        showStrokeOrder={showStrokeOrder}
        setShowStrokeOrder={setShowStrokeOrder}
      />
      <ProgressBar currentIndex={currentKanaIndex} total={currentData.length} />
      <CharacterDisplay currentKana={currentKana} />
      {showStrokeOrder && <StrokeOrder strokes={currentKana.strokes} />}
      <CanvasBoard />
      <Controls />
      <Navigation
        currentIndex={currentKanaIndex}
        total={currentData.length}
        setCurrentIndex={setCurrentKanaIndex}
      />
    </div>
  );
};

export default KanaPracticePage;
