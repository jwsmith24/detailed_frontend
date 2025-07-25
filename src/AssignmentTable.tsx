import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import type {DutyAssignment} from "@/types/DutyAssignment.ts";

export default function AssignmentTable({assignments} : {assignments : DutyAssignment[] | undefined}) {


    return(
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
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No assignments have been added yet..
                    </TableCell>
                </TableRow>
            ) : (
                assignments.map((assignment, index) => (
                    <TableRow key={assignment.id ?? index}>
                        <TableCell>{assignment.date}</TableCell>
                        <TableCell>{assignment.description}</TableCell>
                        <TableCell>TBD</TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>


    </Table>
    )

}