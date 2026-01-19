import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Microscope, MapPin, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LabTests() {
  const { t } = useLanguage();
  const availableServices = [
    "Cardiovascular and cerebrovascular evaluation",
    "Comprehensive cancer screening",
    "Chest and pulmonary examination",
    "Gynecological examination",
    "Cervical cancer screening",
    "Breast examination",
    "Prostate examination",
    "Cervical spine evaluation",
    "Lumbar spine evaluation",
    "Hepatobiliary system examination",
    "Coronary artery disease (CAD) assessment",
    "Renal function and kidney evaluation"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="images/checkup-hero.jpg" 
            alt="Medical Checkup Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-sm">
              <Microscope className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold">{t("lab_hero_tag")}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {t("lab_hero_title")}
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              {t("lab_hero_desc")}
            </p>
            <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-base px-8 rounded-full shadow-lg shadow-primary/25">
                {t("lab_consult_btn")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Our Lab Tests */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("lab_why_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("lab_why_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: t("lab_equip_title"),
                desc: t("lab_equip_desc")
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: t("lab_coverage_title"),
                desc: t("lab_coverage_desc")
              },
              {
                icon: <Microscope className="w-8 h-8" />,
                title: t("lab_analysis_title"),
                desc: t("lab_analysis_desc")
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: t("lab_results_title"),
                desc: t("lab_results_desc")
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

      {/* Test Packages */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("lab_packages_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("lab_packages_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: t("lab_pkg_basic"),
                price: "$199",
                sections: [
                  {
                    title: "General Examinations (3 items)",
                    items: "Internal Medicine, Surgery, Ophthalmology"
                  },
                  {
                    title: "Laboratory Tests (10 items)",
                    items: "Complete Blood Count (CBC), Blood Glucose, Urinalysis, Liver Function Tests, Renal Function Tests, Lipid Profile, Gastric Function Tests, Tumor Screening, Thyroid Function Tests, Cardiac Function Assessment"
                  },
                  {
                    title: "Medical Imaging and Diagnostic Examinations (4 items)",
                    items: "Electrocardiogram (ECG), Chest X-ray, Cervical Spine X-ray, Color Doppler Ultrasound of the Liver, Gallbladder, Spleen, and Pancreas"
                  }
                ],
                extras: [
                  "Nutritious Breakfast",
                  "Specialist Medical Report Interpretation Service",
                  "One-Year Complimentary Physician Consultation Service"
                ]
              },
              {
                name: t("lab_pkg_comprehensive"),
                price: "$299",
                sections: [
                  {
                    title: "Departmental Examinations (3 items)",
                    items: "General Examination, Internal Medicine, Surgery"
                  },
                  {
                    title: "Laboratory Tests (9 items)",
                    items: "Complete Blood Count (CBC), Blood Glucose, Urinalysis, Liver Function Tests, Renal Function Tests, Lipid Profile, Gastric Function Tests, AFP Tumor Marker Screening, CEA Tumor Marker Screening"
                  },
                  {
                    title: "Medical Imaging and Diagnostic Examinations (5 items)",
                    items: "Electrocardiogram (ECG), X-ray Imaging, Abdominal Ultrasound, Urinary System Ultrasound, Breast Ultrasound or Prostate Ultrasound"
                  }
                ],
                extras: [
                  "Nutritious Breakfast",
                  "Specialist Medical Report Interpretation Service",
                  "One-Year Complimentary Physician Consultation Service"
                ],
                featured: true
              },
              {
                name: t("lab_pkg_premium"),
                price: "$499",
                sections: [
                  {
                    title: "Departmental Examinations (5 items)",
                    items: "General Examination, Internal Medicine, Surgery, Ophthalmology, Otolaryngology (ENT)"
                  },
                  {
                    title: "Laboratory Tests (8 items)",
                    items: "Complete Blood Count (CBC), Blood Glucose, Urinalysis, Liver Function Tests, Renal Function Tests, Lipid Profile, Gastric Function Tests, Combined Multi-Tumor Marker Panel (TM12)"
                  },
                  {
                    title: "Medical Imaging and Diagnostic Examinations (7 items)",
                    items: "Electrocardiogram (ECG), Cervical Spine X-ray, Lumbar Spine X-ray, Ultrasound Examination of the Liver, Gallbladder, Spleen, Pancreas, and Kidneys, Thyroid Ultrasound, Prostate Ultrasound or Breast Ultrasound, Computed Tomography (CT) Scan"
                  }
                ],
                extras: [
                  "Nutritious Breakfast",
                  "Specialist Medical Report Interpretation Service",
                  "One-Year Complimentary Physician Consultation Service"
                ]
              }
            ].map((pkg, idx) => (
              <Card 
                key={idx}
                className={`border-none shadow-md hover:shadow-lg transition-all flex flex-col ${
                  pkg.featured ? "ring-2 ring-primary md:scale-105 z-10" : ""
                }`}
              >
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  {pkg.featured && (
                    <div className="bg-primary text-white text-center py-2 rounded-lg font-semibold">
                      {t("lab_most_popular")}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    {pkg.sections.map((section, sidx) => (
                      <div key={sidx} className="space-y-2">
                        <h4 className="font-semibold text-slate-900 text-sm border-b pb-1">{section.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{section.items}</p>
                      </div>
                    ))}
                    
                    <div className="pt-4 space-y-2 border-t">
                      {pkg.extras.map((extra, eidx) => (
                        <div key={eidx} className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                           <span className="text-sm text-slate-700 font-medium">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer" className="mt-6 block">
                    <Button className="w-full rounded-full">
                      {t("lab_select_pkg")}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Health Checkup */}
          <Card className="border-none shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-12 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-bold text-2xl text-slate-900">{t("lab_custom_title")}</h3>
                <p className="text-slate-600">{t("lab_custom_subtitle")}</p>
              </div>
              <p className="text-slate-700 text-center">
                {t("lab_custom_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full rounded-full">
                    {t("lab_consult_custom")}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Tests */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">{t("lab_available_title")}</h2>
            <p className="text-slate-600 text-lg">
              {t("lab_available_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableServices.map((test, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800 text-sm">{test}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('../images/pattern.png')] opacity-10"></div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
            {t("lab_cta_title")}
          </h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">
            {t("lab_cta_desc")}
          </p>
          <a href="https://wa.me/message/2XHSAU56KCOSG1" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-primary font-bold px-10 py-6 text-lg shadow-xl">
              {t("lab_book_now")}
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
