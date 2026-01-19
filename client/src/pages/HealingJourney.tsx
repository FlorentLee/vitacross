import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Leaf, Heart, Users, MapPin, Sparkles, Quote, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HealingJourney() {
  const { isAuthenticated } = useAuth();
  const [_, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleBookRetreat = (retreatName: string) => {
    if (!isAuthenticated) {
      toast.error("Please register or sign in to book a retreat");
      setLocation("/register");
      return;
    }
    window.open(`https://wa.me/message/2XHSAU56KCOSG1?text=I'm interested in the ${retreatName}`, "_blank");
  };

  const reasons = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t("hj_reason_1_title"),
      desc: t("hj_reason_1_desc")
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("hj_reason_2_title"),
      desc: t("hj_reason_2_desc")
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t("hj_reason_3_title"),
      desc: t("hj_reason_3_desc")
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t("hj_reason_4_title"),
      desc: t("hj_reason_4_desc")
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t("hj_reason_5_title"),
      desc: t("hj_reason_5_desc")
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("hj_reason_6_title"),
      desc: t("hj_reason_6_desc")
    }
  ];

  const packages = [
    {
      name: t("hj_pkg_3day"),
      price: "$800",
      features: [
        "Morning TaiChi and KongFu sessions & guided meditation",
        "Fasting with nutritional supervision, or choose our curated wellness meal.",
        "Personalized wellness consultation",
        "Evening relaxation and mindfulness practices"
      ],
      cta: t("hj_pkg_3day_cta")
    },
    {
      name: t("hj_pkg_7day"),
      price: "$1,500",
      features: [
        "Daily TaiChi and KongFu sessions & guided meditation",
        "Supervised fasting and detox programs, or choose our curated wellness meal.",
        "Health assessments and one-on-one coaching",
        "Cultural excursions & traditional healing workshops"
      ],
      cta: t("hj_pkg_7day_cta"),
      featured: true
    },
    {
      name: t("hj_pkg_14day"),
      price: "$2,600",
      features: [
        "Daily TaiChi and KongFu sessions & guided meditation",
        "Supervised fasting and detox programs, or choose our curated wellness meal.",
        "Wellness coaching & lifestyle planning",
        "Immersive cultural experiences in nature",
        "Optional follow-up remote guidance"
      ],
      cta: t("hj_pkg_14day_cta")
    }
  ];

  const testimonials = [
    {
      text: "A life-changing journey—I left China feeling lighter, calmer, and more balanced than ever.",
      author: "Anna, Germany"
    },
    {
      text: "The retreat helped me reconnect with my body and mind, with professional guidance every step of the way.",
      author: "James, USA"
    }
  ];

  return (
    <Layout>
      {/* Hero Section - Restored Image Background but matched style with Online Consultation */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="images/healing-hero.jpg" 
            alt="Sunrise over mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold">{t("hj_hero_tag")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
              {t("hj_hero_title")}
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              {t("hj_hero_desc")}
            </p>
            <Button 
              size="lg" 
              className="text-base px-8 rounded-full shadow-lg shadow-primary/25"
              onClick={() => handleBookRetreat("General Healing Journey")}
            >
              {t("hj_book_btn")}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Retreats */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("hj_why_title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reasons.map((item, idx) => (
              <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section: TaiChi */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="images/healing-taichi.jpg" 
            alt="Tai Chi practice in nature" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <Quote className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <p className="text-2xl md:text-4xl font-heading font-medium leading-relaxed max-w-4xl mx-auto italic">
            "Nature does not hurry, yet everything is accomplished."
          </p>
          <p className="mt-6 text-white/80 text-lg">— Lao Tzu</p>
        </div>
      </section>

      {/* Retreat Packages */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("hj_packages_title")}</h2>
            <p className="text-slate-600 text-lg">{t("hj_packages_desc")}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <Card 
                key={idx} 
                className={`border-none shadow-lg flex flex-col relative overflow-hidden ${
                  pkg.featured ? "ring-2 ring-primary md:scale-105 z-10" : "bg-slate-50"
                }`}
              >
                {pkg.featured && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-semibold uppercase tracking-wider">
                    {t("lab_most_popular")}
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-heading text-2xl font-bold text-slate-900">{pkg.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  </div>
                  <div className="space-y-4 flex-1">
                    {pkg.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-8">
                    <Button 
                      className={`w-full rounded-full py-6 text-lg ${pkg.featured ? "shadow-lg shadow-primary/20" : ""}`}
                      variant={pkg.featured ? "default" : "outline"}
                      onClick={() => handleBookRetreat(pkg.name)}
                    >
                      {pkg.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((item, idx) => (
              <Card key={idx} className="border-none shadow-sm bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.author}</p>
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{item.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="images/healing-meditation.jpg" 
            alt="Meditation by riverside" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
        </div>
        <div className="container relative z-10 text-center text-white space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold">{t("hj_cta_title")}</h2>
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 rounded-full bg-white text-slate-900 hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
            onClick={() => handleBookRetreat("Healing Journey Reservation")}
          >
            {t("hj_reserve_btn")}
          </Button>
          <p className="text-white/70 text-sm max-w-md mx-auto bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full">
            {t("hj_limited_spots")}
          </p>
        </div>
      </section>
    </Layout>
  );
}
