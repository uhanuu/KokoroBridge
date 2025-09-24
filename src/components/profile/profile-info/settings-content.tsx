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
  CheckCircle
} from "@mui/icons-material";
import { Typography, Switch } from "@mui/material";
import React from "react";

import styles from "./profile-info.module.css";

interface SettingsContentProps {
  darkMode: boolean;
  notifications: boolean;
  onDarkModeToggle: () => void;
  onNotificationsToggle: () => void;
  onActionClick: (action: string) => void;
}

export default function SettingsContent({
  darkMode,
  notifications,
  onDarkModeToggle,
  onNotificationsToggle,
  onActionClick
}: SettingsContentProps) {
  return (
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
                onChange={onNotificationsToggle}
                color="primary"
                className={styles.switch}
              />
            </div>
          </div>

          <button className={styles.settingItem} onClick={() => onActionClick("goal")}>
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

          <button className={styles.settingItem} onClick={() => onActionClick("data")}>
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
          <button className={styles.settingItem} onClick={() => onActionClick("profile")}>
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

          <button className={styles.settingItem} onClick={() => onActionClick("mascot")}>
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

          <button className={styles.settingItem} onClick={() => onActionClick("password")}>
            <div className={styles.itemIcon}>
              <CheckCircle className={`${styles.settingIcon} ${styles.passwordIcon}`} />
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

          <button className={styles.settingItem} onClick={() => onActionClick("privacy")}>
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
                onChange={onDarkModeToggle}
                color="primary"
                className={styles.switch}
              />
            </div>
          </div>

          <button className={styles.settingItem} onClick={() => onActionClick("support")}>
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

          <button className={styles.settingItem} onClick={() => onActionClick("info")}>
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

      {/* 로그아웃 버튼 */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={() => onActionClick("logout")}>
          <ExitToApp className={styles.logoutIcon} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}