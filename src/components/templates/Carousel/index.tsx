"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

export interface CarouselSlide {
  id: string;
  content: React.ReactNode;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (autoPlay && !isHovered && total > 1) {
      timerRef.current = setInterval(next, autoPlayInterval);
      return () => clearInterval(timerRef.current);
    }
  }, [autoPlay, autoPlayInterval, isHovered, next, total]);

  if (total === 0) return null;

  return (
    <div
      aria-roledescription="carousel"
      className={`relative overflow-hidden rounded-[var(--s)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            className="w-full shrink-0"
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Prev/Next arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-[var(--m)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[var(--surface-adjacent)]/90 hover:bg-[var(--surface-adjacent)] transition-all duration-150 cursor-pointer"
            style={{ boxShadow: "var(--elevation-level2)" }}
          >
            <i className="fa-solid fa-chevron-left text-[12px] text-[var(--primary-900)]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-[var(--m)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[var(--surface-adjacent)]/90 hover:bg-[var(--surface-adjacent)] transition-all duration-150 cursor-pointer"
            style={{ boxShadow: "var(--elevation-level2)" }}
          >
            <i className="fa-solid fa-chevron-right text-[12px] text-[var(--primary-900)]" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div
          role="tablist"
          className="absolute bottom-[var(--m)] left-1/2 -translate-x-1/2 flex items-center gap-[var(--xs)]"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              type="button"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={[
                "h-[8px] rounded-full transition-all duration-150 cursor-pointer",
                i === activeIndex
                  ? "w-[24px] bg-[var(--accent-600)]"
                  : "w-[8px] bg-[var(--primary-300)] hover:bg-[var(--primary-400)]",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.displayName = "Carousel";
