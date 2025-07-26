import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import type { DutyAssignment } from "@/types/DutyAssignment.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import AssignmentForm from "@/AssignmentForm.tsx";
import { useState } from "react";

export default function AssignmentTable({
  rosterId,
  assignments,
}: {
  assignments: DutyAssignment[] | undefined;
  rosterId: number | undefined;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!assignments || assignments.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground"
            >
              No assignments have been added yet..
            </TableCell>
          </TableRow>
        ) : (
          assignments.map((assignment, index) => {
            const formattedDate = new Date(assignment.date).toDateString();
            return (
              <Dialog
                open={open}
                onOpenChange={setOpen}
                key={assignment.id ?? index}
              >
                <DialogTrigger asChild={true}>
                  <TableRow>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{assignment.description}</TableCell>
                    <TableCell>TBD</TableCell>
                  </TableRow>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Assignment</DialogTitle>
                    <AssignmentForm
                      rosterId={rosterId!}
                      setOpen={setOpen}
                      type={"new"}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
