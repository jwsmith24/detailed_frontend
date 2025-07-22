import {useDutyRosters} from "./hooks/useDutyRosters.ts";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import './index.css';
import {detailTypeLabels, type DutyRoster} from "@/types/DutyRoster.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function RosterList() {

  const {data, isLoading, error} = useDutyRosters();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;



  const handleClickSelectRoster = (roster:DutyRoster) => {

    if (roster) {
      navigate(`/rosters/${roster.id}`);
    }
  }

  return (
    <div className={"grid place-items-center w-screen"}>

      <div>
        <p className={"mb-2 text-3xl font-bold text-center"}>Active Rosters</p>

        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>{data!.map((roster) => (
          <Card>
            <CardHeader>
              <CardTitle>{detailTypeLabels[roster.detailType]} </CardTitle>
              <CardDescription>{roster.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className={"mt-4"} onClick={() => handleClickSelectRoster(roster)}>Select Roster</Button>
            </CardContent>
          </Card>
        ))}</div>


      </div>
      
    </div>

  )
}