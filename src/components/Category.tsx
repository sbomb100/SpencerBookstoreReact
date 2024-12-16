

import '../assets/css/global.css';
import '../assets/css/home.css'
import '../assets/css/category.css'
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import CategoryNav from "./CategoryNav";
import axios from "axios";
import CategoryBookList from "./CategoryBookList";

function Category() {
    const [books, setBooks]  = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(`http://webdev.cs.vt.edu:8080/SpencerBookstoreReactTransact/api/categories/name/${id}/books/`)
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, [id]);
    return (
        <div className="category-page">
            <section className="welcome-text">
                <h2>Find What You Want at Book-E!</h2>
            </section>
            <div className="categorybox">
                <div className="sidebar">
                    <CategoryNav />

                <div className="audiobook">
                    <span className={"audiobook-button-text"}>Rather Listen?</span>
                    <button className="audiobook-button">
                        <Link to="/categories/Architecture">
                            <b>CLICK HERE FOR AUDIO BOOKS</b>
                        </Link>
                    </button>
                </div>
            </div>
                <CategoryBookList bookList={books} catName={id}/>

            </div>
        </div>
    )
}

export default Category;
