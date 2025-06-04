import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockOrders } from '@/data/mock-orders'; // To find the order to edit
import { mockProducts } from '@/data/mock-products'; // To select items
import { Order } from '@/types/order';
import { Product } from '@/types/product';

export function OrderEdit() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const [customerName, setCustomerName] = useState('');
  const [orderStatus, setOrderStatus] = useState<Order['status']>('Pending');
  const [selectedItems, setSelectedItems] = useState<Array<{ productId: string; quantity: number; price: number; productName: string }>>([]);
  const [originalOrder, setOriginalOrder] = useState<Order | null>(null);

  const availableProducts = mockProducts;

  useEffect(() => {
    const orderToEdit = mockOrders.find(o => o.id === orderId);
    if (orderToEdit) {
      setOriginalOrder(orderToEdit);
      setCustomerName(orderToEdit.customerName);
      setOrderStatus(orderToEdit.status);
      setSelectedItems(orderToEdit.items.map(item => ({
        productId: item.productId,
        productName: item.productName, // Assuming productName is stored in order items
        quantity: item.quantity,
        price: item.price,
      })));
    } else {
      // Handle order not found, maybe navigate back or show an error
      navigate('/dashboard/orders-management');
    }
  }, [orderId, navigate]);

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
    if (!originalOrder) return;

    const updatedOrder = {
      ...originalOrder,
      customerName,
      status: orderStatus,
      items: selectedItems,
      totalAmount: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    console.log('Updated Order:', updatedOrder);
    // In a real app, you would send this to a backend.
    // For mock data, you might update the mockOrders array here.
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        mockOrders[orderIndex] = updatedOrder;
    }
    navigate('/dashboard/orders-management');
  };

  const [tempProductId, setTempProductId] = useState(availableProducts[0]?.id || '');
  const [tempQuantity, setTempQuantity] = useState(1);

  if (!originalOrder) {
    return <Typography>Loading order data or order not found...</Typography>; // Or a spinner
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Edit Order - {originalOrder.id}
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <form className="p-6 space-y-6">
            <Input
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-blue-gray-700">Order Status</label>
              <Select
                name="status"
                value={orderStatus}
                onChange={(value) => setOrderStatus(value as Order['status'])}
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
               {selectedItems.length === 0 && <Typography className="text-sm text-blue-gray-500">No items in order.</Typography>}
            </div>

            <div className="flex gap-4 items-end">
              <div className="flex-grow">
                 <label htmlFor="product" className="block text-sm font-medium text-blue-gray-700">Add Product</label>
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
              />
              <Button color="green" onClick={() => handleAddItem(tempProductId, tempQuantity)} disabled={!tempProductId}>
                Add/Update Item
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
              <Button color="blue" onClick={handleSubmit}>Save Changes</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderEdit;
