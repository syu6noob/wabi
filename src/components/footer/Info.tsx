"use client";

import CommonDialog from "@/components/common/CommonDialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FaCircleInfo } from "react-icons/fa6";

export default function Info() {
  return (
    <CommonDialog
      icon={<FaCircleInfo className="text-[var(--iconColor)] lg:text-xl" />}
      title="Information"
      tooltipDescription="Information about this app"
      description="The details about this application are written here. "
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this app?</AccordionTrigger>
          <AccordionContent>
            This is the application that shows current time clearly and correctly.
            Differ from the others application, it can display time and date in various designs.
            And also, it can customize notation of time and date as you want.
            Therefore, it can be your only favorite clock on the world.  
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Who runs this app?</AccordionTrigger>
          <AccordionContent>
            It's me! My name is syu6. I'm 18-years-old student living in Japan.
            No corporations or institutions are related to this app.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Why there is no ads?</AccordionTrigger>
          <AccordionContent>
            Because this application is running for not money, but my hobby.
            I like creating something useful to my life.
            One day, I came up to my mind to publish this app, not to keep myself.
            At the moment, there is no plan to place advertisements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Is this application safe?</AccordionTrigger>
          <AccordionContent>
            Of course. Definitely YES.
            In this application, there is no time when you input your private information.
            If you can't make sure, please visit GitHub and check the source codes with experts.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>I want to send feature requests...</AccordionTrigger>
          <AccordionContent>
            I'll welcome you any time! Please contact me from X, Discord, or GitHub.
            Some requests are can't make your wish from some reasons, but I want you to understand that point.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CommonDialog >
  )
}