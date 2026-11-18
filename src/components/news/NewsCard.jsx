// src/components/news/NewsCard.jsx
// FASE 4D — Tarjeta de noticia individual
// Tipografías alineadas: Baloo 2 (títulos, badges) & Nunito (cuerpo, fechas)
// Imágenes oficiales de internet con soporte lazy loading y elevación neo-brutalista

const CATEGORY_COLORS = {
  "PARCHE":    "orange",
  "NUEVO SET": "blue",
  "SISTEMAS":  "purple",
  "BALANCE":   "yellow",
  "EVENTO":    "green",
};

function NewsCard({ newsItem, onClick, featured = false }) {
  const color = CATEGORY_COLORS[newsItem.category] || "orange";

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(newsItem);
    }
  }

  return (
    <article
      className={`news-card news-card--${color}${featured ? " news-card--featured" : ""}`}
      onClick={() => onClick(newsItem)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Leer noticia: ${newsItem.title}`}
    >
      {/* ── Área de imagen ──────────────────────────────────────── */}
      <div className="news-card-visual">
        {newsItem.image ? (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="news-card-img"
            loading="lazy"
          />
        ) : (
          <div className="news-card-placeholder" aria-hidden="true">
            <span className="news-card-ph-label">TFT</span>
          </div>
        )}

        <span className={`news-card-badge news-card-badge--${color}`}>
          {newsItem.category}
        </span>
      </div>

      {/* ── Contenido ────────────────────────────────────────────── */}
      <div className="news-card-body">
        <span className="news-card-date">{newsItem.date}</span>
        <h3 className="news-card-title">{newsItem.title}</h3>
        <p className="news-card-summary">{newsItem.summary}</p>

        <div className="news-card-footer">
          <span className="news-card-read">
            LEER MÁS <span aria-hidden="true">↗</span>
          </span>
          {newsItem.content && newsItem.content.length === 0 && (
            <span className="news-card-soon">PRÓXIMAMENTE</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
