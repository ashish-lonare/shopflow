import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Product } from '../../../features/products/types';
import { useProductItemStyles } from './ProductItem.styles';
import { useAppNavigation } from '../../../navigation/hooks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CartItem } from '../../../features/cart/types';
import { addToCart, removeFromCart } from '../../../features/cart/cartSlice';
import QuantitySelector from '../../../components/quantitySelector/QuantitySelector';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const styles = useProductItemStyles();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const quantity = useAppSelector(state => {
    const item = state.cart.items.find(
      (nItem: CartItem) => nItem.productId === product.id,
    );
    return item ? item.quantity : 0;
  });

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const handleIncrement = () =>
    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail,
        stock: product.stock,
      }),
    );

  const handleDecrement = () =>
    dispatch(removeFromCart({ productId: product.id }));

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      style={styles.productCard}
    >
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
        <View style={styles.brandQuantityContainer}>
          <View>
            {product.brand && <Text style={styles.brand}>{product.brand}</Text>}

            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{product.category}</Text>
            </View>
          </View>
          {quantity > 0 ? (
            <QuantitySelector
              quantity={quantity}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              maxQuantity={product.stock}
              variant="compact"
              hideLabel
            />
          ) : (
            <TouchableOpacity
              style={styles.addToCartButton}
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.title} to cart`}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              onPress={event => {
                event.stopPropagation();
                handleIncrement();
              }}
            >
              <Icon name="cart-plus" size={18} style={styles.addToCartIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceMeta}>
            <Text style={styles.discountedPrice}>${discountedPrice}</Text>

            <Text style={styles.originalPrice}>
              ${product.price.toFixed(2)}
            </Text>

            <Text style={styles.discount}>-{product.discountPercentage}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductItem);
