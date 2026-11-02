"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AuthField, AuthShell, authInputClass, authPrimaryBtn } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthShell>
      <h2 className="text-[1.75rem] font-extrabold tracking-tight">Reset your password</h2>
      <p className="mt-1.5 text-[15px] text-muted">
        Enter the email on your organizer account. We&apos;ll send a reset link — this demo confirms
        it in the browser.
      </p>

      {sent ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
          If an organizer exists for <strong>{email}</strong>, a reset link would be on its way.
        </div>
      ) : (
        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
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
          <button type="submit" disabled={!email.includes("@")} className={authPrimaryBtn}>
            Send reset link
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
