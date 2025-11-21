import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { codeRegex, isValidUrl } from "../../../lib/validators";
import { generateShortCode } from "../../../lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { target_url, code } = req.body;

    if (!isValidUrl(target_url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    let finalCode = code || generateShortCode();

    if (!codeRegex.test(finalCode)) {
      return res.status(400).json({ error: "Code must be 6–8 alphanumeric characters" });
    }

    try {
      const result = await db.query(
        `INSERT INTO links (code, target_url)
         VALUES ($1, $2)
         RETURNING code, target_url, clicks, last_clicked, created_at`,
        [finalCode, target_url]
      );

      return res.status(201).json(result.rows[0]);
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(409).json({ error: "Short code already exists" });
      }
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "GET") {
    const result = await db.query(
      `SELECT code, target_url, clicks, last_clicked, created_at
       FROM links ORDER BY created_at DESC`
    );

    return res.status(200).json(result.rows);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
