import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockPaymentCollections } from "../../data/mock-payment-collections";
import { PaymentCollection } from "../../types";

const TABLE_HEAD = ["ID", "Order ID", "Method", "Amount", "Status", "Date", "Actions"];

export function PaymentCollectionManagement() {
  const [paymentCollections, setPaymentCollections] = useState<PaymentCollection[]>(mockPaymentCollections);

  const handleDelete = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this payment collection?")) {
      const updatedCollections = paymentCollections.filter((pc) => pc.id !== idToDelete);
      setPaymentCollections(updatedCollections);

      const pcIndexInMock = mockPaymentCollections.findIndex(
        (pc) => pc.id === idToDelete
      );
      if (pcIndexInMock !== -1) {
        mockPaymentCollections.splice(pcIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Payment Collection Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage payment collection records
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/payment-collections/add">
              <Button>Add New Payment Collection</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentCollections.map(({ id, orderId, paymentMethod, amount, status, transactionDate }, index) => {
              const isLast = index === paymentCollections.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{id}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{orderId}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{paymentMethod}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">${amount.toFixed(2)}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{new Date(transactionDate).toLocaleDateString()}</Typography></td>
                  <td className={classes}>
                    <Link to={`/dashboard/payment-collections/edit/${id}`}>
                      <Button variant="outlined" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      size="sm"
                      color="red"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default PaymentCollectionManagement;
