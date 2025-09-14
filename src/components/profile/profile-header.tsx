"use client";

import React from "react";

import styles from "./profile-header.module.css";

interface UserData {
  name: string;
  email: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  joinDate: string;
}

interface ProfileHeaderProps {
  userData: UserData;
  className?: string;
}

export default function ProfileHeader({ userData, className }: ProfileHeaderProps) {
  const experiencePercentage = (userData.experience / userData.nextLevelExp) * 100;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 프로필 이미지 및 기본 정보 */}
      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>{userData.name.charAt(0)}</span>
            <div className={styles.levelBadge}>
              <span className={styles.levelText}>Lv.{userData.level}</span>
            </div>
          </div>
        </div>

        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{userData.name}</h1>
          <p className={styles.userEmail}>{userData.email}</p>
          <p className={styles.joinDate}>
            {new Date(userData.joinDate).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            가입
          </p>
        </div>

        <button className={styles.editButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43739 22.1213 4.00001C22.1213 4.56263 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 경험치 바 */}
      <div className={styles.experienceSection}>
        <div className={styles.experienceHeader}>
          <span className={styles.experienceText}>
            경험치: {userData.experience} / {userData.nextLevelExp}
          </span>
          <span className={styles.experiencePercentage}>{Math.round(experiencePercentage)}%</span>
        </div>

        <div className={styles.experienceBar}>
          <div className={styles.experienceFill} style={{ width: `${experiencePercentage}%` }} />
        </div>

        <p className={styles.nextLevelText}>
          다음 레벨까지 {userData.nextLevelExp - userData.experience} 경험치 필요
        </p>
      </div>
    </div>
  );
}
