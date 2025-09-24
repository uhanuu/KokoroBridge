"use client";

import { Settings, ArrowBack } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import React, { useState, useCallback } from "react";
import Image from "next/image";

import Card from "@/components/ui/card";
import SectionCard from "@/components/ui/section-card";
import { mockAchievements } from "@/mock/profile-mock";
import { getMascotImage } from "@/mock/profile-info-mock";
import ProfileContent from "./profile-content";
import SettingsContent from "./settings-content";
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [achievementFilter, setAchievementFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const handleAchievementFilterChange = useCallback(
    (filter: "all" | "completed" | "incomplete") => {
      setAchievementFilter(filter);
    },
    []
  );

  const handleSettingsClick = useCallback(() => {
    console.log('Settings clicked, isFlipped:', !isFlipped);
    setIsFlipped(true);
  }, [isFlipped]);

  const handleBackClick = useCallback(() => {
    console.log('Back clicked, isFlipped:', isFlipped);
    setIsFlipped(false);
  }, [isFlipped]);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleNotificationsToggle = useCallback(() => {
    setNotifications((prev) => !prev);
  }, []);

  const handleActionClick = useCallback((_action: string) => {
    // console.log(`${action} clicked`);
  }, []);

  const filteredAchievements = mockAchievements
    .filter((achievement) => {
      if (achievementFilter === "completed") return achievement.isCompleted;
      if (achievementFilter === "incomplete") return !achievement.isCompleted;
      return true;
    })
    .sort((a, b) => {
      if (achievementFilter === "all" || achievementFilter === "completed") {
        if (a.isCompleted && !b.isCompleted) return -1;
        if (!a.isCompleted && b.isCompleted) return 1;

        if (a.isCompleted && b.isCompleted) {
          if (a.date && !b.date) return -1;
          if (!a.date && b.date) return 1;
          if (a.date && b.date) {
            const parseKoreanDate = (dateStr: string) => {
              const match = dateStr.match(/(\\d+)년\\s*(\\d+)월\\s*(\\d+)일/);
              if (match && match[1] && match[2] && match[3]) {
                const year = parseInt(match[1]);
                const month = parseInt(match[2]);
                const day = parseInt(match[3]);
                return new Date(year, month - 1, day);
              }
              return new Date(0);
            };

            const dateA = parseKoreanDate(a.date);
            const dateB = parseKoreanDate(b.date);
            return dateB.getTime() - dateA.getTime();
          }
        }
      }

      return a.id - b.id;
    });

  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="xl"
      className={styles.profileCard}
    >
      <div className={styles.profileContent}>
        {/* 설정/뒤로가기 버튼 */}
        <div className={styles.settingsButton}>
          <IconButton
            className={styles.settingsIcon}
            onClick={isFlipped ? handleBackClick : handleSettingsClick}
          >
            {isFlipped ? (
              <ArrowBack className={styles.settingsIconSvg} />
            ) : (
              <Settings className={styles.settingsIconSvg} />
            )}
          </IconButton>
        </div>

        <div className={styles.profileMainSection}>
          {/* 프로필 정보 섹션 */}
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

          {!isFlipped ? (
            <ProfileContent
              profile={profile}
              achievementFilter={achievementFilter}
              filteredAchievements={filteredAchievements}
              onAchievementFilterChange={handleAchievementFilterChange}
            />
          ) : (
            <SectionCard
              className={styles.settingsMainCard}
            >
              <SettingsContent
                darkMode={darkMode}
                notifications={notifications}
                onDarkModeToggle={handleDarkModeToggle}
                onNotificationsToggle={handleNotificationsToggle}
                onActionClick={handleActionClick}
              />
            </SectionCard>
          )}
        </div>
      </div>
    </Card>
  );
}