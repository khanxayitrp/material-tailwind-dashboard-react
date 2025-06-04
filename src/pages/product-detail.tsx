import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products"; // To simulate fetching

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Handle product not found
      setProduct(null);
    }
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [productId]);

  if (loading) {
    return <Typography className="mt-12 text-center">Loading product details...</Typography>;
  }

  if (!product) {
    return (
      <div className="mt-12 text-center">
        <Card className="max-w-md mx-auto">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    Product Not Found
                </Typography>
                <Typography className="mb-6">
                    Sorry, we couldn't find the product you're looking for. It might have been removed or the ID is incorrect.
                </Typography>
                <Link to="/dashboard/product-management">
                    <Button color="blue" ripple={true}>
                        Back to Product List
                    </Button>
                </Link>
            </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            {product.name}
          </Typography>
          <div>
            <Link to="/dashboard/product-management" className="mr-2">
              <Button variant="outlined" color="white" size="sm">
                Back to List
              </Button>
            </Link>
            <Link to={`/dashboard/product/edit/${product.id}`}>
              <Button color="blue" size="sm">
                Edit Product
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.imageUrl && (
              <div className="md:col-span-1">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-lg object-cover" />
              </div>
            )}
            <div className={` ${product.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
              <div className="space-y-4">
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">Product ID</Typography>
                  <Typography color="blue-gray" className="text-lg">{product.id}</Typography>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">Category</Typography>
                  <Typography color="blue-gray" className="text-lg">{product.category}</Typography>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">Price</Typography>
                  <Typography color="blue-gray" className="text-lg font-bold">${product.price.toFixed(2)}</Typography>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">Stock Quantity</Typography>
                  <Typography color="blue-gray" className="text-lg">{product.stock} units</Typography>
                </div>
                {product.sku && (
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">SKU</Typography>
                    <Typography color="blue-gray" className="text-lg">{product.sku}</Typography>
                  </div>
                )}
                {product.supplier && (
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-semibold opacity-70">Supplier</Typography>
                    <Typography color="blue-gray" className="text-lg">{product.supplier}</Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
          {product.description && (
            <div className="mt-8 pt-6 border-t border-blue-gray-50">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Description
              </Typography>
              <Typography color="blue-gray" className="whitespace-pre-line text-base">
                {product.description}
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductDetail;
