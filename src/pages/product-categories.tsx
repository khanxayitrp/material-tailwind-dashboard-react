import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockProductCategories } from "@/data/mock-product-categories"; // Adjusted import path
import { ProductCategory } from "@/types/product-category"; // Adjusted import path

export function ProductCategories() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Product Categories
          </Typography>
          {/* Basic link, actual add page not yet implemented */}
          <Link to="/dashboard/product-categories/add">
            <Button color="blue" size="sm">Add New Category</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Category ID", "Name", "Description", "Product Count", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockProductCategories.map((category: ProductCategory) => ( // Explicitly type category
                <tr key={category.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{category.id}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{category.name}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{category.description || "-"}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">{category.productCount || 0}</Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {/* Basic links, actual edit/detail pages not yet implemented */}
                    <Link to={`/dashboard/product-categories/edit/${category.id}`} className="mr-2">
                      <Button color="orange" size="sm">Edit</Button>
                    </Link>
                    <Link to={`/dashboard/product-categories/detail/${category.id}`}>
                      <Button color="purple" size="sm">Detail</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCategories;
