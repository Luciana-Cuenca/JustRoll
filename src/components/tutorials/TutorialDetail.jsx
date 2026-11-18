// src/components/tutorials/TutorialDetail.jsx
// Panel overlay sin emojis, mismo vocabulario visual del Inicio.

import { useEffect, useRef } from "react";
import TutorialBlock from "./TutorialBlock";
import TutorialQuiz from "./TutorialQuiz";

const LEVEL_LABELS = {
  beginner:     "Principiante",
  intermediate: "Intermedio",
  advanced:     "Avanzado",
};

function extractHeadings(content = []) {
  return content
    .filter((b) => b.type === "heading")
    .map((b, i) => ({ id: `tut-h-${i}`, text: b.text }));
}

function TutorialDetail({
  tutorial,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  prevTitle,
  nextTitle,
}) {
  const modalRef  = useRef(null);
  const closeRef  = useRef(null);
  const headingEls = useRef([]);

  // Bloquear scroll + ESC
  useEffect(() => {
    if (!tutorial) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [tutorial, onClose]);

  if (!tutorial) return null;

  const hasContent = tutorial.content && tutorial.content.length > 0;
  const headings   = extractHeadings(tutorial.content);
  const hasQuiz    = tutorial.quiz && tutorial.quiz.length > 0;

  // Scroll suave al hacer clic en el índice
  const scrollToHeading = (index) => {
    const nodes = modalRef.current?.querySelectorAll(".tut-block-heading");
    nodes?.[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Título: primera palabra en color alterno
  const words     = tutorial.title.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <div
      className="tut-panel-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        ref={modalRef}
        className={`tut-panel tut-panel--${tutorial.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tut-panel-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Botón cerrar — igual que detail-close ──────────── */}
        <button
          ref={closeRef}
          className="tut-panel-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar tutorial"
        >
          ×
        </button>

        {/* ── Encabezado ─────────────────────────────────────── */}
        <header className="tut-panel-header">
          <div className="tut-panel-eyebrow">TUTORIAL · RUTA DE APRENDIZAJE</div>

          <h2 id="tut-panel-title" className="tut-panel-title">
            <span className={`tut-panel-accent tut-panel-accent--${tutorial.color}`}>
              {firstWord}
            </span>
            {restWords ? ` ${restWords}` : ""}
          </h2>

          <div className="tut-panel-pills">
            <span className={`tut-pill tut-pill--${tutorial.color}`}>
              {LEVEL_LABELS[tutorial.level]}
            </span>
            <span className="tut-pill tut-pill--time">
              {tutorial.readingTime} min de lectura
            </span>
          </div>
        </header>

        {/* ── Layout: índice lateral + cuerpo ────────────────── */}
        <div className="tut-panel-layout">

          {/* Índice de secciones */}
          {headings.length > 0 && (
            <nav className="tut-panel-index" aria-label="Índice del tutorial">
              <p className="tut-panel-index-title">EN ESTE TUTORIAL</p>
              <ol>
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      className="tut-panel-index-link"
                      onClick={() => scrollToHeading(i)}
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Cuerpo */}
          <div className={`tut-panel-body tut-panel-body--${tutorial.color}`}>
            {hasContent ? (
              <>
                {tutorial.content.map((block, i) => (
                  <TutorialBlock key={i} block={block} />
                ))}
                {hasQuiz && <TutorialQuiz questions={tutorial.quiz} />}
              </>
            ) : (
              /* ── Próximamente ──────────────────────────────── */
              <div className="tut-panel-soon">
                {/* Decoración sin emojis: sticker rotado */}
                <div className="tut-soon-decoration" aria-hidden="true">
                  <div className="tut-soon-sunburst" />
                  <div className="tut-soon-sticker">
                    <span>WIP</span>
                    <small>WORK IN PROGRESS</small>
                  </div>
                  <span className="tut-soon-star">★</span>
                </div>

                <h3>Próximamente</h3>
                <p>
                  Este tutorial está en preparación.
                  Vuelve pronto para aprender sobre{" "}
                  <strong>{tutorial.title}</strong>.
                </p>

                <div className="tut-soon-tag">
                  COMING SOON ↗
                </div>
              </div>
            )}

            {/* ── Navegación prev / next ──────────────────────── */}
            <nav
              className="tut-panel-nav"
              aria-label="Navegación de tutoriales"
            >
              <button
                type="button"
                className="tut-panel-nav-btn tut-panel-nav-btn--prev"
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label={hasPrev ? `Anterior: ${prevTitle}` : "Primer tutorial"}
              >
                <span className="tut-nav-arrow" aria-hidden="true">←</span>
                <span className="tut-nav-text">
                  {hasPrev ? (
                    <>
                      <small>ANTERIOR</small>
                      <strong>{prevTitle}</strong>
                    </>
                  ) : (
                    <span className="tut-nav-empty">Primer tutorial</span>
                  )}
                </span>
              </button>

              <button
                type="button"
                className="tut-panel-nav-btn tut-panel-nav-btn--next"
                onClick={onNext}
                disabled={!hasNext}
                aria-label={hasNext ? `Siguiente: ${nextTitle}` : "Último tutorial"}
              >
                <span className="tut-nav-text">
                  {hasNext ? (
                    <>
                      <small>SIGUIENTE</small>
                      <strong>{nextTitle}</strong>
                    </>
                  ) : (
                    <span className="tut-nav-empty">Último tutorial</span>
                  )}
                </span>
                <span className="tut-nav-arrow" aria-hidden="true">→</span>
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TutorialDetail;
