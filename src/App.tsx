import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
// @ts-ignore
import Home from './components/Home';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import Category from "./components/Category";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";

function App() {
    return (

        <Router basename={"SpencerBookstoreReactTransact"}>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/categories" element={<Category/>}>
                    <Route path=":id" element={<Category/>}/>
                </Route>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/confirmation" element={<Confirmation/>}/>
                <Route path="*" element={<div>Page Not Found</div>}/>
            </Routes>
            <AppFooter/>
        </Router>
    );
}

export default App;

