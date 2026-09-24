import { StyleSheet, Text, View } from 'react-native';

export default function MarcadorScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Marcador de básquet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
  },
});
