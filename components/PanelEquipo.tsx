import { StyleSheet, Text, View } from 'react-native';
import BotonAccion from './BotonAccion';

type Props = {
  nombre: string;
  puntos: number;
  color: string; // fondo de los botones y color del número
  onAnotar: (puntos: number) => void;
  ganando: boolean; // si va ganando, el panel se resalta con el color del equipo
};

// Sin useState: el puntaje vive en la pantalla (el padre) y llega por props.
export default function PanelEquipo({ nombre, puntos, color, onAnotar, ganando }: Props) {
  return (
    <View style={[styles.panel, ganando && { borderColor: color, borderWidth: 4 }]}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={[styles.puntos, { color }]}>{puntos}</Text>
      <View style={styles.botonera}>
        {/* El panel pone su mitad: cuántos puntos se tocaron */}
        <BotonAccion titulo="+1" color={color} onPress={() => onAnotar(1)} />
        <BotonAccion titulo="+2" color={color} onPress={() => onAnotar(2)} />
        <BotonAccion titulo="+3" color={color} onPress={() => onAnotar(3)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 4,
    borderColor: 'transparent',
    alignItems: 'center',
    gap: 8,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
  },
  puntos: {
    fontSize: 56,
    fontWeight: '800',
  },
  botonera: {
    flexDirection: 'row',
    gap: 12,
  },
});
