// src/components/tutorials/TutorialQuiz.jsx
// Sin emojis. Letras A/B/C como insignias, retroalimentación textual.

import { useState } from "react";

function TutorialQuiz({ questions }) {
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState({});

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qi, oi) => {
    if (submitted[qi]) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const handleSubmit = (qi) => {
    if (answers[qi] === undefined) return;
    setSubmitted((prev) => ({ ...prev, [qi]: true }));
  };

  return (
    <section className="tut-quiz" aria-label="Mini quiz">

      {/* Cabecera — mismo estilo que learning-header-sticker */}
      <div className="tut-quiz-header">
        <div className="tut-quiz-header-sticker" aria-hidden="true">
          <span>?</span>
          <small>QUIZ</small>
        </div>
        <h3>Comprueba lo aprendido</h3>
      </div>

      <ol className="tut-quiz-list">
        {questions.map((q, qi) => {
          const isSubmitted = submitted[qi];
          const selected    = answers[qi];
          const isCorrect   = selected === q.answer;

          return (
            <li key={qi} className="tut-quiz-item">
              <p className="tut-quiz-question">
                <span className="tut-quiz-qnum" aria-hidden="true">
                  {qi + 1}
                </span>
                {q.question}
              </p>

              <div
                className="tut-quiz-options"
                role="group"
                aria-label={`Opciones pregunta ${qi + 1}`}
              >
                {q.options.map((opt, oi) => {
                  let cls = "tut-quiz-option";
                  if (isSubmitted) {
                    if (oi === q.answer) cls += " tut-quiz-option--correct";
                    else if (oi === selected) cls += " tut-quiz-option--wrong";
                  } else if (selected === oi) {
                    cls += " tut-quiz-option--selected";
                  }

                  return (
                    <button
                      key={oi}
                      type="button"
                      className={cls}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={isSubmitted}
                      aria-pressed={selected === oi}
                    >
                      {/* Insignia de letra en lugar de círculo de color */}
                      <span className="tut-quiz-opt-letter" aria-hidden="true">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Botón confirmar */}
              {!isSubmitted && (
                <button
                  type="button"
                  className="tut-quiz-confirm"
                  onClick={() => handleSubmit(qi)}
                  disabled={answers[qi] === undefined}
                >
                  Confirmar respuesta
                </button>
              )}

              {/* Retroalimentación */}
              {isSubmitted && (
                <div
                  className={`tut-quiz-feedback ${
                    isCorrect
                      ? "tut-quiz-feedback--ok"
                      : "tut-quiz-feedback--fail"
                  }`}
                  role="alert"
                >
                  {/* Sticker de resultado — texto, no emoji */}
                  <span className="tut-quiz-result-badge" aria-hidden="true">
                    {isCorrect ? "OK" : "NO"}
                  </span>
                  <span>
                    {isCorrect ? "Correcto. " : "No es exactamente. "}
                    {q.explanation}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default TutorialQuiz;
