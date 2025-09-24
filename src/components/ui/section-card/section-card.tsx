import React from "react";
import { Typography } from "@mui/material";

import Card from "@/components/ui/card";

import styles from "./section-card.module.css";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  children,
  className,
  headerAction
}: SectionCardProps) {
  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="2xl"
      className={`${styles.sectionCard} ${className || ""}`}
    >
      {title && (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Typography variant="h6" className={styles.title}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" className={styles.subtitle}>
                {subtitle}
              </Typography>
            )}
          </div>
          {headerAction && (
            <div className={styles.headerAction}>
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </Card>
  );
}