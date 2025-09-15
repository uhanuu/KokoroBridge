"use client";

import { Badge, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Image from "next/image";
import styles from "./header.module.css";

interface HeaderProps {
  notificationCount?: number;
}

export default function Header({ notificationCount = 3 }: HeaderProps) {
  const handleNotificationClick = () => {
    // 알림 처리 로직 구현 예정
    console.log("Notification clicked");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 왼쪽 캐릭터 이미지 */}
        <div className={styles.leftSection}>
          <div className={styles.characterContainer}>
            <Image
              src="/character.png"
              width={40}
              height={40}
              alt="캐릭터"
              className={styles.characterImage}
            />
          </div>
        </div>

        {/* 오른쪽 알림 버튼 */}
        <div className={styles.rightSection}>
          <IconButton
            onClick={handleNotificationClick}
            className={styles.notificationButton}
            size="medium"
          >
            <Badge
              badgeContent={notificationCount}
              classes={{ badge: styles.badge }}
            >
              <Notifications className={styles.notificationIcon} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </header>
  );
}