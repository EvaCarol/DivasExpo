import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function NovaDivaForm({ onAdicionar, divaParaEditar, isEditando }) {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua permissão para usar a câmera. Vá nas configurações e permita o acesso.');
      }

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
      if (locationStatus.status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua permissão para acessar a localização. Vá nas configurações e permita o acesso.');
      }
    })();
  }, []);

  useEffect(() => {
    if (isEditando && divaParaEditar) {
      setNome(divaParaEditar.nome || '');
      setImagem(divaParaEditar.imagem || '');
      setDescricao(divaParaEditar.descricao || '');
      setLocalizacao(divaParaEditar.localizacao || '');
    }
  }, [divaParaEditar, isEditando]);

  const abrirCamera = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Permissão necessária', 'Por favor, permita o uso da câmera nas configurações.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        base64: false,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  };

  const pegarLocalizacaoAtual = async () => {
    if (!hasLocationPermission) {
      Alert.alert('Permissão necessária', 'Por favor, permita o acesso à localização nas configurações.');
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({});
      const coords = `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`;
      setLocalizacao(coords);
      Alert.alert('Localização obtida', `Coordenadas: ${coords}`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  const enviar = () => {
    if (nome && imagem && descricao) {
      onAdicionar({ nome, imagem, descricao, localizacao });
      limparCampos();
    } else {
      Alert.alert('Campos incompletos', 'Por favor, preencha nome, imagem e descrição.');
    }
  };

  const cancelarEdicao = () => {
    limparCampos();
    onAdicionar(null); // sinaliza ao componente pai que edição foi cancelada
  };

  const limparCampos = () => {
    setNome('');
    setImagem('');
    setDescricao('');
    setLocalizacao('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nome da Diva"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#a77"
      />
      <View style={styles.imageInputContainer}>
        <TextInput
          placeholder="URL da Imagem (ou tire uma foto)"
          value={imagem}
          onChangeText={setImagem}
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor="#a77"
        />
        <TouchableOpacity style={styles.cameraButton} onPress={abrirCamera}>
          <MaterialIcons name="camera-alt" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        multiline
        placeholderTextColor="#a77"
      />
      <View style={styles.locationContainer}>
        <TextInput
          placeholder="Localização (manual)"
          value={localizacao}
          onChangeText={setLocalizacao}
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor="#a77"
        />
        <TouchableOpacity style={styles.locationButton} onPress={pegarLocalizacaoAtual}>
          <MaterialIcons name="my-location" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Button
        title={isEditando ? 'Salvar Alterações' : 'Adicionar Diva'}
        onPress={enviar}
        color="#880E4F"
      />
      {isEditando && (
        <View style={{ marginTop: 8 }}>
          <Button
            title="Cancelar Edição"
            onPress={cancelarEdicao}
            color="#f8bbd0"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f4c2c2',
    marginBottom: 8,
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 6,
    backgroundColor: '#fff0f5',
    color: '#880E4F',
    fontWeight: '600',
  },
  imageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#880E4F',
    padding: 10,
    marginLeft: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: '#880E4F',
    padding: 10,
    marginLeft: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
