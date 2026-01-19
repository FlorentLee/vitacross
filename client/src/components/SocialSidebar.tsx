import { Mail, MessageCircle, Instagram, Music, Facebook } from "lucide-react";

export default function SocialSidebar() {
  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:vitacross@163.com",
      color: "hover:bg-red-500"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/message/2XHSAU56KCOSG1",
      color: "hover:bg-green-500"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/hivitacross?igsh=MXQ5MTMzamdoa2VndQ%3D%3D&utm_source=qr",
      color: "hover:bg-pink-500"
    },
    {
      icon: Music,
      label: "TikTok",
      href: "https://www.tiktok.com/@hivitacross?_r=1&_t=ZP-92z8cro93M7",
      color: "hover:bg-black"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com",
      color: "hover:bg-blue-600"
    }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} text-white shadow-lg hover:scale-110`}
            title={social.label}
            aria-label={social.label}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}
