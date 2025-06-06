import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockClaims } from "../data/mock-claims";
import { Claim } from "../types/claim";

const TABLE_HEAD = ["ID", "Order ID", "Customer ID", "Reason", "Status", "Claim Date", "Resolution", "Actions"];

export function ClaimManagement() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims);

  const handleDelete = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      const updatedClaims = claims.filter((claim) => claim.id !== idToDelete);
      setClaims(updatedClaims);

      const claimIndexInMock = mockClaims.findIndex(
        (claim) => claim.id === idToDelete
      );
      if (claimIndexInMock !== -1) {
        mockClaims.splice(claimIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Claim Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage customer claims
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/claims/add">
              <Button>Add New Claim</Button>
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
            {claims.map(({ id, orderId, customerId, reason, status, claimDate, resolutionDetails }, index) => {
              const isLast = index === claims.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{id}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{orderId}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{customerId}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal truncate max-w-xs">{reason}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{new Date(claimDate).toLocaleDateString()}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal truncate max-w-xs">{resolutionDetails || "N/A"}</Typography></td>
                  <td className={classes}>
                    <Link to={`/dashboard/claims/edit/${id}`}>
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

export default ClaimManagement;
