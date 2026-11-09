import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";

import Home from "./pages/Home";
import Compositions from "./pages/Compositions";
import Tutorials from "./pages/Tutorials";
import Guides from "./pages/Guides";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/composiciones" element={<Compositions />} />
          <Route path="/tutoriales" element={<Tutorials />} />
          <Route path="/guias" element={<Guides />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;