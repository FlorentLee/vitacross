import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container py-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">{t("terms_title")}</h1>
        <div className="prose prose-slate max-w-none text-slate-700">
          <p className="text-sm text-slate-500 mb-8">{t("terms_updated")}</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">{t("terms_1_title")}</h3>
          <p>{t("terms_1_content")}</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">{t("terms_2_title")}</h3>
          <p>{t("terms_2_intro")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{t("terms_2_li1")}</li>
            <li>{t("terms_2_li2")}</li>
            <li>{t("terms_2_li3")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">{t("terms_3_title")}</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-4">
            <p className="font-medium text-blue-900">{t("terms_3_auto_title")}</p>
            <p className="text-sm text-blue-800 mt-1">
              {t("terms_3_auto_desc")}
            </p>
          </div>
          <p>{t("terms_3_intro")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{t("terms_3_li1")}</li>
            <li>{t("terms_3_li2")}</li>
            <li>{t("terms_3_li3")}</li>
          </ul>
          <p className="mt-2 text-sm text-slate-500">
            {t("terms_3_out")}
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">{t("terms_4_title")}</h3>
          <p>{t("terms_4_intro")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{t("terms_4_li1")}</li>
            <li>{t("terms_4_li2")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-slate-900">{t("terms_5_title")}</h3>
          <p>{t("terms_5_intro")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{t("terms_5_li1")}</li>
            <li>{t("terms_5_li2")}</li>
            <li>{t("terms_5_li3")}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
