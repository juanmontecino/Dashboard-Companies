import { NavBar } from "@/components/NavBar"

export default function LayoutDashboard( {children}: {children: React.ReactElement}) {
  return (
    <div className=" flex w-full h-full">
        <div className="hidden xl:block w-80 h-full xl:fixed">
            sidebar
        </div>

        <div className="w-full xl:ml-80">
            <NavBar/>
            <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                {children}
            </div>
        </div>

    </div>
  )
}
