import { NextRequest, NextResponse } from 'next/server';

function verifyAdmin(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: 'Sai mật khẩu' }, { status: 401 });
}
