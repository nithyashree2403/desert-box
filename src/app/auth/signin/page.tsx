"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

      {/* ── SPRINKLE BG ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 sprinkle-bg pointer-events-none" />

      {/* ── CARD ────────────────────────────────────────────────────────────── */}
      <main className="relative z-10 w-full max-w-md mt-12">

        {/* Floating top-left strawberry — positioned relative to this card container */}
        <div className="absolute -top-12 -left-12 w-28 h-28 -rotate-12 opacity-80 pointer-events-none hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-contain"
            alt="Strawberry dipped in white chocolate"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUr1BdSs8Fl-dkRNz2JBruW6RsjxoIiQmfQczgrOH7_0p8_prLNrs_5sZk7bgHpBabEcLbnovOJgf8KElOtNqCI66YXY0h8RASb6IKejZSLMjE_QnUmB_Qj4IcZoBGcnkM60TyVEmTCnKvVX_iCezCdEg-878GC7bDnQNwkbVEpGWFzrZ9BNKUaIFbOsAvcIOU3H9nbFVSuNNRXJesIqonj6Bi3-SrPOYo_0WWhdsBZX6c454YZFFpe4jGgFgNjECPLtGwDKwwuok"
          />
        </div>

        {/* Floating bottom-right macaron */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 rotate-12 opacity-80 pointer-events-none hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-contain"
            alt="Pink macaron with gold leaf"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvz22fVS7GtZsuDPwIAvlgkBeA8R7pCeUR4BCZdTd_8QwlRSJWnsb_klIfp-swJRNmli202LMbMZVg9tuiRlyW9vs21P_XsCh2ApQ6Xav7qmdbQRAuyMLUbPf3X2RDR3dSglvTuRYA-_xCvzJBPE0-zpBMCUgIJXutqomGIAi7mpsYGM8MFO83FXIypDRjuNvmh1Zupx9Fc3401K8TNr13cGHXxESkqeeQC6fa67IHAoU5yfMrZ2zQKIggAN6Jce7NguXMA4fq7Vg"
          />
        </div>
        <div className="bg-white/80 backdrop-blur-xl border border-[#e5dadd]/30 rounded-[3rem] shadow-[0px_20px_40px_rgba(74,44,49,0.08)] p-10 flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg bg-white p-2">
              <div className="w-full h-full rounded-full bg-[#fef4f6] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="The Dessert Box Icon"
                  className="w-20 h-20 object-contain mix-blend-multiply"
                  src="/logo.svg"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#a8275b] tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              The Dessert Box
            </h1>
          </div>

          {/* Header text */}
          <div className="mb-10">
            <h2 className="text-2xl text-[#322d2f] mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
              Welcome Back!
            </h2>
            <p className="text-[#605a5c] font-medium leading-relaxed">
              Sign in to start building your dessert box!
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-4">

            {/* Google Sign In */}
            <Link
              href="/menu"
              className="w-full flex items-center justify-center gap-4 bg-[#e5dadd] hover:bg-[#e5dadd]/80 transition-all duration-300 py-4 px-6 rounded-full group active:scale-95 border border-[#b3abad]/10"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-semibold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Sign In with Google
              </span>
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-[#e5dadd]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#7c7577]">or</span>
              <div className="h-px flex-1 bg-[#e5dadd]" />
            </div>

            {/* Email section */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  className="w-full bg-[#f9eef0] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#f9cc61] transition-all placeholder:text-[#605a5c]/50 outline-none text-[#322d2f]"
                  placeholder="Sweetest email address"
                  type="email"
                />
              </div>
              <button className="w-full bg-[#a8275b] hover:bg-[#98184f] text-white py-4 px-6 rounded-full font-bold shadow-lg transition-all active:scale-95" style={{ fontFamily: "var(--font-jakarta)" }}>
                Continue with Email
              </button>
            </div>
          </div>

          {/* Footer link */}
          <div className="mt-8">
            <p className="text-sm text-[#605a5c]">
              New to the Atelier?{" "}
              <a href="#" className="text-[#a8275b] font-bold hover:underline">
                Join the club
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* ── SPRINKLE DETAIL (bottom right) ──────────────────────────────────── */}
      <div className="fixed bottom-10 right-10 flex gap-2 opacity-30 select-none">
        <div className="w-2 h-6 bg-[#ff70a0] rounded-full rotate-45" />
        <div className="w-2 h-6 bg-[#f9cc61] rounded-full -rotate-12 mt-4" />
        <div className="w-2 h-6 bg-[#fdced4] rounded-full rotate-90" />
      </div>

    </div>
  );
}
