import '../assets/css/global.css';
import '../assets/css/home.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Book, BookItem} from "../types";


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
function getRandomItems(arr: Book[], numItems: number) {
    return arr
        .sort(() => Math.random() - 0.5)
        .slice(0, numItems);
}

function Home() {
    const [books, setBooks]  = useState<Book[]>([]);
    useEffect(() => {
        axios.get(`http://webdev.cs.vt.edu:8080/SpencerBookstoreReactTransact/api/books`)
            .then((result) => setBooks(getRandomItems(result.data,10)))
            .catch(console.error);

    }, []);

    const renderBooks = () => {
        return books.map((book, index) => (
            <div className="bookitem" key={index}>
                <Link to={`/books/${book.bookId}`}>
                    <img src={bookImageFileName(book)} alt={book.title} className="bookcover" />
                </Link>
                <div className="product-info">
                    <h2 className="product-title">{book.title}</h2>
                    <p className="product-author">
                        <i>-{book.author}</i>
                    </p>
                </div>
            </div>
        ));
    };

    return (

        <div className="home-page">
            <section className="welcome-text">
                <h2>Welcome to Book-E!</h2>
            </section>
            <section className="tagline">
                <p>
                    The Online Bookstore Where the E stands for Easy
                </p>
            </section>
            <div className="bigad">
                <div className="doublebox">
                    <p className="textbox1">
                        Find Your Next Literary Journey At Book-E
                    </p>
                    <p className="textbox2">
                        Read Anytime Anywhere
                    </p>
                </div>
                <div className="buynow">
                    <p>
            <span className="buynow-button-text">Not Sure Where to
              Start?</span>
                    </p>
                    <button className="buynow-button">
                        <Link to="/categories/Architecture" className={"buynow-button-text"}>
                            <b>FIND ME A BOOK</b>
                        </Link>
                    </button>
                </div>
            </div>

            <section className="category-images">
                <div className="newarrivalsheader">
                    <p className="newarrivals-text">New Arrivals</p>
                </div>
                <div className="caro-container">
                    <div className="carousel">
                        <div className="carousel-inner">
                            {/* Render the books */}
                            {renderBooks()}

                            {/* Duplicate the books for the infinite scroll effect */}
                            {renderBooks()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
