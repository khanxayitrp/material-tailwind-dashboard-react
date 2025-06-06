import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { mockInventoryItems } from "../data/mock-inventory-items";
import { InventoryItem } from "../types/inventory-item";

export function InventoryItemEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [lastStockUpdate, setLastStockUpdate] = useState(""); // Store as YYYY-MM-DD for input
  const [itemExists, setItemExists] = useState(true);

  useEffect(() => {
    const itemToEdit = mockInventoryItems.find((item) => item.id === id);
    if (itemToEdit) {
      setProductId(itemToEdit.productId);
      setSku(itemToEdit.sku);
      setQuantity(itemToEdit.quantity);
      setLocation(itemToEdit.location);
      setLastStockUpdate(new Date(itemToEdit.lastStockUpdate).toISOString().split('T')[0]);
      setItemExists(true);
    } else {
      setItemExists(false);
      // navigate("/dashboard/inventory-items");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId.trim() || !sku.trim() || quantity === "" || !location.trim() || !lastStockUpdate) {
      alert("Please fill in all required fields.");
      return;
    }

    const itemIndex = mockInventoryItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const updatedItem: InventoryItem = {
        id: id!,
        productId,
        sku,
        quantity: Number(quantity),
        location,
        lastStockUpdate: new Date(lastStockUpdate).toISOString(),
      };
      mockInventoryItems[itemIndex] = updatedItem;
      navigate("/dashboard/inventory-items");
    } else {
      alert("Inventory Item not found. Could not update.");
      navigate("/dashboard/inventory-items");
    }
  };

  if (!id || (!itemExists && !mockInventoryItems.find(i => i.id === id))) {
    navigate("/dashboard/inventory-items");
    return <Typography>Inventory Item not found. Redirecting...</Typography>;
  }

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Inventory Item (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {itemExists ? (
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
              Update Item
            </Button>
          </form>
        ) : (
          <Typography>
            Inventory Item with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default InventoryItemEdit;
