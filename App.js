import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BarcodeScanner from './src/components/BarcodeScanner'; // Assuming BarcodeScanner is your main component

const App = () => {
  return (
    <PaperProvider>
      <BarcodeScanner />
    </PaperProvider>
  );
};

export default App;
