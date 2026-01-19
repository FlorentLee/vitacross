import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, CheckCircle2, Stethoscope, UserCheck, HeartPulse, Plane, Ambulance, Users } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
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

  const services = [
    {
      icon: <Stethoscope className="w-10 h-10 text-primary" />,
      title: t("online_consultation"),
      desc: t("service_online_consultation_desc"),
      link: "/consultation"
    },
    {
      icon: <Ambulance className="w-10 h-10 text-primary" />,
      title: t("lab_tests"),
      desc: t("service_lab_tests_desc"),
      link: "/lab-tests"
    },
    {
      icon: <Plane className="w-10 h-10 text-primary" />,
      title: t("medical_tourism"),
      desc: t("service_medical_tourism_desc"),
      link: "/medical-travel"
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-primary" />,
      title: t("healing_journey"),
      desc: t("service_healing_journey_desc"),
      link: "/healing-journey"
    },
    {
      icon: <UserCheck className="w-10 h-10 text-primary" />,
      title: t("legal_support"),
      desc: t("service_legal_support_desc"),
      link: "/legal-support"
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Tagline */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{ loop: true, align: "start", duration: 50 }}
            className="w-full h-full"
          >
            <CarouselContent className="h-full ml-0">
              {[
                "images/hero-bg.jpg",
                "images/hospital-exterior.jpg",
                "images/healing-hero.jpg"
              ].map((src, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                  <img
                    src={src}
                    alt={`Hero Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-primary-foreground text-sm font-medium">
              <span>{t("home_tagline")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              VitaCross
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
              {t("home_connect_today")}
            </p>
            <p className="text-base text-slate-300 max-w-xl">
              {t("home_take_step")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="text-base px-8 rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                onClick={handleBookConsultation}
              >
                {t("home_book_now")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section - 5 Services */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("home_our_services")}</h2>
            <p className="text-slate-600 text-lg">
              {t("home_services_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} href={service.link} asChild>
                <a className="block">
                  <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer">
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-slate-900">{service.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed flex-1">
                        {service.desc}
                      </p>
                      <div className="text-primary font-semibold text-sm flex items-center gap-1 pt-2">
                        {t("learn_more")} <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose VitaCross */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("home_why_choose")}</h2>
            <p className="text-slate-600 text-lg">
              {t("home_why_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                t("home_why_1"),
                t("home_why_2"),
                t("home_why_3"),
                t("home_why_4"),
                t("home_why_5"),
                t("home_why_6"),
                t("home_why_7"),
                t("home_why_8")
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{item}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 space-y-6">
                <h3 className="font-heading text-2xl font-bold text-slate-900">{t("home_global_network")}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-primary">50+</div>
                    <p className="text-slate-600">{t("home_partner_hospitals")}</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">1000+</div>
                    <p className="text-slate-600">{t("home_patients_served")}</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <p className="text-slate-600">{t("home_satisfaction_rate")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('../images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">{t("home_ready_start")}</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary font-bold px-10 py-6 text-lg shadow-xl"
              onClick={handleBookConsultation}
            >
              {t("home_book_now")}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
