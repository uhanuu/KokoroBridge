"use client";

import { Star, Whatshot, CalendarMonth } from "@mui/icons-material";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import React from "react";

import styles from "./profile-info.module.css";

interface UserProfile {
  name: string;
  email: string;
  level: string;
  joinDate: string;
  streak: number;
  avatar?: string;
}

interface ProfileInfoProps {
  profile: UserProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <Card className={`${styles.card} ${styles.profileCard}`}>
      <CardContent className={styles.profileContent}>
        {/* 프로필 헤더 */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              className={styles.avatar}
            >
              {profile.name.charAt(0)}
            </Avatar>
          </div>

          <div className={styles.profileInfo}>
            <Typography variant="h5" className={styles.userName}>
              {profile.name}
            </Typography>
            <Typography variant="body2" className={styles.userEmail}>
              {profile.email}
            </Typography>

            <div className={styles.levelBadge}>
              <Star className={styles.levelIcon} />
              <Typography variant="caption" className={styles.levelText}>
                {profile.level} 레벨
              </Typography>
            </div>
          </div>
        </div>

        {/* 프로필 통계 */}
        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Whatshot className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <Typography variant="h6" className={styles.statNumber}>
                {profile.streak}일
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                연속 학습
              </Typography>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <CalendarMonth className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <Typography variant="h6" className={styles.statNumber}>
                {profile.joinDate}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                가입일
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}