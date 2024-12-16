import '../assets/css/ConfirmationTable.css';

import { asDollarsAndCents } from "../utils";
import { OrderDetailStore } from "../contexts/OrderDetailContext";
import React, { useContext } from "react";
import { BookItem } from "../types";

function ConfirmationTable() {
    const { orderdetail } = useContext(OrderDetailStore);

    const quant = function (book: BookItem) {
        const item = orderdetail?.lineItems?.find((item) => item.bookId === book.bookId);
        return item?.quantity;
    };

    const subtotal = orderdetail?.books?.reduce((sum, book) => {
        const quantity = quant(book) || 0;
        return sum + (book.price || 0) * quantity;
    }, 0) || 0;

    return (
        <div className="table-container">
            <div className="scrollable-table">
                <table className="confirmation_table">
                    <tbody>
                    {orderdetail.books?.map((book, i) => (
                        <tr className="confirmation_tr" key={i}>
                            <td className="confirmation_td">
                                {book.title}
                            </td>
                            <td className="confirmation_td prices">
                                Price: {book && asDollarsAndCents(book.price)} x {book && quant(book)} = {book && asDollarsAndCents((book.price || 0) * (quant(book) || 0))}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="totals-container">
                <table className="totals-table">
                    <tbody>
                    <tr className="totals">
                        <td><b>Subtotal:</b></td>
                        <td className="prices">${subtotal / 100}</td>
                    </tr>
                    <tr className="totals">
                        <td><b>Tax:</b></td>
                        <td className="prices">${(orderdetail.order.amount - subtotal) / 100}</td>
                    </tr>
                    <tr className="totals">
                        <td><b>Total:</b></td>
                        <td className="prices">${orderdetail.order.amount / 100}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConfirmationTable;
