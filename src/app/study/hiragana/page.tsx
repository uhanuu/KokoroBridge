"use client";

import React from "react";

import StudyCharacterPage from "@/components/study-character-page";
import { hiraganaGroups } from "@/mock/hiragana-mock";

export default function HiraganaPage() {
  return (
    <StudyCharacterPage
      title="히라가나"
      subtitle="학습할 그룹을 선택하세요"
      swipeText="좌우로 드래그하여 그룹을 탐색하세요"
      groups={hiraganaGroups}
      backRoute="/study"
    />
  );
}