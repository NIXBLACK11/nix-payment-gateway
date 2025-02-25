"use client";

import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const createUser = async () => {
    setLoading(true);
    setResponse(null);

    const mockUser = {
      publicKey: "123abc",
      saasName: "Test SaaS",
      logoUrl: "https://example.com/logo.png",
      address: "0xabc123...",
      tiers: [
        { tier: "Starter", price: 5 },
        { tier: "Growth", price: 20 },
        { tier: "Premium", price: 50 },
      ],
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUser),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Test API Request</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={createUser}
        disabled={loading}
      >
        {loading ? "Creating User..." : "Create User"}
      </button>

      {response && (
        <pre className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto">{response}</pre>
      )}
    </div>
  );
}
