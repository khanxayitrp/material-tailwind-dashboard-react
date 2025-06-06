import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { mockPaymentCollections } from "../data/mock-payment-collections";
import { PaymentCollection } from "../types/payment-collection";

type PaymentStatus = 'pending' | 'completed' | 'failed';

export function PaymentCollectionAdd() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [transactionDate, setTransactionDate] = useState(""); // YYYY-MM-DD format

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderId.trim() || !paymentMethod.trim() || !amount || !transactionDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPaymentCollection: PaymentCollection = {
      id: `pc_${Date.now()}`,
      orderId,
      paymentMethod,
      amount: Number(amount),
      status,
      transactionDate: new Date(transactionDate).toISOString(), // Store as ISO string
    };

    mockPaymentCollections.push(newPaymentCollection);
    navigate("/dashboard/payment-collections");
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Payment Collection
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Select
            label="Status"
            value={status}
            onChange={(val) => setStatus(val as PaymentStatus)}
            size="lg"
          >
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="failed">Failed</Option>
          </Select>
          <Input
            label="Transaction Date"
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Button type="submit" color="blue" ripple={true} className="mt-2">
            Save Payment Collection
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PaymentCollectionAdd;
