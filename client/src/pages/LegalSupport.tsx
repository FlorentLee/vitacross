import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Users, Briefcase, ArrowRight, Mail, Home, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LegalSupport() {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images/legal-support-header-bg.jpg)'}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">{t("ls_hero_tag")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {t("ls_hero_title")}
            </h1>
            <p className="text-xl text-slate-100 mb-8 leading-relaxed">
              {t("ls_hero_desc")}
            </p>
            <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-8 rounded-full shadow-lg shadow-primary/25">
                {t("ls_get_consultation")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("ls_team_title")}</h2>
            <p className="text-slate-600 text-lg">{t("ls_team_desc")}</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100+</div>
                    <p className="text-slate-600">Licensed Lawyers</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <p className="text-slate-600">Years Average Experience</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                    <p className="text-slate-600">Cases Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recover at Home Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
                  <Home className="w-4 h-4" />
                  <span className="font-semibold text-sm">Remote Resolution</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                  {t("ls_recover_title")}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {t("ls_recover_desc")}
                </p>
                
                <div className="space-y-4 pt-4">
                  <h3 className="font-bold text-xl text-slate-900">{t("ls_key_advantages")}</h3>
                  <ul className="space-y-3">
                    {[
                      t("ls_adv_1"),
                      t("ls_adv_2"),
                      t("ls_adv_3"),
                      t("ls_adv_4")
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1">
                 <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                    <Briefcase className="w-16 h-16 text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-4">Full Representation</h3>
                    <p className="text-slate-600 mb-6">
                      We act as your authorized legal representative in China, handling all filings, negotiations, and court appearances on your behalf.
                    </p>
                    <Button variant="outline" className="w-full">Learn About Our Process</Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Independent Legal Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 mb-6">
                  <Globe className="w-4 h-4" />
                  <span className="font-semibold text-sm">{t("ls_open_tag")}</span>
             </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("ls_independent_title")}
            </h2>
            <p className="text-xl text-slate-600">
              {t("ls_independent_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-50 border-none hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-3">{t("ls_card_1_title")}</h3>
                <p className="text-slate-600">
                  {t("ls_card_1_desc")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-none hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-3">{t("ls_card_2_title")}</h3>
                <p className="text-slate-600">
                  {t("ls_card_2_desc")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-none hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <Home className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-3">{t("ls_card_3_title")}</h3>
                <p className="text-slate-600">
                  {t("ls_card_3_desc")}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-slate-500 italic">
              {t("ls_quote")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('../images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">{t("ls_need_support")}</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">{t("ls_contact_team")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="text-primary font-bold px-10 py-6 text-lg shadow-xl">
                {t("ls_get_consultation")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <button onClick={() => window.location.href = "mailto:vitacross@163.com"}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-6 text-lg">
                <Mail className="w-4 h-4 mr-2" /> {t("ls_send_email")}
              </Button>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
