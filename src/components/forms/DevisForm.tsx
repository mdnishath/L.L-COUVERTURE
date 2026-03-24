"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { FormConfig } from "@/lib/wordpress";

interface DevisData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  urgency: string;
  message: string;
  honeypot: string;
}

interface DevisFormProps {
  config?: FormConfig | null;
}

export default function DevisForm({ config }: DevisFormProps) {
  const [formData, setFormData] = useState<DevisData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    urgency: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const getField = (name: string) =>
    config?.fields?.find((f) => f.name === name);

  const serviceOptions = config?.service_options ?? [
    "Zinguerie", "Rénovation de Toiture", "Réparation de Fuite en Urgence",
    "Charpente & Toiture", "Rénovation de Rives", "Réparation de Gouttières", "Autre",
  ];
  const urgencyOptions = config?.urgency_options ?? [
    "Urgent (sous 48h)", "Normal (sous 1 semaine)", "Planifié (sous 1 mois)",
  ];

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
        body: JSON.stringify({ ...submitData, formType: "devis" }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          service: "",
          urgency: "",
          message: "",
          honeypot: "",
        });
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
          {config?.success_title ?? "Demande Envoyée !"}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {config?.success_text ?? "Merci pour votre demande de devis. Notre équipe vous recontactera dans les 24 heures."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-primary font-heading font-semibold hover:underline"
        >
          {config?.success_button ?? "Envoyer une autre demande"}
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
            {config?.error_text ?? "Une erreur est survenue. Veuillez réessayer ou nous appeler directement."}
          </p>
        </div>
      )}

      {/* Honeypot field — hidden from humans, caught by bots */}
      <div className="absolute invisible opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website-devis">Website</label>
        <input
          type="text"
          id="website-devis"
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
            {getField("name")?.label ?? "Nom Complet *"}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={getField("name")?.placeholder ?? "Jean Dupont"}
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
            placeholder={getField("email")?.placeholder ?? "jean@example.com"}
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
            {getField("address")?.label ?? "Adresse du chantier"}
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder={getField("address")?.placeholder ?? "Ville ou code postal"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("service")?.label ?? "Type de Prestation *"}
          </label>
          <select
            required
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary"
          >
            <option value="">{getField("service")?.placeholder ?? "Sélectionnez..."}</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            {getField("urgency")?.label ?? "Urgence"}
          </label>
          <select
            value={formData.urgency}
            onChange={(e) =>
              setFormData({ ...formData, urgency: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary"
          >
            <option value="">{getField("urgency")?.placeholder ?? "Sélectionnez..."}</option>
            {urgencyOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-heading font-semibold text-dark mb-2">
          {getField("message")?.label ?? "Description du Projet *"}
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={getField("message")?.placeholder ?? "Décrivez votre projet en détail : type de bâtiment, surface approximative, problème rencontré..."}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400 resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full md:w-auto"
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
          ? (config?.loading_text ?? "Envoi en cours...")
          : (config?.submit_text ?? "Envoyer ma Demande de Devis")}
      </Button>

      <p className="text-xs text-gray-400">
        {config?.privacy_text ?? "* Champs obligatoires. Vos données sont protégées conformément au RGPD."}
      </p>
    </form>
  );
}
