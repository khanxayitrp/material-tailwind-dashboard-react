import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockStores } from '@/data/mock-stores'; // To find and update store
import { Store } from '@/types/store';

export function StoreEdit() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [originalStore, setOriginalStore] = useState<Store | null>(null);

  useEffect(() => {
    const storeToEdit = mockStores.find(s => s.id === storeId);
    if (storeToEdit) {
      setOriginalStore(storeToEdit);
      setName(storeToEdit.name);
      setLocation(storeToEdit.location);
      setManager(storeToEdit.manager || '');
      setContactEmail(storeToEdit.contactEmail || '');
      setOpeningHours(storeToEdit.openingHours || '');
    } else {
      navigate('/dashboard/store-management'); // Store not found
    }
  }, [storeId, navigate]);

  const handleSubmit = () => {
    if (!originalStore) return;

    const updatedStore: Store = {
      ...originalStore,
      name,
      location,
      manager: manager || undefined,
      contactEmail: contactEmail || undefined,
      openingHours: openingHours || undefined,
    };

    const storeIndex = mockStores.findIndex(s => s.id === storeId);
    if (storeIndex !== -1) {
      mockStores[storeIndex] = updatedStore;
    }

    console.log('Updated Store:', updatedStore);
    navigate('/dashboard/store-management');
  };

  if (!originalStore) {
    return <Typography>Loading store data or store not found...</Typography>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Edit Store - {originalStore.id}
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
              <Button color="blue" onClick={handleSubmit} disabled={!name.trim() || !location.trim()}>Save Changes</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default StoreEdit;
