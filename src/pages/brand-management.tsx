import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockBrands } from "../data/mock-brands";
import { Brand } from "../types/brand";

export function BrandManagement() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);

  const handleDeleteBrand = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      // Update the state for UI re-render
      const updatedBrands = brands.filter((brand) => brand.id !== idToDelete);
      setBrands(updatedBrands);

      // Update the underlying mockBrands array to reflect deletion across app session
      const brandIndexInMock = mockBrands.findIndex(
        (brand) => brand.id === idToDelete
      );
      if (brandIndexInMock !== -1) {
        mockBrands.splice(brandIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Brand Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all brands
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/brands/add">
              <Button>Add New Brand</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Brand ID
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Website
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Description
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: Brand, index) => {
              const { id, name, website, description } = brand;
              const isLast = index === brands.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {website || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Link to={`/dashboard/brands/edit/${id}`}>
                      <Button variant="outlined" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      size="sm"
                      color="red"
                      onClick={() => handleDeleteBrand(id)}
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

export default BrandManagement;
