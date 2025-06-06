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
} from "@material-tailwind/react";
import { mockBrands } from "../data/mock-brands";
import { Brand } from "../types/brand";

export function BrandEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [brandExists, setBrandExists] = useState(true);

  useEffect(() => {
    const brandToEdit = mockBrands.find((brand) => brand.id === id);
    if (brandToEdit) {
      setName(brandToEdit.name);
      setLogoUrl(brandToEdit.logoUrl || "");
      setWebsite(brandToEdit.website || "");
      setDescription(brandToEdit.description || "");
      setBrandExists(true);
    } else {
      setBrandExists(false);
      // Optionally, navigate away if brand not found,
      // or show a message. For now, we'll rely on the check below.
      // navigate("/dashboard/brands");
    }
  }, [id]); // mockBrands removed from dependency array as it's mutable and could cause infinite loops if modified directly

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const brandIndex = mockBrands.findIndex((brand) => brand.id === id);

    if (brandIndex !== -1) {
      const updatedBrand: Brand = {
        id: id!, // id is guaranteed to be present if brandIndex is not -1
        name,
        logoUrl: logoUrl || undefined,
        website: website || undefined,
        description: description || undefined,
      };
      mockBrands[brandIndex] = updatedBrand;
      navigate("/dashboard/brands");
    } else {
      // Handle case where brand might have been deleted between page load and submit
      alert("Brand not found. Could not update.");
      navigate("/dashboard/brands");
    }
  };

  if (!brandExists && id) { // Added id check to prevent premature redirect during initial render
    // This check ensures we only redirect if an id was provided and the brand wasn't found.
    // A more sophisticated approach might involve a dedicated "Not Found" component/page.
    // For now, redirecting is a simple way to handle it.
    // Note: useEffect will run after initial render. If brand is not found,
    // this condition might not be met immediately, but rather after the effect runs.
    // A loading state could be used here for better UX.
    if (!mockBrands.find((brand) => brand.id === id)) { // Double check before redirect
        // Consider a small delay or a loading indicator before navigating
        // to avoid flashing content if the brand is found by useEffect.
        // For this task, direct navigation is acceptable.
        // setTimeout(() => navigate("/dashboard/brands"), 0); // Example of deferring navigation
        navigate("/dashboard/brands");
        return <Typography>Brand not found. Redirecting...</Typography>; // Rendered briefly before navigation
    }
  }


  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Brand (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {brandExists ? (
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
              Update Brand
            </Button>
          </form>
        ) : (
          <Typography>
            Brand with ID "{id}" not found. You will be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default BrandEdit;
