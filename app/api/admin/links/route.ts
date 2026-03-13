import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function verifyAdmin(request: NextRequest): boolean {
  const password = request.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// GET: List all shortlinks
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('short_links')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create a new shortlink
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, target_url } = await request.json();

  if (!slug || !target_url) {
    return NextResponse.json(
      { error: 'Slug và URL đích là bắt buộc' },
      { status: 400 }
    );
  }

  // Validate slug format (only lowercase letters, numbers, hyphens)
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('short_links')
    .insert({ slug, target_url })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: `Slug "${slug}" đã tồn tại` },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE: Delete a shortlink by id
export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID là bắt buộc' }, { status: 400 });
  }

  const { error } = await supabase
    .from('short_links')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
