
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>¡Parece que te perdiste en el carrusel!</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
