import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import ContactFormClient from "./_components/ContactFormClient";
import { Phone, Mail, MapPin, Clock3, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      <SiteNavbar branding={branding} />

      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
              Contact Mountain Multimedia
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Send your project specifications, required quantity, and deadline. We reply promptly with fastest delivery options in Bhaktapur.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section - Top Aligned Grid matching Pricom Theme */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-md inline-block uppercase">
                BHAKTAPUR PRESS COUNTER
              </span>
              <h2 className="text-3xl font-black text-slate-950">Direct Contact Information</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Visit our shop or order remotely via phone/WhatsApp. We handle urgent photo prints, ID cards, flex signboards, and bulk printing.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-lg hover:border-rose-200 transition">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Call Shop Direct</div>
                  <div className="text-sm font-black text-slate-900 flex flex-wrap gap-3 mt-0.5">
                    <a href="tel:+9779841693181" className="hover:text-rose-600 underline">+977-9841693181</a>
                    <a href="tel:9861550233" className="hover:text-rose-600 underline">9861550233</a>
                    <a href="tel:9849425342" className="hover:text-rose-600 underline">9849425342</a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-lg hover:border-rose-200 transition">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Email Address</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    <a href={`mailto:${branding.contactEmail || "mdigitalpress1@gmail.com"}`} className="hover:underline">
                      {branding.contactEmail || "mdigitalpress1@gmail.com"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-lg hover:border-rose-200 transition">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-500">
                  <Clock3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Shop Hours</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Sun – Fri: 8:00 AM – 7:00 PM
                  </div>
                  <div className="text-xs font-bold text-rose-600 mt-0.5">
                    (Closed on Saturdays)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-lg hover:border-rose-200 transition">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Shop Address</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {branding.address || "Dugure, Malpot Road, Bhaktapur, Nepal"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Top Aligned Contact Form Card */}
          <div className="lg:col-span-6">
            <ContactFormClient />
          </div>
        </div>
      </section>

      {/* Real Embedded Google Maps Location Section */}
      <section className="bg-slate-50 border-t border-slate-100 px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-rose-600 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Pinned Location</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mountain Multimedia Service in Bhaktapur</h3>
              <p className="text-xs text-slate-500">Dugure, Malpot Road, Bhaktapur, Nepal</p>
            </div>
            <a
              href="https://maps.app.goo.gl/WpgFD1Wqa8J7B77J7?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition"
            >
              <span>Open Pin on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <iframe
              title="Mountain Multimedia Location Google Map Pin"
              src="https://maps.google.com/maps?q=Mountain+Multimedia+Service,+Dugure,+Malpot+Road,+Bhaktapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SiteFooter branding={branding} />
    </div>
  );
}
