import React, { useState } from "react";
import axios from "axios";

/**
 * Matches the shared Figma:
 * - Left: copy block
 * - Right: form block with heading + subtitle
 * - Background: dotted texture + corner mandala-like SVGs
 * - Responsive: stacked on mobile; two-column from md: breakpoint
 * Assignment rules implemented:
 *  - All fields required
 *  - Email validation
 *  - On 200 OK, show "Form Submitted" *inside the message textarea*
 */

const API_URL = "https://vernanbackend.ezlab.in/api/contact-us/";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (submitted) setSubmitted(false);
  };

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation (all required)
    if (!form.name || !form.email || !form.phone || !form.message) {
      setForm((f) => ({ ...f, message: f.message || "Please fill all fields!" }));
      return;
    }
    if (!isValidEmail(form.email)) {
      setForm((f) => ({ ...f, message: "Please enter a valid email address!" }));
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(API_URL, {
        name: form.name,
        email: form.email,   // "email" is required by assignment
        phone: form.phone,
        message: form.message,
      });

      if (res.status === 200) {
        // show "Form Submitted" INSIDE the textarea (as required)
        setForm({ name: "", email: "", phone: "", message: "Form Submitted" });
        setSubmitted(true);
      }
    } catch (err) {
      setForm((f) => ({ ...f, message: "Submission failed. Try again later." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen w-full bg-[length:14px_14px]"
      style={{ backgroundImage: "var(--bg-dot)" }}
    >
      {/* Corner motifs */}
      <div className="pointer-events-none fixed -left-24 -bottom-24 opacity-40 select-none hidden md:block">
        <CornerMandala className="w-[360px] h-[360px]" />
      </div>
      <div className="pointer-events-none fixed -right-24 -top-24 opacity-40 select-none hidden md:block">
        <CornerMandala className="w-[360px] h-[360px] rotate-180" />
      </div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-16">
        {/* Top bar (logo mock, matches left top “V Films”) */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-primary rounded-sm"></div>
            <span className="font-semibold tracking-wide">V Films</span>
          </div>

          {/* hamburger placeholder (as in screenshot) */}
          <div className="h-4 w-6 flex flex-col justify-between opacity-60">
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
          </div>
        </header>

        {/* Main two-column section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <div className="max-w-lg">
              <p className="text-[15px] leading-7 text-body">
                Whether you have an idea, a question, or simply want to explore how we can
                work together, we’re just a message away.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-body">
                Let’s catch up over coffee.<br />
                Great stories always begin with a good conversation.
              </p>
            </div>
          </div>

          {/* Right form block */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-[28px] font-semibold text-headline text-center md:text-left">
              Join the Story
            </h2>
            <p className="text-sm md:text-[15px] text-body mt-2 text-center md:text-left">
              Ready to bring your vision to life? Let’s talk.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Your name*"
                value={form.name}
                onChange={onChange}
                required
                className="w-full rounded-md bg-field px-4 py-3 text-[14px] outline-none ring-0 focus:ring-2 focus:ring-ring"
              />
              <input
                name="email"
                type="email"
                placeholder="Your email*"
                value={form.email}
                onChange={onChange}
                required
                className="w-full rounded-md bg-field px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone*"
                value={form.phone}
                onChange={onChange}
                required
                className="w-full rounded-md bg-field px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
              />

              <textarea
                name="message"
                placeholder="Your message*"
                rows={5}
                value={form.message}
                onChange={onChange}
                required
                className={`w-full rounded-md bg-field px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-ring ${
                  submitted ? "border border-green-500" : ""
                }`}
              />

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-white text-[14px] font-medium hover:opacity-95 disabled:opacity-60 transition"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* Bottom contact row */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-[13px] text-body">
              <a href="mailto:verna@vannafilms.co.in" className="hover:underline">
                verna@vannafilms.co.in
              </a>
              <span>+91 98736 84667</span>
            </div>
          </div>
        </section>

        {/* bottom breadcrumb-like bar in figma */}
        <div className="mt-12 flex justify-center">
          <div className="h-1.5 w-48 rounded-full bg-black/10" />
        </div>
      </div>
    </main>
  );
}

/** Simple corner ornament (SVG), tinted like Figma pattern */
function CornerMandala({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1c2b4" />
          <stop offset="100%" stopColor="#e7a590" />
        </linearGradient>
      </defs>
      <g fill="url(#g)" stroke="none" opacity="0.9">
        <circle cx="180" cy="20" r="18" />
        <circle cx="155" cy="45" r="18" />
        <circle cx="130" cy="70" r="18" />
        <circle cx="105" cy="95" r="18" />
        <circle cx="80" cy="120" r="18" />
        <circle cx="55" cy="145" r="18" />
        <circle cx="30" cy="170" r="18" />
      </g>
      <g fill="none" stroke="#e7a590" strokeWidth="3" opacity="0.9">
        <path d="M5 195 C 60 150, 100 110, 195 5" />
      </g>
    </svg>
  );
}
