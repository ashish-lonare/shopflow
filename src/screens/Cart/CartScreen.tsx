import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCartScreenStyles } from './CardScreen.styles';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartScreen: React.FC = () => {
  const cartItems: CartItem[] = [
    { id: '1', name: 'Product A', price: 29.99, quantity: 2 },
    { id: '2', name: 'Product B', price: 49.99, quantity: 1 },
    { id: '3', name: 'Product C', price: 19.99, quantity: 3 },
  ];

  const styles = useCartScreenStyles();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantitySection}>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        scrollEnabled={false}
      />

      <View style={styles.divider} />

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Shipping:</Text>
        <Text style={styles.summaryValue}>$5.00</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Tax:</Text>
        <Text style={styles.summaryValue}>${(totalPrice * 0.1).toFixed(2)}</Text>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${(totalPrice + 5 + totalPrice * 0.1).toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
