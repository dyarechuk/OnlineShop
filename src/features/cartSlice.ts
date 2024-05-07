/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { toast } from 'react-toastify';
import { CartProduct } from '../types/CartProduct';
import { getId } from '../utils/getId';
import { WritableDraft } from 'immer';
import { convertCurrency } from '../utils/convertCurrency';

export interface CartState {
  cartItems: CartProduct[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  orderSuccess: boolean;
}

const initialState: CartState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  orderSuccess: false,
};

const findCartItemIndex = (
  state: WritableDraft<CartState>,
  action: { payload: any; type?: string },
) => {
  return state.cartItems.findIndex((item) => item.id === action.payload.id);
};

const toastNotification = (message: string, type: string) => {
  (toast as any)[type](message, {
    position: 'bottom-right',
  });
};

const updateLocalStorage = (cartItems: WritableDraft<CartProduct>[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const tempProduct: CartProduct = {
        id: getId(state.cartItems),
        product: { ...action.payload },
        cartQuantity: 1,
      };
      state.cartItems = [...state.cartItems, tempProduct];
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += +action.payload.convertedPrice;
      toastNotification(`${action.payload.name} added to cart`, 'success');

      updateLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );

      updateLocalStorage(state.cartItems);

      toastNotification(
        `${action.payload.product.name} removed from cart`,
        'error',
      );
    },
    decreaseQuantity: (state, action: PayloadAction<CartProduct>) => {
      const itemIndex = findCartItemIndex(state, action);

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        updateLocalStorage(state.cartItems);

        toastNotification(
          `Decreased ${state.cartItems[itemIndex].product.name} quantity`,
          'info',
        );
      } else {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        );

        state.cartItems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(nextCartItems));

        toastNotification(
          `${action.payload.product.name} removed from cart`,
          'error',
        );
      }

      state.cartTotalAmount -= +action.payload.product.convertedPrice;
      state.cartTotalQuantity -= 1;
    },
    increaseQuantity: (state, action: PayloadAction<CartProduct>) => {
      const itemIndex = findCartItemIndex(state, action);

      state.cartItems[itemIndex].cartQuantity += 1;
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += +action.payload.product.convertedPrice;
      toastNotification(
        `Increased ${state.cartItems[itemIndex].product.name} quantity`,
        'info',
      );

      updateLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem('cartItems');

      if (state.orderSuccess) {
        toastNotification(`Order successfully placed`, 'success');
      } else {
        toastNotification(`Cart was cleared`, 'error');
      }

      state.orderSuccess = false;
    },
    setOrderSuccess: (state) => {
      state.orderSuccess = true;
    },
    getTotals: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity } = cartItem;
          const { convertedPrice } = cartItem.product;
          const itemTotal = +convertedPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    convertAllToCurrency: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.map((item) => {
        item.product.convertedPrice = convertCurrency(
          action.payload,
          item.product.usdPrice,
        ).toString();
        return item;
      });

      updateLocalStorage(state.cartItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  getTotals,
  convertAllToCurrency,
  setOrderSuccess,
} = cartSlice.actions;
export default cartSlice.reducer;
