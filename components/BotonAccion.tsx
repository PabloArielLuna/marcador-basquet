import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  titulo: string;
  onPress: () => void;
  color?: string;
};

export default function BotonAccion({ titulo, onPress, color = '#374151' }: Props) {
  return (
    <TouchableOpacity
      style={[styles.boton, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
