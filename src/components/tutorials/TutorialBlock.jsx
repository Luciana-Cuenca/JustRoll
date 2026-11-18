// src/components/tutorials/TutorialBlock.jsx
// Renderiza cada tipo de bloque. Sin emojis.
// Nuevo tipo: "glossary" — lista de { term, definition }

function TutorialBlock({ block }) {
  switch (block.type) {

    // ── Título secundario ──────────────────────────────────────
    case "heading":
      return <h3 className="tut-block-heading">{block.text}</h3>;

    // ── Párrafo de texto ───────────────────────────────────────
    case "text":
      return <p className="tut-block-text">{block.text}</p>;

    // ── Lista de puntos ────────────────────────────────────────
    case "list":
      return (
        <ul className="tut-block-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    // ── Pasos numerados ────────────────────────────────────────
    case "steps":
      return (
        <div className="tut-block-steps">
          {block.title && (
            <p className="tut-block-steps-title">{block.title}</p>
          )}
          <ol>
            {block.items.map((item, i) => (
              <li key={i}>
                <span className="tut-block-step-num">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    // ── Dato clave (sticker amarillo) ──────────────────────────
    case "keyTip":
      return (
        <div className="tut-block-keytip">
          <span className="tut-block-badge tut-block-badge--key">
            ! DATO CLAVE
          </span>
          <p>{block.text}</p>
        </div>
      );

    // ── Error común (sticker rojo) ─────────────────────────────
    case "commonMistake":
      return (
        <div className="tut-block-mistake">
          <span className="tut-block-badge tut-block-badge--mistake">
            X ERROR COMUN
          </span>
          <p>{block.text}</p>
        </div>
      );

    // ── Imagen con caption ─────────────────────────────────────
    case "image":
      return (
        <figure className="tut-block-image">
          <div className="tut-block-image-frame">
            {/* Imagen real: coloca el archivo en public/images/tutorials/ */}
            <img
              src={block.src}
              alt={block.caption || ""}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                // Muestra placeholder CSS si la imagen no existe
                const ph = e.currentTarget.nextSibling;
                if (ph) ph.style.display = "flex";
              }}
            />
            {/* Placeholder CSS — mismo estilo que composition-art del Inicio */}
            <div className="tut-block-image-ph" aria-hidden="true">
              <div className="tut-ph-circle" />
              <div className="tut-ph-label">
                <small>{block.src}</small>
              </div>
            </div>
          </div>
          {block.caption && (
            <figcaption className="tut-block-image-caption">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    // ── Tabla ──────────────────────────────────────────────────
    case "table":
      return (
        <div className="tut-block-table-wrap">
          <table className="tut-block-table">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // ── Glosario ───────────────────────────────────────────────
    // items: [{ term: "...", definition: "..." }]
    case "glossary":
      return (
        <div className="tut-block-glossary">
          {block.title && (
            <p className="tut-block-glossary-title">{block.title}</p>
          )}
          <dl className="tut-block-glossary-list">
            {block.items.map((entry, i) => (
              <div key={i} className="tut-glossary-entry">
                <dt className="tut-glossary-term">{entry.term}</dt>
                <dd className="tut-glossary-def">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    // ── Tipo desconocido ───────────────────────────────────────
    default:
      return null;
  }
}

export default TutorialBlock;
