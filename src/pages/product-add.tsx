import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  typography
} from "@material-tailwind/react";
import { Product } from "@/types/product"; // Optional: for form state typing later

export function ProductAdd() {
  // Basic form state handling (can be expanded later with useState)
  const [formData, setFormData] = React.useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
    sku: "",
    supplier: ""
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" })); // Clear error if field is modified
    }
  };
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Product name is required.";
    }
    if (!formData.category?.trim()) {
      newErrors.category = "Category is required.";
    }

    if (formData.price === undefined || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = "Stock quantity cannot be negative.";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.imageUrl?.trim()) {
      newErrors.imageUrl = "Image URL is required.";
    }else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Image URL must be a valid image link (jpg, jpeg, png, gif).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if(validateForm()) {
      // Proceed with form submission logic
      console.log("Form is valid, ready to submit.");
      // Add submission logic here, e.g., API call
    } else {
      console.log("Form has errors:", errors);
      // Optionally, you can display a message to the user
      alert("Please fix the errors in the form before submitting.");
    }

  //   // Add submission logic here
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Product Name*
                </Typography>
                <Input type="text" label="Product Name"  name="name" value={formData.name || ""} onChange={handleChange} error={!!errors.name} crossOrigin={undefined}/>
                {errors.name && (<Typography variant="small" color="red" className="mt-1">{errors.name}</Typography>)}
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Category
                </Typography>
                <Input type="text" label="Category"  name="category" value={formData.category || ""} onChange={handleChange} error={!!errors.category} crossOrigin={undefined}/>
                {errors.category && (<Typography variant="small" color="red" className="mt-1">{errors.category}</Typography>)}
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Price
                </Typography>
                <Input type="number" label="Price"  name="price" value={formData.price || ""}
                  onChange={handleChange}
                  error={!!errors.price} crossOrigin={undefined}/>
                  {errors.price && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.price}
                  </Typography>
                )}
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Stock Quantity
                </Typography>
                <Input type="number" label="Stock Quantity"  name="stock" value={formData.stock || ""}
                  onChange={handleChange}
                  error={!!errors.stock} crossOrigin={undefined}/>
                  {errors.stock && (<Typography variant="small" color="red" className="mt-1">{errors.stock}</Typography>)}
              </div>
              <div className="md:col-span-2">
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Description
                </Typography>
                <Textarea label="Description"  name="description" value={formData.description || ""}
                  onChange={handleChange}
                  error={!!errors.description} />
                  {errors.description && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.description}
                  </Typography>
                )}
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Image URL
                </Typography>
                <Input type="text" label="Image URL"  name="imageUrl" value={formData.imageUrl || ""}
                  onChange={handleChange}
                  error={!!errors.imageUrl} crossOrigin={undefined}/>
                  {errors.imageUrl && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.imageUrl}
                  </Typography>
                )}
              </div>
               <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  SKU (Optional) ex: TSHIRT-BL-LG
                </Typography>
                <Input type="text" label="SKU"  name="sku" value={formData.sku || ""}
                  onChange={handleChange} crossOrigin={undefined}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Supplier (Optional)
                </Typography>
                <Input type="text" label="Supplier"  name="supplier" value={formData.supplier || ""}
                  onChange={handleChange} crossOrigin={undefined}/>
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
