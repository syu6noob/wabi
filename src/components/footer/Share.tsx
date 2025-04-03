"use client";

import CommonDialog from "@/components/common/CommonDialog";
import { FaShareFromSquare, FaInstagram, FaXTwitter, FaFacebook, FaCopy } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";

export default function Share() {
  const copyToClipboardURL = async () => {
    await global.navigator.clipboard.writeText("https://wabi.m0ti.com");
  };

  return (
    <CommonDialog
      icon={<FaShareFromSquare className="text-[var(--iconColor)] lg:text-xl" />}
      title="Share"
      tooltipDescription="Please share this app!"
      description="I'll become happy if you share with your friends this application!"
    >
      <div className="flex flex-col mt-2 gap-4">
        <div className="flex gap-4 items-stretch">
          <Input type="url" value="https://wabi.m0ti.com/" className="grow" readOnly />
          <Button onClick={() => copyToClipboardURL()}>
            <FaCopy />
            Copy
          </Button>
        </div>
      </div>
    </CommonDialog >
  )
}