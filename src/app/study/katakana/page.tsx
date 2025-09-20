"use client";

import React from "react";

import StudyCharacterPage from "@/components/study-character-page";
import { katakanaGroups } from "@/mock/katakana-mock";

export default function KatakanaPage() {
  return (
    <StudyCharacterPage
      title="카타카나"
      subtitle="학습할 그룹을 선택하세요"
      swipeText="좌우로 드래그하여 그룹을 탐색하세요"
      groups={katakanaGroups}
      backRoute="/study"
    />
  );
}