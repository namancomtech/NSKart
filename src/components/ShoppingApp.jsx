import ShoppingList from "./components/CoachingFiles/ShoppingWebsite/ShoppingList"
import { BrowserRouter, Routes, Route } from "react-router";
import ShoppingCart from "./components/CoachingFiles/ShoppingWebsite/ShoppingCart";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingList/>} />
          <Route path="/mycart" element={<ShoppingCart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
