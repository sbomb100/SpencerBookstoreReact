import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {cartReducer, } from "../reducers/CartReducer";
import { ShoppingCartItem, initialCartState} from "../types";
const storageKey = 'cart';
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

interface CartProviderProps {
    children: ReactNode;
}

function CartContext ({ children }: CartProviderProps) {
    const [cart, dispatch] =useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },


    );

    return (
        <CartStore.Provider value ={{cart, dispatch}}>{children}</CartStore.Provider>
    );
}
export default CartContext;