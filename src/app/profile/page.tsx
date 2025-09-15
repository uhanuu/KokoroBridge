"use client";

import {
  Settings,
  TrendingUp,
  EmojiEvents,
  CalendarToday,
  School,
  Timer,
  Notifications,
  Language,
  Palette,
  AccountCircle,
  Edit,
  Star,
  BookmarkBorder
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  IconButton,
  Box,
  Divider
} from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "./page.module.css";

const mockUserData = {
  name: "사용자",
  level: "초급 2",
  streak: 15,
  totalStudyDays: 45,
  totalStudyTime: 1230, // 분
  wordsLearned: 420,
  lessonsCompleted: 28,
  overallProgress: 65,
  joinDate: "2024년 6월",
  achievements: [
    { id: 1, title: "첫 걸음", description: "첫 학습 완료", icon: "🌟", earned: true },
    { id: 2, title: "연속 학습자", description: "7일 연속 학습", icon: "🔥", earned: true },
    { id: 3, title: "단어 수집가", description: "100개 단어 학습", icon: "📚", earned: true },
    { id: 4, title: "꾸준함의 힘", description: "30일 연속 학습", icon: "💪", earned: false },
    { id: 5, title: "마스터", description: "모든 레슨 완료", icon: "👑", earned: false },
  ],
  settings: [
    { id: 1, title: "알림 설정", icon: Notifications, type: "switch", enabled: true },
    { id: 2, title: "언어 설정", icon: Language, type: "text", value: "한국어" },
    { id: 3, title: "테마 설정", icon: Palette, type: "text", value: "자동" },
    { id: 4, title: "계정 관리", icon: AccountCircle, type: "action" },
  ]
};

export default function ProfilePage() {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  return (
    <div className={styles.container}>
      {/* 프로필 헤더 */}
      <Card className={`${styles.card} ${styles.profileCard}`}>
        <CardContent>
          <Box className={styles.profileHeader}>
            <Box className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <Image
                  src="/character.png"
                  width={80}
                  height={80}
                  alt="프로필"
                  className={styles.profileAvatar}
                />
              </div>
              <IconButton className={styles.editButton} size="small">
                <Edit />
              </IconButton>
            </Box>
            <Box className={styles.userInfo}>
              <Typography variant="h5" className={styles.userName}>
                {mockUserData.name}님
              </Typography>
              <Chip
                label={mockUserData.level}
                color="primary"
                icon={<School />}
                className={styles.levelChip}
              />
              <Typography variant="body2" className={styles.joinDate}>
                {mockUserData.joinDate} 시작
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 학습 통계 */}
      <Card className={`${styles.card} ${styles.statsCard}`}>
        <CardContent>
          <Box className={styles.cardHeader}>
            <Typography variant="h6" className={styles.cardTitle}>
              학습 통계
            </Typography>
            <TrendingUp className={styles.cardIcon} />
          </Box>

          {/* 전체 진행률 */}
          <Box className={styles.progressSection}>
            <Box className={styles.progressInfo}>
              <Typography variant="body2">전체 진행률</Typography>
              <Typography variant="h6" className={styles.progressValue}>
                {mockUserData.overallProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={mockUserData.overallProgress}
              className={styles.progressBar}
            />
          </Box>

          {/* 통계 그리드 */}
          <div className={styles.statsGrid}>
            <Box className={styles.statItem}>
              <CalendarToday className={styles.statIcon} />
              <Typography variant="h6" className={styles.statNumber}>
                {mockUserData.streak}
              </Typography>
              <Typography variant="caption">연속 일수</Typography>
            </Box>
            <Box className={styles.statItem}>
              <Timer className={styles.statIcon} />
              <Typography variant="h6" className={styles.statNumber}>
                {formatTime(mockUserData.totalStudyTime)}
              </Typography>
              <Typography variant="caption">총 학습시간</Typography>
            </Box>
            <Box className={styles.statItem}>
              <BookmarkBorder className={styles.statIcon} />
              <Typography variant="h6" className={styles.statNumber}>
                {mockUserData.wordsLearned}
              </Typography>
              <Typography variant="caption">학습한 단어</Typography>
            </Box>
            <Box className={styles.statItem}>
              <School className={styles.statIcon} />
              <Typography variant="h6" className={styles.statNumber}>
                {mockUserData.lessonsCompleted}
              </Typography>
              <Typography variant="caption">완료한 레슨</Typography>
            </Box>
          </div>
        </CardContent>
      </Card>

      {/* 업적 */}
      <Card className={`${styles.card} ${styles.achievementsCard}`}>
        <CardContent>
          <Box className={styles.cardHeader}>
            <Typography variant="h6" className={styles.cardTitle}>
              업적
            </Typography>
            <EmojiEvents className={styles.cardIcon} />
          </Box>
          <div className={styles.achievementsList}>
            {mockUserData.achievements.map((achievement) => (
              <Box
                key={achievement.id}
                className={`${styles.achievementItem} ${achievement.earned ? styles.earned : styles.locked}`}
              >
                <Box className={styles.achievementIcon}>
                  {achievement.earned ? achievement.icon : "🔒"}
                </Box>
                <Box className={styles.achievementInfo}>
                  <Typography variant="subtitle2" className={styles.achievementTitle}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="caption" className={styles.achievementDesc}>
                    {achievement.description}
                  </Typography>
                </Box>
                {achievement.earned && (
                  <Star className={styles.earnedIcon} />
                )}
              </Box>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 설정 */}
      <Card className={`${styles.card} ${styles.settingsCard}`}>
        <CardContent>
          <Box className={styles.cardHeader}>
            <Typography variant="h6" className={styles.cardTitle}>
              설정
            </Typography>
            <Settings className={styles.cardIcon} />
          </Box>
          <List className={styles.settingsList}>
            {mockUserData.settings.map((setting, index) => (
              <React.Fragment key={setting.id}>
                <ListItem className={styles.settingItem}>
                  <ListItemIcon>
                    <setting.icon className={styles.settingIcon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={setting.title}
                    secondary={setting.type === "text" ? setting.value : undefined}
                    className={styles.settingText}
                  />
                  {setting.type === "switch" && (
                    <Switch
                      checked={setting.enabled}
                      color="primary"
                      className={styles.settingSwitch}
                    />
                  )}
                  {setting.type === "action" && (
                    <IconButton size="small" className={styles.actionButton}>
                      <Edit />
                    </IconButton>
                  )}
                </ListItem>
                {index < mockUserData.settings.length - 1 && (
                  <Divider className={styles.settingDivider} />
                )}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
