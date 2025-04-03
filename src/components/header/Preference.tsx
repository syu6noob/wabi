"use client";

import dynamic from "next/dynamic";

import { FaGear } from "react-icons/fa6";
import CommonDialog from "@/components/common/CommonDialog";

import usePreference from "@/lib/preference/usePreference";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type PreferenceItemType = {
  type: 'boolean' | string[]
  name: string,
  description: string,
  value: any,
  setValue: (value: any) => void
}

type PreferenceItemsCategoryType = {
  name: string,
  children: PreferenceItemType[]
};

function Preference() {
  const [timeFormatPreference, setTimeFormatPreference] = usePreference('timeFormat');
  const [dateFormatPreference, setDateFormatPreference] = usePreference('dateFormat');
  const [themePreference, setThemePreference] = usePreference('theme');

  const preferenceItems: PreferenceItemsCategoryType[] = [
    {
      name: 'Time Format',
      children: [
        {
          type: 'boolean',
          name: 'Display seconds',
          description: 'Display seconds in addition to hours and minutes',
          value: timeFormatPreference('displaySeconds'),
          setValue: (value: boolean) => {
            console.debug(value);
            setTimeFormatPreference('displaySeconds', value);
          } 
        },
        {
          type: 'boolean',
          name: 'Display time based on 24 hours',
          description: 'Display time like "15:31" not "3:31 a.m."',
          value: timeFormatPreference('isBased24Hours'),
          setValue: (value: boolean) => setTimeFormatPreference('isBased24Hours', value)
        },
        {
          type: 'boolean',
          name: 'Enable Hours Zero Padding',
          description: 'Display hours like "09:24" not "9:24"',
          value: timeFormatPreference('enableHoursZeroPadding'),
          setValue: (value: boolean) => setTimeFormatPreference('enableHoursZeroPadding', value)
        },
        {
          type: 'boolean',
          name: 'Enable Minutes Zero Padding',
          description: 'Display minutes like "11:08" not "11:8"',
          value: timeFormatPreference('enableMinutesZeroPadding'),
          setValue: (value: boolean) => setTimeFormatPreference('enableMinutesZeroPadding', value)
        },
        {
          type: 'boolean',
          name: 'Enable Seconds Zero Padding',
          description: 'If Display seconds is enabled, display seconds like "11:24:08" not "11:24:08"',
          value: timeFormatPreference('enableSecondsZeroPadding'),
          setValue: (value: boolean) => setTimeFormatPreference('enableSecondsZeroPadding', value)
        },
        {
          type: [':', '-', 'none'],
          name: 'Separating Letter',
          description: 'The separator between hours and minutes, and minutes and seconds',
          value: timeFormatPreference('separatingLetter'),
          setValue: (value: ':' | '-' | 'none') => setTimeFormatPreference('separatingLetter', value === 'none' ? '' : value)
        }
      ]
    },
    {
      name: 'Date Format',
      children: [
        {
          type: ['Date-Month-Year', 'Year-Month-Date', 'Month-Date-Year'],
          name: 'Order',
          description: 'Date order',
          value: dateFormatPreference('order'),
          setValue: (value: 'Date-Month-Year' | 'Year-Month-Date' | 'Month-Date-Year') => {
            setDateFormatPreference('order', value);
          }
        },
        {
          type: ['/', '.', '-', 'space'],
          name: 'Separating letter',
          description: 'Separating Letter between years and months, date',
          value: dateFormatPreference('separatingLetter'),
          setValue: (value: '/' | '.' | '-' | 'space') => {
            setDateFormatPreference('separatingLetter', value === 'space' ? ' ' : value)
          }
        },
        {
          type: 'boolean',
          name: 'Enable zero padding',
          description: 'Display date like "2025/04/01" not "2024/4/1"',
          value: dateFormatPreference('enableZeroPadding'),
          setValue: (value: boolean) => setDateFormatPreference('enableZeroPadding', value)
        },
        {
          type: ['Number', 'English', 'English Shortage'],
          name: 'Month type',
          description: 'Select how to display months.',
          value: dateFormatPreference('monthType'),
          setValue: (value: 'Number' | 'English' | 'English Shortage') => {
            switch (value) {
              case 'Number':
                setDateFormatPreference('monthType', 'number')
                break;
              case 'English':
                setDateFormatPreference('monthType', 'english')
                break;
              case 'English Shortage':
                setDateFormatPreference('monthType', 'english_shortage')
                break;
            }
          }
        },
        {
          type: ['English', 'English Shortage', 'Japanese', 'Japanese Shortage'],
          name: 'Day type',
          description: 'Select how to display dates.',
          value: dateFormatPreference('dayType'),
          setValue: (value: 'English' | 'English Shortage' | 'Japanese' | 'Japanese Shortage') => {
            switch (value) {
              case 'English':
                setDateFormatPreference('dayType', 'english')
                break;
              case 'English Shortage':
                setDateFormatPreference('dayType', 'english_shortage')
                break;
              case 'Japanese':
                setDateFormatPreference('dayType', 'japanese')
                break;
              case 'Japanese Shortage':
                setDateFormatPreference('dayType', 'japanese_shortage')
                break;
            }
          }
        }
      ]
    },
    {
      name: 'Appearance',
      children: [
        {
          type: ['light', 'dark'],
          name: 'Theme',
          description: 'Switch colors',
          value: themePreference('type'),
          setValue: (value: 'light' | 'dark') => setThemePreference('type', value)
        }
      ]
    }
  ]

  return (
    <CommonDialog
      icon={<FaGear className="text-[var(--iconColor)] lg:text-xl" />}
      title="Preference"
      description="Customize the appearance as you like! The customization is automatically saved when you change."
      tooltipDescription="Preference"
    >
      <Accordion type="multiple">
      {
        Object.assign(preferenceItems).map((category: PreferenceItemsCategoryType, i: number) => {
          return (
            <AccordionItem value={`${i}`} key={i}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {
                  Object.assign(category.children).map((item: PreferenceItemType, j: number) => {
                    if (item.type === 'boolean') {
                      return (
                        <div className="flex justify-around items-center gap-x-2" key={j}>
                          <div className="flex grow flex-col gap-1">
                            <label
                              htmlFor="display seconds"
                              className="grow text-lg text-[var(--dialogDescriptionColor)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.name}
                            </label>
                            <span className="text-xs">
                              {item.description ?? ''}
                            </span>
                          </div>
                          <Switch checked={item.value} onCheckedChange={(value: boolean) => item.setValue(value)} />
                        </div>
                      )
                    } else {
                      return (
                        <div className="flex justify-around items-center gap-x-2" key={j}>
                          <div className="flex grow flex-col gap-1">
                            <label
                              htmlFor="display seconds"
                              className="grow text-lg text-[var(--dialogDescriptionColor)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.name}
                            </label>
                            <span className="text-xs">
                              {item.description ?? ''}
                            </span>
                          </div>
                          <Select value={item.value} onValueChange={(value) => item.setValue(value)} defaultValue={item.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {item.type.map((item, k) => {
                                return <SelectItem value={item} key={k}>{item}</SelectItem>
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    }
                    
                  })
                }
              </AccordionContent>
            </AccordionItem>
          )
        })
      }
      </Accordion>
    </CommonDialog>
  )
}

const PreferenceWrap = dynamic(async () => Preference, { ssr: false });

export default PreferenceWrap;