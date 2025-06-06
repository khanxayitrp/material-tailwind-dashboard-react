import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { mockCoupons } from "../data/mock-coupons";
import { Coupon } from "../types/coupon";

const TABLE_HEAD = ["ID", "Code", "Type", "Value", "Expires", "Active", "Description", "Actions"];

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleDelete = (idToDelete: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      const updatedCoupons = coupons.filter((coupon) => coupon.id !== idToDelete);
      setCoupons(updatedCoupons);

      const couponIndexInMock = mockCoupons.findIndex(
        (coupon) => coupon.id === idToDelete
      );
      if (couponIndexInMock !== -1) {
        mockCoupons.splice(couponIndexInMock, 1);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Coupon Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your coupons and promotions
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/coupons/add">
              <Button>Add New Coupon</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map(({ id, code, discountType, discountValue, expirationDate, isActive, description }, index) => {
              const isLast = index === coupons.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{id}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{code}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{discountType}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{discountValue}{discountType === 'percentage' ? '%' : '$'}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{new Date(expirationDate).toLocaleDateString()}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{isActive ? "Yes" : "No"}</Typography></td>
                  <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal truncate max-w-xs">{description || "N/A"}</Typography></td>
                  <td className={classes}>
                    <Link to={`/dashboard/coupons/edit/${id}`}>
                      <Button variant="outlined" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      size="sm"
                      color="red"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default CouponManagement;
