function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function dimension(value: number): void {
  finite(value, 1e-6, 1e6);
}
function count(value: number): number {
  if (!Number.isSafeInteger(value) || value < 0)
    throw new RangeError('Count exceeds safe integer resolution');
  return value;
}
export interface FabricPlan {
  across: number;
  rows: number;
  cutWidth: number;
  cutLength: number;
  totalLength: number;
}
export function planFabric(
  fabricWidth: number,
  pieceWidth: number,
  pieceLength: number,
  pieces: number,
  seam = 0,
  endAllowance = 0,
): FabricPlan {
  dimension(fabricWidth);
  dimension(pieceWidth);
  dimension(pieceLength);
  integer(pieces, 1, 1e6);
  finite(seam, 0, 1e6);
  finite(endAllowance, 0, 1e6);
  const cutWidth = pieceWidth + 2 * seam,
    cutLength = pieceLength + 2 * seam,
    across = count(Math.floor(fabricWidth / cutWidth));
  if (across < 1) throw new RangeError('Piece does not fit fabric width');
  const rows = Math.ceil(pieces / across);
  return { across, rows, cutWidth, cutLength, totalLength: rows * cutLength + 2 * endAllowance };
}
