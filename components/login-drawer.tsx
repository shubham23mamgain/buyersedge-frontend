"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Smartphone, X } from "lucide-react";
import { DEMO_OTP } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import { GoogleIcon } from "@/components/google-icon";
import { authGhostBtn, authInputClass, authPrimaryBtn } from "@/components/auth-shell";

type Tab = "mobile" | "email";
type Step = "form" | "otp";

export function LoginDrawer() {
  const { loginOpen, closeLogin, loginAttendee, googleLogin } = useAuth();
  const [tab, setTab] = useState<Tab>("mobile");
  const [step, setStep] = useState<Step>("form");
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const firstOtp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loginOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [loginOpen]);

  useEffect(() => {
    if (loginOpen) {
      setTab("mobile");
      setStep("form");
      setSignup(false);
      setName("");
      setPhone("");
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setError("");
    }
  }, [loginOpen]);

  useEffect(() => {
    if (step === "otp") firstOtp.current?.focus();
  }, [step]);

  if (!loginOpen) return null;

  function requestOtp(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (tab === "mobile") {
      const digits = phone.replace(/\D/g, "");
      if (digits.length !== 10) {
        setError("Enter a valid 10-digit mobile number.");
        return;
      }
    } else if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (signup && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setStep("otp");
  }

  function verifyOtp(event: React.FormEvent) {
    event.preventDefault();
    const code = otp.join("");
    if (code !== DEMO_OTP) {
      setError(`Enter the 6-digit OTP. Demo code is ${DEMO_OTP}.`);
      return;
    }
    loginAttendee({
      name: name.trim() || undefined,
      email: tab === "email" ? email.trim() : undefined,
      phone: tab === "mobile" ? `+91${phone.replace(/\D/g, "")}` : undefined,
    });
  }

  function onOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit) {
      const sibling = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      sibling?.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/45 sm:items-end">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close login"
        onClick={closeLogin}
      />
      <div className="relative w-full max-w-lg animate-drawer-up rounded-t-3xl bg-white px-5 pb-8 pt-3 shadow-2xl sm:px-8">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-200" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              {step === "otp"
                ? "Enter OTP"
                : signup
                  ? "Create your account"
                  : "Access your bookings and tickets"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {step === "otp"
                ? `OTP sent to ${tab === "mobile" ? `+91 ${phone}` : email}. Demo OTP is ${DEMO_OTP}.`
                : "Sign in with Google, email, or an Indian mobile number."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeLogin}
            className="rounded-full p-1.5 hover:bg-zinc-100"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={requestOtp}>
            <div className="mb-4 grid grid-cols-2 rounded-xl bg-zinc-100 p-1">
              {(
                [
                  ["mobile", "Mobile"],
                  ["email", "Email"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setTab(key);
                    setError("");
                  }}
                  className={`h-9 rounded-lg text-sm font-semibold ${
                    tab === key ? "bg-white text-foreground shadow-sm" : "text-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {signup ? (
              <label className="mb-3 block text-sm font-medium">
                Full name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ananya Sharma"
                  className={`mt-1.5 ${authInputClass}`}
                />
              </label>
            ) : null}

            {tab === "mobile" ? (
              <label className="block text-sm font-medium">
                Mobile number
                <div className="mt-1.5 flex items-center overflow-hidden rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/40">
                  <span className="flex h-11 items-center gap-2 border-r border-border px-3 text-sm text-muted">
                    <Smartphone className="size-4" />
                    +91
                  </span>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="h-11 w-full px-3 text-sm outline-none"
                />
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  Indian mobile numbers only. We&apos;ll text you a 6-digit code.
                </p>
              </label>
            ) : (
              <label className="block text-sm font-medium">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={`mt-1.5 ${authInputClass}`}
                />
              </label>
            )}

            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

            <button type="submit" className={`mt-5 ${authPrimaryBtn}`}>
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  ref={index === 0 ? firstOtp : undefined}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => onOtpChange(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && !otp[index] && index > 0) {
                      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
                      prev?.focus();
                    }
                  }}
                  className="h-12 w-11 rounded-lg border border-border text-center text-lg font-bold outline-none focus:ring-2 focus:ring-primary/40"
                />
              ))}
            </div>
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
            <button type="submit" className={`mt-5 ${authPrimaryBtn}`}>
              Verify & login
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setError("");
                setOtp(["", "", "", "", "", ""]);
              }}
              className="mt-3 w-full text-sm font-medium text-primary"
            >
              Change {tab === "mobile" ? "number" : "email"}
            </button>
          </form>
        )}

        {step === "form" ? (
          <>
            <div className="my-5 flex items-center gap-3 text-xs font-medium tracking-wide text-muted uppercase">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>
            <button type="button" onClick={() => googleLogin("attendee")} className={authGhostBtn}>
              <GoogleIcon />
              Continue with Google
            </button>
            <p className="mt-5 text-center text-sm text-muted">
              {signup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="font-semibold text-primary"
                onClick={() => {
                  setSignup((value) => !value);
                  setError("");
                }}
              >
                {signup ? "Login" : "Sign up"}
              </button>
            </p>
            <p className="mt-4 text-center text-xs leading-5 text-muted">
              By continuing, you agree to our Terms of Service & Privacy Policy. Hosting an event?{" "}
              <Link href="/host" onClick={closeLogin} className="font-semibold text-primary">
                Create organizer account
              </Link>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
