import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/mockDb";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function AdminPayments() {
  const orders = db.getOrders();

  const handleExport = () => {
    // Mock export logic
    const headers = ["Order ID", "Buyer", "Amount", "Method", "Date", "Status"];
    const rows = orders.map(o => [o.id, o.userName, o.amount, o.paymentMethod, o.date, o.status]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    
    // Create a fake download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments_export.csv';
    a.click();
    toast.success("Payments data exported successfully");
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Payments & Transactions</h1>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Export to CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">TXN-{order.id.toUpperCase()}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell className="font-bold text-green-600">${order.amount}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
