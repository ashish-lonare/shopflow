import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useProductsScreenStyles } from './ProductsScreen.styles';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand: string;
}

const ProductsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const styles = useProductsScreenStyles();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const renderProductItem = ({ item }: { item: Product }) => {
    const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);

    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.productInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>${discountedPrice}</Text>
            <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.discount}>-{item.discountPercentage}%</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title, category, or brand..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={1}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </View>
  );
};

export default ProductsScreen;
