import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockOrders } from '@/data/mock-orders'; // To find the order
import { Order } from '@/types/order';

export function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderToView = mockOrders.find(o => o.id === orderId);
    if (orderToView) {
      setOrder(orderToView);
    } else {
      // Handle order not found
      // Potentially navigate back or show a "Not Found" message
       setOrder(null); // Explicitly set to null if not found
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12 items-center">
        <Typography variant="h4" color="blue-gray">Order Not Found</Typography>
        <Link to="/dashboard/orders-management">
          <Button color="blue">Back to Orders List</Button>
        </Link>
      </div>
    );
  }

  const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Order Details - {order.id}
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-4">
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Order ID:</Typography>
            <Typography>{order.id}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Customer Name:</Typography>
            <Typography>{order.customerName}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Order Date:</Typography>
            <Typography>{order.orderDate}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Status:</Typography>
            <Typography>{order.status}</Typography>
          </div>

          <div className="mt-6">
            <Typography variant="h6" className="font-bold text-blue-gray-700 mb-2">Order Items:</Typography>
            {order.items.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {order.items.map(item => (
                  <li key={item.productId}>
                    <Typography>
                      {item.productName} (ID: {item.productId}) - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No items in this order.</Typography>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-blue-gray-50">
            <Typography variant="h5" className="font-bold text-blue-gray-800">
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
          </div>

          <div className="flex justify-start gap-4 mt-8">
            <Link to="/dashboard/orders-management">
              <Button color="blue" variant="outlined">Back to List</Button>
            </Link>
             {/* Optionally, add an Edit button */}
            <Link to={`/dashboard/orders/edit/${order.id}`}>
              <Button color="orange">Edit Order</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderDetail;
