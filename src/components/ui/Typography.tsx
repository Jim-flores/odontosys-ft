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
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
    inlineCode:
      "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    lead: "text-muted-foreground text-xl",
    large: "text-lg font-semibold",
    medium: "text-base font-semibold",
    small: "text-sm leading-none font-medium",
    muted: "text-muted-foreground text-sm",
    table:
      "my-6 w-full overflow-y-auto border-collapse border [&_th]:border [&_td]:border [&_th]:px-4 [&_th]:py-2 [&_td]:px-4 [&_td]:py-2 [&_th]:text-left [&_th]:font-bold [&_tr:nth-child(even)]:bg-muted",
  };

  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
};
