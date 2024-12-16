import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import { CategoryCont } from '../contexts/CategoryContext';
import {useContext} from "react";
import {CategoryItem, OrderDetails} from "../types";
import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {DetailTypes} from "../reducers/OrderDetailReducer";

function HeaderDropdown() {
    const catList = useContext<CategoryItem[]>(CategoryCont);

    const handleCategorySelect = (category: string) => {
        localStorage.setItem('selectedCategory', category);
    };
    const {orderdetail, displug} = useContext(OrderDetailStore);
    const clearorderdetail = (order: OrderDetails) => {
        displug({ type: DetailTypes.CLEAR, order: order});
    };
    return (

      <div className="header-dropdown">
          <button className="button categories-button">Categories<i className="fa-solid fa-list"></i></button>
          <ul>
              {catList.map((category) => (
                  <li key={category.categoryId} onClick={() => clearorderdetail(orderdetail)}>
                      <Link
                          to={`/categories/${category.name}`}
                          onClick={() => handleCategorySelect(`${category.name}`)}
                      >
                          {category.name}
                      </Link>
                  </li>
              ))}
          </ul>

      </div>

    )
}

export default HeaderDropdown

