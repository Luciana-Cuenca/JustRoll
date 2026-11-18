// src/components/home/NewsSection.jsx
// FASE 4D — Sección de Noticias en Inicio (Set 18 y Set 19)
import { Link } from "react-router-dom";
import { newsSets } from "../../data/news";

function NewsSection() {
  return (
    <section className="news-section">
      <div className="news-container">

        {/* Cabecera */}
        <div className="news-header">
          <div>
            <span className="news-label">ACTUALIDAD</span>
            <h2>
              LAS NOTICIAS
              <span> DEL SET</span>
            </h2>
            <p>
              Mantente al día con los últimos parches, sets y eventos
              de Teamfight Tactics.
            </p>
          </div>

          <div className="news-header-decoration" aria-hidden="true">
            <span>HOT!</span>
            <div className="news-header-star">✦</div>
          </div>
        </div>

        {/* Tarjetas de set */}
        <div className="ns-sets-grid">
          {newsSets.map((s) => {
            const isActual = s.status === "ACTUAL";
            const color = isActual ? "orange" : "blue";
            const href = isActual ? "/noticias" : "/noticias#set-19";

            return (
              <article
                key={s.id}
                className={`ns-set-card ns-set-card--${color}`}
              >
                <div className={`ns-set-visual ns-set-visual--${color}`}>
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="ns-set-img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <span className="ns-set-ph-num">{s.number}</span>

                  <span className={`ns-set-status ns-set-status--${color}`}>
                    {s.status}
                  </span>
                </div>

                <div className="ns-set-body">
                  <span className="ns-set-label">SET {s.number}</span>
                  <h3 className="ns-set-name">{s.name}</h3>
                  <p className="ns-set-theme">{s.theme}</p>
                  <p className="ns-set-summary">{s.summary.substring(0, 120)}…</p>

                  <div className="ns-set-footer">
                    <span className="ns-set-date">
                      {isActual ? "Desde el" : "Previsto:"}{" "}
                      <strong>{s.releaseDate}</strong>
                    </span>
                    <Link to={href} className={`ns-set-btn ns-set-btn--${color}`}>
                      VER NOTICIAS <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Banner inferior */}
        <div className="news-bottom">
          <div>
            <span className="news-bottom-icon">✦</span>
            <div>
              <strong>¿QUIERES ESTAR AL DÍA?</strong>
              <p>Explora todos los parches, sets y eventos de TFT.</p>
            </div>
          </div>

          <Link to="/noticias" className="btn btn-orange">
            VER TODAS LAS NOTICIAS ↗
          </Link>
        </div>

      </div>
    </section>
  );
}

export default NewsSection;
