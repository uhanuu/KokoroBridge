import Navigation from "@/components/ui/navigation/navigation";

import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        <div className={styles.container}>
          {/* 헤더 */}

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
