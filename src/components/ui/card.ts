import { defineComponent, h } from "vue"
import { cn } from "@/lib/utils"

type Attrs = Record<string, unknown> & { class?: unknown }

function withBaseClass(
  baseClass: string,
  tag = "div",
  displayName?: string,
) {
  return defineComponent({
    name: displayName ?? tag,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      const normalizedAttrs = attrs as Attrs

      return () =>
        h(
          tag,
          {
            ...normalizedAttrs,
            class: cn(baseClass, normalizedAttrs.class as string | undefined),
          },
          slots.default?.(),
        )
    },
  })
}

export const Card = withBaseClass(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  "div",
  "Card",
)

export const CardHeader = withBaseClass(
  "flex flex-col space-y-1.5 p-6",
  "div",
  "CardHeader",
)

export const CardTitle = withBaseClass(
  "text-2xl font-semibold leading-none tracking-tight",
  "h3",
  "CardTitle",
)

export const CardDescription = withBaseClass(
  "text-sm text-muted-foreground",
  "p",
  "CardDescription",
)

export const CardContent = withBaseClass(
  "p-6 pt-0",
  "div",
  "CardContent",
)

export const CardFooter = withBaseClass(
  "flex items-center p-6 pt-0",
  "div",
  "CardFooter",
)
