import React, {useContext, useEffect, useState} from "react";
import CartTable from "./CartTable";
import '../assets/css/Cart.css'
import {CartStore} from "../contexts/CartContext";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BookItem} from "../types";


const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    try {
        return require(`../assets/images/books/${name}.png`);
    } catch (err){
        return require("../assets/images/books/test.png");
    }
};

function Cart() {
    const  {cart} = useContext(CartStore);
    const navigate = useNavigate();
    const lastCategory = localStorage.getItem('selectedCategory') || 'Architecture';
    const [suggested, getSuggested] = useState<BookItem[]>([]);
    useEffect(() => {
        axios.get(`http://webdev.cs.vt.edu:8080/SpencerBookstoreReactTransact/api/categories/name/${lastCategory}/suggested-books?limit=6`)
            .then((result) => getSuggested(result.data))
            .catch(console.error);

    }, [lastCategory]);
    const handleContinueShopping = () => {
        navigate(`/categories/${lastCategory}`);
    };
    const handleCheckout = () => {
        navigate(`/checkout`);
    };
    const filtered = suggested.filter(item => !cart.some(cartItem => cartItem.book.bookId === item.bookId));

    return (
        <div className="cart-page">
            {cart.length > 0 ? ( //not empty cart
                <>
                    <h1 className="cart-header">Ready To Checkout? Scroll Through Your Cart First!</h1>
                    <CartTable/>
                    <section className="checkout-button-container">
                        <button className="back-to-shopping-button"
                                onClick={() => handleContinueShopping()}>
                            Back To Shopping
                        </button>
                        <button className="checkout-button"
                                onClick={() => handleCheckout()}>

                            Lets Checkout!
                        </button>
                    </section>

                </>
            ) : (
                //empty cart
                <section className="empty-cart">
                    <h1 className="welcome-text">
                        It seems your cart is empty!</h1>
                    <p className="empty-cart-text">
                        Please continue shopping and come back when you find something good!
                    </p>

                    <button className="back-to-shopping-button-empty"
                            onClick={() => handleContinueShopping()}>
                        Back To Shopping
                    </button>

                </section>

            )
            }
            {(filtered.length > 0) && (
            <section className="recommended-books">
                <div className="newarrivalsheader">
                    <p className="newarrivals-text">
                        Suggested Books
                    </p>
                </div>
                <div className="newarrivals">
                    {filtered.map((book, index) => (
                        <div className="bookitem" key={index}>
                            <Link to="/">
                                <img src={bookImageFileName(book)} alt={book.title} className="bookcover"/>
                            </Link>
                            <div className="product-info">
                                <h2 className="product-title">{book.title}</h2>
                                <p className="product-author"><i>-{book.author}</i></p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            )}
        </div>
    )
}

export default Cart;