"use client";

import { Lock, CheckCircle } from "@mui/icons-material";
import { Typography, LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";
import { mockData } from "@/mock/home-mock";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* 환영 헤더 카드 */}
      <Card
        variant="default"
        size="md"
        padding="xl"
        borderRadius="2xl"
        className={styles.welcomeCard}
      >
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <div className={styles.greetingWithFurigana}>
              <ruby className={styles.rubyText}>
                頑張れ
                <rt className={styles.furigana}>がんば</rt>
              </ruby>
              <span className={styles.greetingRest}>、{mockData.userName}さん!</span>
            </div>
            <div className={styles.greetingSubText}>오늘도 일본어 학습을 시작해볼까요?</div>
          </div>
          <div className={styles.characterContainer}>
            <Image
              src="/home-character.png"
              width={140}
              height={140}
              alt="캐릭터"
              className={styles.characterImage}
            />
          </div>
        </div>
      </Card>

      {/* 빠른 시작 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.quickStartCard}
      >
        <div className={styles.cardHeader}>
          <Typography variant="h6" className={styles.cardTitle}>
            빠른 시작
          </Typography>
          <Typography variant="body2" className={styles.cardSubtitle}>
            원하는 학습 유형을 선택하세요
          </Typography>
        </div>
        <div className={styles.learningCardsGrid}>
          {mockData.learningCards.map((card) => {
            return (
              <div
                key={card.id}
                className={`${styles.learningItem} ${card.isLocked ? styles.locked : ""}`}
              >
                {card.isLocked && <div className={styles.lockOverlay} />}
                <div className={styles.learningItemHeader}>
                  <div
                    className={styles.learningItemIcon}
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    {typeof card.icon === "string" ? (
                      <span
                        className={styles.iconText}
                        style={{ color: card.color, opacity: card.isLocked ? 0.3 : 1 }}
                      >
                        {card.icon}
                      </span>
                    ) : (
                      <card.icon style={{ color: card.color, opacity: card.isLocked ? 0.3 : 1 }} />
                    )}
                    {card.isLocked && (
                      <div className={styles.lockIconOverlay}>
                        <Lock className={styles.lockIcon} />
                      </div>
                    )}
                  </div>
                  <div className={styles.learningItemInfo}>
                    <Typography variant="subtitle2" className={styles.learningItemTitle}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption" className={styles.learningItemSubtitle}>
                      {card.subtitle}
                    </Typography>
                  </div>
                </div>

                <Typography variant="body2" className={styles.learningItemDescription}>
                  {card.isLocked ? "곧 출시 예정" : card.description}
                </Typography>

                <ActionButton
                  text={card.isLocked ? "잠금됨" : "시작하기"}
                  variant={card.isLocked ? "locked" : "primary"}
                  disabled={card.isLocked}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 최근 활동 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.activityCard}
      >
        <Typography variant="h6" className={styles.cardTitle}>
          최근 활동
        </Typography>
        <div className={styles.activityList}>
          {mockData.recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityContent}>
                <div className={styles.activityInfo}>
                  <Typography variant="body2" className={styles.activityTitle}>
                    {activity.title}
                  </Typography>
                  <div className={styles.activityTime}>
                    <span>{activity.time}</span>
                    <span className={styles.activityTypeTag}>{activity.type}</span>
                  </div>
                </div>
              </div>
              <div className={styles.activityProgressSection}>
                <div className={styles.activityProgress}>
                  <LinearProgress
                    variant="determinate"
                    value={activity.progress}
                    className={styles.activityProgressBar}
                  />
                  <Typography variant="caption" className={styles.activityPercent}>
                    {activity.progress}%
                  </Typography>
                </div>
                <ActionButton
                  text={activity.progress === 100 ? "완료됨" : "계속하기"}
                  variant={activity.progress === 100 ? "completed" : "primary"}
                  disabled={activity.progress === 100}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 오늘의 목표 */}
      <Card variant="default" size="lg" padding="xl" borderRadius="2xl" className={styles.goalCard}>
        <div className={styles.goalHeader}>
          <Typography variant="h6" className={styles.goalSectionTitle}>
            오늘의 목표
          </Typography>
          <div className={styles.goalCounter}>
            <span className={styles.goalCounterText}>
              {mockData.todayProgress.completed}/{mockData.todayProgress.total}
            </span>
          </div>
        </div>

        <div className={styles.goalProgressSection}>
          <div className={styles.goalProgressTrack}>
            {[...Array(mockData.todayProgress.total)].map((_, index) => (
              <div
                key={index}
                className={`${styles.goalProgressNode} ${
                  index < mockData.todayProgress.completed ? styles.completed : styles.incomplete
                }`}
              >
                <div className={styles.goalProgressDot}></div>
              </div>
            ))}
          </div>
          <div className={styles.goalProgressLine}></div>
        </div>

        <div className={styles.goalsList}>
          <div className={`${styles.goalItem} ${styles.completed}`}>
            <div className={styles.goalStatus}>✓</div>
            <Typography variant="body2" className={styles.goalText}>
              히라가나 20개 문자 학습
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.completed}`}>
            <div className={styles.goalStatus}>✓</div>
            <Typography variant="body2" className={styles.goalText}>
              AI 회화 1회 완료
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.pending}`}>
            <div className={styles.goalStatus}>○</div>
            <Typography variant="body2" className={styles.goalText}>
              가타카나 15개 문자 학습
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.pending}`}>
            <div className={styles.goalStatus}>○</div>
            <Typography variant="body2" className={styles.goalText}>
              복습 문제 10개 풀기
            </Typography>
          </div>
        </div>
      </Card>

      {/* 오늘의 추천 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.recommendationCard}
      >
        <div className={styles.cardHeader}>
          <Typography variant="h6" className={styles.cardTitle}>
            오늘의 추천
          </Typography>
          <Typography variant="body2" className={styles.cardSubtitle}>
            맞춤형 학습 추천
          </Typography>
        </div>

        <div className={styles.recommendationInnerCard}>
          <div className={styles.recommendationCenterContent}>
            <div className={styles.recommendationIcon}>
              <span className={styles.iconText}>あ</span>
            </div>
            <Typography variant="h6" className={styles.recommendationTitle}>
              히라가나 복습
            </Typography>
            <Typography variant="body2" className={styles.recommendationReason}>
              지난주에 학습한 히라가나를 다시 한번 연습해보세요
            </Typography>
            <ActionButton
              text="시작"
              variant="primary"
              hideIcon
              className={styles.recommendationButton}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
