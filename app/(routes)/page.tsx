
import CardSummary from "./components/CardSummary/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";

export const dataCardSummary = [
  {
    icon: UsersRound,
    total: "12.450",
    average: 15,
    title: "Companies created",
    tooltipText: "See all the companies created"
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total revenue",
    tooltipText: "See all of the summary"
  },
  {
    icon: BookOpenCheck,
    total: "365.5",
    average: 30,
    title: "Bounce rate",
    tooltipText: "See all of the bounce rate"
  }
]

export default function Home() {
  return (
    <div>
     <h2 className="text-2xl mb-4">dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20 ">
        {dataCardSummary.map(({icon, total, average, title, tooltipText}) => (
          <CardSummary
            key={title}
            icon={icon}
            total={total}
            average={average}
            title={title}
            tooltipText={tooltipText}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-x-10 mt-12">
        <LastCustomers/>
        <p> Sales Distributors</p>
      </div>    
    </div>
  )
}
