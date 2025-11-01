"use client";
import React, { useState, useRef, useMemo } from "react";
import {
  Upload,
  CheckCircle2,
  Mail,
  User,
  Phone,
  FileText,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type Toast = { type: "success" | "error" | "info"; message: string } | null;

export default function SubmitPage() {
  const [toast, setToast] = useState<Toast>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const fileNice = useMemo(() => {
    if (!file) return "No file selected";
    const kb = file.size / 1024;
    const size =
      kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(2)} MB`;
    return `${file.name} • ${size}`;
  }, [file]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  };

  function validateAndSetFile(f: File) {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const isAllowed =
      allowed.includes(f.type) || /\.(pdf|docx?|DOCX?)$/.test(f.name);
    const isUnder10MB = f.size <= 10 * 1024 * 1024;

    if (!isAllowed) {
      setToast({
        type: "error",
        message: "Only PDF, DOC, or DOCX files are allowed.",
      });
      return;
    }
    if (!isUnder10MB) {
      setToast({
        type: "error",
        message: "File too large. Max size is 10 MB.",
      });
      return;
    }
    setFile(f);
  }

  const toBase64 = async (f: File) => {
    const arrayBuffer = await f.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++)
      binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setToast({
        type: "error",
        message: "Please attach a file before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const base64File = await toBase64(file);
      const payload = {
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        email: String(formData.get("email") || ""),
        mobile: String(formData.get("mobile") || ""),
        fileName: file.name,
        fileContent: base64File,
      };

      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToast({ type: "success", message: "Submitted successfully!" });
        setFile(null);
        formRef.current?.reset();
      } else {
        const text = await res.text().catch(() => "");
        setToast({
          type: "error",
          message: text || "Submission failed. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Network error. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium border backdrop-blur bg-slate-900/80 shadow-2xl ${
            toast.type === "success"
              ? "border-emerald-400/30"
              : toast.type === "error"
              ? "border-rose-400/30"
              : "border-slate-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : toast.type === "error" ? (
            <FileText className="h-4 w-4 text-rose-400" />
          ) : (
            <ShieldCheck className="h-4 w-4 text-slate-300" />
          )}
          <span className="text-slate-100">{toast.message}</span>
        </div>
      )}

      {/* Container */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/10 bg-gradient-to-b from-slate-900/60 to-transparent">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Get Started
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Submit your details and upload your story document for review.
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 grid gap-6"
          >
            {/* Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="First Name"
                name="firstName"
                icon={User}
                placeholder="Jane"
                required
              />
              <Field
                label="Last Name"
                name="lastName"
                icon={User}
                placeholder="Doe"
                required
              />
            </div>

            <Field
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              placeholder="jane.doe@email.com"
              required
            />
            <Field
              label="Mobile Number"
              name="mobile"
              type="tel"
              icon={Phone}
              placeholder="+61 400 000 000"
              required
            />

            {/* File Uploader */}
            <div>
              <label className="block text-sm font-medium text-white/80">
                Upload File
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`mt-2 relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                  dragActive
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-white/15 hover:bg-white/5"
                }`}
              >
                <Upload className="h-6 w-6 text-white/80" />
                <p className="text-sm text-white/70">
                  Drag & drop a PDF or DOCX here, or
                  <span className="font-semibold text-white"> browse</span>
                </p>
                <p className="text-xs text-white/50">
                  Max 10 MB • PDF, DOC, DOCX
                </p>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) validateAndSetFile(f);
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-white/60 line-clamp-1">
                {fileNice}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-white/60 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-white/60" />
                We store your data securely for the review process only.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-5 py-2.5 text-white font-semibold shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  <>Submit</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer mini brand */}
        <p className="text-center text-xs text-white/50 mt-4">
          © {new Date().getFullYear()} StoryFlux • Secure story submission
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon: React.ElementType;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white/80">
        {label}
      </label>
      <div className="mt-2 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-4 w-4 text-white/50" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="block w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-9 pr-3 text-slate-100 placeholder:text-white/40 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40"
        />
      </div>
    </div>
  );
}
