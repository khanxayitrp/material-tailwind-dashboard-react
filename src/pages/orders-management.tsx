import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function OrdersManagement() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
              <Typography variant="h6" color="white">
                Orders Management
              </Typography>
              <Link to="/dashboard/product/add">
                <Button color="blue" size="sm">Add New Order</Button>
              </Link>
            </CardHeader>
            {/* <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Product Name", "Category", "Price", "Stock", "Actions"].map((el) => (
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
                  {mockProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">{product.name}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">{product.category}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">${product.price.toFixed(2)}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">{product.stock}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 mr-2">Edit</Typography>
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">Details</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody> */}
          </Card>
        </div>
  );
}

export default OrdersManagement;
