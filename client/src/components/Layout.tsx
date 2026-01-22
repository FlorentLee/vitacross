import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MessageCircle, LogOut, User, LayoutDashboard, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("online_consultation"), path: "/consultation" },
    { name: t("lab_tests"), path: "/lab-tests" },
    { name: t("medical_tourism"), path: "/medical-travel" },
    { name: t("healing_journey"), path: "/healing-journey" },
    { name: t("legal_support"), path: "/legal-support" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp: +86 134 3045 5931
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> E-mail: vitacross@163.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-1">
              <Button
                variant={language === "en" ? "secondary" : "ghost"}
                size="sm"
                className={`h-6 px-2 text-xs ${language === "en" ? "bg-white text-primary hover:bg-white/90" : "text-primary-foreground hover:bg-white/20 hover:text-white"}`}
                onClick={() => setLanguage("en")}
              >
                English
              </Button>
              <Button
                variant={language === "zh" ? "secondary" : "ghost"}
                size="sm"
                className={`h-6 px-2 text-xs ${language === "zh" ? "bg-white text-primary hover:bg-white/90" : "text-primary-foreground hover:bg-white/20 hover:text-white"}`}
                onClick={() => setLanguage("zh")}
              >
                中文
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-2" : "bg-white py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/images/logo.png" alt="VitaCross Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-primary">VitaCross</span>
                <span className="text-xs text-muted-foreground tracking-wider">Borderless Care</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer relative group",
                    location === item.path ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    location === item.path ? "w-full" : ""
                  )} />
                </span>
              </Link>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'admin' && (
                    <Link href="/admin/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/register?redirect=${encodeURIComponent(location)}`}>
                  <Button variant="outline" className="rounded-full">{t("register")}</Button>
                </Link>
                <Link href={`/login?redirect=${encodeURIComponent(location)}`}>
                  <Button className="rounded-full">{t("sign_in")}</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg animate-in slide-in-from-top-5">
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className="block py-2 text-base font-medium text-foreground/80 hover:text-primary cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                          <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/account">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" /> My Account
                      </Button>
                    </Link>
                    <Button variant="destructive" onClick={logout}>{t("logout")}</Button>
                  </>
                ) : (
                  <>
                    <Link href={`/register?redirect=${encodeURIComponent(location)}`}>
                      <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>{t("register")}</Button>
                    </Link>
                    <Link href={`/login?redirect=${encodeURIComponent(location)}`}>
                      <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>{t("sign_in")}</Button>
                    </Link>
                  </>
                )}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>English</Button>
                  <Button variant={language === "zh" ? "default" : "outline"} onClick={() => setLanguage("zh")}>中文</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="VitaCross Logo" className="w-10 h-10 object-contain" />
              <span className="font-heading font-bold text-xl text-white">VitaCross</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("footer_desc")}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">{t("services")}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/consultation"><span className="hover:text-primary transition-colors cursor-pointer">{t("online_consultation")}</span></Link></li>
              <li><Link href="/lab-tests"><span className="hover:text-primary transition-colors cursor-pointer">{t("lab_tests")}</span></Link></li>
              <li><Link href="/medical-travel"><span className="hover:text-primary transition-colors cursor-pointer">{t("medical_tourism")}</span></Link></li>
              <li><Link href="/healing-journey"><span className="hover:text-primary transition-colors cursor-pointer">{t("healing_journey")}</span></Link></li>
              <li><Link href="/legal-support"><span className="hover:text-primary transition-colors cursor-pointer">{t("legal_support")}</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp: +86 134 3045 5931</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> E-mail: vitacross@163.com</li>
              <li className="mt-4">
                <p className="text-xs text-slate-500">{t("available_247")}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 VitaCross. Borderless Care. {t("rights_reserved")}
        </div>
      </footer>
    </div>
  );
}
