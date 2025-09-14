import Navigation from "@/components/ui/navigation/navigation";

import "./globals.css";
import styles from "./layout.module.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${styles.container}`}>
        <div>
          {/* 메인 콘텐츠 영역 */}
          <main className={styles.content}>
            <div className={styles.contentWrapper}>{children}</div>
          </main>

          {/* 하단 네비게이션 */}
          <Navigation />
        </div>
      </body>
    </html>
  );
}
