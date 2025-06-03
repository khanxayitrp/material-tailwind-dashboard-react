import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea
} from "@material-tailwind/react";
import { Product } from "@/types/product"; // Optional: for form state typing later

export function ProductAdd() {
  // Basic form state handling (can be expanded later with useState)
  // const [formData, setFormData] = React.useState<Partial<Product>>({});

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   // Add submission logic here
  // };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Product
          </Typography>
        </CardHeader>
        <CardBody className="px-6">
          {/* <form onSubmit={handleSubmit}> */}
          <form>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Product Name
                </Typography>
                <Input type="text" label="Product Name" placeholder="e.g., Awesome T-Shirt" name="name" crossOrigin={undefined}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Category
                </Typography>
                <Input type="text" label="Category" placeholder="e.g., Apparel" name="category" crossOrigin={undefined}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Price
                </Typography>
                <Input type="number" label="Price" placeholder="e.g., 25.99" name="price" crossOrigin={undefined}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Stock Quantity
                </Typography>
                <Input type="number" label="Stock Quantity" placeholder="e.g., 150" name="stock" crossOrigin={undefined}/>
              </div>
              <div className="md:col-span-2">
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Description
                </Typography>
                <Textarea label="Description" placeholder="Product description..." name="description" />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Image URL
                </Typography>
                <Input type="text" label="Image URL" placeholder="e.g., /img/products/t-shirt.jpg" name="imageUrl" crossOrigin={undefined}/>
              </div>
               <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  SKU (Optional)
                </Typography>
                <Input type="text" label="SKU" placeholder="e.g., TSHIRT-BL-LG" name="sku" crossOrigin={undefined}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Supplier (Optional)
                </Typography>
                <Input type="text" label="Supplier" placeholder="e.g., My Awesome Supplier" name="supplier" crossOrigin={undefined}/>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <Link to="/dashboard/product-management">
                <Button variant="outlined" color="blue-gray">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" color="blue">
                Save Product
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductAdd;
