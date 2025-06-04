import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { mockStores } from '@/data/mock-stores'; // To add to mock data
import { Store } from '@/types/store';

export function StoreAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  const handleSubmit = () => {
    const newStore: Store = {
      id: `store_${Date.now().toString()}`, // Simple unique ID
      name,
      location,
      manager: manager || undefined, // Optional fields
      contactEmail: contactEmail || undefined,
      openingHours: openingHours || undefined,
    };

    mockStores.push(newStore);
    console.log('New Store:', newStore);

    navigate('/dashboard/store-management');
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Store
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Store Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Input
              label="Manager (Optional)"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
            <Input
              label="Contact Email (Optional)"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Input
              label="Opening Hours (Optional)"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-6">
              <Link to="/dashboard/store-management">
                <Button color="gray" variant="outlined">Cancel</Button>
              </Link>
              <Button color="blue" onClick={handleSubmit} disabled={!name.trim() || !location.trim()}>Save Store</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default StoreAdd;
