"use client";

import { Home, School, Person, Notifications } from "@mui/icons-material";
import { Badge } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navigation.module.css";

const navigationItems = [
  {
    path: "/",
    label: "홈",
    Icon: Home,
  },
  {
    path: "/study",
    label: "학습",
    Icon: School,
  },
  {
    path: "/news",
    label: "새소식",
    Icon: Notifications,
    hasNotification: true,
    notificationCount: 3,
  },
  {
    path: "/profile",
    label: "프로필",
    Icon: Person,
  },
];

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
                  classes={{ badge: styles.notificationBadge }}
                  sx={{
                    '& .MuiBadge-badge': {
                      animation: 'none !important',
                    }
                  }}
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
