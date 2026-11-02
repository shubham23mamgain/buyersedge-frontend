"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { DEMO_OTP } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import {
  AuthField,
  AuthShell,
  authGhostBtn,
  authInputClass,
  authPrimaryBtn,
} from "@/components/auth-shell";
import { GoogleIcon } from "@/components/google-icon";

export default function OrganizerLoginPage() {
  const router = useRouter();
  const { user, ready, loginOrganizer, loginOrganizerByEmail, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user?.role === "organizer") router.replace("/dashboard");
  }, [ready, user, router]);

  const canSubmit = otpMode
    ? email.includes("@") && otp.length === 6
    : email.includes("@") && password.length > 0;

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (otpMode) {
      if (otp !== DEMO_OTP) {
        setError(`Enter the demo OTP ${DEMO_OTP} to sign in.`);
        return;
      }
      const result = loginOrganizerByEmail(email);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/dashboard");
      return;
    }
    const result = loginOrganizer(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <AuthShell>
      <h2 className="text-[1.75rem] font-extrabold tracking-tight">Welcome back</h2>
      <p className="mt-1.5 text-[15px] text-muted">Sign in to BuyersEdge to manage your events.</p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
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

        {otpMode ? (
          <AuthField label="OTP">
            <input
              required
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder={DEMO_OTP}
              className={authInputClass}
            />
            <p className="mt-1.5 text-xs text-muted">Demo OTP is {DEMO_OTP}.</p>
          </AuthField>
        ) : (
          <AuthField label="Password">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
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
          </AuthField>
        )}

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="inline-flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="size-4 accent-[#7f22fe]"
            />
            Remember for 30 days
          </label>
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit" disabled={!canSubmit} className={authPrimaryBtn}>
          {otpMode ? "Verify OTP" : "Sign in"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setOtpMode((value) => !value);
          setError("");
        }}
        className={`mt-3 ${authGhostBtn}`}
      >
        {otpMode ? "Use password instead" : "Use OTP instead"}
      </button>

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
        By continuing, you agree to our Terms of Service and Privacy Policy. ·{" "}
        <Link href="/" className="font-medium text-foreground hover:underline">
          Buy tickets instead
        </Link>
      </p>
      <p className="mt-5 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/host" className="font-semibold text-primary">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
