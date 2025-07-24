import {useNavigate, useParams} from "react-router-dom";
import {useDutyRoster} from "@/hooks/useDutyRoster.ts";
import {useEffect} from "react";
import {detailTypeLabels} from "@/types/DutyRoster.ts";
import {useDutyAssignments} from "@/hooks/useDutyAssignments.ts";
import {Button} from "@/components/ui/button.tsx";
import type {DutyAssignment} from "@/types/DutyAssignment.ts";
import {useCreateAssignment} from "@/hooks/useCreateAssignment.ts";
import AssignmentTable from "@/AssignmentTable.tsx";

export default function RosterView() {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/rosters")
        }
    }, [id, navigate]);

    const {data: roster, isLoading, error} = useDutyRoster(id);
    const {data: assignments, isLoading: assignmentsLoading, error: assignmentsError } = useDutyAssignments(roster);

    const assignmentMutation = useCreateAssignment(roster?.id);



    if (isLoading || assignmentsLoading) return <p>Loading roster...</p>;
    if (error || assignmentsError) return <p>Error: {(error as Error).message}</p>;
    if (!roster) return <p>Roster not found</p>;


    const handleClickNewAssignment = () => {
        const mock: DutyAssignment = {
            date: new Date("2025-07-24"),
            description: "",
        }

        assignmentMutation.mutate(mock);

    }

    return (
        <div className={"flex flex-col w-screen h-screen"}>
            <div className={"grid bg-gray-900 m-4 p-4 rounded-2xl max-w-1/5 max-h-1/4"}>
                <h1>Upcoming Duties</h1>
                <p>{detailTypeLabels[roster.detailType]}</p>
                <p>Viewing roster with id: {roster.id}</p>
                <Button onClick={handleClickNewAssignment}>Add New Duty</Button>
            </div>

            <div className={"grid bg-gray-900 m-4 p-4 rounded-2xl"}>
                <AssignmentTable assignments={assignments}/>
            </div>
        </div>
    )
}