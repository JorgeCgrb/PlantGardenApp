// src/components/common/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ placeholder, value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder || "Search..."}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {value ? (
          <TouchableOpacity
            onPress={() => {
              if (onClear) {
                onClear();
              } else if (onChangeText) {
                onChangeText('');
              }
            }}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;