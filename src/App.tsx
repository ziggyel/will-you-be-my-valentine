import { useEffect, useMemo, useRef, useState } from "react";
import maleImg from "./assets/male.jpg";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 60, y: 65 }); // %
  const containerRef = useRef(null);

  const yesScale = useMemo(() => {
    // crece suave pero con límite razonable
    const scale = 1 + Math.min(noCount * 0.18, 2.2);
    return scale;
  }, [noCount]);

  useEffect(() => {
    // ubicar el NO en un lugar "lindo" al cargar
    setNoPos({ x: 62, y: 70 });
  }, []);

  function moveNoButton() {
    if (!containerRef.current) return;

    // zona segura para que no se vaya fuera de pantalla (en %)
    const minX = 10;
    const maxX = 90;
    const minY = 35;
    const maxY = 88;

    // evitamos que aparezca demasiado cerca del SI
    // (simple: sólo random y listo; queda bien igual)
    const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    setNoPos({ x, y });
    setNoCount((c) => c + 1);
  }

  if (accepted) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <img src={maleImg} alt="Male" style={styles.image} />
          <h1 style={styles.title}>Listo, sos mi San Valentín 😚</h1>
          <p style={styles.subtitle}>Nos vemos el 14 💘</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div ref={containerRef} style={styles.card}>
        <img src={maleImg} alt="Male" style={styles.image} />

        <h1 style={styles.title}>¿Querés pasar San Valentín conmigo, Male?</h1>
        <p style={styles.subtitle}>
          (Elegí con sabiduría 😇)
        </p>

        <div style={styles.buttonRow}>
          <button
            onClick={() => setAccepted(true)}
            style={{
              ...styles.yesBtn,
              transform: `scale(${yesScale})`,
            }}
          >
            Sí 💘
          </button>
        </div>

        {/* Botón NO flotante */}
        <button
          onMouseEnter={moveNoButton}
          style={{
            ...styles.noBtn,
            left: `${noPos.x}%`,
            top: `${noPos.y}%`,
          }}
          aria-label="No"
        >
          No 🙄
        </button>

        <div style={styles.footer}>
          {noCount === 0 ? (
            <span>😌</span>
          ) : (
            <span>
              Intentos de “No”: <b>{noCount}</b> (no sirve 😈)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle at top, rgba(255, 192, 203, 0.35), transparent 55%), linear-gradient(180deg, #0b0b10, #101022)",
    padding: 16,
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  card: {
    width: "min(560px, 92vw)",
    minHeight: "min(720px, 86vh)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    padding: 22,
    color: "white",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 320,
    objectFit: "cover",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    lineHeight: 1.15,
    margin: "8px 0 6px",
    letterSpacing: -0.4,
  },
  subtitle: {
    opacity: 0.85,
    marginTop: 0,
    marginBottom: 18,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
    paddingTop: 10,
  },
  yesBtn: {
    background: "rgba(255, 105, 180, 0.9)",
    color: "white",
    border: "none",
    borderRadius: 16,
    padding: "14px 20px",
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 16px 40px rgba(255, 105, 180, 0.25)",
    transition: "transform 120ms ease",
  },
  noBtn: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    background: "rgba(255,255,255,0.10)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 14,
    padding: "12px 16px",
    fontSize: 16,
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "left 120ms ease, top 120ms ease",
    userSelect: "none",
  },
  footer: {
    marginTop: 22,
    textAlign: "center",
    opacity: 0.85,
  },
};
