import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockRefundReasons } from "../data/mock-refund-reasons";
import { RefundReason } from "../types/refund-reason";

const TABLE_HEAD = ["ID", "Name", "Description", "Is Active", "Actions"];

export function RefundReasonManagement() {
  const [refundReasons, setRefundReasons] = useState<RefundReason[]>(mockRefundReasons);

  const handleDelete = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this refund reason?")) {
      const updatedReasons = refundReasons.filter((reason) => reason.id !== idToDelete);
      setRefundReasons(updatedReasons);

      const reasonIndexInMock = mockRefundReasons.findIndex(
        (reason) => reason.id === idToDelete
      );
      if (reasonIndexInMock !== -1) {
        mockRefundReasons.splice(reasonIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Refund Reason Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your refund reasons
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/refund-reasons/add">
              <Button>Add New Refund Reason</Button>
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
            {refundReasons.map(({ id, name, description, isActive }, index) => {
              const isLast = index === refundReasons.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {isActive ? "Yes" : "No"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Link to={`/dashboard/refund-reasons/edit/${id}`}>
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

export default RefundReasonManagement;
