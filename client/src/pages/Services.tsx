import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "医疗咨询与预约",
      price: "基础服务",
      features: [
        "病历资料整理与翻译",
        "专家远程视频会诊",
        "定制诊疗方案",
        "医院与专家预约绿色通道"
      ]
    },
    {
      title: "全程陪同与翻译",
      price: "核心服务",
      features: [
        "机场专车接送",
        "就医全程陪同翻译",
        "生活助理服务",
        "24小时紧急响应"
      ]
    },
    {
      title: "签证与行程支持",
      price: "增值服务",
      features: [
        "医疗签证邀请函协助",
        "机票与酒店预订",
        "签证延期办理",
        "家属陪同签证支持"
      ]
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-20 text-white">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold">我们的服务体系</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            一站式解决您在跨境就医过程中的所有难题
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="flex flex-col hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                <CardHeader>
                  <div className="text-sm font-medium text-primary mb-2">{service.price}</div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-4 mb-8 flex-1">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">了解详情</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="images/service-1.jpg" 
                alt="Service Process" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="font-heading text-3xl font-bold text-slate-900">服务流程</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "咨询与评估", desc: "提交病历资料，我们的医学顾问进行初步评估。" },
                  { step: "02", title: "方案制定", desc: "为您推荐合适的医院和专家，并出具详细的行程方案。" },
                  { step: "03", title: "行程确认", desc: "协助办理签证，预订机票住宿，确认就医时间。" },
                  { step: "04", title: "抵华就医", desc: "专人接机，全程陪同就诊，直至治疗结束。" },
                  { step: "05", title: "回国康复", desc: "协助办理出院手续，提供后续康复指导和随访。" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="font-heading font-bold text-3xl text-slate-200">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
