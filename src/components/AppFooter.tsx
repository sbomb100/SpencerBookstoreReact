import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {OrderDetails} from "../types";
import {DetailTypes} from "../reducers/OrderDetailReducer";



function AppFooter(){
    const {orderdetail, displug} = useContext(OrderDetailStore);
    const clearorderdetail = (order: OrderDetails) => {
        displug({ type: DetailTypes.CLEAR, order: order});
    };
return(
    <footer className="footer-container">
        <section className="links">
            <button className="rounded-button">
                <Link to="/categories">Get Help Here</Link>
            </button>
            <button className="rounded-button">
                <Link to="/categories">About Us</Link>
            </button>
        </section>
        <section>
            <p>
          <span className="copyright"><u>Not Copyright © 2024 - 2024 Book-E. No
              rights reserved.</u></span>
            </p>
        </section>

        <section className="social-media-icons">
            <section className="icons">
                <button className="icon-button"  onClick={() => clearorderdetail(orderdetail)}>
                    <Link to="https://www.facebook.com" >
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                </button>
                <button className="icon-button"  onClick={() => clearorderdetail(orderdetail)}>
                    <Link to="https://www.instagram.com" >
                        <i className="fab fa-instagram"></i>
                    </Link>
                </button>
                <button className="icon-button"  onClick={() => clearorderdetail(orderdetail)}>
                    <Link to="https://x.com" >
                        <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                </button>
            </section>
        </section>
    </footer>
)
}

export default AppFooter;
