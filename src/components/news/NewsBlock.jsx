// src/components/news/NewsBlock.jsx
// FASE 4D — Renderiza bloques de contenido de noticias
// Tipos: heading | text | list | keyTip | table | image

function NewsBlock({ block }) {
  if (!block || !block.type) return null;

  switch (block.type) {

    // ── Título de sección ────────────────────────────────────────────────
    case "heading":
      return (
        <h3 className="news-block-heading">{block.text}</h3>
      );

    // ── Párrafo de texto ─────────────────────────────────────────────────
    case "text":
      return (
        <p className="news-block-text">{block.text}</p>
      );

    // ── Lista de ítems ───────────────────────────────────────────────────
    case "list":
      return (
        <ul className="news-block-list">
          {(block.items || []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    // ── Consejo clave (sticker amarillo) ─────────────────────────────────
    case "keyTip":
      return (
        <div className="news-block-keytip" role="note">
          <span className="news-block-keytip-badge" aria-hidden="true">!</span>
          <p>{block.text}</p>
        </div>
      );

    // ── Tabla ────────────────────────────────────────────────────────────
    case "table":
      return (
        <div className="news-block-table-wrapper">
          <table className="news-block-table">
            {block.headers && (
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {(block.rows || []).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // ── Imagen ilustrativa ───────────────────────────────────────────────
    case "image":
      return (
        <figure className="news-block-figure">
          {block.src ? (
            <img src={block.src} alt={block.caption || ""} loading="lazy" />
          ) : (
            <div className="news-block-img-placeholder" aria-hidden="true">
              <span>IMG</span>
            </div>
          )}
          {block.caption && (
            <figcaption>{block.caption}</figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

export default NewsBlock;
