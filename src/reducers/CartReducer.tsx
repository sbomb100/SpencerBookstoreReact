// @ts-ignore
import {ShoppingCartItem, BookItem} from "../types";

const handleNewCart = (cart: ShoppingCartItem[])=> {
    localStorage.setItem('cart', JSON.stringify(cart));
};
export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions): ShoppingCartItem[] => {
    switch (action.type) {
        case CartTypes.ADD:
            const existingPos = state.findIndex(item => item.id === action.id);

            if (existingPos >= 0) { //it is already in cart
                const updatedCart = state.map( (cartItem, index) => {
                     if (index === existingPos) { //put item back in array with increased quantity
                         return {id: cartItem.id , book: cartItem.book, quantity: cartItem.quantity + 1}
                     } else {
                         return cartItem;  //if not right item then just put the item back in the array
                     }
                 });
                handleNewCart(updatedCart);
                return updatedCart;
            }
            const updatedCart = [...state,{id: action.id, book:action.item, quantity: 1 }];
            handleNewCart(updatedCart);
            return updatedCart;
        case CartTypes.REMOVE:
            const removePos = state.findIndex(item => item.id === action.id);

            if (removePos >= 0) { //it is already in cart
                return state.reduce((updatedCart: ShoppingCartItem[], cartItem, index) => {
                    if (index === removePos) {
                        if (cartItem.quantity - 1 > 0) {
                            updatedCart.push({ id: cartItem.id, book: cartItem.book, quantity: cartItem.quantity - 1 });
                        }
                        // if quantity - 1 = 0, item is excluded
                    } else {
                        updatedCart.push(cartItem);
                    }
                    handleNewCart(updatedCart);
                    return updatedCart;
                }, []);
            }
            return state;
        case CartTypes.CLEAR:
            handleNewCart([]);
            return [];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};