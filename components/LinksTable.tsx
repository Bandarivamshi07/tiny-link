type LinkType = {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
};

export default function LinksTable({
  links,
  onDelete,
}: {
  links: LinkType[];
  onDelete: (code: string) => void;
}) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Target URL</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Last Clicked</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => {
            const shortUrl = `${window.location.origin}/${link.code}`;

return (
  <tr key={link.code}>
    <td className="p-2 border">
      <a
        href={`/${link.code}`}
        className="text-blue-600 underline"
      >
        {link.code}
      </a>
    </td>


                <td className="p-2 border max-w-[200px] truncate">
                  {link.target_url}
                </td>

                <td className="p-2 border text-center">{link.clicks}</td>

                <td className="p-2 border">
                  {link.last_clicked
                    ? new Date(link.last_clicked).toLocaleString()
                    : "—"}
                </td>

                <td className="p-2 border space-x-2 text-center">
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => onDelete(link.code)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {links.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={5}>
                No links created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
