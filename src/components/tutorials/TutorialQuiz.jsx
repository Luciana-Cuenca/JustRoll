
import { useEffect, useState } from "react";

function TutorialQuiz({ questions, tutorialId }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

  // Reiniciar respuestas cuando cambia la guía
  useEffect(() => {
    setAnswers({});
    setSubmitted({});
  }, [tutorialId, questions]);

  if (!questions?.length) return null;

  const handleSelect = (qi, oi) => {
    if (submitted[qi]) return;

    setAnswers((prev) => ({
      ...prev,
      [qi]: oi,
    }));
  };

  const handleSubmit = (qi) => {
    if (answers[qi] === undefined) return;

    setSubmitted((prev) => ({
      ...prev,
      [qi]: true,
    }));
  };

  return (
    <section className="tut-quiz" aria-label="Mini quiz">
      <div className="tut-quiz-header">
        <div
          className="tut-quiz-header-sticker"
          aria-hidden="true"
        >
          <span>?</span>
          <small>QUIZ</small>
        </div>

        <h3>Comprueba lo aprendido</h3>
      </div>

      <ol className="tut-quiz-list">
        {questions.map((q, qi) => {
          const isSubmitted = Boolean(submitted[qi]);
          const selected = answers[qi];
          const isCorrect = selected === q.answer;

          return (
            <li key={qi} className="tut-quiz-item">
              <p className="tut-quiz-question">
                <span
                  className="tut-quiz-qnum"
                  aria-hidden="true"
                >
                  {qi + 1}
                </span>

                {q.question}
              </p>

              <div
                className="tut-quiz-options"
                role="group"
                aria-label={`Opciones pregunta ${qi + 1}`}
              >
                {q.options.map((option, oi) => {
                  let className = "tut-quiz-option";

                  if (isSubmitted) {
                    if (oi === q.answer) {
                      className += " tut-quiz-option--correct";
                    } else if (oi === selected) {
                      className += " tut-quiz-option--wrong";
                    }
                  } else if (selected === oi) {
                    className += " tut-quiz-option--selected";
                  }

                  return (
                    <button
                      key={oi}
                      type="button"
                      className={className}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={isSubmitted}
                      aria-pressed={selected === oi}
                    >
                      <span
                        className="tut-quiz-opt-letter"
                        aria-hidden="true"
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>

                      {option}
                    </button>
                  );
                })}
              </div>

              {!isSubmitted && (
                <button
                  type="button"
                  className="tut-quiz-confirm"
                  onClick={() => handleSubmit(qi)}
                  disabled={selected === undefined}
                >
                  Confirmar respuesta
                </button>
              )}

              {isSubmitted && (
                <div
                  className={`tut-quiz-feedback ${
                    isCorrect
                      ? "tut-quiz-feedback--ok"
                      : "tut-quiz-feedback--fail"
                  }`}
                  role="status"
                >
                  <span
                    className="tut-quiz-result-badge"
                    aria-hidden="true"
                  >
                    {isCorrect ? "OK" : "NO"}
                  </span>

                  <span>
                    {isCorrect
                      ? "Correcto. "
                      : "Respuesta incorrecta. "}
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
