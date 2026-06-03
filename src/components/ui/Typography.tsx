import { cn } from "@/lib/utils";
import type { ReactNode, JSX } from "react";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "list"
    | "inlineCode"
    | "lead"
    | "large"
    | "medium"
    | "small"
    | "muted"
    | "table";
  children: ReactNode;
  className?: string;
}

export const Typography = ({
  as,
  variant = "medium",
  children,
  className,
}: TypographyProps) => {
  const Tag =
    as ||
    (variant === "blockquote"
      ? "blockquote"
      : variant === "list"
        ? "ul"
        : variant === "inlineCode"
          ? "code"
          : variant === "table"
            ? "table"
            : variant === "small"
              ? "small"
              : "p");

  const variants = {
    h1: "scroll-m-20 text-balance text-4xl leading-[1.08] font-semibold tracking-normal text-foreground/95 lg:text-5xl",
    h2: "scroll-m-20 border-b border-border/60 pb-3 text-3xl leading-tight font-semibold tracking-normal text-foreground/95 first:mt-0",
    h3: "scroll-m-20 text-2xl leading-tight font-semibold tracking-normal text-foreground/90",
    h4: "scroll-m-20 text-xl leading-snug font-medium tracking-normal text-foreground/90",
    p: "leading-7 font-normal text-foreground/80 [&:not(:first-child)]:mt-5",
    blockquote:
      "mt-6 rounded-md border border-border/60 bg-background/45 px-5 py-4 text-sm leading-7 font-normal text-foreground/75 italic shadow-sm backdrop-blur-sm",
    list: "my-6 ml-6 list-disc leading-7 text-foreground/80 [&>li]:mt-2",
    inlineCode:
      "relative rounded-md border border-border/60 bg-background/55 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground/90 shadow-sm backdrop-blur-sm",
    lead: "text-xl leading-8 font-normal text-muted-foreground",
    large: "text-lg leading-7 font-medium text-foreground/90",
    medium: "text-base leading-6 font-medium text-foreground/85",
    small: "text-sm leading-5 font-medium text-foreground/80",
    muted: "text-sm leading-5 font-normal text-muted-foreground",
    table:
      "my-6 w-full overflow-hidden rounded-lg border border-border/60 bg-background/45 text-sm shadow-sm backdrop-blur-sm [&_td]:border-border/50 [&_td]:px-4 [&_td]:py-3 [&_td]:text-foreground/75 [&_th]:border-border/50 [&_th]:bg-muted/45 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-medium [&_th]:text-foreground/85 [&_tr]:border-b [&_tr]:border-border/50 [&_tr:last-child]:border-0",
  };

  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
};
