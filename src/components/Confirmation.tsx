// You can use the following Css file
import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import React, {useContext} from "react";
import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {useNavigate} from "react-router-dom";


function Confirmation() {
    const {orderdetail} = useContext(OrderDetailStore);
    const lastCategory = localStorage.getItem('selectedCategory') || 'Architecture';
    const navigate = useNavigate();
    const handleContinueShopping = () => {
        navigate(`/categories/${lastCategory}`);
    };

    const orderDate = () => {
        let date = new Date(orderdetail.order.dateCreated);
        return (date.toLocaleString());
    };
    const ccDate = () => {
        let date = new Date(orderdetail.customer.ccExpDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
        const year = date.getFullYear();
        return `${month}/${year}`
    }
    if (orderdetail.customer.customerName !== "T") {
        return (
            <div className="confirmationView">

                <p className={"confirmation-title"}>Thank you for your purchase!</p>

                <div className="confirmation-box">
                    <div className={"customer"}>
                        <ul className="confirmation-number">
                            <li>Confirmation #: 123456789</li>
                            <li>{orderDate()}</li>
                        </ul>
                        <ul className="customer-info">
                            <li><b>Name:</b> {orderdetail?.customer?.customerName}</li>
                            <li><b>Address:</b> {orderdetail?.customer?.address}</li>
                            <li><b>Email:</b> {orderdetail?.customer?.email}</li>
                            <li>
                                <b>Phone:</b> ({orderdetail?.customer?.phone.substring(0, 3)})-{orderdetail?.customer?.phone.substring(3, 6)}
                                -{orderdetail?.customer?.phone.substring(6)}</li>
                            <li><b>Credit Card:</b> **** ****
                                **** {orderdetail?.customer?.ccNumber.substring(12)} ({ccDate()})
                            </li>
                        </ul>
                        <ul className="confirmation-number">
                            <li>Come Back Soon!</li>
                        </ul>
                        <div id="customerInfo"></div>
                    </div>
                    <ConfirmationTable/>
                </div>
            </div>
        )
    } else {
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

            </div>
        )
    }
}

export default Confirmation;