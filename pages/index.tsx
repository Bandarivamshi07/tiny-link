import { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinksTable from "../components/LinksTable";

type LinkType = {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
};

export default function Home() {
  const [links, setLinks] = useState<LinkType[]>([]);

  async function loadLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  }

  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    loadLinks();
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">TinyLink Dashboard</h1>

      <AddLinkForm onCreated={loadLinks} />

      <LinksTable links={links} onDelete={deleteLink} />
    </div>
  );
}
