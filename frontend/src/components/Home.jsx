const features = [
  {
    icon: "⚡",
    title: "Fast Execution",
    desc: "Tasks are distributed and processed in parallel across workers.",
  },
  {
    icon: "🔁",
    title: "Auto Retry",
    desc: "Failed tasks are automatically retried with backoff strategies.",
  },
  {
    icon: "📊",
    title: "Real-time Monitoring",
    desc: "Track task status, worker health, and queue depth live.",
  },
];

function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.badge}>⚙️ Distributed Task Queue</div>
        <h1 style={styles.title}>TaskFlow</h1>
        <p style={styles.subtitle}>
          Reliable, scalable background job processing — built for modern apps.
        </p>
      </div>

      <div style={styles.features}>
        {features.map((f) => (
          <div key={f.title} style={styles.card}>
            <div style={styles.cardIcon}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    color: "#f0f0f0",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 20px",
  },
  hero: {
    textAlign: "center",
    maxWidth: 600,
    marginBottom: 60,
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#1a1a2e",
    color: "#7f77dd",
    border: "1px solid #7f77dd44",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 13,
    marginBottom: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 700,
    margin: "0 0 16px",
    color: "#ffffff",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 17,
    color: "#9ca3af",
    lineHeight: 1.6,
    margin: 0,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
    width: "100%",
    maxWidth: 860,
  },
  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: "24px 20px",
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: "0 0 8px",
    color: "#f0f0f0",
  },
  cardDesc: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 1.6,
    margin: 0,
  },
};

export default Home;