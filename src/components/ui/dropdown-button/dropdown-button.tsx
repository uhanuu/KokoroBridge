"use client";

import React, { useState, useRef, useEffect } from "react";

import styles from "./dropdown-button.module.css";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownButtonProps {
  label: string;
  icon?: React.ReactNode;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function DropdownButton({
  label,
  icon,
  options,
  value,
  onChange,
  className = ""
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.buttonContent}>
          {icon && <span className={styles.buttonIcon}>{icon}</span>}
          <span className={styles.buttonText}>
            {selectedOption?.label}
          </span>
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`${styles.menuItem} ${
                option.value === value ? styles.selected : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}