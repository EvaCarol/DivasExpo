import React from 'react';
import { View, StyleSheet } from 'react-native';
import DivaCard from './DivaCard';

export default function ListaDivas({ divas, onEditar, onExcluir }) {
  return (
    <View style={styles.lista}>
      {divas.map((diva, index) => (
        <DivaCard
          key={index}
          {...diva}
          onEditar={() => onEditar(index)}
          onExcluir={() => onExcluir(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 40,
  },
});
