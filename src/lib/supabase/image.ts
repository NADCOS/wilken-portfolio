const BUCKET = "project-images";

/** Resolves a Supabase Storage path (bucket: project-images) to a public URL. */
export function projectImageUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;

  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}
