import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { mockProductCategories } from '@/data/mock-product-categories'; // To add to the mock data
import { ProductCategory } from '@/types/product-category';

export function ProductCategoryAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const newCategory: ProductCategory = {
      id: `cat_${Date.now().toString()}`, // Simple unique ID
      name,
      description,
      productCount: 0, // Default product count for a new category
    };

    // Add to mock data (in a real app, this would be an API call)
    mockProductCategories.push(newCategory);
    console.log('New Product Category:', newCategory);

    navigate('/dashboard/product-categories');
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Product Category
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
            <Input
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-6">
              <Link to="/dashboard/product-categories">
                <Button color="gray" variant="outlined">Cancel</Button>
              </Link>
              <Button color="blue" onClick={handleSubmit} disabled={!name.trim()}>Save Category</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCategoryAdd;
