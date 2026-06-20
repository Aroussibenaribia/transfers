"use client";

import { useDictionary } from "@/components/DictionaryProvider";

interface ProgressBarProps {
  currentStep: number; // 1-indexed
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const dict = useDictionary();
  const tabs = dict.booking.tabs;

  const STEPS = [
    { label: tabs.route, icon: "📍" },
    { label: tabs.vehicle, icon: "🚗" },
    { label: tabs.options, icon: "✨" },
    { label: tabs.flight, icon: "✈️" },
    { label: tabs.contact, icon: "👤" },
  ];

  return (
    <div className="progress-wrap">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={step.label} style={{ display: "contents" }}>
            <div
              className={`progress-step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
            >
              <div className="progress-step-circle">
                {isDone ? "✓" : step.icon}
              </div>
              <span className="progress-step-label">{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`progress-line ${isDone ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
