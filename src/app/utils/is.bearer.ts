export default function isBearer(value: unknown): [boolean, string] {
  if (typeof value !== 'string') {
    return [false, String()];
  }

  const [bearer, token] = value.split(' ');
  const hasValidLength = token?.length > 0;
  const isBearer = bearer?.toLowerCase() === 'bearer';
  const status = isBearer && hasValidLength;
  return [status, token ?? String()];
}
