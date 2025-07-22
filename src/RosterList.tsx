import {useDutyRosters} from "./hooks/useDutyRosters.ts";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './index.css';
import type {DutyRoster} from "@/types/DutyRoster.ts";

export default function RosterList() {

    const [selectedRoster, setSelectedRoster] = useState<DutyRoster>();

    const { data, isLoading, error } = useDutyRosters();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;

    const handleClickRoster = (roster: DutyRoster) => {
        setSelectedRoster(roster);
        console.log("SELECTED: ", roster);
    }

    const handleClickSelectRoster = () => {

        if (selectedRoster) {
            navigate(`/rosters/${selectedRoster.id}`);
        }
    }

    return (
        <div>
            <p className={"mb-2 text-2xl font-bold"}>Active Rosters</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Duty</TableHead>
                        <TableHead>Assigned To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data!.map((roster) => (
                        <TableRow key={roster.id} onClick={() => handleClickRoster(roster)}>
                            <TableCell className={"text-left"}>{roster.description}</TableCell>
                            <TableCell className={"text-center"}>TBD</TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>
            <Button className={"mt-4"} onClick={handleClickSelectRoster}>Select Roster</Button>
        </div>

    )
}