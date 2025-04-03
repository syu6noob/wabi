"use client";

import usePreference from "@/lib/preference/usePreference";
import type { TimeType } from "./TimeType.js";

import fillZero from "@/lib/fillZero";
import { cn } from "@/lib/utils";

export default function Time24({
  time,
  isZoomed
}: {
  time: TimeType,
  isZoomed: boolean
}) {
  const [preference] = usePreference('timeFormat');

  const defaultTimeClassName = "text-7xl md:text-8xl lg:text-9xl";
  const zoomedTimeClassName = "text-zoomed";
  
  return (
    <div className={cn(
      "leading-none duration-300",
      isZoomed ? zoomedTimeClassName : defaultTimeClassName
    )}>
      <span className="text-[var(--clockHourColor)]">
        {preference('enableHoursZeroPadding') ? fillZero(time.hour, 2) : time.hour}
      </span>
      <span className="text-[var(--clockDoubleCronColor)]">{preference('separatingLetter')}</span>
      <span className="text-[var(--clockMinuteColor)]">
        {preference('enableMinutesZeroPadding') ? fillZero(time.minute, 2) : time.minute}
      </span>
      {
        preference('displaySeconds')
        ? <>
            <span className="text-[var(--clockDoubleCronColor)]">{preference('separatingLetter')}</span>
            <span className="text-[var(--clockSecondColor)]">
              {preference('enableSecondsZeroPadding') ? fillZero(time.second, 2) : time.second}
            </span>
          </>
        : <></>
      }
    </div>
  )
}