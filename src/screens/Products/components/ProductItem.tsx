import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Product } from '../../../features/products/types';
import { useProductItemStyles } from './ProductItem.styles';
import { useAppNavigation } from '../../../navigation/hooks';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const styles = useProductItemStyles();
  const navigation = useAppNavigation();

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate('ProductDetails', {
                productId: product.id,
                addToCart: false,
              });
    }} style={styles.productCard}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.thumbnail}
      />

      <View style={styles.productInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {product.brand && <Text style={styles.brand}>{product.brand}</Text>}

        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceMeta}>
            <Text style={styles.discountedPrice}>${discountedPrice}</Text>

            <Text style={styles.originalPrice}>
              ${product.price.toFixed(2)}
            </Text>

            <Text style={styles.discount}>-{product.discountPercentage}%</Text>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            accessibilityRole="button"
            accessibilityLabel={`Add ${product.title} to cart`}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            onPress={() => {
              navigation.navigate('ProductDetails', {
                productId: product.id,
                addToCart: true,
              });
            }}
          >
            <MaterialIcons
              name="add-shopping-cart"
              size={18}
              style={styles.addToCartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductItem);
