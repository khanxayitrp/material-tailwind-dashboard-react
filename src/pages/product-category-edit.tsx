import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockProductCategories } from '@/data/mock-product-categories'; // To find and update category
import { ProductCategory } from '@/types/product-category';

export function ProductCategoryEdit() {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalCategory, setOriginalCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    const categoryToEdit = mockProductCategories.find(c => c.id === categoryId);
    if (categoryToEdit) {
      setOriginalCategory(categoryToEdit);
      setName(categoryToEdit.name);
      setDescription(categoryToEdit.description || '');
    } else {
      navigate('/dashboard/product-categories'); // Category not found
    }
  }, [categoryId, navigate]);

  const handleSubmit = () => {
    if (!originalCategory) return;

    const updatedCategory: ProductCategory = {
      ...originalCategory,
      name,
      description,
    };

    const categoryIndex = mockProductCategories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
      mockProductCategories[categoryIndex] = updatedCategory;
    }

    console.log('Updated Product Category:', updatedCategory);
    navigate('/dashboard/product-categories');
  };

  if (!originalCategory) {
    return <Typography>Loading category data or category not found...</Typography>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Edit Product Category - {originalCategory.id}
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
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
              <Button color="blue" onClick={handleSubmit} disabled={!name.trim()}>Save Changes</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCategoryEdit;
