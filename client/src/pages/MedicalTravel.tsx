import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Users, CheckCircle2, ArrowRight, Stethoscope, FileText, Shield, Star, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MedicalTravel() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="images/tourism-hero.jpg" 
            alt="Medical Tourism Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-sm">
              <Plane className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold">{t("mt_hero_tag")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {t("mt_hero_title")}
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {t("mt_hero_desc")}
            </p>
            <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-8 rounded-full shadow-lg shadow-primary/25">
                {t("mt_plan_now")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Travel Services Overview - Updated List */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("mt_services_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("mt_services_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: t("mt_assessments_title"),
                desc: t("mt_assessments_desc")
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: t("mt_treatment_title"),
                desc: t("mt_treatment_desc")
              },
              {
                icon: <Plane className="w-8 h-8" />,
                title: t("mt_visa_title"),
                desc: t("mt_visa_desc")
              },
              {
                icon: <Hotel className="w-8 h-8" />,
                title: t("mt_accom_title"),
                desc: t("mt_accom_desc")
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: t("mt_companion_title"),
                desc: t("mt_companion_desc")
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: t("mt_dispute_title"),
                desc: t("mt_dispute_desc")
              }
            ].map((service, idx) => (
              <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Timeline - With Extra Legal Safeguard */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("mt_process_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("mt_process_desc")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: t("mt_process_1"),
                desc: "Communicate with medical advisors, assess your medical needs, and develop an initial plan"
              },
              {
                step: 2,
                title: t("mt_process_2"),
                desc: "Assist with medical visa processing, expedited handling to ensure timely travel"
              },
              {
                step: 3,
                title: t("mt_process_3"),
                desc: "Arrange international flights, hotel accommodation, hospital appointments and all other matters"
              },
              {
                step: 4,
                title: t("mt_process_4"),
                desc: "Provide travel advice, health check-ups, luggage packing guidance"
              },
              {
                step: 5,
                title: t("mt_process_5"),
                desc: "Receive professional treatment at top Chinese hospitals with full-time translator accompaniment"
              },
              {
                step: 6,
                title: t("mt_process_6"),
                desc: "Professional recovery team guidance, nutritional meal support, wellness activities"
              },
              {
                step: 7,
                title: t("mt_process_7"),
                desc: "Arrange return flights, provide recovery guidance, prepare for post-return follow-up"
              },
              {
                step: 8,
                title: t("mt_process_8"),
                desc: "Regular follow-ups after return, remote medical consultation, continuous health management"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 mb-8 relative">
                {/* Timeline Line */}
                {idx < 7 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-primary/20" />
                )}
                
                {/* Step Circle */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 pb-8">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Extra Legal Safeguard Section */}
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-primary/10 flex gap-6 items-start">
               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Scale className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{t("mt_process_extra_title")}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{t("mt_process_extra_desc")}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials - New Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("mt_testim_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { text: t("mt_testim_1_text"), author: t("mt_testim_1_author") },
                { text: t("mt_testim_2_text"), author: t("mt_testim_2_author") },
                { text: t("mt_testim_3_text"), author: t("mt_testim_3_author") }
             ].map((item, idx) => (
                <Card key={idx} className="border-none shadow-md bg-slate-50">
                   <CardContent className="p-8">
                      <div className="flex text-yellow-400 mb-4">
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                         <Star className="w-4 h-4 fill-current" />
                      </div>
                      <p className="text-slate-600 italic mb-6">"{item.text}"</p>
                      <p className="font-bold text-slate-900">- {item.author}</p>
                   </CardContent>
                </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Travel Service */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t("mt_why_title")}</h2>
            <p className="text-primary-foreground/80 text-lg">
              {t("mt_why_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              t("mt_why_team"),
              t("mt_why_trans"),
              t("mt_why_price"),
              t("mt_why_support"),
              t("mt_why_env"),
              t("mt_why_culture"),
              t("mt_why_remote"),
              t("mt_why_law_firm") // Updated item
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-900">
            {t("mt_cta_title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t("mt_cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-10 py-6 rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                {t("consult_now")}
              </Button>
            </a>
            <Button size="lg" variant="outline" className="text-base px-10 py-6 rounded-full border-primary text-primary hover:bg-primary/5">
              {t("mt_download_guide")}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
