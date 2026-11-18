// src/pages/News.jsx
// FASE 4D — Página principal de Noticias
// 100% tipografías del sistema (Baloo 2 & Nunito), sin emojis.
// Selector de sets neo-brutalista altamente intuitivo y accesible.
// Imágenes oficiales de internet sin placeholders locales.

import { useState, useEffect, useCallback } from "react";
import NewsCard from "../components/news/NewsCard";
import NewsDetail from "../components/news/NewsDetail";
import { newsSets, news } from "../data/news";
import "../styles/news.css";

function News() {
  // ── Estado del tab activo ────────────────────────────────────────────────
  const [activeSetId, setActiveSetId] = useState("set-18");

  // Si la URL tiene #set-19, abre ese tab
  useEffect(() => {
    if (window.location.hash === "#set-19") {
      setActiveSetId("set-19");
    }
  }, []);

  // ── Estado del detalle ───────────────────────────────────────────────────
  const [selectedNews, setSelectedNews] = useState(null);

  // Noticias del set activo
  const setNews = news.filter((n) => n.setId === activeSetId);
  const featured = setNews.find((n) => n.featured) || null;
  const rest = setNews.filter((n) => !n.featured);

  // Set activo
  const activeSet = newsSets.find((s) => s.id === activeSetId);

  // Índice para navegación prev/next
  const selectedIndex = selectedNews
    ? setNews.findIndex((n) => n.id === selectedNews.id)
    : -1;

  const handleOpen = useCallback((item) => setSelectedNews(item), []);
  const handleClose = useCallback(() => setSelectedNews(null), []);
  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedNews(setNews[selectedIndex - 1]);
  }, [selectedIndex, setNews]);
  const handleNext = useCallback(() => {
    if (selectedIndex < setNews.length - 1) setSelectedNews(setNews[selectedIndex + 1]);
  }, [selectedIndex, setNews]);

  function handleTabChange(setId) {
    setActiveSetId(setId);
    setSelectedNews(null);
    if (setId === "set-19") {
      history.replaceState(null, "", "#set-19");
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  const otherSet = newsSets.find((s) => s.id !== activeSetId);

  return (
    <main className="news-page">

      {/* ════════════════════════════════════════
          HERO COMPACTO
      ════════════════════════════════════════ */}
      <section className="news-hero">
        <div className="news-hero-sunburst" aria-hidden="true" />
        <div className="news-hero-circle"   aria-hidden="true" />
        <span className="news-hero-star news-hero-star--1" aria-hidden="true">✦</span>
        <span className="news-hero-star news-hero-star--2" aria-hidden="true">★</span>
        <span className="news-hero-star news-hero-star--3" aria-hidden="true">✦</span>

        <div className="news-hero-inner">
          <div className="news-hero-content">

            <div className="news-hero-eyebrow">
              <span className="news-hero-eyebrow-dot" />
              ACTUALIDAD DE TEAMFIGHT TACTICS
            </div>

            <h1 className="news-hero-title">
              <span className="news-hero-word news-hero-word--1">NOTI</span>
              <span className="news-hero-word news-hero-word--2">CIAS</span>
            </h1>

            <p className="news-hero-subtitle">
              Parches, nuevos sets y todo lo que pasa en el tablero. Consulta información oficial y actualizada.
            </p>

            {/* Badges de los dos sets */}
            <div className="news-hero-badges">
              {newsSets.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleTabChange(s.id)}
                  className={`news-hero-badge news-hero-badge--${s.status === "ACTUAL" ? "orange" : "blue"} ${activeSetId === s.id ? "news-hero-badge--active" : ""}`}
                >
                  <span className="news-hero-badge-num" aria-hidden="true">
                    {s.number}
                  </span>
                  <span>SET {s.number}: {s.status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ilustración derecha grande e imponente (como en Composiciones) */}
          <div className="news-hero-art" aria-hidden="true">
            <span className="news-art-big-star">✦</span>

            <div className="news-art-sticker">
              <span>PATCH</span>
              <small>NOTES</small>
            </div>

            <div className="news-art-screen">
              <div className="news-art-screen-top">
                <span>SET {activeSet?.number}</span>
                <span>ACTUALIZADO</span>
              </div>
              <div className="news-art-bars">
                <span /><span /><span /><span /><span />
              </div>
              <div className="news-art-screen-caption">
                <span>NOTICIAS</span>
                <span>TFT 2026</span>
              </div>
            </div>

            <span className="news-art-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SELECTOR DE SET INTERACTIVO E INTUITIVO
      ════════════════════════════════════════ */}
      <section className="news-set-switcher-section" aria-label="Selector de Set">
        <div className="news-set-switcher-container">
          
          <div className="news-switcher-header">
            <span className="news-switcher-pill">SELECCIONA EL SET</span>
            <p className="news-switcher-hint">
              Alterna fácilmente entre el set en vivo y las novedades del próximo set
            </p>
          </div>

          <div className="news-set-toggle-group" role="tablist">
            {newsSets.map((s) => {
              const isSelected = activeSetId === s.id;
              const isActual = s.status === "ACTUAL";
              const color = isActual ? "orange" : "blue";

              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${s.id}`}
                  className={`news-set-toggle-btn news-set-toggle-btn--${color} ${isSelected ? "news-set-toggle-btn--active" : ""}`}
                  onClick={() => handleTabChange(s.id)}
                >
                  <div className="news-toggle-left">
                    <span className={`news-toggle-badge news-toggle-badge--${color}`}>
                      {s.status}
                    </span>
                    <span className="news-toggle-number">SET {s.number}</span>
                  </div>

                  <div className="news-toggle-info">
                    <strong className="news-toggle-name">{s.name}</strong>
                    <span className="news-toggle-theme">{s.theme}</span>
                  </div>

                  <div className="news-toggle-indicator">
                    {isSelected ? (
                      <span className="news-toggle-pill news-toggle-pill--active">
                        ● ACTIVO
                      </span>
                    ) : (
                      <span className="news-toggle-pill news-toggle-pill--idle">
                        VER SET →
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          CABECERA DEL SET ACTIVO
      ════════════════════════════════════════ */}
      {activeSet && (
        <section
          className="news-set-header"
          id={`panel-${activeSet.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeSet.id}`}
        >
          <div className="news-set-header-inner">

            {/* Visual del set con imagen oficial de internet */}
            <div className="news-set-visual">
              {activeSet.image ? (
                <img
                  src={activeSet.image}
                  alt={`Banner de ${activeSet.name}`}
                  className="news-set-cover-img"
                  loading="lazy"
                />
              ) : (
                <div className="news-set-visual-fallback" aria-hidden="true">
                  <span>SET {activeSet.number}</span>
                </div>
              )}
              <span className={`news-set-status news-set-status--${activeSet.status === "ACTUAL" ? "orange" : "blue"}`}>
                {activeSet.status}
              </span>
            </div>

            {/* Info del set */}
            <div className="news-set-info">
              <div className="news-set-meta-top">
                <span className="news-set-label">SET {activeSet.number}</span>
                <button
                  type="button"
                  className="news-quick-switch-btn"
                  onClick={() => handleTabChange(otherSet.id)}
                  title={`Cambiar a ${otherSet.name}`}
                >
                  Cambiar a Set {otherSet.number}: {otherSet.name} ↗
                </button>
              </div>

              <h2 className="news-set-name">{activeSet.name}</h2>
              <p className="news-set-theme">{activeSet.theme}</p>
              <p className="news-set-summary">{activeSet.summary}</p>

              <div className="news-set-meta">
                <span className="news-set-release">
                  {activeSet.status === "ACTUAL" ? "En vivo desde el" : "Estreno previsto:"}{" "}
                  <strong>{activeSet.releaseDate}</strong>
                </span>
                <span className="news-set-count">
                  {setNews.length} {setNews.length === 1 ? "artículo publicado" : "artículos publicados"}
                </span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          GRID DE NOTICIAS
      ════════════════════════════════════════ */}
      <section className="news-grid-section">
        <div className="news-grid-inner">

          {/* Noticia destacada */}
          {featured && (
            <div className="news-featured-wrapper">
              <NewsCard
                newsItem={featured}
                onClick={handleOpen}
                featured={true}
              />
            </div>
          )}

          {/* Resto de noticias */}
          {rest.length > 0 && (
            <div className="news-grid">
              {rest.map((item) => (
                <NewsCard key={item.id} newsItem={item} onClick={handleOpen} />
              ))}
            </div>
          )}

          {setNews.length === 0 && (
            <div className="news-empty">
              <span className="news-empty-star" aria-hidden="true">✦</span>
              <p>No hay noticias disponibles para este set todavía.</p>
            </div>
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════
          PANEL DE DETALLE (OVERLAY)
      ════════════════════════════════════════ */}
      {selectedNews && (
        <NewsDetail
          newsItem={selectedNews}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < setNews.length - 1}
        />
      )}

    </main>
  );
}

export default News;
