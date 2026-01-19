import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth, User } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, User as UserIcon, MapPin, Calendar, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function MyAccount() {
  const { user, updateProfile, updatePreferences, logout } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    country: "",
    city: "",
    address: "",
  });
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        country: user.country || "",
        city: user.city || "",
        address: user.address || "",
      });
      const parts = (user.phone || "").split(" ");
      if (parts.length > 1) {
        setPhoneCode(parts[0]);
        setPhoneNumber(parts.slice(1).join(" "));
      } else {
        setPhoneCode("+1");
        setPhoneNumber(user.phone || "");
      }
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        ...profileForm,
        phone: `${phoneCode} ${phoneNumber}`.trim()
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubscriptionToggle = async (subscribed: boolean) => {
    setLoading(true);
    try {
      await updatePreferences({ subscribedToEmails: subscribed });
      toast.success(subscribed ? "Subscribed to email updates" : "Unsubscribed from email updates");
    } catch (error: any) {
      toast.error(error.message || "Failed to update preferences");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("auth_login")}</h1>
          <Link href="/login"><Button>{t("sign_in")}</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading">{t("account_title")}</h1>
            <p className="text-slate-600">{t("account_welcome")}, {user.name || user.email}</p>
          </div>
          <Link href="/">
            <Button>{t("account_purchase")}</Button>
          </Link>
        </div>

        <div className="grid gap-8">
          {/* Profile Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("account_profile_info")}</CardTitle>
                <CardDescription>{t("account_profile_desc")}</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  {t("account_edit")}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    {t("account_cancel")}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("account_name")}</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("account_phone")}</Label>
                      <div className="flex gap-2">
                        <Input
                          className="w-24"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                          placeholder="+1"
                        />
                        <Input
                          className="flex-1"
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="234 567 890"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{t("account_country")}</Label>
                      <Input
                        id="country"
                        value={profileForm.country}
                        onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t("account_city")}</Label>
                      <Input
                        id="city"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">{t("account_address")}</Label>
                      <Input
                        id="address"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      {t("account_save")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setProfileForm({
                          name: user.name || "",
                          country: user.country || "",
                          city: user.city || "",
                          address: user.address || "",
                        });
                        const parts = (user.phone || "").split(" ");
                        if (parts.length > 1) {
                          setPhoneCode(parts[0]);
                          setPhoneNumber(parts.slice(1).join(" "));
                        } else {
                          setPhoneCode("+1");
                          setPhoneNumber(user.phone || "");
                        }
                      }}
                      disabled={loading}
                    >
                      {t("account_reset")}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <UserIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">{t("account_name")}</label>
                      <p className="font-medium">{user.name || t("account_not_set")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <Mail className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">{t("auth_email")}</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <Shield className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">{t("account_login_method")}</label>
                      <p className="capitalize font-medium">{user.loginMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <Calendar className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">{t("account_member_since")}</label>
                      <p className="font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  {user.phone && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-full">
                        <Mail className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-500">{t("account_phone")}</label>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  {(user.country || user.city || user.address) && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-full">
                        <MapPin className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-500">{t("account_location")}</label>
                        <p className="font-medium">
                          {[user.city, user.country].filter(Boolean).join(", ") || t("account_not_set")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Subscription Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("account_comm_pref")}</CardTitle>
              <CardDescription>{t("account_comm_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("account_sub_title")}</p>
                  <p className="text-sm text-slate-500">
                    {t("account_sub_desc")}
                  </p>
                </div>
                <Switch
                  checked={user.subscribedToEmails !== false}
                  onCheckedChange={handleEmailSubscriptionToggle}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>


          {/* Logout Button */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="destructive" onClick={logout} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {t("logout")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
