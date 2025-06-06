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
  Select,
  Option,
} from "@material-tailwind/react";
import { mockCampaigns } from "../../data/mock-campaigns";
import { Campaign } from "../../types";

// Status type as defined in src/types/campaign.ts
type CampaignStatusActual = "Planning" | "Active" | "Completed" | "Cancelled";

export function CampaignAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState<number | string>("");
  const [status, setStatus] = useState<CampaignStatusActual>("Planning"); // Default to 'Planning'
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCampaign: Campaign = {
      id: `camp_${Date.now()}`,
      name,
      startDate,
      endDate,
      budget: Number(budget), // Ensure budget is a number
      status,
      description: description || undefined,
      targetAudience: targetAudience || undefined,
      // Assuming 'createdAt' and 'updatedAt' are typically handled by a backend or ORM
      // For mock data, we can omit them or set them to the current date string.
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock data (in a real app, this would be an API call)
    mockCampaigns.push(newCampaign);
    navigate("/dashboard/campaigns"); // Navigate to campaign list page
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Campaign
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Start Date (YYYY-MM-DD)"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="End Date (YYYY-MM-DD)"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          {/*
            The Select component from Material Tailwind requires string values for its value prop.
            The Select component from Material Tailwind requires string values for its value prop.
          */}
          <Select
            label="Status"
            value={status} // Works as Select value is string
            onChange={(val) => setStatus(val as CampaignStatusActual)} // Cast val to the specific string literal type
            size="lg"

          >
            <Option value="Planning">Planning</Option>
            <Option value="Active">Active</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
          <Textarea
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="lg"
          />
          <Input
            label="Target Audience (Optional)"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            size="lg"
            crossOrigin={undefined}
          />
          <Button type="submit" color="blue" ripple={true} className="mt-2">
            Save Campaign
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default CampaignAdd;
