"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import {
  AuthField,
  AuthShell,
  authGhostBtn,
  authInputClass,
  authPrimaryBtn,
} from "@/components/auth-shell";
import { GoogleIcon } from "@/components/google-icon";

export default function HostSignupPage() {
  const router = useRouter();
  const { user, ready, signupOrganizer, googleLogin } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user?.role === "organizer") router.replace("/dashboard");
  }, [ready, user, router]);

  const strong =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  const canSubmit = orgName.trim().length > 1 && email.includes("@") && strong;

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!strong) {
      setError("Password must be at least 8 characters, with an uppercase letter and a number.");
      return;
    }
    const result = signupOrganizer({ orgName, email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <AuthShell>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-[1.75rem] font-extrabold tracking-tight">Join BuyersEdge</h2>
        <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-muted">
          Organizer
        </span>
      </div>
      <p className="mt-1.5 text-[15px] text-muted">
        Create your account — your first event can go live today.
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
        <AuthField label="Organizer / Organization Name">
          <input
            required
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            placeholder="Enter company, organization, or organizer name"
            className={authInputClass}
          />
        </AuthField>
        <AuthField label="Email">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className={`${authInputClass} pl-10`}
            />
          </div>
        </AuthField>
        <AuthField label="Password">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              required
              minLength={8}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className={`${authInputClass} px-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-zinc-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-muted">
            At least 8 characters, with an uppercase letter and a number.
          </p>
        </AuthField>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={!canSubmit} className={authPrimaryBtn}>
          Create my organizer account
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[11px] font-semibold tracking-widest text-muted">
        <span className="h-px flex-1 bg-zinc-200" />
        OR
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <button
        type="button"
        onClick={() => {
          googleLogin("organizer");
          router.push("/dashboard");
        }}
        className={authGhostBtn}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-xs leading-5 text-muted">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
      <p className="mt-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
