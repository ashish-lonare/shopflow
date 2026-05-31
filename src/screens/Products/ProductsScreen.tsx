import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useProductsScreenStyles } from './ProductsScreen.styles';
import {
  useGetProductCategoryListQuery,
  useGetProductsQuery,
} from '../../features/products/productApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductItem from './components/ProductItem';
import { Product } from '../../features/products/types';

const ProductsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const styles = useProductsScreenStyles();

  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: categories = [] } = useGetProductCategoryListQuery();

  const filteredProducts = useMemo(() => {
    const products = data?.products ?? [];

    const query = searchQuery.toLowerCase();

    return products.filter(product => {
      const matchesSearch =
        product.title?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data?.products, searchQuery, selectedCategory]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductItem product={item} />,
    [],
  );

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyTextMsgContainer}>
        <View style={styles.emptyIconContainer}>
          <MaterialIcons name="search-off" size={36} style={styles.emptyIcon} />
        </View>
        <Text style={styles.emptyText}>
          {searchQuery
            ? `No products found for "${searchQuery}"`
            : 'No products available'}
        </Text>
      </View>
    );
  };

  if (isLoading || isFetching) {
    return (
       <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={styles.loaderColor.color} />
        </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Failed to load products</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
          <FlatList
            data={[{ value: 'All', label: 'All' }, ...categories]}
            style={styles.categoryListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.value}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => {
              const isSelected = item.value === selectedCategory;

              return (
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    isSelected && styles.selectedCategoryChip,
                  ]}
                  onPress={() => setSelectedCategory(item.value)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.selectedCategoryText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search by title, category, or brand..."
              placeholderTextColor={styles.placeHolderTextColor.color}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            numColumns={1}
            contentContainerStyle={styles.listContent}
            refreshing={isFetching}
            onRefresh={refetch}
            ListEmptyComponent={renderEmptyComponent}
          />
      
    </View>
  );
};

export default ProductsScreen;
