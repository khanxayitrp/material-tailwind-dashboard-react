import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockProductCategories } from '@/data/mock-product-categories'; // To find the category
import { ProductCategory } from '@/types/product-category';

export function ProductCategoryDetail() {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    const categoryToView = mockProductCategories.find(c => c.id === categoryId);
    if (categoryToView) {
      setCategory(categoryToView);
    } else {
      setCategory(null);
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12 items-center">
        <Typography variant="h4" color="blue-gray">Category Not Found</Typography>
        <Link to="/dashboard/product-categories">
          <Button color="blue">Back to Categories List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Product Category Details - {category.id}
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-4">
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Category ID:</Typography>
            <Typography>{category.id}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Name:</Typography>
            <Typography>{category.name}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Description:</Typography>
            <Typography>{category.description || "N/A"}</Typography>
          </div>
          <div>
            <Typography variant="small" className="font-bold text-blue-gray-500">Product Count:</Typography>
            <Typography>{category.productCount !== undefined ? category.productCount : "N/A"}</Typography>
          </div>
          <div className="flex justify-start gap-4 mt-8">
            <Link to="/dashboard/product-categories">
              <Button color="blue" variant="outlined">Back to List</Button>
            </Link>
            <Link to={`/dashboard/product-categories/edit/${category.id}`}>
              <Button color="orange">Edit Category</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCategoryDetail;
