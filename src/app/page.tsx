"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function HomePage() {
  const { toggleDrawer, items } = useCartStore();
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <header className="relative mt-8 mb-24 overflow-hidden rounded-[2rem] h-[600px] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="The Woman Chef & Baker"
            className="absolute inset-0 w-full h-full object-cover"
            src="/img/woman_baker_hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4c0023]/75 via-[#4c0023]/40 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#ff70a0]/30 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="text-xl">👩‍🍳</span>
              <span>100% Handled & Crafted by Woman Chef</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white leading-tight mb-6" style={{ fontFamily: "var(--font-fredoka)" }}>
              Baked by Woman Chef, Shipped to You
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-10" style={{ fontFamily: "var(--font-vietnam)" }}>
              Honest, real ingredients from our lead woman chef & artisan baker straight to your doorstep.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-[#ff70a0] text-[#4c0023] px-10 py-4 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Order Now
            </Link>
          </div>
        </header>

        {/* ── STORY SECTION ───────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center mb-32" id="our-story">

          {/* Image collage */}
          <div className="md:col-span-5 relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden rotate-[-2deg] shadow-2xl border-4 border-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Woman Chef decorating cake"
                className="w-full aspect-[4/5] object-cover"
                src="/img/woman_baker_story.png"
              />
            </div>
            {/* Overlapping small image */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 z-20 rounded-[2rem] overflow-hidden rotate-[4deg] shadow-2xl border-8 border-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Woman baker piping frosting"
                className="w-full h-full object-cover"
                src="/img/woman_baker_piping.png"
              />
            </div>
            {/* Sprinkle decoration */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-10 sprinkle-bg w-40 h-40" />
          </div>

          {/* Text Card */}
          <div className="md:col-span-7">
            <div className="bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-[0px_20px_40px_rgba(168,39,91,0.03)] border border-white/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff70a0]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#a8275b] font-bold uppercase tracking-widest text-xs block" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Handled by Woman Chef & Baker
                </span>
                <span className="bg-[#ff70a0]/20 text-[#a8275b] px-2.5 py-0.5 rounded-full text-xs font-bold">
                  👩‍🍳 Woman-Led
                </span>
              </div>
              
              <h2 className="text-5xl text-[#a8275b] leading-tight mb-8" style={{ fontFamily: "var(--font-fredoka)" }}>
                Meet the Chef & Baker
              </h2>
              
              <div className="space-y-6 text-[#322d2f]/80 text-lg leading-[1.8]" style={{ fontFamily: "var(--font-jakarta)" }}>
                <p className="font-medium text-[#322d2f]">
                  The Dessert Box is proudly woman-owned, run with culinary passion and care by our lead woman chef & baker.
                </p>
                <p>
                  Most days, it was just me in the kitchen, creating small batches of gourmet pastries for my kids—and of course, they would be right there waiting to taste before it even cooled down. What started as &ldquo;just for home&rdquo; slowly became something everyone around us asked for.
                </p>
                <p className="italic text-[#a8275b]/70 border-l-2 border-[#ff70a0]/30 pl-6 my-8">
                  It was always the same request—&ldquo;Can your woman baker craft the same for our family?&rdquo; And honestly, baking with love has been my lifelong calling ever since.
                </p>
                <p>
                  For me, baking has always been about home, maternal care, and master craftsmanship. As a woman chef and mom, I never compromise on what goes into our food. No shortcuts, no artificial chemicals—just honest, high-quality ingredients you can trust.
                </p>
                <p>
                  Even today, nothing comes from an automated factory. Every cake, cookie, and brownie is personally handcrafted in our woman-led kitchen, bringing you that genuine &ldquo;ghar ka&rdquo; warmth in every bite.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-[#ff70a0]/10">
                <p className="font-bold text-[#a8275b] text-xl italic" style={{ fontFamily: "var(--font-fredoka)" }}>
                  &ldquo;There&apos;s no secret… just real ingredients, culinary expertise, and a woman chef who truly cares about what you&apos;re eating.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUALITY & CRAFT ─────────────────────────────────────────────────── */}
        <section className="bg-[#f0e6e8] rounded-[2rem] p-12 md:p-20 mb-32 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 text-[#a8275b] px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-sm">
              <span>👩‍🍳 Chef-Standard Craftsmanship</span>
            </div>
            <h2 className="text-5xl text-[#4c0023] mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Honest Ingredients
            </h2>
            <p className="text-[#605a5c] text-lg">
              If it doesn&apos;t belong in our woman chef&apos;s home kitchen, it doesn&apos;t go in our treats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                icon: "grass",
                bg: "bg-[#f9cc61]",
                text: "text-[#5b4400]",
                title: "No Preservatives",
                desc: "We skip all artificial shortcuts, stabilizers, and chemicals. Just real, wholesome food.",
              },
              {
                icon: "woman",
                bg: "bg-[#fdced4]",
                text: "text-[#654449]",
                title: "Woman Chef Touch",
                desc: "Hand-piped and baked in small artisanal batches with maternal care and precision.",
              },
              {
                icon: "nutrition",
                bg: "bg-[#ff70a0]",
                text: "text-[#4c0023]",
                title: "Real Couverture Cocoa",
                desc: "Generous chunks of pure chocolate that melt perfectly when you warm your cookie or cake.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${card.bg} ${card.text} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="material-symbols-outlined text-4xl">{card.icon}</span>
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>{card.title}</h3>
                <p className="text-[#605a5c]">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* BG decoration */}
          <div className="absolute bottom-0 right-0 opacity-5 sprinkle-bg w-64 h-64 rotate-45 translate-x-1/2 translate-y-1/2" />
        </section>

        {/* ── ATELIER PROCESS ─────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="text-[#a8275b] font-bold uppercase tracking-widest text-xs mb-2 block" style={{ fontFamily: "var(--font-jakarta)" }}>
              The Woman Baker Workflow
            </span>
            <h2 className="text-5xl text-[#a8275b]" style={{ fontFamily: "var(--font-fredoka)" }}>
              From Our Woman-Led Kitchen to Yours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                img: "/img/woman_baker_story.png",
                alt: "Woman Chef testing recipes",
                step: "1",
                title: "Chef-Perfected Recipes",
                desc: "Every recipe is developed and refined by our lead woman chef. We use uncompromised, natural ingredients with zero shortcuts.",
              },
              {
                img: "/img/woman_baker_piping.png",
                alt: "Woman Baker piping frosting",
                step: "2",
                title: "Artisanal Hand-Piping",
                desc: "No mechanical factory lines. Each cake and brownie box is personally decorated and packaged by our woman baker.",
              },
              {
                img: "/img/woman_baker_hero.png",
                alt: "Woman Baker presenting fresh dessert box",
                step: "3",
                title: "Handed Over with Care",
                desc: "Delivered fresh from our woman chef's table to yours, guaranteeing that signature warm 'ghar ka' sweetness.",
              },
            ].map((step) => (
              <div key={step.step} className="group">
                <div className="rounded-[3rem] overflow-hidden mb-6 aspect-square shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={step.alt} className="w-full h-full object-cover" src={step.img} />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-10 h-10 rounded-full bg-[#a8275b] text-white flex items-center justify-center text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {step.step}
                  </span>
                  <h3 className="text-2xl text-[#322d2f]" style={{ fontFamily: "var(--font-fredoka)" }}>{step.title}</h3>
                </div>
                <p className="text-[#605a5c] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-[#a8275b] text-white rounded-[2rem] p-16 text-center shadow-2xl relative overflow-hidden mb-20">
          <div className="absolute inset-0 sprinkle-bg opacity-10" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <span>👩‍🍳 Handcrafted by Woman Chef & Baker</span>
            </div>
            <h2 className="text-5xl mb-6" style={{ fontFamily: "var(--font-fredoka)" }}>
              Craving that &ldquo;ghar ka&rdquo; sweetness?
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
              Treat yourself and your family to a box of honest, home-baked goodness crafted by our woman chef today.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-[#ff70a0] text-[#4c0023] px-12 py-5 rounded-full text-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Order Now
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#fef4f6] w-full rounded-t-[32px] mt-12 flex flex-col md:flex-row justify-between items-center px-12 py-6 text-sm leading-relaxed text-[#4a2c31]" style={{ fontFamily: "var(--font-jakarta)" }}>
        <div className="mb-6 md:mb-0">
          <div className="h-12 mb-2 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="The Dessert Box Logo" className="h-full w-auto object-contain mix-blend-multiply" src="/logo.svg" />
            <span className="text-xl text-[#a8275b]" style={{ fontFamily: "var(--font-fredoka)" }}>The Dessert Box</span>
          </div>
          <p>© 2024 The Dessert Box. Handcrafted with love by Woman Chef & Baker.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#a8275b] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#a8275b] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[#a8275b] transition-colors">Contact Us</a>
        </div>
      </footer>

    </div>
  );
}
