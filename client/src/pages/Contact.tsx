import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="bg-slate-50 py-20">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold text-slate-900">联系我们</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            无论您身在何处，我们的专业团队随时为您提供帮助
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-slate-900">联系方式</h2>
                <p className="text-slate-600">
                  如果您有任何关于入境医疗服务的疑问，欢迎通过以下方式联系我们。我们的多语言客服团队将竭诚为您服务。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">电话咨询</h3>
                      <p className="text-slate-600">+86 123 4567 8900 (国际)</p>
                      <p className="text-slate-500 text-sm mt-1">周一至周日 24小时服务</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">电子邮件</h3>
                      <p className="text-slate-600">contact@medinbound.com</p>
                      <p className="text-slate-500 text-sm mt-1">通常在24小时内回复</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">总部地址</h3>
                      <p className="text-slate-600">中国上海市浦东新区陆家嘴环路1000号</p>
                      <p className="text-slate-500 text-sm mt-1">邮编：200120</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">在线留言</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">名</Label>
                    <Input id="firstName" placeholder="请输入您的名字" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">姓</Label>
                    <Input id="lastName" placeholder="请输入您的姓氏" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">电子邮箱</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话</Label>
                  <Input id="phone" type="tel" placeholder="+86 ..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">咨询主题</Label>
                  <Input id="subject" placeholder="例如：预约专家、签证咨询..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">详细内容</Label>
                  <Textarea 
                    id="message" 
                    placeholder="请详细描述您的需求或病情，以便我们更好地为您服务..." 
                    className="min-h-[150px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  提交咨询
                </Button>
                <p className="text-xs text-slate-400 text-center">
                  提交即表示您同意我们的隐私政策。您的个人信息将被严格保密。
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
