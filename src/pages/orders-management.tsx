import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockOrders } from "@/data/mock-orders"; // Adjusted import path
import { Order } from "@/types/order"; // Adjusted import path

export function OrdersManagement() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Orders Management
          </Typography>
          {/* Basic link, actual add page not yet implemented */}
          <Link to="/dashboard/orders/add">
            <Button color="blue" size="sm">Add New Order</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Order ID", "Customer Name", "Order Date", "Status", "Total Amount", "Actions"].map((el) => (
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
              {mockOrders.map((order: Order) => ( // Explicitly type order
                <tr key={order.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{order.id}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{order.customerName}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{order.orderDate}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{order.status}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">${order.totalAmount.toFixed(2)}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {/* Basic links, actual edit/detail pages not yet implemented */}
                    <Link to={`/dashboard/orders/edit/${order.id}`} className="mr-2">
                      <Button color="orange" size="sm">Edit</Button>
                    </Link>
                    <Link to={`/dashboard/orders/detail/${order.id}`}>
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

export default OrdersManagement;
