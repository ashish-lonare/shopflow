export interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  isShippingIncluded: boolean;
}

export interface AddToCartPayload {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  stock: number;
}

export interface RemoveFromCartPayload {
  productId: number;
}

export interface UpdateCartItemPayload {
  productId: number;
  quantity: number;
}

export interface CartAction {
  type: string;
  payload: AddToCartPayload | RemoveFromCartPayload | UpdateCartItemPayload;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartPayload) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (payload: UpdateCartItemPayload) => void;
  clearCart: () => void;
}