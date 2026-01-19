import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Consultation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    medicalCondition: "",
    treatmentType: "",
    preferredSpecialty: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const createConsultation = trpc.consultation.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        medicalCondition: "",
        treatmentType: "",
        preferredSpecialty: "",
      });
      setError("");
    },
    onError: (err: any) => {
      setError(err.message || "提交失败，请重试");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createConsultation.mutate(formData);
  };

  return (
    <Layout>
      <div className="bg-slate-50 py-20">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold text-slate-900">患者咨询</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            填写以下表格，我们的医疗顾问将在24小时内与您联系，为您提供专业的初步评估和建议。
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container max-w-2xl">
          {submitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-green-900">咨询已提交</h2>
                <p className="text-green-800">
                  感谢您的咨询！我们已收到您的信息，医疗顾问将在24小时内通过邮件或电话与您联系。
                </p>
                <p className="text-sm text-green-700">
                  请留意您的邮箱和电话，确保能够及时接收我们的回复。
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4"
                >
                  返回提交新咨询
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>填写咨询表格</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}

                  {/* 姓名 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">名 *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="请输入您的名字"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">姓 *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="请输入您的姓氏"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 联系方式 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">电子邮箱 *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">联系电话 *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+86 ..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 医疗信息 */}\n                  <div className="space-y-2">
                    <Label htmlFor="treatmentType">治疗类型</Label>
                    <Select value={formData.treatmentType} onValueChange={(value) => handleSelectChange("treatmentType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择治疗类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="surgery">手术治疗</SelectItem>
                        <SelectItem value="checkup">健康体检</SelectItem>
                        <SelectItem value="consultation">专家咨询</SelectItem>
                        <SelectItem value="rehabilitation">康复治疗</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredSpecialty">偏好的专科</Label>
                    <Select value={formData.preferredSpecialty} onValueChange={(value) => handleSelectChange("preferredSpecialty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择专科" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oncology">肿瘤科</SelectItem>
                        <SelectItem value="cardiology">心血管科</SelectItem>
                        <SelectItem value="orthopedics">骨科</SelectItem>
                        <SelectItem value="neurology">神经科</SelectItem>
                        <SelectItem value="gastroenterology">消化科</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 病情描述 */}
                  <div className="space-y-2">
                    <Label htmlFor="medicalCondition">病情描述 *</Label>
                    <Textarea
                      id="medicalCondition"
                      name="medicalCondition"
                      placeholder="请详细描述您的病情、症状和医疗历史...（至少10个字符）\n\n包括：\n- 主要症状\n- 病程时长\n- 已进行的检查和治疗\n- 当前用药情况\n- 其他相关医疗信息"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  {/* 提交按钮 */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={createConsultation.isPending}
                  >
                    {createConsultation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        提交中...
                      </>
                    ) : (
                      "提交咨询"
                    )}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    提交即表示您同意我们的隐私政策。您的个人信息将被严格保密，仅用于医疗咨询目的。
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
}
