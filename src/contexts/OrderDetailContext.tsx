import {createContext, Dispatch, ReactNode, useReducer} from "react";

import { initialOrderDetailState, OrderDetails} from "../types";
import {orderDetailReducer} from "../reducers/OrderDetailReducer";

const storageKey = 'orderdetail';

export const OrderDetailStore = createContext<{
    orderdetail: OrderDetails;
    displug: Dispatch<any>;
}>({
    orderdetail: initialOrderDetailState,
    displug: () => null
});

OrderDetailStore.displayName = 'OrderDetailContext';

interface OrderDetailProviderProps {
    children: ReactNode;
}

function OrderDetailContext ({ children }: OrderDetailProviderProps) {
    const [orderdetail, displug] =useReducer(orderDetailReducer, initialOrderDetailState,
        (initialState) => {
            try {
                const storedDetail = JSON.parse(localStorage.getItem(storageKey) || 'null');
                return storedDetail as OrderDetails || initialState;
            } catch (error) {
                console.log('Error parsing order details', error);
                return initialState;
            }
        },


    );

    return (
        <OrderDetailStore.Provider value ={{orderdetail, displug}}>{children}</OrderDetailStore.Provider>
    );
}
export default OrderDetailContext;