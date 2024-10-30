export function generateSlug(workspaceName: string): string {
  let slug = workspaceName.replace(/[0-9]/g, '');
  slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, '_');
  slug = slug.replace(/[^a-z_]/g, '');
  return slug;
}