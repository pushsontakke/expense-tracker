import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/redux/data/data";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ExpenseTable() {

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector(
      (state: RootState) => state.api
    );

    useEffect(() => {
      dispatch(fetchData());
    }, [dispatch]);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error}</p>;

    const sortedDates = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Product name</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Cost per Unit</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedDates.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">{item.costperunit}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
            <TableCell className="text-right">
              {new Date(item.date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
