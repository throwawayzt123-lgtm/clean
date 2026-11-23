import type { ReactNode, SVGProps } from "react";

function Base({ children, ...p }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

export const SlidersIcon = (p: P) => (
  <Base {...p}>
    <path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" />
    <path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" />
  </Base>
);
export const ChevronRightIcon = (p: P) => (<Base {...p}><path d="m9 18 6-6-6-6" /></Base>);
export const ArrowDownIcon = (p: P) => (<Base {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Base>);
export const ArrowUpRightIcon = (p: P) => (<Base {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Base>);
export const MousePointerIcon = (p: P) => (
  <Base {...p}>
    <path d="M12.586 12.586 19 19" />
    <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
  </Base>
);
export const XIcon = (p: P) => (<Base {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Base>);
export const RotateCcwIcon = (p: P) => (
  <Base {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Base>
);
export const SparklesIcon = (p: P) => (
  <Base {...p}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </Base>
);
export const TwitterIcon = (p: P) => (
  <Base {...p}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></Base>
);
export const InstagramIcon = (p: P) => (
  <Base {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Base>
);
export const LinkedinIcon = (p: P) => (
  <Base {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </Base>
);
export const PhoneIcon = (p: P) => (
  <Base {...p}><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></Base>
);
export const MailIcon = (p: P) => (
  <Base {...p}><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></Base>
);
export const CheckIcon = (p: P) => (<Base {...p}><path d="M20 6 9 17l-5-5" /></Base>);
