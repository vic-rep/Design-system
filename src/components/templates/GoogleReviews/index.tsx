"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Typography } from "@/components/atoms/Typography";
import "./googleReviews.css";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  name: string;
  text: string;
}

const REVIEWS: Review[] = [
  { id: "1", name: "Любослав Дунчев",  text: "Препоръчвам с две ръце! Вече за втори път използвам услугите на Тръсти.Бг и честно казано съм повече от доволен! За 5 минути ми направиха застраховка и получих полицата на електронната поща, което ме изненада много приятно. Давате си доста усилие за лесно и удобно правене на застраховка." },
  { id: "2", name: "Elly Velkova",      text: "Единствената фирма, която успя да ми направи гражданска по телефона. Съвременни, компетентни и специално Ангел, с когото разговарях — изключително внимателен, коректен и ангажиран да съдейства в полза на клиента. Много съм доволна, препоръчвам!" },
  { id: "3", name: "Мария Георгиева",   text: "Много лесен и бърз процес за сключване на застраховка. Всичко стана онлайн за по-малко от 5 минути. Цената беше по-добра от всички, които намерих на пазара. Горещо препоръчвам на всеки шофьор!" },
  { id: "4", name: "Стефан Димитров",   text: "Удобна и интуитивна платформа. Намерих най-добрата оферта за колата ми само за минути. Екипът е изключително отзивчив и помогна с всичките ми въпроси. Препоръчвам на всички шофьори." },
  { id: "5", name: "Николай Иванов",    text: "Бързо, лесно и изгодно. Спестих над 200 лева на годишна полица спрямо предишния си застраховател. Процесът е изцяло онлайн и отне буквално 5 минути. Вече препоръчах на цялото семейство!" },
  { id: "6", name: "Ани Тодорова",      text: "Прекрасно обслужване! Застраховката беше готова за минути, а цената беше най-добрата, която намерих след обстойно търсене. Поддръжката отговори незабавно на всичките ми въпроси. Страхотна услуга!" },
];

const N          = REVIEWS.length;
const GAP        = 16;  // matches var(--l)
const MIN_CARD   = 230; // hard minimum card width at every breakpoint
const PEEK       = 40;  // pixels of next card visible on mobile
const PADDING_M  = 20;  // matches var(--xl)  — mobile container horizontal padding
const PADDING_D  = 64;  // matches var(--7xl) — desktop container horizontal padding
const MOBILE_BP  = 767; // must match the CSS @media breakpoint
const GR_LEFT_W  = 354; // fixed width of .gr-left in row layout
const LAYOUT_GAP = 24;  // matches var(--xxl) — gap between gr-left and gr-right

type CardVariant = "surface" | "surface-adjacent" | "surface-adjacent-2" | "accent" | "tertiary";
// Neutral (dark) cards cycle through even positions, orange cards through odd positions.
// This guarantees strict alternation: every second card is always accent or tertiary.
const NEUTRAL_VARIANTS: CardVariant[] = ["surface", "surface-adjacent", "surface-adjacent-2"];
const ORANGE_VARIANTS:  CardVariant[] = ["accent", "tertiary"];

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Measures gr-container (stable, unaffected by any CSS bleed or layout shifts)
 * and derives isMobile + forceColumn + cardWidth with a hard MIN_CARD floor.
 *
 * By measuring the container we can compute the theoretical gr-right width in
 * row layout without triggering feedback loops:
 *
 *   grRightInRow = containerWidth − 2×PADDING_D − GR_LEFT_W − LAYOUT_GAP
 *
 * isMobile fires when two side-by-side cards in that theoretical gr-right
 * would be narrower than MIN_CARD.
 *
 * forceColumn = isMobile AND window is still in row layout (> MOBILE_BP).
 * When forceColumn is true, gr-right fills the full container (minus padding),
 * so we use the column bleed formula.
 *
 *   forceColumn/CSS-column → cardWidth = max(grRight + 2×PADDING_M − GAP − PEEK, MIN_CARD)
 *   row + isMobile         → cardWidth = max(grRight + PADDING_D   − GAP − PEEK, MIN_CARD)
 *   desktop 2-up           → cardWidth = max((grRight − GAP) / 2,                MIN_CARD)
 */
function useCarouselLayout(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState({ isMobile: false, forceColumn: false, cardWidth: 0 });

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const cw       = containerRef.current.offsetWidth;
      const isColumn = window.innerWidth <= MOBILE_BP;

      // Theoretical gr-right width when CSS is in row layout (desktop padding on container)
      const grRightInRow = cw - 2 * PADDING_D - GR_LEFT_W - LAYOUT_GAP;

      // isMobile fires when two cards side-by-side in row layout would be < MIN_CARD
      const isMobile    = (grRightInRow - GAP) / 2 < MIN_CARD;
      // forceColumn: isMobile but CSS hasn't switched to column yet
      const forceColumn = isMobile && !isColumn;

      // Card width depends on which layout is active:
      //
      //   CSS column  (isColumn, ≤767px)  → viewport bleeds RIGHT only (+PADDING_M)
      //     gr-right = cw − 2×PADDING_M
      //     cardWidth = (cw − 2×PADDING_M) + PADDING_M − GAP − PEEK = cw − PADDING_M − GAP − PEEK
      //
      //   Forced col  (!isColumn, isMobile) → viewport bleeds RIGHT only (+PADDING_D)
      //     gr-right = cw − 2×PADDING_D
      //     cardWidth = (cw − 2×PADDING_D) + PADDING_D − GAP − PEEK = cw − PADDING_D − GAP − PEEK
      //
      //   Desktop 2-up → each card = (grRightInRow − GAP) / 2
      const cardWidth = isMobile
        ? isColumn
          ? Math.max(cw - PADDING_M - GAP - PEEK, MIN_CARD)  // CSS col: right-only bleed
          : Math.max(cw - PADDING_D - GAP - PEEK, MIN_CARD)  // forced col: right-only bleed
        : Math.max((grRightInRow - GAP) / 2, MIN_CARD);

      setState({ isMobile, forceColumn, cardWidth });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  return state;
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="#FBBC04" />
    </svg>
  );
}

function GoogleRatingBadge() {
  return (
    <svg viewBox="0 0 315 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="gr-google-badge" aria-label="Google rating 4.9" role="img">
      <g>
        <path d="M42 21.6C42 19.9 41.8 18.3 41.5 16.8H21V25.9H32.9C32.4 28.6 30.8 30.9 28.4 32.4V38.2H35.5C39.6 34.4 42 28.6 42 21.6Z" fill="#4285F4" />
        <path d="M21 44C26.7 44 31.5 42.1 35.5 38.2L28.4 32.4C26.5 33.7 24 34.5 21 34.5C15.5 34.5 10.8 30.7 9.1 25.5H1.8V31.5C5.8 39.4 12.8 44 21 44Z" fill="#34A853" />
        <path d="M9.1 25.5C8.6 24.1 8.4 22.6 8.4 21C8.4 19.4 8.7 17.9 9.1 16.5V10.5H1.8C0.6 12.9 0 15.4 0 18C0 20.6 0.6 23.1 1.8 25.5L9.1 25.5Z" fill="#FBBC04" />
        <path d="M21 7.5C24.2 7.5 27.1 8.6 29.4 10.8L35.7 4.5C31.5 0.7 26.6 -1.5 21 0.2C12.8 0.2 5.8 4.8 1.8 12.5L9.1 18.5C10.8 13.3 15.5 7.5 21 7.5Z" fill="#EA4335" />
      </g>
      <text x="52" y="18" fontFamily="Source Sans 3, system-ui, sans-serif" fontWeight="600" fontSize="13" fill="rgba(255,255,255,0.6)" letterSpacing="0.5">Google рейтинг</text>
      <text x="52" y="52" fontFamily="Source Sans 3, system-ui, sans-serif" fontWeight="700" fontSize="36" fill="white" letterSpacing="-1">4.9</text>
      {[0,1,2,3].map(i => (
        <g key={i} transform={`translate(${52+60+i*18},30)`}>
          <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="#FBBC04" />
        </g>
      ))}
      <g transform={`translate(${52+60+4*18},30)`}>
        <defs><linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0"><stop offset="50%" stopColor="#FBBC04" /><stop offset="50%" stopColor="rgba(255,255,255,0.2)" /></linearGradient></defs>
        <path d="M8 1 9.854 5.567l4.9.713-3.545 3.454.837 4.876L8 12.267l-4.046 2.343.837-4.876L1.246 6.28l4.9-.713z" fill="url(#halfStar)" />
      </g>
    </svg>
  );
}

function ArrowLeftIcon()  { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ArrowRightIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

// ─────────────────────────────────────────────────────────────────────────────
// ReviewCard
// ─────────────────────────────────────────────────────────────────────────────

function ReviewCard({ review, variant }: { review: Review; variant: CardVariant }) {
  return (
    <article className={`gr-card gr-card--${variant}`} aria-label={`Отзив от ${review.name}`}>
      <div className="gr-card-body">
        <div className="gr-stars" aria-label="5 звезди от 5">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} className="gr-star"><StarIcon /></span>)}
        </div>
        <div className="gr-card-text">
          <Typography variant="text-lg" as="p" color="inherit">{review.text}</Typography>
        </div>
      </div>
      <Typography variant="text" as="p" color="inherit" className="gr-reviewer-name">{review.name}</Typography>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

export interface GoogleReviewsProps { className?: string }

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function GoogleReviews({ className = "" }: GoogleReviewsProps) {
  // containerRef measures the outer container — stable regardless of any CSS bleed or
  // layout shifts, so isMobile / forceColumn never oscillate.
  const containerRef                         = useRef<HTMLDivElement>(null);
  const viewportRef                          = useRef<HTMLDivElement>(null);
  const { cardWidth, isMobile, forceColumn } = useCarouselLayout(containerRef);

  // startIdx: index of the left-most visible card (0–N-1, wraps)
  const [startIdx,  setStartIdx]  = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // ── Navigate: advance by 1 in either direction ─────────────────────────────
  const navigate = useCallback((d: 1 | -1) => {
    setDirection(d);
    setStartIdx(prev => (prev + d + N) % N);
  }, []);

  // ── Always render 2 slots ──────────────────────────────────────────────────
  // Desktop: both fill the viewport side-by-side.
  // Mobile:  slot-0 = active card, slot-1 = PEEK px visible at right edge.
  const slots = [0, 1];

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section className={`gr-section${className ? ` ${className}` : ""}`} aria-label="Отзиви от клиенти">
      <div ref={containerRef} className="gr-container">
        <div className={`gr-layout${forceColumn ? " gr-layout--mobile" : ""}`}>

          {/* ── Left ──────────────────────────────────────────────────────── */}
          <div className="gr-left">
            <div className="gr-heading-group">
              <GoogleRatingBadge />
              <Typography variant="h2" as="h2" color="inherit">Хиляди шофьори избраха Trusti</Typography>
            </div>
            <Typography variant="text" color="inherit">Бързо, изцяло онлайн и с 4.9 рейтинг в Google</Typography>
          </div>

          {/* ── Right ─────────────────────────────────────────────────────── */}
          <div className={`gr-right${isMobile ? " gr-right--mobile" : ""}`}>

            <nav className="gr-arrows" aria-label="Навигация на отзиви">
              <button className="gr-arrow-btn" onClick={() => navigate(-1)} aria-label="Предишен отзив"><ArrowLeftIcon /></button>
              <button className="gr-arrow-btn" onClick={() => navigate(1)}  aria-label="Следващ отзив"><ArrowRightIcon /></button>
            </nav>

            {/* ── Viewport: fixed height, clips desktop overflow;
                   on mobile gr-right clips the peek instead ──────────────── */}
            <motion.div
              ref={viewportRef}
              className="gr-cards-viewport"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if      (info.offset.x < -40 || info.velocity.x < -300) navigate(1);
                else if (info.offset.x >  40 || info.velocity.x >  300) navigate(-1);
              }}
            >
              <AnimatePresence custom={direction} initial={false}>
                {slots.map(slot => {
                  const reviewIdx = (startIdx + slot) % N;
                  const review    = REVIEWS[reviewIdx];
                  // Strict alternation: even index → neutral dark, odd → orange.
                  // Colour follows the absolute review index so it never flickers on slide.
                  const half    = Math.floor(reviewIdx / 2);
                  const variant = reviewIdx % 2 === 0
                    ? NEUTRAL_VARIANTS[half % NEUTRAL_VARIANTS.length]
                    : ORANGE_VARIANTS[half % ORANGE_VARIANTS.length];
                  const leftPos   = slot * (cardWidth + GAP);

                  return (
                    <motion.div
                      key={review.id}
                      layout
                      custom={direction}
                      style={{
                        position: "absolute",
                        top: 0, bottom: 0,
                        left: leftPos,
                        width: cardWidth || undefined,
                      }}
                      // ── Enter: scale up + slide in from off-screen ────────
                      initial={(dir: number) => ({
                        x:       dir > 0 ? cardWidth + GAP : -(cardWidth + GAP),
                        scale:   0.3,
                        opacity: 0,
                      })}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      // ── Exit: scale down + slide out (mirror of enter) ────
                      exit={(dir: number) => ({
                        x:       dir > 0 ? -(cardWidth + GAP) : cardWidth + GAP,
                        scale:   0.3,
                        opacity: 0,
                      })}
                      transition={{
                        layout:  { type: "spring", stiffness: 560, damping: 36, mass: 0.4 },
                        x:       { type: "spring", stiffness: 560, damping: 36, mass: 0.4 },
                        scale:   { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                      }}
                    >
                      <ReviewCard review={review} variant={variant} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

GoogleReviews.displayName = "GoogleReviews";
