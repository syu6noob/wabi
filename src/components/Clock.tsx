'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

import { TimeType } from './clock/Time';
import { DateType } from './clock/Date';

import usePreference from "@/lib/preference/usePreference";

import Time24 from '@/components/clock/Time24';
import Time12 from '@/components/clock/Time12';
import DateComponent from '@/components/clock/Date';

function Time() {

  // clock architecture

  const [preference, setPreference] = usePreference('timeFormat');

  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [countsFromLastUpdated, setCountsFromLastUpdated] = useState(0);
  const [time, setTime] = useState<TimeType>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [date, setDate] = useState<DateType>({
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  });
  const [updateInterval, setUpdateInterval] = useState(1000);

  const initTime = () => {
    const dateObject = new Date();
    let newUpdateInterval = 1000 - dateObject.getMilliseconds();
    setTime({
      hour: dateObject.getHours(),
      minute: dateObject.getMinutes(),
      second: dateObject.getSeconds()
    })
    updateDate();

    setUpdateInterval(newUpdateInterval);
    setIsInitial(false);
    setCountsFromLastUpdated(0);
    
    // console.debug('Set up the time: ' + dateObject);
    // console.debug(`updateInterval: ${(1000 - dateObject.getMilliseconds())}`)
  }

  const updateTime = () => {
    setUpdateInterval(1000);
    setTime(time => {
      let newHour = time.hour;
      let newMinute = time.minute;
      let newSecond = time.second + 1;
      if (newSecond === 60) {
        newSecond = 0;
        newMinute++;
        if (newMinute === 60) {
          newMinute = 0;
          newHour++;
          if (newHour === 23) {
            newHour = 0;
            updateDate();
          }
        }
      }
      return {
        init: false,
        hour: newHour,
        minute: newMinute,
        second: newSecond
      }
    });
    // console.debug('Update the time');
    // console.debug(time);
  }

  const updateDate = () => {
    const dateObject = new Date();
    setDate({
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      date: dateObject.getDate(),
      day: dateObject.getDay(),
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInitial && countsFromLastUpdated < 10) {
        updateTime();
        setCountsFromLastUpdated(countsFromLastUpdated => countsFromLastUpdated + 1);
      } else {
        initTime();
      }
    }, updateInterval);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    initTime();
  }, [])

  // design

  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomClock = () => {
    setIsZoomed(!isZoomed)
    console.log('aaa');
  }

  return (
    <main
      className="p-8 absolute top-1/2 left-1/2 flex -translate-1/2 flex-col justify-center items-center gap-2 md:gap-4"
      onClick={handleZoomClock}  
    >
      {
        isInitial
        ? <></>
        : <>
          {
            preference('isBased24Hours')
            ? <Time24 time={time} isZoomed={isZoomed} />
            : <Time12 time={time} isZoomed={isZoomed} />
          }
          <DateComponent date={date} isZoomed={isZoomed} />
        </>
      }      
    </main>
  )
}

const TimeWrap = dynamic(async () => Time, { ssr: false });

export default TimeWrap;