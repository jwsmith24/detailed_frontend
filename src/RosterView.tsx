import { useNavigate, useParams } from "react-router-dom";
import { useDutyRoster } from "@/hooks/useDutyRoster.ts";
import { useEffect, useState } from "react";
import { detailTypeLabels } from "@/types/DutyRoster.ts";
import { useDutyAssignments } from "@/hooks/useDutyAssignments.ts";
import { Button } from "@/components/ui/button.tsx";
import AssignmentTable from "@/AssignmentTable.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import NewAssignmentForm from "@/NewAssignmentForm.tsx";

export default function RosterView() {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/rosters");
    }
  }, [id, navigate]);

  const { data: roster, isLoading, error } = useDutyRoster(id);
  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useDutyAssignments(roster);

  if (isLoading || assignmentsLoading) return <p>Loading roster...</p>;
  if (error || assignmentsError)
    return <p>Error: {(error as Error).message}</p>;
  if (!roster) return <p>Roster not found</p>;

  return (
    <div className={"flex flex-col w-screen h-screen"}>
      <div
        className={"grid bg-gray-900 m-4 p-4 rounded-2xl max-w-1/5 max-h-1/4"}
      >
        <h1>Upcoming Duties</h1>
        <p>{detailTypeLabels[roster.detailType]}</p>
        <p>Viewing roster with id: {roster.id}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild={true}>
          <Button>Add New Duty</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <NewAssignmentForm rosterId={roster.id!} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className={"grid bg-gray-900 m-4 p-4 rounded-2xl"}>
        <AssignmentTable assignments={assignments} />
      </div>
    </div>
  );
}
