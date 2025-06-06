import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { mockPaymentCollections } from "../../data/mock-payment-collections";
import { PaymentCollection } from "../../types";

type PaymentStatus = 'pending' | 'completed' | 'failed';

export function PaymentCollectionEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [transactionDate, setTransactionDate] = useState(""); // Store as YYYY-MM-DD for input
  const [collectionExists, setCollectionExists] = useState(true);

  useEffect(() => {
    const collectionToEdit = mockPaymentCollections.find((pc) => pc.id === id);
    if (collectionToEdit) {
      setOrderId(collectionToEdit.orderId);
      setPaymentMethod(collectionToEdit.paymentMethod);
      setAmount(collectionToEdit.amount);
      setStatus(collectionToEdit.status);
      // Format ISO date string to YYYY-MM-DD for date input
      setTransactionDate(new Date(collectionToEdit.transactionDate).toISOString().split('T')[0]);
      setCollectionExists(true);
    } else {
      setCollectionExists(false);
      // navigate("/dashboard/payment-collections");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderId.trim() || !paymentMethod.trim() || !amount || !transactionDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const collectionIndex = mockPaymentCollections.findIndex((pc) => pc.id === id);

    if (collectionIndex !== -1) {
      const updatedCollection: PaymentCollection = {
        id: id!,
        orderId,
        paymentMethod,
        amount: Number(amount),
        status,
        transactionDate: new Date(transactionDate).toISOString(),
      };
      mockPaymentCollections[collectionIndex] = updatedCollection;
      navigate("/dashboard/payment-collections");
    } else {
      alert("Payment Collection not found. Could not update.");
      navigate("/dashboard/payment-collections");
    }
  };

  if (!id || (!collectionExists && !mockPaymentCollections.find(c => c.id === id))) {
    navigate("/dashboard/payment-collections");
    return <Typography>Payment Collection not found. Redirecting...</Typography>;
  }

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Payment Collection (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {collectionExists ? (
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
              Update Payment Collection
            </Button>
          </form>
        ) : (
          <Typography>
            Payment Collection with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default PaymentCollectionEdit;
