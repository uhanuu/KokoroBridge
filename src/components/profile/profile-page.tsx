"use client";

import React from "react";

import { mockUserProfile } from "@/mock/profile-mock";

import ProfileInfo from "./profile-info/profile-info";
import styles from "./profile-page.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      {/* 프로필 정보 */}
      <ProfileInfo profile={mockUserProfile} />
    </div>
  );
}