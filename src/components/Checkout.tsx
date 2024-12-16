
import "../assets/css/Checkout.css"
import React, {FormEvent} from "react";
import { isCreditCard, isMobilePhone, isvalidEmail} from "../utils";
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import axios from "axios";
import {DetailTypes} from "../reducers/OrderDetailReducer";
import {OrderDetailStore} from "../contexts/OrderDetailContext";


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

function Checkout(){

/*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
function yearFrom(index: number) {
    return new Date().getFullYear() + index;
}
const {cart, dispatch} = useContext(CartStore);
const {displug} = useContext(OrderDetailStore);
const navigate = useNavigate();
const clearCart = () => {
    dispatch({ type: CartTypes.CLEAR});
};

const cartTotalPrice = (cart.reduce((accumulator, item) => accumulator + (item.book.price * item.quantity), 0) / 100);
const cartQuantity = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);



const [errors, setErrors] = useState({
    name: "This field is required",
    address: "This field is required",
    email: "This field is required",
    phone: "This field is required",
    ccNumber: "This field is required",
});
    const lastCategory = localStorage.getItem('selectedCategory') || 'Architecture';
    const handleContinueShopping = () => {
        navigate(`/categories/${lastCategory}`);
    };


const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:1,ccExpiryYear:new Date().getFullYear()});


const [checkoutStatus, setCheckoutStatus] = useState("");


function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

    const { name, value } = event.target;

    switch (name) {
        case 'name':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
                setErrors({ ...errors, [name]: "Name must be at least 4 characters long!"});
            } else {
                setErrors({ ...errors, [name]: ""});
            }
            break;
        case 'address':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value}));
            if (!value){
                setErrors({ ...errors, [name]: "This field is required!"});
            } else if (value.length < 4 || value.length > 45) {
                setErrors({ ...errors, [name]: "Address must be between 4 and 45 characters long!"});
            } else {
                setErrors({ ...errors, [name]: ""});
            }
            break;

        case 'phone':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required" }));
            } else if (!isMobilePhone(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid phone number!" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            }
            break;

        case 'email':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required" }));
            } else if (!isvalidEmail(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid email format!" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            }
            break;

        case 'ccNumber':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "This field is required" }));
            } else if (!isCreditCard(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid credit card number!" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            }
            break;

        case 'ccExpiryMonth':
            setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
            break;
        case 'ccExpiryYear':
            setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            break;
        default:
            break;
    }
}
    function isCardExpired() {
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        const currentYear = new Date().getFullYear();
        return (formData.ccExpiryYear < currentYear) ||
            (formData.ccExpiryYear === currentYear && formData.ccExpiryMonth < currentMonth);
    }
    function isValidForm() {
        return (errors.ccNumber === "" && formData.ccNumber !== "" &&
            errors.name === "" && formData.name !== "" &&
            errors.email === "" && formData.email !== "" &&
            errors.address === "" && formData.address !== "" &&
            errors.phone === "" && formData.phone !== "" && !isCardExpired());


    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        //console.log(orders);     you can uncomment this to see the orders JSON on the console
        const url = 'api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        //console.log("order deatils: ", orderDetails);
        return orderDetails;
    }
    const updateorderdetail = (order: OrderDetails) => {
        displug({ type: DetailTypes.UPDATE, order: order});
    };

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                updateorderdetail(orders);
                clearCart();
                setCheckoutStatus("OK");
                navigate('/confirmation');
            }
            else{
                console.log("Error placing order");
            }
        }
    }

    if (cart.length > 0){
return (
    <div className="cart-page">
        <h1 className="cart-header">Just a Few Steps to Your New Books!</h1>


        <section className="checkout-cart-table-view">
            <div className={"checkout-item-div"}>
                    {
                        cart?.map((item, i) => (
                            <div className="checkout-cart-book-item" key ={i}>
                                <div className="checkout-cart-book-image" key={i}>
                                    <img src={bookImageFileName(item.book)} alt="title" className="checkout-cart-info-img"
                                         width="20%"
                                         height="20%"
                                    />
                                </div>
                                <div className="checkout-cart-book-info">
                                    <div className="checkout-cart-book-title">{item.book.title}</div>

                                    <div className="checkout-cart-book-subtotal">
                                    </div>
                                    <div className="checkout-cart-book-quantity">
                                        <button className="checkout-icon-button incdec-button"
                                                onClick={() => {
                                                    dispatch({
                                                        type: CartTypes.REMOVE,
                                                        book: item.book,
                                                        id: item.book.bookId
                                                    });
                                                }}
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                        <button className="checkout-num-button">{item.quantity}</button>
                                        <button className="checkout-icon-button incdec-button" onClick={() => {
                                            dispatch({type: CartTypes.ADD, book: item.book, id: item.book.bookId});
                                        }}>
                                            <i className="fas fa-plus-circle"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}

            </div>
            <div className="checkout-page-body">
                <div className="checkout-form">
                    <form
                        className="checkout-form"
                        onSubmit={(event) => submitOrder(event)}
                        method="post"
                    >
                        <div>
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                size={20}
                                name="name"
                                id="fname"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                        </div>
                        <> {errors.name && <div className="error"> {errors.name}</div>}</>

                        <div>
                            <label htmlFor="faddress">Address</label>
                            <input
                                type="text"
                                size={20}
                                name="address"
                                id="faddress"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {errors.address && <div className="error"> {errors.address}</div>}</>

                        <div>
                            <label htmlFor="fphone">Phone</label>
                            <input
                                type="text"
                                size={20}
                                name="phone"
                                id="fPhone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {errors.phone && <div className="error"> {errors.phone}</div>}</>

                        <div>
                            <label htmlFor="femail">Email</label>
                            <input
                                type="text"
                                size={20}
                                name="email"
                                id="femail"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {errors.email && <div className="error"> {errors.email}</div>}</>

                        <div>
                            <label htmlFor="fccNumber">Card</label>
                            <input
                                type="text"
                                size={20}
                                name="ccNumber"
                                id="fccNumber"
                                value={formData.ccNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {errors.ccNumber && <div className="error"> {errors.ccNumber}</div>}</>

                        <div>
                            <label htmlFor="ccExpiryMonth">Exp Date</label>
                            <select className="checkout-select" name="ccExpiryMonth" value={formData.ccExpiryMonth}
                                    onChange={handleInputChange}>
                                {months.map((month, i) => (
                                    <option key={i} value={i + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <select className="checkout-select" name="ccExpiryYear" value={formData.ccExpiryYear}
                                    onChange={handleInputChange}>
                                {years.map((year, i) => (
                                    <option key={i}>
                                        {yearFrom(year)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <> {isCardExpired() && <div className="error"> Card is expired</div>}</>
                        <div className="checkout-view">
                            <div className="sub-total">
                                <span>Items ({cartQuantity}):</span>
                                <span>${cartTotalPrice.toFixed(2)}</span>
                            </div>
                            <div className="sub-total">
                                <span>Tax:</span>
                                <span>${(cartTotalPrice * 0.06).toFixed(2)}</span>
                            </div>

                            <hr className="bold-line"/>

                            <div className="final-total">
                                <span className="total-text">Total:</span>
                                <span
                                    className="total-price">${(cartTotalPrice + (cartTotalPrice * 0.06)).toFixed(2)}</span>
                            </div>
                        </div>

                        <button type="submit" className="final-checkout-button">
                            Submit Order
                        </button>

                    </form>
                    <div>
                        {
                            checkoutStatus !== '' ?
                                <>
                                    <section className="checkoutStatusBox">
                                        {(checkoutStatus === 'ERROR') ?
                                            <div>
                                                Error: Please fix the problems above and try again.
                                                {}
                                            </div> : (checkoutStatus === 'PENDING' ?
                                                <div>
                                                    Processing...
                                                </div> : (checkoutStatus === 'OK' ?
                                                    <div>
                                                        Order placed...
                                                    </div> :
                                                    <div>
                                                        An unexpected error occurred, please try again.
                                                    </div>))}
                                    </section>
                                </>
                                : <></>}
                    </div>

                </div>


            </div>
        </section>
    </div>
)
}else {


        return (
            <div className="cart-page">

                    <section className="empty-cart-checkout">
                        <h1 className="empty-checkout-header">
                            It seems your cart is empty!</h1>
                        <p className="empty-checkout-text">
                            Please continue shopping and come back when you find something good!
                        </p>

                        <button className="back-to-shopping-button-empty"
                                onClick={() => handleContinueShopping()}>
                            Back To Shopping
                        </button>

                    </section>



            </div>)
    }
}

export default Checkout;

