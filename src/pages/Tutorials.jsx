// src/pages/Tutorials.jsx
// FASE 4C — JUST ROLL: Sección de Tutoriales
// Decoración: sin emojis, mismo lenguaje visual que Hero.jsx / LearningSection.jsx

import { useState, useCallback } from "react";
import TutorialCard from "../components/tutorials/TutorialCard";
import TutorialDetail from "../components/tutorials/TutorialDetail";
import { tutorials, tutorialLevels } from "../data/tutorials";
import "../styles/tutorials.css";

const ALL_TUTORIALS = tutorials;

// ── Elemento decorativo entre niveles ────────────────────────
function ProgressConnector({ fromColor, toColor }) {
  return (
    <div className="tut-connector" aria-hidden="true">
      <div className={`tut-connector-line tut-connector-line--${fromColor}`} />
      <div className="tut-connector-dots">
        <span /><span /><span /><span /><span />
      </div>
      <div className={`tut-connector-arrow tut-connector-arrow--${toColor}`}>
        ↓
      </div>
    </div>
  );
}

function Tutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const selectedIndex = selectedTutorial
    ? ALL_TUTORIALS.findIndex((t) => t.id === selectedTutorial.id)
    : -1;

  const handleOpen = useCallback((tutorial) => {
    setSelectedTutorial(tutorial);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedTutorial(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedTutorial(ALL_TUTORIALS[selectedIndex - 1]);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex < ALL_TUTORIALS.length - 1) {
      setSelectedTutorial(ALL_TUTORIALS[selectedIndex + 1]);
    }
  }, [selectedIndex]);

  // Acumulamos el índice global para el sticker 01..15
  let globalCardIndex = 0;

  return (
    <main className="tut-page">

      {/* ══════════════════════════════════════════
          HERO COMPACTO
      ══════════════════════════════════════════ */}
      <section className="tut-hero">

        {/* Decoraciones de fondo — igual que Hero.jsx */}
        <div className="tut-hero-sunburst" aria-hidden="true" />
        <div className="tut-hero-circle"   aria-hidden="true" />
        <span className="tut-hero-star tut-hero-star--1" aria-hidden="true">✦</span>
        <span className="tut-hero-star tut-hero-star--2" aria-hidden="true">★</span>
        <span className="tut-hero-star tut-hero-star--3" aria-hidden="true">✦</span>

        <div className="tut-hero-inner">
          {/* Texto principal */}
          <div className="tut-hero-content">
            <div className="tut-hero-eyebrow">
              <span className="tut-hero-eyebrow-dot" />
              RUTA DE APRENDIZAJE TFT
            </div>

            <h1 className="tut-hero-title">
              <span className="tut-hero-word tut-hero-word--1">TUTO</span>
              <span className="tut-hero-word tut-hero-word--2">RIALES</span>
            </h1>

            <p className="tut-hero-subtitle">
              De cero a avanzado. Aprende a tu ritmo con guías paso a paso.
            </p>

            {/* Insignias de nivel — texto, sin emojis */}
            <div className="tut-hero-badges">
              {tutorialLevels.map((level) => (
                <div
                  key={level.id}
                  className={`tut-hero-badge tut-hero-badge--${level.color}`}
                >
                  <span className="tut-hero-badge-icon" aria-hidden="true">
                    {level.icon}
                  </span>
                  <span>{level.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ilustración derecha — mismo estilo que game-board del Inicio */}
          <div className="tut-hero-art" aria-hidden="true">
            {/* Sticker rotado — igual que art-sticker */}
            <div className="tut-art-sticker">
              <span>LEARN</span>
              <small>STEP BY STEP</small>
            </div>

            {/* Mini tablero decorativo — igual que board-grid */}
            <div className="tut-art-board">
              <div className="tut-art-board-top">
                <span>TUTORIAL</span>
                <span className="tut-art-board-badge">01</span>
              </div>
              <div className="tut-art-board-grid">
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    className={`tut-art-cell ${
                      [2, 7, 10, 13].includes(i) ? "tut-art-cell--active" : ""
                    } ${i === 7 ? "tut-art-cell--main" : ""}`}
                  />
                ))}
              </div>
              <div className="tut-art-board-bottom">
                <span className="tut-art-board-level">NIVEL →</span>
                <span>★ RANK UP</span>
              </div>
            </div>

            {/* Tarjetas flotantes — igual que art-floating-card */}
            <div className="tut-art-card tut-art-card--blue">
              <span>↗</span>
              <span>ESTRATEGIA</span>
            </div>
            <div className="tut-art-card tut-art-card--orange">
              <span>★</span>
              <span>MEJORA</span>
            </div>

            {/* Flecha decorativa — igual que art-arrow */}
            <div className="tut-art-arrow">↘</div>
          </div>
        </div>

        {/* Barra de colores inferior — igual que hero-bottom-decoration */}
        <div className="tut-hero-stripe" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RUTA DE APRENDIZAJE
      ══════════════════════════════════════════ */}
      <div className="tut-path section-container">
        {tutorialLevels.map((level, levelIndex) => {
          const levelTutorials = ALL_TUTORIALS.filter(
            (t) => t.level === level.id
          );
          const nextLevel = tutorialLevels[levelIndex + 1];

          return (
            <div key={level.id}>
              {/* Separador entre secciones */}
              {levelIndex > 0 && (
                <ProgressConnector
                  fromColor={tutorialLevels[levelIndex - 1].color}
                  toColor={level.color}
                />
              )}

              {/* ── Encabezado de nivel ──────────────────── */}
              <div className="tut-level-header">
                <div className={`tut-level-badge tut-level-badge--${level.color}`}>
                  <span className="tut-level-badge-icon" aria-hidden="true">
                    {level.icon}
                  </span>
                  {level.title}
                </div>
                <p className="tut-level-subtitle">{level.subtitle}</p>
              </div>

              {/* ── Cuadrícula de tarjetas ───────────────── */}
              <div className="tut-grid">
                {levelTutorials.map((tutorial) => {
                  const idx = globalCardIndex;
                  globalCardIndex += 1;
                  return (
                    <TutorialCard
                      key={tutorial.id}
                      tutorial={tutorial}
                      globalIndex={idx}
                      onClick={handleOpen}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════
          PANEL DE LECTURA (overlay)
      ══════════════════════════════════════════ */}
      {selectedTutorial && (
        <TutorialDetail
          tutorial={selectedTutorial}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < ALL_TUTORIALS.length - 1}
          prevTitle={selectedIndex > 0 ? ALL_TUTORIALS[selectedIndex - 1].title : ""}
          nextTitle={
            selectedIndex < ALL_TUTORIALS.length - 1
              ? ALL_TUTORIALS[selectedIndex + 1].title
              : ""
          }
        />
      )}
    </main>
  );
}

export default Tutorials;
