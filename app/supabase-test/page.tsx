"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function testConnection() {
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      if (error) {
        setMessage(`Connection reached Supabase, but query failed: ${error.message}`);
      } else {
        setMessage("Connected successfully. The profiles table is accessible.");
      }
    } catch {
      setMessage("Could not connect. Check your environment variables and client setup.");
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-2xl font-bold">Supabase Connection Test</h1>

      <button
        onClick={testConnection}
        disabled={loading}
        className="mt-6 rounded-full bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Connection"}
      </button>

      {message && (
        <p role="status" className="mt-5 break-words">
          {message}
        </p>
      )}
    </main>
  );
}