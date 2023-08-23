import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};
export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart: (product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      removeFromCart: (product) => {
        set((state) => {
          const updatedCart = state.cart.map((item) => {
            if (item._id === product._id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          });

          return {
            cart: updatedCart.filter((item) => item.quantity > 0),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          };
        });
      },

      removeAllById: (product) => {
        set((state) => {
          const filteredItems = state.cart.filter(
            (item) => item._id === product._id
          );

          const removedQuantity =
            filteredItems.length > 0 ? filteredItems[0].quantity : 0;

          const removedPrice = filteredItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            cart: state.cart.filter((item) => item._id !== product._id),
            totalItems: state.totalItems - removedQuantity,
            totalPrice: state.totalPrice - removedPrice,
          };
        });
      },
      clearCart: () => {
        set(() => INITIAL_STATE);
      },
    }),
    {
      name: "cart-storage",
    },
    {
      onRehydrateStorage: (state) => {
        console.log("hydration starts");

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);
