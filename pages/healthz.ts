export async function getServerSideProps() {
  return {
    props: {
      ok: true,
      version: "1.0",
      timestamp: new Date().toISOString(),
    },
  };
}

export default function HealthzPage({ ok, version, timestamp }) {
  return (
    <pre>
{JSON.stringify({ ok, version, timestamp }, null, 2)}
    </pre>
  );
}
