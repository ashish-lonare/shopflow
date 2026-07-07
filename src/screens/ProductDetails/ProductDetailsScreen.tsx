import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProductDetailsScreenStyles } from './ProductDeatilsScreen.styles';

import { useGetProductByIdQuery } from '../../features/products/productApi';
import { useRoute } from '@react-navigation/native';

import { useAppTheme } from '../../hooks/useAppTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppNavigation } from '../../navigation/hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { CartItem } from '../../features/cart/types';
import QuantitySelector from '../../components/quantitySelector/QuantitySelector';

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute();
  const theme = useAppTheme();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { productId } = route.params as {
    productId: number;
  };

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const styles = useProductDetailsScreenStyles();

  const quantity = useAppSelector(state => {
    const item = state.cart.items.find(
      (nItem: CartItem) => nItem.productId === productId,
    );
    return item ? item.quantity : 0;
  });

  const handleIncrement = () =>
    dispatch(
      addToCart({
        productId: product?.id || 0,
        title: product?.title || '',
        price: product?.price || 0,
        quantity: 1,
        thumbnail: product?.thumbnail || '',
        stock: product?.stock || 0,
      }),
    );
  const handleDecrement = () =>
    dispatch(removeFromCart({ productId: productId }));

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Product Details Loading...</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail,
        stock: product.stock,
      };
      dispatch(addToCart(cartItem));
      console.log(`Added ${cartItem.quantity} of ${product.title} to cart`);
    }
  };

  const handleGoToCart = () => {
    console.log(`Going to cart`);
    navigation.navigate('Home', {
      screen: 'Cart',
    });
  };

  const availabilityStatus = (product.availabilityStatus || '').toLowerCase();
  const isInStock = availabilityStatus === 'in stock';
  const isLowStock = availabilityStatus === 'low stock';
  const isOutOfStock = availabilityStatus === 'out of stock';
  const canAddToCart = !isOutOfStock;

  const stockIconName = isOutOfStock
    ? 'close-circle'
    : isLowStock
    ? 'alert-circle'
    : 'check-circle';
  const stockColor = isOutOfStock
    ? theme.colors.error
    : isLowStock
    ? theme.colors.warning
    : theme.colors.success;
  const stockLabel = isOutOfStock
    ? 'Out of Stock'
    : isLowStock
    ? 'Low Stock'
    : isInStock
    ? 'In Stock'
    : product.availabilityStatus;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Failed to load product</Text>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bottomSpace}
          >
            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.thumbnail }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={toggleWishlist}
              >
                <Icon
                  name={isWishlisted ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isWishlisted ? '#FF6B6B' : '#000'}
                />
              </TouchableOpacity>
            </View>

            {/* Product Info */}
            <View style={styles.detailsContainer}>
              {/* Name and Rating */}
              <View style={styles.nameRatingContainer}>
                <Text style={styles.productName}>{product.title}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#FFB800" />
                  <Text style={styles.ratingText}>
                    {product.rating} ({product.reviews.length || 0} reviews)
                  </Text>
                </View>
              </View>

              {/* Category */}
              <Text style={styles.categoryText}>{product.category}</Text>

              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${product.price}</Text>
                {product.price && (
                  <Text style={styles.originalPrice}>
                    ${product.price.toFixed(2)}
                  </Text>
                )}
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                  {product.description ||
                    'High-quality product with excellent features and durability.'}
                </Text>
              </View>

              {/* Quantity Selector */}
              {quantity > 0 ? (
                <QuantitySelector
                  quantity={quantity}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                  maxQuantity={product.stock}
                />
              ) : (
                // Add to Cart Button
                <TouchableOpacity
                  onPress={() => handleAddToCart()}
                  style={[
                    styles.addToCartButton,
                    !canAddToCart && styles.disabledButton,
                  ]}
                  disabled={!canAddToCart}
                >
                  <MaterialIcons
                    name="add-shopping-cart"
                    size={18}
                    style={styles.addToCartIcon}
                  />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              )}

              {/* Stock Status */}
              <View style={styles.stockContainer}>
                <Icon name={stockIconName} size={16} color={stockColor} />
                <Text
                  style={[
                    styles.stockText,
                    {
                      color: stockColor,
                    },
                  ]}
                >
                  {stockLabel}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Go to Cart Button */}
          <TouchableOpacity
            style={[styles.goToCartButton]}
            onPress={handleGoToCart}
          >
            <Text style={styles.goToCartText}>Go to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProductDetailsScreen;
