import { HashRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./components/ShoppingList";
import ShoppingCart from "./components/ShoppingCart";
import Details from "./components/Details";

function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<ShoppingList />} />
                    <Route path="/mycart" element={<ShoppingCart />} />
                     <Route path='/details/:id' element={<Details/>}></Route>  {/*dynamic URL */}
                </Routes>
            </HashRouter>
        </div>
    );
}
export default App