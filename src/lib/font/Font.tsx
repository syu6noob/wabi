"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import usePreference from "../preference/usePreference";

function Font() {
  const [preference] = usePreference('fonts');
  const [variables, setVariables] = useState("");

  useEffect(() => {
    const fontDefault = preference('default');
    const fontClock = preference('clock');
    
    let variablesTemp = fontDefault.fontSource.map((source) => source + "\n").join("");

    variablesTemp += `:root {
        --font-default: ${fontDefault.fontFamily};
        --font-weight-normal: ${fontDefault.fontWeight[0]};
        --font-weight-medium: ${fontDefault.fontWeight[1]};
        --font-weight-bold: ${fontDefault.fontWeight[2]};
      }
    `;

    if (fontClock === false) {
      variablesTemp += `:root {
        --font-clock: ${fontDefault.fontFamily}
      }`;
    } else {
      variablesTemp += fontClock.fontSource.map((source) => source + "\n").join("");
      variablesTemp += `:root {
        --font-clock: ${fontClock.fontFamily}
      }`;
    }

    setVariables(variablesTemp);
  }, [preference])

  return (
    <style>
      {variables}
    </style>
  )
}

const Theme = dynamic(async () => Font, { ssr: false });

export default Theme;