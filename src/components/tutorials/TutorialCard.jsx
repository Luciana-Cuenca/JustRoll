// src/components/tutorials/TutorialCard.jsx
// Sin emojis. Decoración con CSS puro (igual que LearningSection).
// Placeholder de imagen = formas CSS + comentario de ruta.

const LEVEL_LABELS = {
  beginner:     "Principiante",
  intermediate: "Intermedio",
  advanced:     "Avanzado",
};

function TutorialCard({ tutorial, onClick, globalIndex }) {
  const orderLabel = String(globalIndex + 1).padStart(2, "0");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(tutorial);
    }
  };

  return (
    <article
      className={`tut-card tut-card--${tutorial.color}`}
      role="button"
      tabIndex={0}
      aria-label={`Abrir tutorial: ${tutorial.title}`}
      onClick={() => onClick(tutorial)}
      onKeyDown={handleKeyDown}
    >
      {/* ── Sticker de número — igual que learning-card-number ── */}
      <span className="tut-card-number" aria-hidden="true">
        {orderLabel}
      </span>

      {/* ── Área de ilustración ───────────────────────────────── */}
      {/*
        IMAGEN REAL: public/images/tutorials/{tutorial.slug}.png
        Dimensiones recomendadas: 600 × 340 px
        Cuando tengas la imagen, el <img> reemplaza el placeholder CSS.
      */}
      <div className="tut-card-art">
        <img
          src={tutorial.image}
          alt=""
          className="tut-card-art-img"
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />

        {/* Placeholder CSS visible si no hay imagen.
            Reutiliza la misma técnica que las tarjetas del Inicio:
            círculo punteado + forma central + sticker de texto */}
        <div className="tut-card-art-placeholder" aria-hidden="true">
          <div className="tut-ph-circle" />
          <div className={`tut-ph-shape tut-ph-shape--${tutorial.color}`}>
            <span>{orderLabel}</span>
          </div>
          <span className="tut-ph-star">✦</span>
        </div>
      </div>

      {/* ── Cuerpo ────────────────────────────────────────────── */}
      <div className="tut-card-body">
        <div className="tut-card-pills">
          <span className={`tut-pill tut-pill--${tutorial.color}`}>
            {LEVEL_LABELS[tutorial.level]}
          </span>
          <span className="tut-pill tut-pill--time">
            {tutorial.readingTime} min
          </span>
        </div>

        <h3 className="tut-card-title">{tutorial.title}</h3>
        <p className="tut-card-desc">{tutorial.description}</p>

        {/* Botón decorativo — igual que learning-link */}
        <div className="tut-card-cta" aria-hidden="true">
          LEER TUTORIAL <span>↗</span>
        </div>
      </div>
    </article>
  );
}

export default TutorialCard;
