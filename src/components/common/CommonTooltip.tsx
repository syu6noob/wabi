import {
  Tooltip as TooltipUi,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CommonTooltip({
  children,
  text
}: {
  children: React.ReactNode,
  text: string
}) {
  return (
    <TooltipProvider>
      <TooltipUi>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipUi>
    </TooltipProvider>
  )
}