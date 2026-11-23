import Link from "next/link";
import type { ComponentProps } from "react";

/** Internal paths use Next.js client-side navigation (no page reload); everything else is a normal anchor. */
export default function SmartLink({ href, ...rest }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
