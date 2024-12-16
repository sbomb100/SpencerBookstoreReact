 import './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import HeaderDropdown from "./HeaderDropdown";
 import {useContext} from "react";
 import {CartStore} from "../contexts/CartContext";
 import {OrderDetailStore} from "../contexts/OrderDetailContext";
 import {OrderDetails} from "../types";
 import {DetailTypes} from "../reducers/OrderDetailReducer";

function AppHeader(){
    const  {cart} = useContext(CartStore);
    const {orderdetail, displug} = useContext(OrderDetailStore);
    const clearorderdetail = (order: OrderDetails) => {
        displug({ type: DetailTypes.CLEAR, order: order});
    };
return (
    <header className="header-container">
        <section className="logo-and-title">
            <section className="logo">
                <Link to="/" onClick={() => clearorderdetail(orderdetail)}>
                    <img src={require("../assets/images/site/logo.png")} alt="Book-E Logo" width="75px" height="auto"/>
                </Link>
            </section>
            <Link to={"/"} className="text-logo" onClick={() => clearorderdetail(orderdetail)}>Book-E</Link>
        </section>
        <HeaderDropdown/>
        <section className="search-bar-container">
            <form action="/category">
                <input type="text" className="search-bar" placeholder="Search..."/>
                <button className="search-button" onClick={() => clearorderdetail(orderdetail)}>
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </section>
        <section className="header-dropdown-and-cart">
            <div className="header-dropdown">
                <button className="button categories-button" onClick={() => clearorderdetail(orderdetail)}>Log In <i
                    className="fa-solid fa-angle-down"></i></button>
                <ul>
                    <li onClick={() => clearorderdetail(orderdetail)}><Link to="/" >Account Settings</Link></li>
                    <li onClick={() => clearorderdetail(orderdetail)}><Link to="">Wishlist</Link></li>
                    <li onClick={() => clearorderdetail(orderdetail)}><Link to="">Log Out</Link></li>
                </ul>
            </div>

            <div className="cart-container">
                <Link to="/cart" className="cart-button" onClick={() => clearorderdetail(orderdetail)}>
                    <i className="fas fa-shopping-cart"></i>
                    <div className="notification-bubble">{cart.reduce((sum, cartItem) => {
                        return sum + cartItem.quantity
                    }, 0)}</div>
                </Link>
            </div>


        </section>
    </header>
)
}

export default AppHeader;


