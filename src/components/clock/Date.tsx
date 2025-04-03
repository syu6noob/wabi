import usePreference from "@/lib/preference/usePreference";
import type { DateType } from "./DateType";
import fillZero from "@/lib/fillZero";
import { cn } from "@/lib/utils";

export default function Date({
  date,
  isZoomed
}: {
  date: DateType,
  isZoomed: boolean
}) {
  const [preference] = usePreference('dateFormat');

  const monthName = {
    'english': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    'english_shortage': [
      'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
      'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ]
  };

  const dayName = {
    'english': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'english_shortage': ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    'japanese': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    'japanese_shortage': ['日', '月', '火', '水', '木', '金', '土'],
  };

  const formatDate = (dateObject: DateType) => {
    const order = preference('order');
    const separator = preference('separatingLetter');

    const year = `${dateObject.year}`;

    let month = "";
    const lang = preference('monthType');
    if (lang !== 'number') {
      month = monthName[lang][dateObject.month - 1];
    } else {
      month = `${preference('enableZeroPadding') ? fillZero(dateObject.month, 2) : dateObject.month}`;
    }

    const date = `${preference('enableZeroPadding') ? fillZero(dateObject.date, 2) : dateObject.date}`;

    if (order === 'Date-Month-Year') {
      return `${date}${separator}${month}${separator}${year}`;
    } else if (order === 'Year-Month-Date') {
      return `${year}${separator}${month}${separator}${date}`;
    } else if (order === 'Month-Date-Year') {
      return `${month}${separator}${date}${separator}${year}`;
    }
  };

  const formatDay = (dateObject: DateType) => {
    const lang = preference('dayType');
    return dayName[lang][dateObject.day - 1];
  };

  return (
    <span className={cn(
      "text-[var(--clockDateColor)] duration-300",
      isZoomed ? "text-date-zoomed" : "text-lg md:text-xl lg:text-3xl"
    )} >
      {formatDate(date)} {formatDay(date)}
    </span>
  );
}
