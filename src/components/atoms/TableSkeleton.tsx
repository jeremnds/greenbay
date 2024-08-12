import { Skeleton } from "@/src/components/atoms/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/atoms/shadcn/table";

export default function TableSkeleton() {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[120px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px]" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px] rounded" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px] rounded" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px] rounded" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px] rounded" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[120px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px] rounded" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[80px] rounded" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
