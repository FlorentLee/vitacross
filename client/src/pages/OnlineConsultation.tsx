import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Award, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OnlineConsultation() {
  const { isAuthenticated } = useAuth();
  const [_, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleBookConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please register or sign in to book a consultation");
      setLocation("/register");
      return;
    }
    window.open("https://wa.me/message/2XHSAU56KCOSG1", "_blank");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images/consultation-header-bg.jpg)'}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-6">
              <span className="text-white font-semibold">{t("oc_hero_tag")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {t("oc_hero_title")}
            </h1>
            <p className="text-xl text-slate-100 mb-8">
              {t("oc_hero_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 rounded-full shadow-lg shadow-primary/25"
                onClick={handleBookConsultation}
              >
                {t("oc_book_price")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Online Consultation */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("oc_why_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("oc_why_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: t("oc_expert_doctors"),
                desc: t("oc_expert_doctors_desc")
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: t("oc_quick_response"),
                desc: t("oc_quick_response_desc")
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: t("oc_personalized_care"),
                desc: t("oc_personalized_care_desc")
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: t("oc_affordable"),
                desc: t("oc_affordable_desc")
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("oc_team_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("oc_team_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                specialty: "Oncology",
                doctors: "150+ Specialists",
                desc: "Cancer diagnosis and treatment planning"
              },
              {
                specialty: "Cardiology",
                doctors: "120+ Specialists",
                desc: "Heart and cardiovascular disease management"
              },
              {
                specialty: "Orthopedics",
                doctors: "100+ Specialists",
                desc: "Joint and bone disorder treatment"
              },
              {
                specialty: "Neurology",
                doctors: "80+ Specialists",
                desc: "Neurological condition assessment"
              },
              {
                specialty: "Gastroenterology",
                doctors: "90+ Specialists",
                desc: "Digestive system disorder consultation"
              },
              {
                specialty: "Urology",
                doctors: "70+ Specialists",
                desc: "Urinary and reproductive health"
              }
            ].map((dept, idx) => (
              <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <h3 className="font-bold text-xl text-slate-900">{dept.specialty}</h3>
                  <p className="text-primary font-semibold">{dept.doctors}</p>
                  <p className="text-slate-600">{dept.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("oc_how_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("oc_how_desc")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: t("oc_step_1_title"),
                desc: t("oc_step_1_desc")
              },
              {
                step: 2,
                title: t("oc_step_2_title"),
                desc: t("oc_step_2_desc")
              },
              {
                step: 3,
                title: t("oc_step_3_title"),
                desc: t("oc_step_3_desc")
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 mb-8 relative">
                {idx < 2 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-primary/20" />
                )}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 pt-2 pb-8">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("oc_pricing_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("oc_pricing_desc")}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-12 space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-5xl font-bold text-primary">$17.99</div>
                  <p className="text-slate-600">{t("oc_per_session")}</p>
                </div>
                <div className="space-y-3 border-t border-b py-6">
                  {[
                    t("oc_assessment"),
                    t("oc_recommendations"),
                    t("oc_followup")
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full rounded-full py-6 text-lg"
                  onClick={handleBookConsultation}
                >
                  {t("book_consultation")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('../images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
            {t("oc_cta_title")}
          </h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">
            {t("oc_cta_desc")}
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-primary font-bold px-10 py-6 text-lg shadow-xl"
            onClick={handleBookConsultation}
          >
            {t("book_consultation")} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
