"use client";

import {
  Notifications,
  DarkMode,
  Edit,
  Support,
  Info,
  ExitToApp,
  Face,
  Star,
  Book,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { Typography, Switch } from "@mui/material";
import React, { useState, useCallback } from "react";

import SectionCard from "@/components/ui/section-card";
import { mockUserProfile } from "@/mock/profile-mock";

import ProfileInfo from "./profile-info/profile-info";
import styles from "./profile-page.module.css";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleNotificationsToggle = useCallback(() => {
    setNotifications((prev) => !prev);
  }, []);

  const handleActionClick = useCallback((_action: string) => {
    // console.log(`${action} clicked`);
  }, []);

  return (
    <div className={styles.container}>
      {/* 프로필 정보 */}
      <ProfileInfo profile={mockUserProfile} />

      {/* 설정 */}
      <SectionCard title="설정" className={styles.settingsCard}>
        <div className={styles.settingsContent}>
          {/* 학습 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              학습 설정
            </Typography>
            <div className={styles.categoryItems}>
              <div className={styles.settingItem}>
                <div className={styles.itemIcon}>
                  <Notifications className={`${styles.settingIcon} ${styles.notificationIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    알림 설정
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    학습 리마인더 및 알림
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <Switch
                    checked={notifications}
                    onChange={handleNotificationsToggle}
                    color="primary"
                    className={styles.switch}
                  />
                </div>
              </div>

              <button className={styles.settingItem} onClick={() => handleActionClick("goal")}>
                <div className={styles.itemIcon}>
                  <Star className={`${styles.settingIcon} ${styles.goalIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    학습 목표
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    일일 학습 목표 설정
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("data")}>
                <div className={styles.itemIcon}>
                  <Book className={`${styles.settingIcon} ${styles.dataIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    학습 데이터
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    데이터 백업 및 복원
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 계정 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              계정 설정
            </Typography>
            <div className={styles.categoryItems}>
              <button className={styles.settingItem} onClick={() => handleActionClick("profile")}>
                <div className={styles.itemIcon}>
                  <Edit className={`${styles.settingIcon} ${styles.profileEditIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    프로필 수정
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    이름, 이메일 등 개인정보
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("mascot")}>
                <div className={styles.itemIcon}>
                  <Face className={`${styles.settingIcon} ${styles.mascotIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    마스코트 이미지 변경
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    프로필 마스코트 캐릭터 선택
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("password")}>
                <div className={styles.itemIcon}>
                  <Lock className={`${styles.settingIcon} ${styles.passwordIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    비밀번호 변경
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    계정 보안을 위한 비밀번호 변경
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("privacy")}>
                <div className={styles.itemIcon}>
                  <CheckCircle className={`${styles.settingIcon} ${styles.privacyIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    개인정보 보호
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    데이터 수집 및 사용 동의
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 앱 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              앱 설정
            </Typography>
            <div className={styles.categoryItems}>
              <div className={styles.settingItem}>
                <div className={styles.itemIcon}>
                  <DarkMode className={`${styles.settingIcon} ${styles.darkModeIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    다크 모드
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    어두운 테마 사용
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <Switch
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                    color="primary"
                    className={styles.switch}
                  />
                </div>
              </div>

              <button className={styles.settingItem} onClick={() => handleActionClick("support")}>
                <div className={styles.itemIcon}>
                  <Support className={`${styles.settingIcon} ${styles.supportIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    고객 지원
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    문의사항 및 도움말
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("info")}>
                <div className={styles.itemIcon}>
                  <Info className={`${styles.settingIcon} ${styles.infoIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    앱 정보
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    버전 정보 및 라이선스
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 로그아웃 버튼 */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={() => handleActionClick("logout")}>
          <ExitToApp className={styles.logoutIcon} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
