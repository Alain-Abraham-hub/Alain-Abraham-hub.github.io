function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.name}>Alain Abraham</h1>
      <h2 style={styles.role}>Quantum Computing & Software Enthusiast</h2>

      <p style={styles.text}>
        I work on hands-on quantum computing projects using Qiskit and real IBM
        quantum hardware. I enjoy understanding how quantum algorithms behave on
        actual devices and learning the physics behind them.
      </p>

      <div style={styles.links}>
        <a href="https://github.com/Alain-Abraham-hub" target="_blank">
          GitHub
        </a>
        <a href="https://linkedin.com/" target="_blank">
          LinkedIn
        </a>
      </div>

      <div style={styles.card}>
        <h3>QAOA Max-Cut on IBM Quantum Hardware</h3>
        <p>
          Implemented the QAOA algorithm to solve the Max-Cut problem using real
          IBM quantum hardware. Learned about noise, transpilation, and
          hardware-level constraints.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "80px 20px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Inter, Arial, sans-serif",
  },
  name: { fontSize: "3rem", marginBottom: "10px" },
  role: { color: "#38bdf8", fontWeight: 400 },
  text: { fontSize: "1.1rem", lineHeight: 1.6 },
  links: { marginTop: "20px" },
  card: {
    background: "#020617",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "40px",
  },
};

export default App;