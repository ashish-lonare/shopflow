import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useQuantitySelectorStyles from './QuantitySelector.styles';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  maxQuantity?: number;
  label?: string;
  variant?: 'default' | 'compact';
  hideLabel?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  maxQuantity,
  label = 'Quantity',
  variant = 'default',
  hideLabel = false,
}) => {
  const isCompact = variant === 'compact';
  const isIncrementDisabled =
    typeof maxQuantity === 'number' ? quantity >= maxQuantity : false;
  const styles = useQuantitySelectorStyles(isCompact);

  return (
    <View style={styles.container}>
      {!hideLabel && <Text style={styles.label}>{label}</Text>}

      <View style={styles.addToCartContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={event => {
            event.stopPropagation();
            onDecrement();
          }}
          accessibilityRole="button"
          accessibilityLabel="Decrease quantity"
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <Icon
            name="minus"
            size={isCompact ? 18 : 20}
            style={styles.addToCartIcon}
          />
        </TouchableOpacity>
        <View style={styles.addToCartButton}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={event => {
            event.stopPropagation();
            onIncrement();
          }}
          disabled={isIncrementDisabled}
          accessibilityRole="button"
          accessibilityLabel="Increase quantity"
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <Icon
            name="plus"
            size={isCompact ? 18 : 20}
            style={styles.addToCartIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(QuantitySelector);
