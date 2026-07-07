import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCartScreenStyles } from './CartScreen.styles';
import { CartItem } from '../../features/cart/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  addToCart,
  removeFromCart,
  toggleShippingIncluded,
} from '../../features/cart/cartSlice';
import {
  buildUpiPaymentUrl,
  buildTransactionNote,
  generateOrderId,
  formatINRCurrency,
  PAYMENT_CONFIG,
} from '../../services/paymentConfig';
import QuantitySelector from '../../components/quantitySelector/QuantitySelector';
import { useAppTheme } from '../../hooks/useAppTheme';

const CartScreen: React.FC = () => {
  const cartItems: CartItem[] = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const styles = useCartScreenStyles();
  const theme = useAppTheme();
  const navigation = useNavigation<any>();
  const isShippingIncluded = useAppSelector(
    state => state.cart.isShippingIncluded,
  )
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const isCartEmpty = cartItems.length === 0;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCharge = 99;
  const taxAmount = totalPrice * 0.1;
  const payableAmount =
    totalPrice + (isShippingIncluded ? shippingCharge : 0) + taxAmount;

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const handleIncrement = () =>
      dispatch(
        addToCart({
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: 1,
          thumbnail: item.thumbnail,
          stock: item.stock,
        }),
      );

    const handleDecrement = () =>
      dispatch(removeFromCart({ productId: item.productId }));

    return (
      <TouchableOpacity
        style={styles.cartItemShadow}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            productId: item.productId,
          });
        }}
      >
        <View style={styles.cartItem}>
          <View style={styles.thumbnailContainer}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.title}</Text>
            <View style={styles.priceQuantityContainer}>
              <View>
                <Text style={styles.itemPrice}>
                  {formatINRCurrency(item.price)}
                </Text>
                <Text style={styles.itemTotal}>
                  {formatINRCurrency(item.price * item.quantity)}
                </Text>
              </View>
              <View style={styles.quantitySection}>
                <QuantitySelector
                  quantity={item.quantity}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                  maxQuantity={item.stock}
                  variant="compact"
                  hideLabel
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCartItemSeparator = () => (
    <View style={styles.cartItemSeparator} />
  );

  const goToProductsScreen = () => {
    navigation.navigate('Products');
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyTextMsgContainer}>
        <TouchableOpacity
          onPress={goToProductsScreen}
          style={styles.emptyIconContainer}
        >
          <MaterialCommunityIcons
            name="cart-off"
            size={36}
            style={styles.emptyIcon}
          />
        </TouchableOpacity>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
        <Text style={styles.emptyLinkText} onPress={goToProductsScreen}>
          Explore products
        </Text>
      </View>
    );
  };

  const initiateUPIPayment = async () => {
    const orderId = generateOrderId();
    const txnNote = buildTransactionNote(
      orderId,
      cartItems.map(i => i.title),
    );
    const upiUrl = buildUpiPaymentUrl(payableAmount, txnNote);

    try {
      const supported = await Linking.canOpenURL(upiUrl);
      if (!supported) {
        Alert.alert(
          'Error',
          'No supported UPI applications found on this device.',
        );
        return;
      }

      const subscription = AppState.addEventListener(
        'change',
        (nextState: AppStateStatus) => {
          if (nextState === 'active') {
            subscription.remove();
            setTimeout(() => {
              Alert.alert(
                'Payment Status',
                'Did you complete the UPI payment?',
                [
                  { text: 'No / Cancelled', style: 'cancel' },
                  {
                    text: 'Yes, Paid',
                    onPress: () => sendOrderToWhatsAppMessage(orderId),
                  },
                ],
              );
            }, 500);
          }
        },
      );

      await Linking.openURL(upiUrl);
    } catch (error) {
      Alert.alert('Payment Failed', (error as Error).message);
    }
  };

  const sendOrderToWhatsAppMessage = async (orderId: string) => {
    const orderDetails = cartItems
      .map(
        item =>
          `${item.title} x${item.quantity} - ${formatINRCurrency(
            item.price * item.quantity,
          )}`,
      )
      .join('\n');

    const message = `New Order (${orderId}):\n${orderDetails}\nTotal: ${formatINRCurrency(
      payableAmount,
    )}`;

    const whatsappUrl = `whatsapp://send?phone=${
      PAYMENT_CONFIG.whatsappNumber
    }&text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on this device.');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleEmptyCartClicked = () => {
    Alert.alert(
      'Empty Cart',
      'Are you sure you want to empty the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(clearCart()) },
      ],
      { cancelable: true },
    );
  };

  const handleShippingClicked = () => {
   dispatch(toggleShippingIncluded());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Shopping Cart</Text>
        {!isCartEmpty && (
          <TouchableOpacity
            style={styles.emptyBtnContainer}
            onPress={handleEmptyCartClicked}
          >
            <Text
              style={styles.quantity}
            >{`Empty Cart (${cartItems.length})`}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cartListContainer}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId.toString()}
          renderItem={renderCartItem}
          style={styles.cartList}
          contentContainerStyle={styles.cartListContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderCartItemSeparator}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {!isCartEmpty ? (
        <>
          <View style={styles.summaryShadow}>
            <TouchableOpacity
              style={styles.summaryHeader}
              onPress={() => setSummaryExpanded(!summaryExpanded)}
            >
              <View>
                <Text style={styles.summaryHeaderTitle}>Order Summary</Text>
                <Text style={styles.summaryHeaderSubtitle}>
                  {summaryExpanded ? 'Tap to collapse' : 'Tap to view breakup'}
                </Text>
              </View>
              <MaterialCommunityIcons
                name={summaryExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>

            {summaryExpanded ? (
              <View style={styles.summaryContainer}>
                <TouchableOpacity
                  style={styles.summary}
                  onPress={() => handleShippingClicked()}
                >
                  <View style={styles.shippingCheckboxContainer}>
                    <MaterialCommunityIcons
                      name={
                        isShippingIncluded
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      size={20}
                      color={theme.colors.primary}
                    />
                    <Text style={styles.summaryLabel}>Shipping:</Text>
                  </View>
                  <Text style={styles.summaryValue}>
                    {formatINRCurrency(shippingCharge)}
                  </Text>
                </TouchableOpacity>
                <View style={styles.summary}>
                  <Text style={styles.summaryLabel}>Subtotal:</Text>
                  <Text style={styles.summaryValue}>
                    {formatINRCurrency(totalPrice)}
                  </Text>
                </View>

                <View style={styles.summary}>
                  <Text style={styles.summaryLabel}>Tax:</Text>
                  <Text style={styles.summaryValue}>
                    {formatINRCurrency(taxAmount)}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => initiateUPIPayment()}
          >
            <Text style={styles.checkoutText}>
              Pay {formatINRCurrency(payableAmount)}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default CartScreen;
