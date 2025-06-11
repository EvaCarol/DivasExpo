import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DivaCard from './components/DivaCard';
import NovaDivaForm from './components/NovaDivaForm';
import ListaDivas from './components/ListaDivas';

const windowHeight = Dimensions.get('window').height;
const API_URL = 'https://divas-api.onrender.com/divas';

export default function App() {
  const [divas, setDivas] = useState([]);
  const [editandoDiva, setEditandoDiva] = useState(null);
  const [mostraFormulario, setMostraFormulario] = useState(false);

  useEffect(() => {
  const carregarDivas = async () => {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();

      if (dados.divas && Array.isArray(dados.divas)) {
        setDivas(dados.divas);
        await AsyncStorage.setItem('divas', JSON.stringify(dados.divas));
      }
    } catch (erro) {
      console.error('Erro ao buscar da API:', erro);
      // Se API falhar, tenta carregar do AsyncStorage
      const cache = await AsyncStorage.getItem('divas');
      if (cache) {
        setDivas(JSON.parse(cache));
      }
    }
  };

  carregarDivas();
}, []);


  const salvarDivas = async (novasDivas) => {
    setDivas(novasDivas);
    await AsyncStorage.setItem('divas', JSON.stringify(novasDivas));
  };

  const adicionarDiva = async (novaDiva) => {
    if (!novaDiva) {
      setEditandoDiva(null);
      setMostraFormulario(false);
      return;
    }

    if (editandoDiva !== null) {
      const atualizadas = [...divas];
      atualizadas[editandoDiva] = novaDiva;
      await salvarDivas(atualizadas);
      setEditandoDiva(null);
    } else {
      const novas = [...divas, novaDiva];
      await salvarDivas(novas);
    }

    setMostraFormulario(false);
  };

  const excluirDiva = async (index) => {
    const novas = divas.filter((_, i) => i !== index);
    await salvarDivas(novas);
  };

  const editarDiva = (index) => {
    setEditandoDiva(index);
    setMostraFormulario(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎤 Divas Pop dos Anos 2000</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://i.scdn.co/image/ab6761610000e5eb26e59b825251b7df20a7b65e' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Button
        title={mostraFormulario ? 'Ocultar formulário' : 'Adicione sua diva'}
        onPress={() => {
          setMostraFormulario(!mostraFormulario);
          if (!mostraFormulario) setEditandoDiva(null);
        }}
        color="#AD1457"
      />

      {mostraFormulario && (
        <NovaDivaForm
          onAdicionar={adicionarDiva}
          divaParaEditar={divas[editandoDiva]}
          isEditando={editandoDiva !== null}
        />
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ListaDivas
          divas={divas}
          onEditar={editarDiva}
          onExcluir={excluirDiva}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 16,
    paddingTop: windowHeight * 0.05,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#880E4F',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F8BBd0',
    shadowColor: '#880E4F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});


