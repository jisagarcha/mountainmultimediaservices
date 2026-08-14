"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/admin/actions";
import { Check, ArrowRight, Loader2, Send } from "lucide-react";

export default function ContactFormClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm({ name, phone, email, message });
      setContactSent(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      alert(err.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
          PROJECT INQUIRY
        </span>
        <h3 className="text-xl font-black text-slate-950 mt-1">Send Us A Message</h3>
      </div>

      {contactSent ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-black text-slate-950">Inquiry Received</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your inquiry has been saved to our shop inbox. Our Bhaktapur press team will contact you shortly.
          </p>
          <button
            onClick={() => setContactSent(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-950 text-xs text-white font-extrabold hover:bg-rose-600 transition shadow-md"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:bg-white font-medium transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:bg-white font-medium transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:bg-white font-medium transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Project Requirements
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project, size, quantity & required deadline..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:bg-white font-medium transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-lg shadow-rose-600/30 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 text-xs tracking-wider uppercase"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
