import React, { useEffect } from 'react';

interface SwitcherProps {
  variants: { key: string; name: string }[];
  current: string;
  onChange: (key: string) => void;
}

export default function PrototypeSwitcher({ variants, current, onChange }: SwitcherProps) {
  // Only display in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  const currentIndex = variants.findIndex(v => v.key === current);

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + variants.length) % variants.length;
    onChange(variants[nextIndex].key);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % variants.length;
    onChange(variants[nextIndex].key);
  };

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when focusing inputs or textareas
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.hasAttribute('contenteditable')) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const currentVariant = variants[currentIndex] || variants[0];

  return (
    <div className="prototype-switcher-container">
      <button className="switcher-arrow" onClick={handlePrev} title="Previous Variant (←)">
        ‹
      </button>
      <div className="switcher-label">
        <span className="switcher-pill">PROTOTYPE UI</span>
        <span className="switcher-name">
          {currentVariant.key} — {currentVariant.name}
        </span>
      </div>
      <button className="switcher-arrow" onClick={handleNext} title="Next Variant (→)">
        ›
      </button>
    </div>
  );
}
