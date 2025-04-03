"use client";

import { FaQuestion } from "react-icons/fa6";
import CommonDialog from "@/components/common/CommonDialog";

export default function Guide() {
  return (
    <CommonDialog
      icon={<FaQuestion className="text-[var(--iconColor)] lg:text-xl" />}
      title="How to use this app?"
      tooltipDescription="How to use this app?"
      description="I'll become happy if you share with your friends this application!"
    >
      <></>
    </CommonDialog >
  )
}