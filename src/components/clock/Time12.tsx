"use client";

import usePreference from "@/lib/preference/usePreference";
import type { TimeType } from "./Time";

import fillZero from "@/lib/fillZero";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Time24({
  time,
  isZoomed
}: {
  time: TimeType,
  isZoomed: boolean
}) {
  const [preference, setPreference] = usePreference('timeFormat');

  const defaultTimeClassName = "text-7xl md:text-8xl lg:text-9xl";
  const zoomedTimeClassName = "text-zoomed";

  return (
    <div className={cn(
      "flex flex-col-reverse md:flex-row items-baseline gap-0 md:gap-2 overflow-y-hidden",
    )}>
      <div className={
        cn(
          "leading-none duration-300",
          isZoomed ? zoomedTimeClassName : defaultTimeClassName
        )}>
        <span className="text-[var(--clockHourColor)]">
          {
            preference('enableHoursZeroPadding')
            ? fillZero(time.hour >= 12 ? time.hour - 12 : time.hour, 2)
            : (time.hour >= 12 ? time.hour - 12 : time.hour)
          }
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
      <div className={
        cn(
          "relative flex pl-1 md:p2-0 flex-col text-[var(--clockHourColor)] duration-300",
          isZoomed ? "text-small-zoomed" : "text-3xl md:text-5xl"
        )}>
        <span className={
          time.hour >= 12
            ? "relative"
            : "hidden absolute top-full"
        }>
          PM
        </span>
        <span className={
          time.hour < 12
            ? "relative"
            : "hidden absolute top-full"
        }>
          AM
        </span>
      </div>
    </div>
  )
}