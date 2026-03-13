export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2991DB] via-[#2480c4] to-[#1b6da8]">
      <div className="text-center animate-fade-in">
        <h1 className="text-8xl font-extrabold text-white/20 mb-2">404</h1>
        <p className="text-xl text-white font-semibold mb-2">Link không tồn tại</p>
        <p className="text-blue-200/70 text-sm mb-6">
          Đường dẫn rút gọn này chưa được tạo hoặc đã bị xóa.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white/25 hover:border-white/40 transition-all duration-300"
        >
          ← Về trang chủ
        </a>
      </div>
    </div>
  );
}
