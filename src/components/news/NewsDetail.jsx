// src/components/news/NewsDetail.jsx
// FASE 4D — Panel overlay de detalle de noticia
// El área interna tiene scroll independiente: al bajar, la imagen sube naturalmente
// dejando todo el espacio libre para leer el texto con total comodidad.

import { useEffect, useCallback } from "react";
import NewsBlock from "./NewsBlock";

const CATEGORY_COLORS = {
  "PARCHE":    "orange",
  "NUEVO SET": "blue",
  "SISTEMAS":  "purple",
  "BALANCE":   "yellow",
  "EVENTO":    "green",
};

function NewsDetail({ newsItem, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const color = CATEGORY_COLORS[newsItem.category] || "orange";
  const isEmpty = !newsItem.content || newsItem.content.length === 0;

  // Cerrar con ESC y navegar con flechas
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Clic fuera del panel cierra el modal
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="news-detail-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={newsItem.title}
    >
      <div className="news-detail-panel">

        {/* ── Cabecera fija ─────────────────────────────────────────── */}
        <div className="news-detail-header">
          <div className="news-detail-meta">
            <span className={`news-detail-badge news-detail-badge--${color}`}>
              {newsItem.category}
            </span>
            <span className="news-detail-date">{newsItem.date}</span>
          </div>

          <button
            className="news-detail-close"
            onClick={onClose}
            aria-label="Cerrar noticia"
          >
            ✕
          </button>
        </div>

        {/* ── Área scrolleable: al bajar, la imagen sube dejando todo el espacio al texto ── */}
        <div className="news-detail-scroll-area">

          {/* Título */}
          <h2 className="news-detail-title">{newsItem.title}</h2>

          {/* Imagen de cabecera (sube fluidamente al hacer scroll) */}
          {newsItem.image && (
            <div className="news-detail-cover">
              <img src={newsItem.image} alt={newsItem.title} loading="lazy" />
            </div>
          )}

          {/* Contenido */}
          <div className="news-detail-body">
            {isEmpty ? (
              <div className="news-detail-soon">
                <div className="news-detail-soon-deco" aria-hidden="true">
                  <span className="news-detail-soon-star">✦</span>
                  <span className="news-detail-soon-star news-detail-soon-star--2">★</span>
                </div>
                <p className="news-detail-soon-text">PRÓXIMAMENTE</p>
                <p className="news-detail-soon-sub">
                  El contenido completo de esta noticia estará disponible en breve.
                  {newsItem.source && (
                    <>
                      {" "}
                      <a
                        href={newsItem.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-detail-source-link"
                      >
                        Consulta las notas oficiales ↗
                      </a>
                    </>
                  )}
                </p>
              </div>
            ) : (
              (newsItem.content || []).map((block, i) => (
                <NewsBlock key={i} block={block} />
              ))
            )}
          </div>

        </div>

        {/* ── Pie fijo: fuente oficial + botones de navegación ───────── */}
        <div className="news-detail-footer">
          {newsItem.source && !isEmpty ? (
            <a
              href={newsItem.source}
              target="_blank"
              rel="noopener noreferrer"
              className="news-detail-source"
            >
              Fuente oficial <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="news-detail-source-note">JUST ROLL NOTICIAS</span>
          )}

          <div className="news-detail-nav">
            <button
              className="news-detail-nav-btn"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Noticia anterior"
            >
              ← ANTERIOR
            </button>
            <button
              className="news-detail-nav-btn"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Noticia siguiente"
            >
              SIGUIENTE →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NewsDetail;
