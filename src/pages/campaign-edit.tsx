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
  Select,
  Option,
} from "@material-tailwind/react";
import { mockCampaigns } from "../../data/mock-campaigns";
import { Campaign } from "../../types";

type CampaignStatusActual = "Planning" | "Active" | "Completed" | "Cancelled";

export function CampaignEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState<number | string>("");
  const [status, setStatus] = useState<CampaignStatusActual>("Planning");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignExists, setCampaignExists] = useState(true);
  const [originalCampaign, setOriginalCampaign] = useState<Campaign | null>(null);


  useEffect(() => {
    const campaignToEdit = mockCampaigns.find((campaign) => campaign.id === id);
    if (campaignToEdit) {
      setOriginalCampaign(campaignToEdit);
      setName(campaignToEdit.name);
      setStartDate(campaignToEdit.startDate);
      setEndDate(campaignToEdit.endDate);
      setBudget(campaignToEdit.budget);
      setStatus(campaignToEdit.status);
      setDescription(campaignToEdit.description || "");
      setTargetAudience(campaignToEdit.targetAudience || "");
      setCampaignExists(true);
    } else {
      setCampaignExists(false);
      // Optional: Redirect immediately if not found
      // navigate("/dashboard/campaigns");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campaignIndex = mockCampaigns.findIndex((campaign) => campaign.id === id);

    if (campaignIndex !== -1) {
      const updatedCampaign: Campaign = {
        ...(mockCampaigns[campaignIndex]), // Preserve original fields like id, createdAt
        name,
        startDate,
        endDate,
        budget: Number(budget),
        status,
        description: description || undefined,
        targetAudience: targetAudience || undefined,
        updatedAt: new Date().toISOString(), // Update the updatedAt timestamp
      };
      mockCampaigns[campaignIndex] = updatedCampaign;
      navigate("/dashboard/campaigns");
    } else {
      alert("Campaign not found. Could not update.");
      navigate("/dashboard/campaigns");
    }
  };

  if (!id || !campaignExists && !mockCampaigns.find(c => c.id === id)) {
    // Redirect if no ID or if campaign doesn't exist (after useEffect check)
    // This is a fallback, useEffect should handle initial load.
    navigate("/dashboard/campaigns");
    return <Typography>Campaign not found. Redirecting...</Typography>;
  }


  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Campaign (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {campaignExists && originalCampaign ? (
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
            <Select
              label="Status"
              value={status}
              onChange={(val) => setStatus(val as CampaignStatusActual)}
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
              Update Campaign
            </Button>
          </form>
        ) : (
          <Typography>
            Campaign with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default CampaignEdit;
