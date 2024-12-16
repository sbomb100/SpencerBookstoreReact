import '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import {BookItem, BookListProp} from '../types';
import React from "react";



function CategoryBookList({bookList, catName}: BookListProp ) {

    return (
        <div className="bookcontainer">
            <div className="boxheader">
                <i className="fa-solid fa-book"></i>
                <p className="gridheader">{catName} Books</p>
            </div>
            <div className="bookgrid">
                {bookList.map((bookItem: BookItem, index: number) => (
                        <CategoryBookListItem key={bookItem.bookId} book={bookItem} index={index} />
                ))}

            </div>

        </div>
    )
}

export default CategoryBookList;
