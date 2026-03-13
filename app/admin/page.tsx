"use client";

import { useState, useEffect, useCallback } from "react";

interface ShortLink {
  id: string;
  slug: string;
  target_url: string;
  created_at: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(false);

  const [newSlug, setNewSlug] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState("");

  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/links", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }, [adminPassword]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLinks();
    }
  }, [isLoggedIn, fetchLinks]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        setAdminPassword(password);
        setIsLoggedIn(true);
      } else {
        setLoginError("Sai mật khẩu. Vui lòng thử lại.");
      }
    } catch {
      setLoginError("Lỗi kết nối. Vui lòng thử lại.");
    }

    setLoginLoading(false);
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    setAddLoading(true);

    // Auto-add https:// if missing
    let url = newUrl.trim();
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    try {
      const res = await fetch("/api/admin/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({ slug: newSlug.toLowerCase().trim(), target_url: url }),
      });

      const data = await res.json();

      if (res.ok) {
        setAddSuccess(`Đã tạo: /go/${data.slug}`);
        setNewSlug("");
        setNewUrl("");
        fetchLinks();
        setTimeout(() => setAddSuccess(""), 3000);
      } else {
        setAddError(data.error || "Có lỗi xảy ra");
      }
    } catch {
      setAddError("Lỗi kết nối. Vui lòng thử lại.");
    }

    setAddLoading(false);
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async (id: string) => {
    // First click → show confirm state
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      setDeleteError("");
      // Auto-cancel after 3 seconds
      setTimeout(() => setConfirmDeleteId((prev) => (prev === id ? null : prev)), 3000);
      return;
    }

    // Second click → actually delete
    setConfirmDeleteId(null);
    setDeleteLoadingId(id);
    setDeleteError("");

    try {
      const res = await fetch("/api/admin/links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } else {
        const data = await res.json();
        setDeleteError(data.error || "Xóa thất bại");
        setTimeout(() => setDeleteError(""), 3000);
      }
    } catch {
      setDeleteError("Lỗi kết nối");
      setTimeout(() => setDeleteError(""), 3000);
    }
    setDeleteLoadingId(null);
  };

  const handleCopy = async (slug: string, id: string) => {
    const shortUrl = `${window.location.origin}/go/${slug}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shortUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a48] via-[#153a5e] to-[#1b4d75]" />
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-sky-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="w-full max-w-sm animate-fade-in">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-8 shadow-2xl">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h1 className="text-xl font-bold text-white text-center mb-1">Bảng điều khiển</h1>
            <p className="text-blue-200/60 text-sm text-center mb-6">Nhập mật khẩu để tiếp tục</p>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-400/60 focus:bg-white/15 transition-all duration-300 text-sm"
                autoFocus
              />

              {loginError && (
                <p className="text-red-300 text-xs mt-2 pl-1">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={loginLoading || !password}
                className="w-full mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
              >
                {loginLoading ? "Đang xác thực..." : "Đăng nhập"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a48] via-[#153a5e] to-[#1b4d75]" />
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-sky-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-white">🔗 Quản lý Link rút gọn</h1>
            <p className="text-blue-200/50 text-sm mt-1">Tạo và quản lý các đường dẫn rút gọn</p>
          </div>
          <a
            href="/"
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white/70 text-sm hover:bg-white/15 hover:text-white transition-all duration-300"
          >
            ← Trang chủ
          </a>
        </div>

        {/* Add new link form */}
        <div className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/12 p-6 mb-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-white mb-4">Thêm link mới</h2>

          <form onSubmit={handleAddLink} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200/60 text-xs mb-1.5 pl-1">Slug (đường dẫn rút gọn)</label>
                <div className="flex items-center">
                  <span className="text-white/30 text-sm mr-2 whitespace-nowrap">/go/</span>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="vd: dantri"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/25 focus:outline-none focus:border-primary-400/60 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-200/60 text-xs mb-1.5 pl-1">URL đích</label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="vd: https://dantri.com.vn"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/25 focus:outline-none focus:border-primary-400/60 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            {addError && (
              <div className="flex items-center gap-2 text-red-300 text-xs bg-red-500/10 rounded-xl px-3 py-2 border border-red-500/20">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {addError}
              </div>
            )}

            {addSuccess && (
              <div className="flex items-center gap-2 text-emerald-300 text-xs bg-emerald-500/10 rounded-xl px-3 py-2 border border-emerald-500/20">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {addSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={addLoading || !newSlug || !newUrl}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm hover:from-primary-600 hover:to-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
            >
              {addLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang tạo...
                </span>
              ) : (
                "＋ Tạo link rút gọn"
              )}
            </button>
          </form>
        </div>

        {/* Links list */}
        <div className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/12 p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Danh sách link
              {links.length > 0 && (
                <span className="ml-2 text-sm font-normal text-blue-200/40">({links.length})</span>
              )}
            </h2>
            <button
              onClick={fetchLinks}
              disabled={loading}
              className="text-blue-200/40 hover:text-white text-xs transition-colors duration-300"
            >
              {loading ? "Đang tải..." : "↻ Làm mới"}
            </button>
          </div>

          {loading && links.length === 0 ? (
            <div className="text-center py-12">
              <svg className="animate-spin w-8 h-8 text-primary-400/50 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-blue-200/30 text-sm">Đang tải...</p>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <p className="text-blue-200/30 text-sm">Chưa có link rút gọn nào</p>
              <p className="text-blue-200/20 text-xs mt-1">Tạo link đầu tiên ở form bên trên</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary-300 font-mono text-sm font-medium">/go/{link.slug}</span>
                      <button
                        onClick={() => handleCopy(link.slug, link.id)}
                        className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all duration-300"
                        title="Copy link"
                      >
                        {copiedId === link.id ? (
                          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-white/40 text-xs truncate">→ {link.target_url}</p>
                    <p className="text-white/20 text-[10px] mt-1">
                      {new Date(link.created_at).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <a
                      href={link.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/10 transition-all duration-300"
                      title="Mở URL đích"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <button
                      onClick={() => handleDelete(link.id)}
                      disabled={deleteLoadingId === link.id}
                      className={`p-2 rounded-lg disabled:opacity-50 transition-all duration-300 ${
                        confirmDeleteId === link.id
                          ? "text-red-400 bg-red-500/20 border border-red-500/30"
                          : "text-white/20 hover:text-red-400 hover:bg-red-500/10"
                      }`}
                      title={confirmDeleteId === link.id ? "Click lần nữa để xóa" : "Xóa link"}
                    >
                      {deleteLoadingId === link.id ? (
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : confirmDeleteId === link.id ? (
                        <span className="text-[10px] font-medium whitespace-nowrap">Xóa?</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {deleteError && (
            <div className="mt-3 flex items-center gap-2 text-red-300 text-xs bg-red-500/10 rounded-xl px-3 py-2 border border-red-500/20">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {deleteError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <p className="text-white/20 text-xs">Bảng điều khiển Admin – haic2hv.net</p>
        </div>
      </div>
    </div>
  );
}
