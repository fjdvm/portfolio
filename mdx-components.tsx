import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/ui/figure";

// Spacing follows the Figma Article frame (node 4:757), where each block is
// separated by spacer frames: 22px between paragraphs, 40px above a heading.
const components: MDXComponents = {
  p: (props) => (
    <p
      className="mt-[22px] font-serif text-[19px] leading-8 text-ink2 [blockquote+&]:mt-[30px] [h2+&]:mt-3.5"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 font-serif text-[28px] font-medium leading-9 tracking-[-0.168px] text-ink [figure+&]:mt-12"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-[22px] border-l-2 border-nav-active py-1 pl-[22px] font-serif text-2xl italic leading-[34px] text-ink [&>p]:m-0 [&>p]:text-2xl [&>p]:leading-[34px] [&>p]:text-ink"
      {...props}
    />
  ),
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
