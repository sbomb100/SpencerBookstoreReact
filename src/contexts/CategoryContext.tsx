import {createContext, ReactNode, useEffect, useState} from "react";
// @ts-ignore
import {CategoryItem} from "../types";
import axios from "axios";

export const CategoryCont = createContext<CategoryItem[] | []>([]);
// creates a context called Category
CategoryCont.displayName = 'CategoryContext';

interface CategoryProviderProps {
    children: ReactNode;
}

function CategoryContext ({ children }: CategoryProviderProps)  {
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/SpencerBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);
    return (
        <CategoryCont.Provider value ={categories}>{children}</CategoryCont.Provider>
    );
}
export default CategoryContext;