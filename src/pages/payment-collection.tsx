import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockPayments } from "@/data/mock-payments"; // Adjusted import path
import { Payment } from "@/types/payment"; // Adjusted import path

export function PaymentCollection() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Payment Collection
          </Typography>
          {/* Basic link, actual add page not yet implemented */}
          <Link to="/dashboard/payments/add">
            <Button color="blue" size="sm">Add New Payment</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Payment ID", "Order ID", "Payment Date", "Amount", "Method", "Status", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment: Payment) => ( // Explicitly type payment
                <tr key={payment.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{payment.id}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{payment.orderId}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{payment.paymentDate}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">${payment.amount.toFixed(2)}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{payment.paymentMethod}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{payment.status}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {/* Basic links, actual edit/detail pages not yet implemented */}
                    <Link to={`/dashboard/payments/edit/${payment.id}`} className="mr-2">
                      <Button color="orange" size="sm">Edit</Button>
                    </Link>
                    <Link to={`/dashboard/payments/detail/${payment.id}`}>
                      <Button color="purple" size="sm">Detail</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PaymentCollection;
