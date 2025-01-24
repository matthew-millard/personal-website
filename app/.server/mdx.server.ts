import { bundleMDX } from "mdx-bundler";

export async function compileAndBundleMDX({ source }: { source: string }) {
  return await bundleMDX({
    source,
  });
}
