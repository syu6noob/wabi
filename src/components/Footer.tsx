import { FaGithub } from "react-icons/fa6";
import CommonTooltip from "@/components/common/CommonTooltip";
import Share from "@/components/footer/Share";
import Info from "@/components/footer/Info";

export default function Footer() {
  return (
    <footer className="flex mt-auto justify-between">
      <div className="flex gap-4 lg:gap-6 items-center">
        <CommonTooltip text="Visit GitHub Repository">
          <a
            className="p-0.5 hover:scale-120 duration-200 ease-out"
            href="https://www.github.com/syu6noob/wabi/"
            target="_blank"
          >
            <FaGithub className="text-[var(--iconColor)] lg:text-xl" />
          </a>
        </CommonTooltip>
      </div>
      <div className="flex gap-4 lg:gap-6 items-center">
        <Share />
        <Info />
      </div>
    </footer>
  )
} 