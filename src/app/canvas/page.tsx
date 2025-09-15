"use client";
import { useEffect } from "react";

import CanvasBoard from "@/components/canvas-board/canvas-board";

import styles from "./page.module.css";

export default function Page() {
  useEffect(() => {
    // content 영역만 스크롤 방지 (layout 구조 유지)
    const contentElement = document.querySelector('.content');
    if (contentElement) {
      (contentElement as HTMLElement).style.overflow = "hidden";
    }

    return () => {
      // 페이지 벗어날 때 복구
      const contentElement = document.querySelector('.content');
      if (contentElement) {
        (contentElement as HTMLElement).style.overflow = "";
      }
    };
  }, []);

  return (
    <div className={styles.cnavas_container}>
      <CanvasBoard />
    </div>
  );
}
