import { BrowserRouter, Routes, Route } from "react-router";
import ShoppingList from "./components/ShoppingList";
import ShoppingCart from "./components/ShoppingCart";
import Details from "./components/Details";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ShoppingList />} />
                    <Route path="/mycart" element={<ShoppingCart />} />
                     <Route path='/details/:id' element={<Details/>}></Route>  {/*dynamic URL */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App