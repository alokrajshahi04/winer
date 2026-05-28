"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (name && email && password) {
        localStorage.setItem("winer_user", JSON.stringify({ name, email }));
        router.push("/dashboard");
      } else {
        setError("Please fill in all fields");
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">\ud83c\udf77</span>
          <h1 className="text-2xl font-bold text-white mt-4">Meet your co-founder</h1>
          <p className="text-sm text-gray-400 mt-1">Create an account to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@startup.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-surface-raised border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required minLength={8} />
          </div>
          <Button type="submit" isLoading={isLoading} className="w-full">Create account</Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link href="/login" className="text-brand-400 hover:text-brand-300">Sign in</Link></p>
      </div>
    </div>
  );
}
