"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { SidebarItem } from "../SidebarItem"

import { dataGeneralSidebar, dataSupportSidebar, dataToolSidebar } from "./SidebarRoutes.data"

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
        <div>

            <div className="p-2 md:p-6">
              <p className="text-slate-500 mb-2">General</p>
              {dataGeneralSidebar.map((item) => (
                <SidebarItem key={item.label} item={item}/>
                ))}
            </div>

          <Separator />

            <div className="p-2 md:p-6">
              <p className="text-slate-500 mb-2" >Tools</p>
              {dataToolSidebar.map((item) => (
                      <SidebarItem key={item.label} item={item}/>
              ))}
            </div>

          <Separator />

            <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">Support</p>
                {dataSupportSidebar.map((item) => (
                      <SidebarItem key={item.label} item={item}/>
                ))} 
            </div>
        </div>

        <div>
          <div className="text-center p-6">
                <Button variant={"outline"} className="w-full">
                  Upgrade Plan
                  </Button>
          </div>
          <Separator />

          <footer className="text-center p-3 mt-3">
                Todos los derechos reservados | 2025
            </footer>
        </div>
    </div>
  )
}


