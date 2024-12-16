import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {Link, useParams} from "react-router-dom";
import React, {useContext} from "react";
import {CategoryCont} from "../contexts/CategoryContext";
import {CategoryItem} from "../types";

function CategoryNav() {
    const catList = useContext<CategoryItem[]>(CategoryCont);

    const handleCategorySelect = (category: string) => {
        localStorage.setItem('selectedCategory', category);
    };
  const {id} = useParams();
  return (
      <div className="categorylist">
        <p className="categorylistheader">
          Subjects
        </p>

        {catList.map((item) => (
            <Link
                key={item.categoryId}
                to={`/categories/${item.name}`}
                className={`category-buttons ${id === item.name ? 'selected-category-buttons' : ''}`}
                onClick={() => handleCategorySelect(`${item.name}`)}
            >
              {id === item.name ? (
                  <i className="fa-solid fa-circle selected-icon"></i>
              ) : (
                  <>
                    <i className="fa-regular fa-circle default-icon"></i>
                    <i className="fa-solid fa-circle hover-icon"></i>
                  </>
              )}
              <p className={id === item.name ? 'selected-category-text' : 'text'}>
                {item.name}
              </p>
            </Link>
        ))}
      </div>
)
}

export default CategoryNav;

