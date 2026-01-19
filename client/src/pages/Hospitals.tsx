import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

export default function Hospitals() {
  const hospitals = [
    {
      name: "北京协和医院",
      location: "北京",
      specialty: "综合排名第一，疑难重症诊治中心",
      image: "/images/facility-1.jpg",
      tags: ["综合", "公立三甲", "JCI认证"]
    },
    {
      name: "上海瑞金医院",
      location: "上海",
      specialty: "内分泌、血液科、微创外科全国领先",
      image: "/images/facility-3.jpg",
      tags: ["综合", "公立三甲", "科研基地"]
    },
    {
      name: "复旦大学附属肿瘤医院",
      location: "上海",
      specialty: "肿瘤精准治疗，多学科综合诊治",
      image: "/images/hospital-exterior.jpg",
      tags: ["专科", "公立三甲", "肿瘤中心"]
    },
    {
      name: "四川大学华西医院",
      location: "成都",
      specialty: "中国西部疑难危急重症诊疗国家级中心",
      image: "/images/facility-2.jpg",
      tags: ["综合", "公立三甲", "科研实力强"]
    },
    {
      name: "中山大学附属第一医院",
      location: "广州",
      specialty: "肾内科、普外科、神经科实力雄厚",
      image: "/images/facility-1.jpg",
      tags: ["综合", "公立三甲", "华南中心"]
    },
    {
      name: "浙江大学医学院附属第一医院",
      location: "杭州",
      specialty: "器官移植、传染病学处于国际领先水平",
      image: "/images/facility-3.jpg",
      tags: ["综合", "公立三甲", "移植中心"]
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-900 py-20 text-white">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold">合作医疗机构</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            汇聚中国顶尖医疗资源，为您提供最权威的诊疗服务
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 顶级推荐
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <MapPin className="w-4 h-4" /> {hospital.location}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {hospital.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {hospital.specialty}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hospital.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
