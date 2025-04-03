"use client";

import { useEffect, useState } from "react";

import usePreference from "@/lib/preference/usePreference";

import darkVariables from "@/theme/dark";
import lightVariables from "@/theme/light";
import dynamic from "next/dynamic";

function Theme() {
  const [preference] = usePreference('theme');
  const [variables, setVariables] = useState(darkVariables);

  const formatVariables = (variables: {
    [key in string]: string
  }) => {
    let style = ":root {"
    for (const [key, value] of Object.entries(variables)) {
      style += `--${key}: ${value};`;
    }
    style += "}"
    return style;
  }

  useEffect(() => {
    const theme = preference('type');
    if (theme === 'light') {
      setVariables(lightVariables);
    } else if (theme === 'dark') {
      setVariables(darkVariables);
    }
  }, [preference])

  return (
    <>
      <style>
        {formatVariables(variables)}
      </style>
      <meta name="theme-color" content={variables.themeColor} ></meta>
    </>
  );
}

// To avoid the error: Error: useLocalStorage is a client-only hook
const ThemeWrap = dynamic(async () => Theme, { ssr: false });

export default ThemeWrap;