"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    form.reset();
    const msg = document.getElementById("success-msg");
    if (msg) msg.classList.remove("hidden");
  }

  return (
    <div className="min-h-screen bg-surface py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-subtle hover:text-text-muted transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/brand/logo-light.svg"
            alt="Benefind"
            width={100}
            height={18}
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl text-text mb-3">
          Get in Touch
        </h1>
        <p className="text-text-muted text-lg mb-12">
          Have questions about Benefind? We&apos;d love to hear from you.
        </p>

        {/* Contact form */}
        <form
          action="#"
          onSubmit={handleSubmit}
          className="rounded-[20px] border border-border bg-surface-bright p-8 sm:p-12 mb-10"
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-text-muted mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-muted mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-text-muted mb-1.5"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text focus:border-accent focus:outline-none transition-colors"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="individual">Individual Benefits</option>
                <option value="company">Company Programs</option>
                <option value="partnership">Partnership</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-text-muted mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                required
                className="rounded-[10px] border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-brand text-white rounded-[50px] px-8 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </div>

          <div
            id="success-msg"
            className="hidden mt-4 rounded-[10px] bg-brand/10 border border-brand/30 px-4 py-3 text-sm text-brand"
          >
            Message sent! We&apos;ll get back to you soon.
          </div>
        </form>

        {/* Alternative contact */}
        <div className="text-center mb-8">
          <p className="text-text-muted mb-1">
            Or email us directly at{" "}
            <a
              href="mailto:hello@benefind.ai"
              className="text-accent hover:underline"
            >
              hello@benefind.ai
            </a>
          </p>
          <p className="text-text-subtle text-sm">
            We typically respond within 24 hours
          </p>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-text-subtle text-center">
          Your information is only used to respond to your inquiry. We never
          share your data.
        </p>
      </div>
    </div>
  );
}
