import Link from "next/link";
import About from "./about.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            BorgsAutomate
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="hover:text-white/90 text-white/70 transition"
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white/90 text-white/70 transition"
            >
              How it works
            </a>
            <Link
              href="/add-story"
              className="rounded-2xl px-4 py-2 bg-white text-slate-900 font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </nav>
          <Link
            href="/add-story"
            className="md:hidden rounded-xl px-3 py-2 bg-white text-slate-900 font-medium"
          >
            Start
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Share your story.
              <span className="block text-indigo-400">
                Let the best one win.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              Enter our community story competition. We’ll securely capture your
              story, summarize it with our workflow, and send it into our review
              system. Winners are selected after fair, consistent evaluation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/add-story"
                className="rounded-2xl px-6 py-3 bg-indigo-500 font-semibold text-white hover:bg-indigo-400 transition"
              >
                Get Started
              </Link>
              <a
                href="#about"
                className="rounded-2xl px-6 py-3 border border-white/20 font-semibold text-white hover:bg-white/5 transition"
              >
                Learn more
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
              <div className="space-y-1">
                <p>Automated summaries</p>
                <p className="text-white/40">
                  Consistent, bias-reduced first pass
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="space-y-1">
                <p>Transparent process</p>
                <p className="text-white/40">
                  Clear steps from submit to winner
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <div className="text-sm text-white/60">Flow Preview</div>
                <ol className="mt-3 space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    1. User submits story on website
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    2. Power Automate receives webhook, saves to OneDrive,
                    summarizes
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    3. Summary pushed to Dynamics 365 Business Central
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    4. Review panel selects winner in BC
                  </li>
                </ol>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
            <div className="absolute -top-6 -right-10 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              About the project
            </h2>
            <p className="mt-4 text-white/70">
              This platform streamlines a story competition using modern tools.
              Submissions are collected on a fast Next.js front end, summarized
              through an automated flow, then reviewed inside Dynamics 365
              Business Central for an auditable decision.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              <Feature
                title="Built with Next.js"
                desc="Fast, secure, and SEO-friendly app router with server actions support."
              />
              <Feature
                title="Power Automate"
                desc="Reliable orchestration for summarization and notifications."
              />
              <Feature
                title="Business Central"
                desc="Single source of truth for judging, audit, and winner selection."
              />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-2">
              <Image
                src={About} // <- from `import About from "./about.png"`
                alt="About illustration"
                className="rounded-2xl object-cover"
                priority
                placeholder="empty"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
            <div className="absolute -top-6 -right-10 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 pb-28">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <Step
            n={1}
            title="Submit"
            desc="Authors enter details and paste their story."
          />
          <Step
            n={2}
            title="Summarize"
            desc="Flow creates a concise, consistent summary."
          />
          <Step
            n={3}
            title="Review"
            desc="Panel reviews summaries inside Business Central."
          />
          <Step
            n={4}
            title="Select winner"
            desc="Decision logged; winners get notified."
          />
        </div>

        <div className="mt-12">
          <Link
            href="/add-story"
            className="inline-block rounded-2xl px-6 py-3 bg-indigo-500 font-semibold text-white hover:bg-indigo-400 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* VIDEO DEMONSTRATION */}
      <section
        id="video-demo"
        className="mx-auto max-w-7xl px-4 pb-28 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Video Demonstration
        </h2>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Watch a short walkthrough showing how the automated workflow processes
          stories, summarizes them, and syncs results with Business Central.
        </p>
        <div className="relative w-full max-w-6xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <iframe
            src="https://drive.google.com/file/d/1qIC9hCbAkTH48nLDp11O_Q4XAe_VVi2a/preview"
            allow="autoplay"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-white/60">
          © {new Date().getFullYear()} StoryFlux. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/60">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-indigo-500 text-slate-950 grid place-items-center font-bold">
          {n}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-white/60">{desc}</p>
    </div>
  );
}
