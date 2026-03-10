export const siteConfig = {
  name: "Phạm Đăng Hải",
  title: "Giáo viên Toán trường THCS Hùng Vương",
  bio: "Hành trình vạn dặm bắt đầu từ một bước chân.",
  avatarUrl: "/logo.png",
};

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: "HMath – Học và Luyện thi Toán THCS",
    url: "https://hmath.vercel.app/",
    icon: "hmath",
    color: "from-primary-500 to-primary-700",
    hoverColor: "hover:from-primary-600 hover:to-primary-800",
  },
  {
    label: "Tra cứu HP – Hệ thống tra cứu học phí dành cho giáo viên",
    url: "https://tracuuhp.vercel.app/",
    icon: "search",
    color: "from-sky-500 to-primary-500",
    hoverColor: "hover:from-sky-600 hover:to-primary-600",
  },
  {
    label: "Fanpage Facebook",
    url: "https://www.facebook.com/thaydanghai",
    icon: "facebook",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    label: "Liên hệ Zalo",
    url: "http://zalo.me/84385048315",
    icon: "zalo",
    color: "from-blue-400 to-blue-500",
    hoverColor: "hover:from-blue-500 hover:to-blue-600",
  },
];
