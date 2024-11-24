

export function generateIdentifier(projectName: string) {
  let identifier = projectName.replace(/[0-9]/g, '');
  identifier = identifier.toUpperCase();
  identifier = identifier.replace(/\s+/g, '_');
  identifier = identifier.replace(/[^a-zA-Z_]/g, '');
  return identifier.substring(0, 5);
}