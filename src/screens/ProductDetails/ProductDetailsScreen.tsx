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

import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute();
  const theme = useAppTheme();
  const navigation = useNavigation();
  const { productId, addToCart } = route.params as {
    productId: number;
    addToCart?: boolean;
  };

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(addToCart ? 1 : 0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const styles = useProductDetailsScreenStyles();

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    quantity > 1 ? setQuantity(quantity - 1) : navigation.goBack();
  };

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Product Details Loading...</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    navigation.goBack();
  };

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
                <View style={styles.quantityContainer}>
                  <Text style={styles.sectionTitle}>Quantity</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={handleDecrement}
                    >
                      <Icon name="minus" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={handleIncrement}
                    >
                      <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => setQuantity(1)}
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
                <Icon
                  name={
                    product.availabilityStatus ? 'check-circle' : 'close-circle'
                  }
                  size={16}
                  color={
                    product.availabilityStatus
                      ? theme.colors.success
                      : theme.colors.error
                  }
                />
                <Text
                  style={[
                    styles.stockText,
                    {
                      color: product.availabilityStatus
                        ? theme.colors.success
                        : theme.colors.error,
                    },
                  ]}
                >
                  {product.availabilityStatus ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[
              styles.goToCartButton,
              { opacity: product.availabilityStatus ? 1 : 0.5 },
            ]}
            onPress={handleAddToCart}
            disabled={!product.availabilityStatus}
          >
            <Text style={styles.goToCartText}>Go to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProductDetailsScreen;
