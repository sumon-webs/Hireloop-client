"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(formData.email)) {
      return setError("Please enter a valid email");
    }

    if (!formData.password.trim()) {
      return setError("Password is required");
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message || "Invalid email or password");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Sign in to your account
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            fullWidth
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            variant="bordered"
            radius="lg"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            fullWidth
            label="Password"
            name="password"
            placeholder="Enter your password"
            variant="bordered"
            radius="lg"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            endcontent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="outline-none"
              >
                {showPassword ? (
                  <EyeSlash className="w-5 h-5 text-zinc-500" />
                ) : (
                  <Eye className="w-5 h-5 text-zinc-500" />
                )}
              </button>
            }
          />

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            radius="lg"
            className="w-full font-semibold"
            isLoading={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link href={`/sign-up?redirect=${redirectTo}`} className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
