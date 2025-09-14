"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navigation.module.css";

const navigationItems = [
  {
    path: "/",
    label: "홈",
    imageUrl: "/home_icon.png",
  },
  {
    path: "/study",
    label: "학습",
    imageUrl: "/pencil_icon.png",
    badge: 3,
  },
  {
    path: "/profile",
    label: "전체",
    imageUrl: "/sample_icon.png",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        {navigationItems.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
          >
            <div className={styles.iconContainer}>
              <Image src={item.imageUrl} width={18} height={18} alt="navigation 대체 이미지" />
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </div>
            <span className={styles.label}>{item.label}</span>

            {/* 활성 상태 인디케이터 */}
            {pathname === item.path && <div className={styles.activeIndicator} />}
          </Link>
        ))}
      </div>

      {/* 안전 영역을 위한 패딩 */}
      <div className={styles.safeArea} />
    </div>
  );
}
