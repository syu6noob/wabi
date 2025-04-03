import Logo from "@/components/header/Logo";
import Preference from "@/components/header/Preference";
// import Guide from "@/components/header/Guide";?

export default function Header() {
  return (
    <header className="flex justify-between items-start md:items-center">
      <div className="flex gap-2 items-baseline">
        <Logo />
      </div>
      <div className="flex gap-4 lg:gap-5">
        {/* <Guide /> */}
        <Preference />
      </div>
    </header>
  )
}