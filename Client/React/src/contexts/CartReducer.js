import axios from "axios";
import cookies from "js-cookie";
import Auth from "../helpers/Auth";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

async function postCart(cartItems) {
  if (cookies.get("clientToken")) {
    await axios.post("http://localhost:8081/cart", cartItems, {
      withCredentials: true,
    });
  }
}

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  postCart(cartItems);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  let userId = Auth();
  if (userId !== "") {
    switch (action.type) {
      case "ADD_ITEM":
        if (!state.cartItems.find((item) => item._id === action.payload._id)) {
          state.cartItems.push({
            ...action.payload,
            quantity: 1,
          });
        }
        let a = {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
          checkout: false,
        };
        return a;
      case "REMOVE_ITEM":
        let r = {
          ...state,
          ...sumItems(
            state.cartItems.filter((item) => item._id !== action.payload._id)
          ),
          cartItems: [
            ...state.cartItems.filter(
              (item) => item._id !== action.payload._id
            ),
          ],
        };
        return r;
      case "INCREASE":
        state.cartItems[
          state.cartItems.findIndex((item) => item._id === action.payload._id)
        ].quantity++;
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      case "DECREASE":
        state.cartItems[
          state.cartItems.findIndex((item) => item._id === action.payload._id)
        ].quantity--;
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      case "CHECKOUT":
        return {
          cartItems: [],
          checkout: true,
          ...sumItems([]),
        };
      case "CLEAR":
        return {
          cartItems: [],
          ...sumItems([]),
        };
      default:
        return state;
    }
  } else {
    window.location.href = "/login?login=false";
  }
};
