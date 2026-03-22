import Index from "../src/components/Index"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../src/components/About"
import Contact from "../src/components/Contact"
function App() {
  return (
    <div>
      <BrowserRouter basename="/PropertyWebsite">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
