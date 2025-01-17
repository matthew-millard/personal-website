import combineHeaders from "./combineHeaders";

/**
 * Combine multiple response init objects into one (uses combineHeaders)
 */
export default function combineResponseInits(
  ...responseInits: (ResponseInit | undefined)[]
) {
  let combined: ResponseInit = {};
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers),
    };
  }
  return combined;
}
