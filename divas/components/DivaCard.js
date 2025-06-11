import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DivaCard({ nome, imagem, descricao, localizacao, onExcluir, onEditar }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{nome}</Text>
      <Image source={{ uri: imagem }} style={styles.image} />
      <Text style={styles.description}>{descricao}</Text>
      {localizacao ? (
        <Text style={styles.location}>📍 {localizacao}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEditar}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onExcluir}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fef0f6',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#880E4F',
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#5a005a',
  },
  location: {
    marginTop: 10,
    fontSize: 14,
    color: '#a63684',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#880E4F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#C2185B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
