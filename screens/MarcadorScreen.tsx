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

  // Estado derivado: se calcula en cada redibujado a partir de local y visitante.
  // No hace falta ningún useState nuevo.
  const diferencia = Math.abs(local - visitante);
  const leyenda =
    local > visitante
      ? `Gana Local por ${diferencia}`
      : visitante > local
        ? `Gana Visitante por ${diferencia}`
        : 'Empate';
  const marcadorEnCero = local === 0 && visitante === 0;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Marcador de básquet</Text>

      {/* El padre pone su otra mitad: a qué equipo sumarle */}
      <PanelEquipo
        nombre="Local"
        puntos={local}
        color="#2563eb"
        onAnotar={(p) => anotar('local', p)}
        ganando={local > visitante}
      />
      <PanelEquipo
        nombre="Visitante"
        puntos={visitante}
        color="#dc2626"
        onAnotar={(p) => anotar('visitante', p)}
        ganando={visitante > local}
      />

      <Text style={styles.leyenda}>{leyenda}</Text>

      <BotonAccion
        titulo="Nuevo partido"
        onPress={nuevoPartido}
        color="#111827"
        disabled={marcadorEnCero}
      />
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
  leyenda: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
});
