"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      return setError("Name is required");
    }

    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(formData.email)) {
      return setError("Please enter a valid email");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Failed to create account");
        return;
      }

      setSuccess("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      console.log(data);
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
          Create Account
        </h1>

        <p className="text-center text-zinc-400 mt-2">
          Join our platform today
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            fullWidth
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            variant="bordered"
            radius="lg"
            value={formData.name}
            onChange={handleChange}
          />

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
            endContent={
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

          <Button
            type="submit"
            color="primary"
            radius="lg"
            className="w-full font-semibold"
            isLoading={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
