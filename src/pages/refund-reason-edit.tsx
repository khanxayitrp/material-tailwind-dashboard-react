import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Textarea,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { mockRefundReasons } from "../../data/mock-refund-reasons";
import { RefundReason } from "../../types";

export function RefundReasonEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [reasonExists, setReasonExists] = useState(true);

  useEffect(() => {
    const reasonToEdit = mockRefundReasons.find((reason) => reason.id === id);
    if (reasonToEdit) {
      setName(reasonToEdit.name);
      setDescription(reasonToEdit.description);
      setIsActive(reasonToEdit.isActive);
      setReasonExists(true);
    } else {
      setReasonExists(false);
      // navigate("/dashboard/refund-reasons"); // Optional: redirect if not found
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    const reasonIndex = mockRefundReasons.findIndex((reason) => reason.id === id);

    if (reasonIndex !== -1) {
      const updatedReason: RefundReason = {
        id: id!, // id is definitely present if reasonIndex is not -1
        name,
        description,
        isActive,
      };
      mockRefundReasons[reasonIndex] = updatedReason;
      navigate("/dashboard/refund-reasons");
    } else {
      alert("Refund Reason not found. Could not update.");
      navigate("/dashboard/refund-reasons");
    }
  };

  if (!id || (!reasonExists && !mockRefundReasons.find(r => r.id === id))) {
     // Fallback redirect
    navigate("/dashboard/refund-reasons");
    return <Typography>Refund Reason not found. Redirecting...</Typography>;
  }

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Refund Reason (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {reasonExists ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="lg"
              crossOrigin={undefined}
            />
            <Textarea
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
            />
            <Checkbox
              label="Is Active?"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              crossOrigin={undefined}
            />
            <Button type="submit" color="blue" ripple={true} className="mt-2">
              Update Refund Reason
            </Button>
          </form>
        ) : (
          <Typography>
            Refund Reason with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default RefundReasonEdit;
