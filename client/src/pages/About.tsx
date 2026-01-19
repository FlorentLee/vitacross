import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, History, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-slate-50 py-20">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold text-slate-900">关于 MedInbound</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            致力于消除国界，让每一位患者都能享受到中国优质的医疗服务。
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-slate-900">我们的使命</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                MedInbound 成立于2015年，总部位于上海。我们是一支由资深医疗专家、专业翻译和旅行顾问组成的跨国团队。
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                我们的使命是打破语言和文化的壁垒，为全球患者搭建通往中国顶级医疗资源的桥梁。无论是复杂的手术治疗，还是高端的健康体检，我们都提供最专业、最贴心的全程服务。
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">精准匹配</h4>
                    <p className="text-sm text-slate-500">根据病情精准推荐最适合的医院和专家</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">全程陪伴</h4>
                    <p className="text-sm text-slate-500">从落地到离境，24小时管家式服务</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="images/facility-2.jpg" 
                alt="Our Team" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <Award className="w-10 h-10 text-primary" />
                  <div>
                    <div className="font-bold text-2xl text-slate-900">10年+</div>
                    <div className="text-xs text-slate-500">行业经验</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  荣获"年度最佳跨境医疗服务机构"称号，服务质量备受认可。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">核心价值观</h2>
            <p className="text-slate-400">我们坚持的原则，是我们服务的基石</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "患者至上",
                desc: "一切决策以患者的健康和利益为最高准则，绝不妥协。",
                icon: <Users className="w-8 h-8" />
              },
              {
                title: "专业诚信",
                desc: "保持医疗服务的严谨性，信息透明，收费合理，信守承诺。",
                icon: <Award className="w-8 h-8" />
              },
              {
                title: "持续关怀",
                desc: "服务不止于治疗结束，我们关注患者的长期康复和生活质量。",
                icon: <History className="w-8 h-8" />
              }
            ].map((item, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
