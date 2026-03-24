"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { FormConfig } from "@/lib/wordpress";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface ContactFormProps {
  config?: FormConfig | null;
}

export default function ContactForm({ config }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const getField = (name: string) =>
    config?.fields?.find((f) => f.name === name);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Honeypot check — bots fill hidden fields, humans don't
    if (formData.honeypot) {
      setTimeout(() => setStatus("success"), 500);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { honeypot: _hp, ...submitData } = formData;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submitData, formType: "contact" }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-dark mb-3">
          {config?.success_title ?? "Message Envoyé !"}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {config?.success_text ?? "Merci pour votre message. Nous vous répondrons dans les plus brefs délais."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-primary font-heading font-semibold hover:underline"
        >
          {config?.success_button ?? "Envoyer un autre message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative">
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-600">
            {config?.error_text ?? "Une erreur est survenue. Veuillez réessayer."}
          </p>
        </div>
      )}

      {/* Honeypot field — hidden from humans, caught by bots */}
      <div className="absolute invisible opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website-contact">Website</label>
        <input
          type="text"
          id="website-contact"
          name="website"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("name")?.label ?? "Nom *"}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={getField("name")?.placeholder ?? "Votre nom"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("email")?.label ?? "Email *"}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={getField("email")?.placeholder ?? "votre@email.com"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("phone")?.label ?? "Téléphone *"}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={getField("phone")?.placeholder ?? "06 12 34 56 78"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("subject")?.label ?? "Sujet *"}
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            placeholder={getField("subject")?.placeholder ?? "Objet de votre message"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-heading font-semibold text-dark mb-2">
          {getField("message")?.label ?? "Message *"}
        </label>
        <textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={getField("message")?.placeholder ?? "Votre message..."}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400 resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        icon={
          status === "loading" ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )
        }
      >
        {status === "loading"
          ? (config?.loading_text ?? "Envoi...")
          : (config?.submit_text ?? "Envoyer le Message")}
      </Button>
    </form>
  );
}
