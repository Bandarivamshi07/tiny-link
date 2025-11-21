export async function getServerSideProps() {
  return {
    props: {
      ok: true,
      version: "1.0",
    },
  };
}

interface HealthProps {
  ok: boolean;
  version: string;
}

export default function Healthz({ ok, version }: HealthProps) {
  return (
    <pre>{JSON.stringify({ ok, version }, null, 2)}</pre>
  );
}
