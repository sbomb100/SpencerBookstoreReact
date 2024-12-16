import '../assets/css/CategoryBookListItem.css';
import "../types";
import {BookItem, BookProp} from "../types";
import {Link} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";


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


function CategoryBookListItem({book, index}: BookProp) {
    const  {dispatch} = useContext(CartStore);

    useEffect(() => {
        const items = document.querySelectorAll('.catbookitem') as NodeListOf<HTMLElement>;

        items.forEach((item, idx) => {
            item.style.animationDelay = `${idx * 0.3}s`;  // Adjust delay as needed
        });

    }, [book, index]);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };
return (

            <div className="public-domain-container">
                <div className="catbookitem " key={book.bookId} >
                    <Link to={`/`}>
                        <img src={bookImageFileName(book)} alt={book.title} className="bookcover"></img>
                    </Link>

                    {book.isPublic ?(
                        <button className="public-domain-button">
                            <i className="fa-solid fa-book-open"></i>
                        </button>
                    ) : null}

                    <div className="product-info">
                        <h2 className="product-title">{book.title}</h2>
                        <p className="product-author"><i>-{book.author}</i></p>
                        <p className="price">{(book.price / 100).toFixed(2)}</p>
                        <button className="addcart-button" onClick={addBookToCart}>
                                Add To Cart <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>

)
}
export default CategoryBookListItem;
