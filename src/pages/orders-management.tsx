import React, { useState } from "react"; // Ensure useState is imported
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockOrders } from "@/data/mock-orders";
import { Order } from "@/types/order";

export function OrdersManagement() {
  const [ordersData, setOrdersData] = useState<Order[]>(mockOrders.map(o => ({...o}))); // Use state, ensure deep copy for initial state

  const handleCancelOrder = (orderId: string) => {
    const orderIndexInState = ordersData.findIndex(o => o.id === orderId);
    if (orderIndexInState !== -1) {
      const updatedOrders = ordersData.map((order, index) =>
        index === orderIndexInState ? { ...order, status: "Cancelled" as Order['status'] } : order
      );

      // Update the original mockOrders array as well to reflect change if user navigates away and back
      const orderIndexInMock = mockOrders.findIndex(o => o.id === orderId);
      if (orderIndexInMock !== -1) {
        mockOrders[orderIndexInMock].status = "Cancelled";
      }

      setOrdersData(updatedOrders);
      console.log(`Order ${orderId} cancelled.`);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Orders Management
          </Typography>
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
              {ordersData.map((order: Order) => (
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
                    <Typography className="text-xs font-semibold text-blue-gray-600">${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link to={`/dashboard/orders/edit/${order.id}`} className="mr-2">
                      <Button color="orange" size="sm">Edit</Button>
                    </Link>
                    <Link to={`/dashboard/orders/detail/${order.id}`} className="mr-2">
                      <Button color="purple" size="sm">Detail</Button>
                    </Link>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={order.status === "Cancelled" || order.status === "Delivered"}
                    >
                      Cancel
                    </Button>
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
