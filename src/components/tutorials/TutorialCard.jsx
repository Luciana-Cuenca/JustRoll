
const LEVELS = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

function TutorialCard({ tutorial, onClick, globalIndex = 0 }) {
  const number = String(tutorial.id ?? globalIndex + 1).padStart(2, "0");

  const openTutorial = () => onClick?.(tutorial);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openTutorial();
    }
  };

  return (
    <article
      className={`tut-card tut-card--${tutorial.color}`}
      role="button"
      tabIndex={0}
      aria-label={`Abrir tutorial: ${tutorial.title}`}
      onClick={openTutorial}
      onKeyDown={handleKeyDown}
    >
      {/* Encabezado */}
      <div className="tut-card-top">
        <div className="tut-card-symbol" aria-hidden="true">
          {number}
        </div>

        <div className="tut-card-top-info">
          <span className="tut-card-index">
            GUÍA DE TFT
          </span>

          <span className="tut-card-time">
            {tutorial.readingTime} min de lectura
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="tut-card-body">
        <span className={`tut-pill tut-pill--${tutorial.color}`}>
          {LEVELS[tutorial.level] || "Tutorial"}
        </span>

        <h3 className="tut-card-title">
          {tutorial.title}
        </h3>

        <p className="tut-card-desc">
          {tutorial.description}
        </p>

        <div className="tut-card-cta" aria-hidden="true">
          <span>LEER TUTORIAL</span>
          <span>↗</span>
        </div>
      </div>
    </article>
  );
}

export default TutorialCard;
