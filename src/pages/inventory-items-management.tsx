import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockInventoryItems } from "../data/mock-inventory-items";
import { InventoryItem } from "../types/inventory-item";

const TABLE_HEAD = ["ID", "Product ID", "SKU", "Quantity", "Location", "Last Stock Update", "Actions"];

export function InventoryItemsManagement() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);

  const handleDelete = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      const updatedItems = inventoryItems.filter((item) => item.id !== idToDelete);
      setInventoryItems(updatedItems);

      const itemIndexInMock = mockInventoryItems.findIndex(
        (item) => item.id === idToDelete
      );
      if (itemIndexInMock !== -1) {
        mockInventoryItems.splice(itemIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Inventory Items Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your inventory items
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/inventory-items/add">
              <Button>Add New Item</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(({ id, productId, sku, quantity, location, lastStockUpdate }, index) => {
              const isLast = index === inventoryItems.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{id}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{productId}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{sku}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{quantity}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{location}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{new Date(lastStockUpdate).toLocaleDateString()}</Typography></td>
                  <td className={classes}>
                    <Link to={`/dashboard/inventory-items/edit/${id}`}>
                      <Button variant="outlined" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      size="sm"
                      color="red"
                      onClick={() => handleDelete(id)}
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

export default InventoryItemsManagement;
