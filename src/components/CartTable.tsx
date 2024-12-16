
import  "../assets/css/CartTable.css"
import {BookItem, ShoppingCartItem} from "../types";
import React, {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

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

function CartTable()
{ const  {cart, dispatch} = useContext(CartStore);
    const incrementBook = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };
    const decrementBook = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, item:book, id: book.bookId });
    };
    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR});
    };
    return (
        <section className="cart-page-box">
        <div className="cart-table">
            <ul className = "cart2">
                <li className="table-heading">
                    <div className="heading-book">Book</div>
                    <div className="heading-title">Title</div>
                    <div className="heading-price">Price</div>
                    <div className="heading-quantity"> Quantity</div>
                    <div className="heading-subtotal">Amount</div>
                </li>
                <>

                    { cart.map((item: ShoppingCartItem) => (
                        <li key={item.id}>
                            <div className="cart-book-image">
                                <img src={bookImageFileName(item.book)} alt={item.book.title} className="bookcover"></img>
                            </div>
                            <div className="cart-book-title">{item.book.title}</div>
                            <div className="cart-book-price">${(item.book.price / 100).toFixed(2)}</div>
                            <div className="quantity">

                                <button
                                    className="incdec-button dec-button"
                                    onClick={() => decrementBook(item.book)}
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </button>
                                <span className="cart-book-quantity">{item.quantity}</span>&nbsp;
                                <button
                                    className="incdec-button inc-button"

                                    onClick={() => incrementBook(item.book)}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                </button>
                            </div>
                            <div className="cart-book-subtotal">${(item.book.price * item.quantity / 100).toFixed(2)}</div>
                        </li>
                    ))}
                </>
                <div className="row-gap"></div>
            </ul>
        </div>
            <div className="bottom-row table-heading">
                <button className="clear-cart" onClick={() => clearCart()}>
                    Clear Cart <i className="fa-solid fa-trash-can"></i>
                </button>
                <div className="text-container">
                    <div >Items: {cart.reduce((accumulator, item) => accumulator + item.quantity, 0)}</div>
                    <div> Subtotal: ${(cart.reduce((accumulator, item) => accumulator + (item.book.price * item.quantity), 0) / 100).toFixed(2)}</div>
                </div>
            </div>
        </section>
    )
}

export default CartTable;

