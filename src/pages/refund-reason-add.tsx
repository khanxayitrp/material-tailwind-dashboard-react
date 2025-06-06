import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function RefundReasonAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required."); // Basic validation
      return;
    }

    const newReason: RefundReason = {
      id: `rr_${Date.now()}`,
      name,
      description,
      isActive,
    };

    mockRefundReasons.push(newReason);
    navigate("/dashboard/refund-reasons");
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Refund Reason
        </Typography>
      </CardHeader>
      <CardBody>
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
            Save Refund Reason
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default RefundReasonAdd;
