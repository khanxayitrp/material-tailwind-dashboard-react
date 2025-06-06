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
} from "@material-tailwind/react";
import { mockBrands } from "../data/mock-brands";
import { Brand } from "../types/brand";

export function BrandAdd() {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBrand: Brand = {
      id: `brand_${Date.now()}`, // Simple unique ID generation
      name,
      logoUrl: logoUrl || undefined,
      website: website || undefined,
      description: description || undefined,
    };

    // In a real app, you'd send this to a backend.
    // For now, just add to the mock data array.
    mockBrands.push(newBrand);

    navigate("/dashboard/brands");
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Brand
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
          <Input
            label="Logo URL (Optional)"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Website (Optional)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            size="lg"
            crossOrigin={undefined}
          />
          <Textarea
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="lg"
          />
          <Button type="submit" color="blue" ripple={true}>
            Save Brand
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default BrandAdd;
