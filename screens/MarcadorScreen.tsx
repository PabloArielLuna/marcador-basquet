import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BotonAccion from '../components/BotonAccion';
import PanelEquipo from '../components/PanelEquipo';

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

      {/* El padre pone su otra mitad: a qué equipo sumarle */}
      <PanelEquipo
        nombre="Local"
        puntos={local}
        color="#2563eb"
        onAnotar={(p) => anotar('local', p)}
      />
      <PanelEquipo
        nombre="Visitante"
        puntos={visitante}
        color="#dc2626"
        onAnotar={(p) => anotar('visitante', p)}
      />

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
});
