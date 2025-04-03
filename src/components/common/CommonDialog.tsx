"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";

import CommonTooltip from "@/components/common/CommonTooltip";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent, 
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "../ui/drawer";
import dynamic from "next/dynamic";

function CommonDialog({
  icon,
  title,
  description,
  tooltipDescription,
  children,
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  tooltipDescription: string,
  children: React.ReactNode
  }) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <CommonTooltip text={tooltipDescription}>
          <DialogTrigger
            className="hover:scale-120 duration-200 ease-out"
          >
            {icon}
          </DialogTrigger>
        </CommonTooltip>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button>{icon}</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
            {children}
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }
}

const CommonDialogWrap = dynamic(async () => CommonDialog, { ssr: false });

export default CommonDialogWrap;