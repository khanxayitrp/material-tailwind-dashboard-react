import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockCampaigns } from "@/data/mock-campaigns";
import { Campaign } from "@/types/campaign";

export function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);

  const handleDeleteCampaign = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      const updatedCampaigns = campaigns.filter(
        (campaign) => campaign.id !== idToDelete
      );
      setCampaigns(updatedCampaigns);

      const campaignIndexInMock = mockCampaigns.findIndex(
        (campaign) => campaign.id === idToDelete
      );
      if (campaignIndexInMock !== -1) {
        mockCampaigns.splice(campaignIndexInMock, 1);
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Campaign Management
          </Typography>
          {/* Basic link, actual add page not yet implemented */}
          <Link to="/dashboard/campaigns/add">
            <Button color="blue" size="sm">Add New Campaign</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Campaign ID", "Name", "Start Date", "End Date", "Budget", "Status", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign: Campaign) => (
                <tr key={campaign.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{campaign.id}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{campaign.name}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{campaign.startDate}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{campaign.endDate}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">${campaign.budget.toFixed(2)}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{campaign.status}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link to={`/dashboard/campaigns/edit/${campaign.id}`} className="mr-2">
                      <Button color="orange" size="sm">Edit</Button>
                    </Link>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="mr-2"
                    >
                      Delete
                    </Button>
                    <Link to={`/dashboard/campaigns/detail/${campaign.id}`}> {/* Assuming detail page might exist or be added */}
                      <Button color="purple" size="sm">Detail</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default CampaignManagement;
