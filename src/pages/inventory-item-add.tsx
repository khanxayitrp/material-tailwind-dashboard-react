import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { mockInventoryItems } from "../../data/mock-inventory-items";
import { InventoryItem } from "../../types";

export function InventoryItemAdd() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [lastStockUpdate, setLastStockUpdate] = useState(""); // YYYY-MM-DD format

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId.trim() || !sku.trim() || quantity === "" || !location.trim() || !lastStockUpdate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem: InventoryItem = {
      id: `inv_${Date.now()}`,
      productId,
      sku,
      quantity: Number(quantity),
      location,
      lastStockUpdate: new Date(lastStockUpdate).toISOString(),
    };

    mockInventoryItems.push(newItem);
    navigate("/dashboard/inventory-items");
  };

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Add New Inventory Item
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            label="Last Stock Update Date"
            type="date"
            value={lastStockUpdate}
            onChange={(e) => setLastStockUpdate(e.target.value)}
            required
            size="lg"
            crossOrigin={undefined}
          />
          <Button type="submit" color="blue" ripple={true} className="mt-2">
            Save Item
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default InventoryItemAdd;
