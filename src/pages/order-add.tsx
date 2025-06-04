import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea, // For multi-line descriptions or item lists
  Select, // Assuming Select is available from @material-tailwind/react or a similar library
  Option, // For Select component
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { mockProducts } from '@/data/mock-products'; // To select items for the order
import { Product } from '@/types/product';
import { Order } from '@/types/order'; // Assuming you might want to use this type

export function OrderAdd() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [orderStatus, setOrderStatus] = useState<Order['status']>('Pending');
  const [selectedItems, setSelectedItems] = useState<Array<{ productId: string; quantity: number; price: number; productName: string }>>([]);
  // In a real app, products would be fetched or managed more dynamically
  const availableProducts = mockProducts;

  const handleAddItem = (productId: string, quantity: number) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product && quantity > 0) {
      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === productId);
        if (existingItem) {
          return prevItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevItems, { productId: product.id, productName: product.name, quantity, price: product.price }];
        }
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const handleSubmit = () => {
    const newOrder = {
      id: `ord_${Date.now().toString()}`, // Simple unique ID
      customerName,
      orderDate: new Date().toISOString().split('T')[0], // Today's date
      status: orderStatus,
      items: selectedItems,
      totalAmount: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    console.log('New Order:', newOrder);
    // In a real app, you would send this to a backend or update global state
    // For now, just navigate back to the orders list
    navigate('/dashboard/orders-management');
  };

  // Dummy product selection for the form (replace with a better UI element if available)
  const [tempProductId, setTempProductId] = useState(availableProducts[0]?.id || '');
  const [tempQuantity, setTempQuantity] = useState(1);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Order
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <form className="p-6 space-y-6">
            <Input
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              // Workaround for TailwindCSS Input type issue for 'label'
              // by ensuring that 'label' is always a string.
              // label={"" as any}
            />

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-blue-gray-700">Order Status</label>
              <Select
                name="status"
                value={orderStatus}
                onChange={(value) => setOrderStatus(value as Order['status'])}
                // label="Order Status" // Material Tailwind Select might not need explicit label prop like Input
              >
                <Option value="Pending">Pending</Option>
                <Option value="Shipped">Shipped</Option>
                <Option value="Delivered">Delivered</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </div>

            <div className="space-y-2">
              <Typography variant="h6">Order Items</Typography>
              {selectedItems.map(item => (
                <div key={item.productId} className="flex justify-between items-center p-2 border rounded-md">
                  <Typography>{item.productName} (x{item.quantity}) - ${item.price.toFixed(2)} each</Typography>
                  <Button color="red" size="sm" onClick={() => handleRemoveItem(item.productId)}>Remove</Button>
                </div>
              ))}
              {selectedItems.length === 0 && <Typography className="text-sm text-blue-gray-500">No items added yet.</Typography>}
            </div>

            <div className="flex gap-4 items-end">
              <div className="flex-grow">
                <label htmlFor="product" className="block text-sm font-medium text-blue-gray-700">Product</label>
                <Select
                    name="product"
                    value={tempProductId}
                    onChange={(value) => setTempProductId(value as string)}
                >
                    {availableProducts.map(p => (
                        <Option key={p.id} value={p.id}>{p.name} - ${p.price.toFixed(2)}</Option>
                    ))}
                </Select>
              </div>
              <Input
                type="number"
                label="Quantity"
                value={tempQuantity}
                onChange={(e) => setTempQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                min="1"
                // label={"" as any}
              />
              <Button color="green" onClick={() => handleAddItem(tempProductId, tempQuantity)} disabled={!tempProductId}>
                Add Item
              </Button>
            </div>

            <div className="mt-4">
                <Typography variant="h5">
                    Total: ${selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Link to="/dashboard/orders-management">
                <Button color="gray" variant="outlined">Cancel</Button>
              </Link>
              <Button color="blue" onClick={handleSubmit}>Save Order</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderAdd;
