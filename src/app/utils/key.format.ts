export default function keyFormat(value: string, params: Record<string, any>): string {
  return value.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    return key in params ? `'${params[key]}'` : `:${key}`;
  });
}
