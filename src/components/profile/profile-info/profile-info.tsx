"use client";

import {
  Settings,
  LocalFireDepartment,
  Schedule,
  Book,
  EmojiEvents
} from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import React from "react";
import Image from "next/image";

import Card from "@/components/ui/card";
import styles from "./profile-info.module.css";

interface UserProfile {
  name: string;
  email: string;
  level: number;
  joinDate: string;
  streak: number;
  avatar?: string;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
}

interface ProfileInfoProps {
  profile: UserProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  // 레벨에 따른 마스코트 이미지 선택
  const getMascotImage = (level: number) => {
    if (level >= 10) return "/good-character.png";
    if (level >= 5) return "/start-study-character.png";
    return "/home-character.png";
  };

  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="xl"
      className={styles.profileCard}
    >
      <div className={styles.profileContent}>
        {/* 설정 버튼 */}
        <div className={styles.settingsButton}>
          <IconButton className={styles.settingsIcon}>
            <Settings className={styles.settingsIconSvg} />
          </IconButton>
        </div>

        {/* 프로필 정보 통합 섹션 */}
        <div className={styles.profileMainSection}>
          <div className={styles.profileInfoSection}>
            {/* 마스코트 이미지 */}
            <div className={styles.mascotImageWrapper}>
              <Image
                src={getMascotImage(profile.level)}
                alt="Mascot Character"
                width={80}
                height={80}
                className={styles.mascotImage}
              />
            </div>

            {/* 사용자 정보 */}
            <div className={styles.userInfoSection}>
              <Typography variant="h5" className={styles.userName}>
                {profile.name}
              </Typography>
              <Typography variant="body2" className={styles.userEmail}>
                {profile.email}
              </Typography>
              <Typography variant="caption" className={styles.userJoinDate}>
                {profile.joinDate} 가입
              </Typography>
            </div>
          </div>

          {/* 학습 통계 버튼들 */}
          <div className={styles.statsButtonsSection}>
            <div className={styles.statsButton}>
              <div className={styles.statsIcon}>
                <LocalFireDepartment />
              </div>
              <div className={styles.statsInfo}>
                <Typography variant="caption" className={styles.statsLabel}>
                  연속 학습일
                </Typography>
                <Typography variant="h6" className={styles.statsValue}>
                  {profile.streak}
                </Typography>
              </div>
            </div>

            <div className={styles.statsButton}>
              <div className={styles.statsIcon}>
                <EmojiEvents />
              </div>
              <div className={styles.statsInfo}>
                <Typography variant="caption" className={styles.statsLabel}>
                  최장 연속일
                </Typography>
                <Typography variant="h6" className={styles.statsValue}>
                  18일
                </Typography>
              </div>
            </div>

            <div className={styles.statsButton}>
              <div className={styles.statsIcon}>
                <Book />
              </div>
              <div className={styles.statsInfo}>
                <Typography variant="caption" className={styles.statsLabel}>
                  완료한 레슨
                </Typography>
                <Typography variant="h6" className={styles.statsValue}>
                  156
                </Typography>
              </div>
            </div>

            <div className={styles.statsButton}>
              <div className={styles.statsIcon}>
                <Schedule />
              </div>
              <div className={styles.statsInfo}>
                <Typography variant="caption" className={styles.statsLabel}>
                  총 학습 시간
                </Typography>
                <Typography variant="h6" className={styles.statsValue}>
                  48h
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}