import {useNavigate, useParams} from "react-router-dom";
import {useDutyRoster} from "@/hooks/useDutyRoster.ts";
import {useEffect} from "react";
import {detailTypeLabels} from "@/types/DutyRoster.ts";
import {useDutyAssignments} from "@/hooks/useDutyAssignments.ts";
import {Button} from "@/components/ui/button.tsx";
import type {DutyAssignment} from "@/types/DutyAssignment.ts";
import {useCreateAssignment} from "@/hooks/useCreateAssignment.ts";
import AssignmentTable from "@/components/ui/AssignmentTable.tsx";

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
        <div className={"grid w-screen h-screen p-6 items-start justify-start"}>
            <div className={"grid gap-4 bg-gray-900 p-4 rounded-2xl"}>
                <h1>Upcoming Duties</h1>
                <p>{detailTypeLabels[roster.detailType]}</p>
                <p>Viewing roster with id: {roster.id}</p>
                <Button onClick={handleClickNewAssignment}>Add New Duty</Button>
            </div>

            <div>
                {assignments?.length === 0 &&
                  (<div>
                      <p>This roster doesn't have any assignments yet. You should add some</p>

                  </div>)
                }

                <AssignmentTable assignments={assignments}/>
            </div>
        </div>
    )
}