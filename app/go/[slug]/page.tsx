import { supabase } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GoRedirect({ params }: PageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('short_links')
    .select('target_url')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  redirect(data.target_url);
}
