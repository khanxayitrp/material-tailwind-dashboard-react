import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { mockClaims } from "../data/mock-claims";
import { Claim } from "../types/claim";

type ClaimStatus = 'pending' | 'approved' | 'rejected';

export function ClaimAdd() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<ClaimStatus>("pending");
  const [claimDate, setClaimDate] = useState(""); // YYYY-MM-DD
  const [resolutionDetails, setResolutionDetails] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderId.trim() || !customerId.trim() || !reason.trim() || !claimDate) {
      alert("Please fill in all required fields: Order ID, Customer ID, Reason, and Claim Date.");
      return;
    }

    const newClaim: Claim = {
      id: `claim_${Date.now()}`,
      orderId,
      customerId,
      reason,
      status,
      claimDate: new Date(claimDate).toISOString(),
      resolutionDetails: resolutionDetails || undefined,
    };

    mockClaims.push(newClaim);
    navigate("/dashboard/claims");
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Claim
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
            label="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Textarea
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            size="lg"
          />
          <Select
            label="Status"
            value={status}
            onChange={(val) => setStatus(val as ClaimStatus)}
            size="lg"
          >
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Input
            label="Claim Date"
            type="date"
            value={claimDate}
            onChange={(e) => setClaimDate(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Textarea
            label="Resolution Details (Optional)"
            value={resolutionDetails}
            onChange={(e) => setResolutionDetails(e.target.value)}
            size="lg"
          />
          <Button type="submit" color="blue" ripple={true} className="mt-2">
            Save Claim
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default ClaimAdd;
