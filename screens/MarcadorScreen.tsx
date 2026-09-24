import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BotonAccion from '../components/BotonAccion';

type Equipo = 'local' | 'visitante'; // sólo acepta uno de estos dos textos

export default function MarcadorScreen() {
  const [local, setLocal] = useState(0);
  const [visitante, setVisitante] = useState(0);

  // Una sola función para los seis botones.
  // Setter funcional: el nuevo puntaje depende del anterior.
  const anotar = (equipo: Equipo, puntos: number) => {
    if (equipo === 'local') {
      setLocal((prev) => prev + puntos);
    } else {
      setVisitante((prev) => prev + puntos);
    }
  };

  // Valor directo: el nuevo valor (0) no depende del anterior.
  const nuevoPartido = () => {
    setLocal(0);
    setVisitante(0);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Marcador de básquet</Text>

      <View style={styles.equipo}>
        <Text style={styles.nombre}>Local</Text>
        <Text style={styles.puntos}>{local}</Text>
        <View style={styles.botonera}>
          <BotonAccion titulo="+1" onPress={() => anotar('local', 1)} />
          <BotonAccion titulo="+2" onPress={() => anotar('local', 2)} />
          <BotonAccion titulo="+3" onPress={() => anotar('local', 3)} />
        </View>
      </View>

      <View style={styles.equipo}>
        <Text style={styles.nombre}>Visitante</Text>
        <Text style={styles.puntos}>{visitante}</Text>
        <View style={styles.botonera}>
          <BotonAccion titulo="+1" onPress={() => anotar('visitante', 1)} />
          <BotonAccion titulo="+2" onPress={() => anotar('visitante', 2)} />
          <BotonAccion titulo="+3" onPress={() => anotar('visitante', 3)} />
        </View>
      </View>

      <BotonAccion titulo="Nuevo partido" onPress={nuevoPartido} color="#111827" />
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
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
  },
  equipo: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
