"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo } from "react";

type Preference = {
  theme: {
    type: "light" | "dark" | "custom";
  };
  fonts: {
    default: {
      fontFamily: string,
      fontSource: string[],
      fontWeight: number[],
    },
    clock: {
      fontFamily: string,
      fontSource: string[],
      fontWeight: number[],
    } | false,
  };
  timeFormat: {
    separatingLetter: ':' | '-' | '',
    displaySeconds: boolean,
    isBased24Hours: boolean,
    enableHoursZeroPadding: boolean,
    enableMinutesZeroPadding: boolean,
    enableSecondsZeroPadding: boolean,
  };
  dateFormat: {
    order: 'Date-Month-Year' | 'Year-Month-Date' | 'Month-Date-Year',
    separatingLetter: '/' | '.' | '-' | ' ',

    enableZeroPadding: boolean,

    monthType: 'number' | 'english' | 'english_shortage',
    dayType: 'english' | 'english_shortage' | 'japanese' | 'japanese_shortage',
  }
};

const storageKey = {
  theme: "wabi-theme",
  fonts: "wabi-fonts",
  timeFormat: "wabi-timeFormat",
  dateFormat: "wabi-dateFormat",
} as const;

type LocalStorageValue = {
  _values: string;
};

const defaultPreference: Preference = {
  theme: {
    type: "dark",
  },
  fonts: {
    default: {
      fontFamily: "'Roboto', sans-serif",
      fontSource: [
        "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');",
        "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');",
        "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');",
      ],
      fontWeight: [400, 500, 700],
    },
    clock: false,
  },
  timeFormat: {
    separatingLetter: ':',
    displaySeconds: true,
    isBased24Hours: true,
    enableHoursZeroPadding: true,
    enableMinutesZeroPadding: true,
    enableSecondsZeroPadding: true
  },
  dateFormat: {
    order: "Date-Month-Year",
    separatingLetter: '/',

    enableZeroPadding: true,

    monthType: 'number',
    dayType: 'english',
  }
};

export default function usePreference<T extends keyof Preference>(category: T) {
  const [localStorage, saveLocalStorage] = useLocalStorage<LocalStorageValue>(
    storageKey[category],
    { _values: JSON.stringify(defaultPreference[category]) }
  );

  // JSONパースに失敗した場合はデフォルト値を返す
  const parsedValues = useMemo<Preference[T]>(() => {
    try {
      return JSON.parse(localStorage._values) as Preference[T];
    } catch {
      console.warn(`Failed to parse localStorage for ${category}, using default.`);
      return defaultPreference[category];
    }
  }, [localStorage]);

  const setValue = <K extends keyof Preference[T]>(key: K, value: Preference[T][K]) => {
    saveLocalStorage((prev) => {
      try {
        const tempValues = JSON.parse(prev._values || "{}") as Partial<Preference[T]>;
        return { _values: JSON.stringify({ ...defaultPreference[category], ...tempValues, [key]: value }) };
      } catch {
        console.warn(`Failed to save value for ${category}.${String(key)}, resetting to default.`);
        return { _values: JSON.stringify(defaultPreference[category]) };
      }
    });
  };

  const getValue = <K extends keyof Preference[T]>(key: K): Preference[T][K] => {
    if (key in parsedValues) {
      return parsedValues[key];
    }
    setValue(key, defaultPreference[category][key]);
    return defaultPreference[category][key];
  };

  return [getValue, setValue] as const;
}
