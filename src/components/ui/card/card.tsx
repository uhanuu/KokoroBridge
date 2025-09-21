import React from 'react';
import styles from './card.module.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'md',
  className = '',
  onClick,
  hover = true,
  borderRadius = 'lg',
  shadow = 'md'
}) => {
  const cardClasses = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`padding-${padding}`],
    styles[`radius-${borderRadius}`],
    styles[`shadow-${shadow}`],
    hover && styles.hover,
    onClick && styles.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default Card;