# Portfolio – Giáo viên Toán THCS

Website portfolio cá nhân dành cho giáo viên Toán THCS, xây dựng bằng **Next.js** và **Tailwind CSS**.

## 🚀 Chạy trên máy local

### Yêu cầu
- Node.js 18+ 
- npm

### Cài đặt & chạy

```bash
# Cài đặt dependencies
npm install

# Chạy ở chế độ phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## 📝 Tùy chỉnh nội dung

Toàn bộ nội dung mẫu nằm trong file **`data/siteData.ts`**. Bạn chỉ cần sửa file này để thay đổi:

| Mục | Mô tả |
|---|---|
| `siteConfig` | Tên, chức danh, email, SĐT, địa chỉ |
| `aboutData` | Giới thiệu bản thân, triết lý giảng dạy, số liệu nổi bật |
| `experienceData` | Quá trình công tác (thời gian, trường, chức vụ) |
| `contactData` | Tiêu đề & mô tả phần liên hệ |

### Thay ảnh đại diện
Thay file ảnh trong thư mục `public/images/` và cập nhật đường dẫn trong `siteConfig.avatarUrl`.

## 🌐 Deploy lên Vercel

### Cách 1: Vercel CLI (1 lệnh)

```bash
# Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# Deploy
vercel deploy
```

### Cách 2: Vercel Dashboard

1. Push code lên GitHub
2. Truy cập [vercel.com](https://vercel.com) → **New Project**
3. Import repository từ GitHub
4. Nhấn **Deploy** → Xong!

## 📁 Cấu trúc dự án

```
portfolio/
├── app/
│   ├── globals.css        # Style toàn cục & theme
│   ├── layout.tsx         # Layout gốc + SEO metadata
│   └── page.tsx           # Trang chủ (ghép tất cả section)
├── components/
│   ├── Navbar.tsx         # Thanh điều hướng
│   ├── Hero.tsx           # Phần hero giới thiệu
│   ├── About.tsx          # Về tôi
│   ├── Experience.tsx     # Kinh nghiệm giảng dạy
│   ├── Contact.tsx        # Liên hệ
│   ├── Footer.tsx         # Chân trang
│   └── ScrollAnimation.tsx # Hiệu ứng khi cuộn
├── data/
│   └── siteData.ts        # Dữ liệu mẫu (chỉnh sửa ở đây)
└── public/
    └── images/            # Ảnh đại diện, icon
```

## 🛠️ Công nghệ sử dụng

- **Next.js** – React framework
- **Tailwind CSS** – Utility-first CSS
- **TypeScript** – Type safety
- **Google Fonts** – Merriweather & Be Vietnam Pro
