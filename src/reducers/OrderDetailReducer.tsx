
import {initialOrderDetailState, OrderDetails} from "../types";

const handleUpdate = (orderDetail: OrderDetails) => {
    try {
        localStorage.setItem('orderdetail', JSON.stringify(orderDetail));
    } catch (error) {
        console.error("Failed to update local storage:", error);
    }
};
export const DetailTypes = {
    UPDATE:'UPDATE',
    CLEAR:'CLEAR'
};

type AppActions = {
    type: 'UPDATE' | 'CLEAR';
    order: OrderDetails;
}
export const orderDetailReducer = (
    state: OrderDetails = initialOrderDetailState, // Default state
    action: AppActions
): OrderDetails => {
    switch (action.type) {
        case DetailTypes.UPDATE:
            handleUpdate(action.order);
            return action.order;

        case DetailTypes.CLEAR:
            handleUpdate(initialOrderDetailState);
            return initialOrderDetailState;

        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};