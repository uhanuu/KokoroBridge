"use client";

import { Badge } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/mock/navigation-mock";

import styles from "./navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
          >
            {item.hasNotification ? (
              <div className={styles.notificationContainer}>
                <Badge
                  badgeContent={item.notificationCount}
                  className={styles.customBadge}
                >
                  <item.Icon className={styles.icon} />
                </Badge>
              </div>
            ) : (
              <item.Icon className={styles.icon} />
            )}
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* 안전 영역을 위한 패딩 */}
      <div className={styles.safeArea} />
    </div>
  );
}
