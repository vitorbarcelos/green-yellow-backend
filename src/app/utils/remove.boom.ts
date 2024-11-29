export function removeBom(buffer: Buffer): Buffer {
  const BOM = Buffer.from([0xef, 0xbb, 0xbf]);

  if (buffer.slice(0, 3).equals(BOM)) {
    return buffer.slice(3);
  }

  return buffer;
}
