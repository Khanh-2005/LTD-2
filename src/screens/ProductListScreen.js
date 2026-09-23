import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import useProducts from "../hooks/useProducts";

function ProductItem({ item }) {
  return (
    <View style={styles.productItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>
          ${Number(item.price).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

function LoadingState() {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.centerState}>
      <Text style={styles.stateTitle}>Không thể tải sản phẩm</Text>
      <Text style={styles.stateMessage}>{message}</Text>
      <Button title="Thử lại" onPress={onRetry} />
    </View>
  );
}

function EmptyState({ isSearching }) {
  return (
    <View style={styles.centerState}>
      <Text style={styles.stateTitle}>
        {isSearching
          ? "Không tìm thấy sản phẩm phù hợp"
          : "Không tìm thấy sản phẩm"}
      </Text>
    </View>
  );
}

function ListFooter({ loadingMore, error, onRetry }) {
  if (loadingMore) {
    return (
      <View style={styles.footerState}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.footerState}>
        <Text style={styles.stateMessage}>{error}</Text>
        <Button title="Thử lại" onPress={onRetry} />
      </View>
    );
  }

  return null;
}

export default function ProductListScreen() {
  const [query, setQuery] = useState("");
  const { products, loading, loadingMore, error, loadMore, refresh, retry } =
    useProducts(query);
  const isSearching = Boolean(query.trim());

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm sản phẩm"
        placeholderTextColor="#777777"
        style={styles.searchInput}
        returnKeyType="search"
      />
      {loading && products.length === 0 ? <LoadingState /> : null}
      {error && products.length === 0 ? (
        <ErrorState message={error} onRetry={retry} />
      ) : null}
      {!loading && !error && products.length === 0 ? (
        <EmptyState isSearching={isSearching} />
      ) : null}
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductItem item={item} />}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={loading}
          ListFooterComponent={
            <ListFooter
              loadingMore={loadingMore}
              error={error}
              onRetry={retry}
            />
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  thumbnail: {
    width: 72,
    height: 72,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: "#e5e5e5",
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  stateTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#222222",
  },
  stateMessage: {
    marginBottom: 16,
    textAlign: "center",
    color: "#555555",
  },
  footerState: {
    alignItems: "center",
    paddingVertical: 16,
  },
});
