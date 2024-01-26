import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Image, Linking, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, TextInput, FAB, Portal, Dialog, Paragraph } from 'react-native-paper';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';

const BarcodeScanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
        // Oculta el Splash Screen
        await SplashScreen.hideAsync();
        setIsLoading(false);
      } catch (error) {
        console.error('Error al preparar la aplicación:', error);
      }
    };

    prepareApp();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (!showCamera || !searchSuccessful) {
      return;
    }

    try {
      setIsLoading(true); // Activar indicador de carga
      /*
      Los resultado de la api debe tener la siguiente estructura de ejemplo
      {
        status: true, //true or false
        descripcion: 'producto de prueba', //descripcion del productos
        precio: 10, //precio del producto
        moneda: 'USD' // moneda del precio
      }
      */ 
      const response = await axios.post('URL_API', {
        co_prod: data,
      });

      if (response.data.status === true) {
        const result = response.data;
        setProductInfo(result);
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
      } else {
        const errorMessage = response.data.message || 'Error desconocido al obtener información del producto';
        setProductInfo({ error: errorMessage });
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
      }
    } catch (error) {
        setProductInfo({ error: error.message });
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
    } finally {
      setIsLoading(false); // Desactivar indicador de carga
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Activar indicador de carga

      const response = await axios.post('http://developer.icarosoft.com:8092/scriptcase/app/webservice/getProducts/', {
        co_prod: searchText,
      });

      if (response.data.status === true) {
        const result = response.data;
        setProductInfo(result);
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
      } else {
        const errorMessage = response.data.message || 'Error desconocido al obtener información del producto';
        setProductInfo({ error: errorMessage });
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
      }
    } catch (error) {
        setProductInfo({ error: error.message });
        setShowCamera(false);
        setVisibleDialog(true);
        setSearchText('');
        setSearchSuccessful(false);
    } finally {
      setIsLoading(false); // Desactivar indicador de carga
    }
  };

  const hideDialog = () => {
    setVisibleDialog(false);
  };

  const handleScanButtonPress = () => {
    setShowCamera(true);
    setProductInfo(null);
    setSearchText('');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return <Text>No se ha otorgado permiso para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showCamera ? (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              onBarCodeScanned={handleBarCodeScanned}
            />
            <FAB
              style={styles.cancelButton}
              icon="close"
              onPress={() => setShowCamera(false)}
            />
          </View>
        ) : (
          <View>
            <Image
              source={require('../../assets/image/logo.webp')}
              style={styles.logo}
            />
            <TextInput
              style={styles.input}
              label="Ingresa el codigo para buscar"
              value={searchText}
              onChangeText={(text) => setSearchText(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"  // Establecer el teclado numérico
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSearch}
            >
              Buscar
            </Button>
            <Button
              mode="contained"
              style={styles.scanButton}
              onPress={handleScanButtonPress}
              disabled={!searchSuccessful}
            >
              Escanear
            </Button>
          </View>
        )}
        <Portal>
          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Title>{productInfo && !productInfo.error ? 'Producto encontrado' : 'Error'}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {productInfo && !productInfo.error ? (
                  <Text>
                    Precio: <Text style={styles.boldText}>{productInfo.precio} {productInfo.moneda}</Text>{'\n'}
                    Descripción: <Text style={styles.boldText}>{productInfo.descripcion}</Text>
                  </Text>
                ) : (
                  <Text style={styles.errorText}>{productInfo && productInfo.error}</Text>
                )}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { hideDialog(); setSearchSuccessful(true); }}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Realizado por{' '}
          <Text style={styles.authorLink} onPress={() => Linking.openURL('https://github.com/leonardou92')}>
            Leonardo Urdaneta
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#6200EE',
  },
  scanButton: {
    marginBottom: 16,
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF5252',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20, // Ajusta el tamaño de la fuente
    color: 'green', // Ajusta el color del texto
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  // Estilos del pie de página
  footer: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
  authorLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeScanner;
