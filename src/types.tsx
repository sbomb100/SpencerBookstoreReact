// Contains all the custom types we want to use for our application
export interface BookItem {
  categoryId:number
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
}


export interface CategoryItem{
  categoryId: number;
  name: string;
}

export interface BookListProp{
  bookList: Book[];
  catName?: string;
}
export interface BookProp {
  book: BookItem;
  index: number;
}
export interface Book{
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  isFeatured: boolean;
  categoryId: number;
  rating: number;

}

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];

export const initialOrderDetailState: OrderDetails = {
  order: {
    orderId: 0,
    amount: 0,
    dateCreated: Date.now(),
    confirmationNumber: 0,
    customerId: 0,
  },
  customer: {
    customerName: "T",
    address: "T",
    phone: "T",
    email: "T",
    ccNumber: "T",
    ccExpDate: 1733599639000,
  },
  books: [],
  lineItems: [],
};

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}


export interface OrderDetails {
  books: BookItem[];
  customer: Customer;
  lineItems: LineItem[];
  order: Order;
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

