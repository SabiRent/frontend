import type { ReactElement, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipSide = "top" | "right" | "bottom" | "left";

interface CustomTooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: TooltipSide;
}

const CustomTooltip = ({
  content,
  children,
  side = "top",
}: CustomTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
