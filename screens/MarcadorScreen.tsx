import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BotonAccion from "../components/BotonAccion";
import PanelEquipo from "../components/PanelEquipo";

type Equipo = "local" | "visitante"; // sólo acepta uno de estos dos textos

// Cada jugada se guarda como objeto (no como texto) para poder deshacerla.
type Jugada = { id: string; equipo: Equipo; puntos: number };

const NOMBRES: Record<Equipo, string> = {
	local: "Local",
	visitante: "Visitante",
};

export default function MarcadorScreen() {
	const [local, setLocal] = useState(0);
	const [visitante, setVisitante] = useState(0);
	const [jugadas, setJugadas] = useState<Jugada[]>([]);

	// Función chica que sólo suma (o resta, con puntos negativos).
	// La usan anotar y deshacer. Setter funcional: depende del valor anterior.
	const sumar = (equipo: Equipo, puntos: number) => {
		if (equipo === "local") {
			setLocal((prev) => prev + puntos);
		} else {
			setVisitante((prev) => prev + puntos);
		}
	};

	// Una sola función para los seis botones: suma y registra la jugada.
	const anotar = (equipo: Equipo, puntos: number) => {
		sumar(equipo, puntos);
		setJugadas((prev) => [
			...prev,
			{ id: `${Date.now()}-${prev.length}`, equipo, puntos },
		]);
	};

	// Anula la última jugada: resta sus puntos y la saca de la lista.
	const deshacer = () => {
		const ultima = jugadas[jugadas.length - 1];
		if (!ultima) return;
		sumar(ultima.equipo, -ultima.puntos);
		setJugadas(jugadas.slice(0, -1)); // array nuevo, sin el último elemento
	};

	// Valor directo: el nuevo valor no depende del anterior.
	const nuevoPartido = () => {
		setLocal(0);
		setVisitante(0);
		setJugadas([]);
	};

	// Estado derivado: se calcula en cada redibujado, sin useState extra.
	const diferencia = Math.abs(local - visitante);
	const leyenda =
		local > visitante
			? `Gana Local por ${diferencia}`
			: visitante > local
				? `Gana Visitante por ${diferencia}`
				: "Empate";
	const marcadorEnCero = local === 0 && visitante === 0;
	const sinJugadas = jugadas.length === 0;
	const ultimasCinco = jugadas.slice(-5).reverse(); // la más reciente arriba

	return (
		<ScrollView style={styles.fondo} contentContainerStyle={styles.contenedor}>
			<Text style={styles.titulo}>Marcador de básquet</Text>

			{/* El padre pone su mitad: a qué equipo sumarle */}
			<PanelEquipo
				nombre="Local"
				puntos={local}
				color="#2563eb"
				onAnotar={(p) => anotar("local", p)}
				ganando={local > visitante}
			/>
			<PanelEquipo
				nombre="Visitante"
				puntos={visitante}
				color="#dc2626"
				onAnotar={(p) => anotar("visitante", p)}
				ganando={visitante > local}
			/>

			<Text style={styles.leyenda}>{leyenda}</Text>

			<View style={styles.acciones}>
				<BotonAccion
					titulo="Deshacer"
					onPress={deshacer}
					color="#6b7280"
					disabled={sinJugadas}
				/>
				<BotonAccion
					titulo="Nuevo partido"
					onPress={nuevoPartido}
					color="#111827"
					disabled={marcadorEnCero}
				/>
			</View>

			<View style={styles.historial}>
				<Text style={styles.subtitulo}>Últimas jugadas</Text>
				{sinJugadas ? (
					<Text style={styles.vacio}>Todavía no hay jugadas</Text>
				) : (
					ultimasCinco.map((jugada) => (
						<Text key={jugada.id} style={styles.jugada}>
							{NOMBRES[jugada.equipo]} +{jugada.puntos}
						</Text>
					))
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	fondo: {
		flex: 1,
		backgroundColor: "#f3f4f6",
	},
	contenedor: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingVertical: 48,
		gap: 16,
	},
	titulo: {
		fontSize: 24,
		fontWeight: "800",
	},
	leyenda: {
		fontSize: 20,
		fontWeight: "700",
		color: "#374151",
	},
	acciones: {
		flexDirection: "row",
		gap: 12,
	},
	historial: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 16,
		gap: 4,
	},
	subtitulo: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 4,
	},
	jugada: {
		fontSize: 16,
		color: "#374151",
	},
	vacio: {
		fontSize: 14,
		color: "#9ca3af",
	},
});
