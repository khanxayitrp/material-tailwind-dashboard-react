import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export function ClaimEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<ClaimStatus>("pending");
  const [claimDate, setClaimDate] = useState(""); // Store as YYYY-MM-DD for input
  const [resolutionDetails, setResolutionDetails] = useState("");
  const [claimExists, setClaimExists] = useState(true);

  useEffect(() => {
    const claimToEdit = mockClaims.find((claim) => claim.id === id);
    if (claimToEdit) {
      setOrderId(claimToEdit.orderId);
      setCustomerId(claimToEdit.customerId);
      setReason(claimToEdit.reason);
      setStatus(claimToEdit.status);
      setClaimDate(new Date(claimToEdit.claimDate).toISOString().split('T')[0]);
      setResolutionDetails(claimToEdit.resolutionDetails || "");
      setClaimExists(true);
    } else {
      setClaimExists(false);
      // navigate("/dashboard/claims");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderId.trim() || !customerId.trim() || !reason.trim() || !claimDate) {
      alert("Please fill in all required fields: Order ID, Customer ID, Reason, and Claim Date.");
      return;
    }

    const claimIndex = mockClaims.findIndex((claim) => claim.id === id);

    if (claimIndex !== -1) {
      const updatedClaim: Claim = {
        id: id!,
        orderId,
        customerId,
        reason,
        status,
        claimDate: new Date(claimDate).toISOString(),
        resolutionDetails: resolutionDetails || undefined,
      };
      mockClaims[claimIndex] = updatedClaim;
      navigate("/dashboard/claims");
    } else {
      alert("Claim not found. Could not update.");
      navigate("/dashboard/claims");
    }
  };

  if (!id || (!claimExists && !mockClaims.find(c => c.id === id))) {
    navigate("/dashboard/claims");
    return <Typography>Claim not found. Redirecting...</Typography>;
  }

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Claim (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {claimExists ? (
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
              Update Claim
            </Button>
          </form>
        ) : (
          <Typography>
            Claim with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default ClaimEdit;
