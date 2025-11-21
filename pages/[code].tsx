import type { GetServerSideProps } from "next";
import db from "../lib/db";

export default function RedirectPage() {
  return <p>Redirecting...</p>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.params?.code as string;

  const result = await db.query(
    `UPDATE links
      SET clicks = clicks + 1,
          last_clicked = NOW()
     WHERE code = $1
     RETURNING target_url`,
    [code]
  );

  // NO LINK FOUND ?
  if (result.rowCount === 0) {
    return {
      notFound: true,
    };
  }

  // ✔ Redirect to stored URL
  return {
    redirect: {
      destination: result.rows[0].target_url,
      permanent: false,
    },
  };
};
