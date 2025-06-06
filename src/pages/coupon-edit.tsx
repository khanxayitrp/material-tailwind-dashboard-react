import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { mockCoupons } from "../../data/mock-coupons";
import { Coupon } from "../../types";

type DiscountType = 'percentage' | 'fixed';

export function CouponEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percentage");
  const [discountValue, setDiscountValue] = useState<number | string>("");
  const [expirationDate, setExpirationDate] = useState(""); // Store as YYYY-MM-DD for input
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState("");
  const [couponExists, setCouponExists] = useState(true);

  useEffect(() => {
    const couponToEdit = mockCoupons.find((coupon) => coupon.id === id);
    if (couponToEdit) {
      setCode(couponToEdit.code);
      setDiscountType(couponToEdit.discountType);
      setDiscountValue(couponToEdit.discountValue);
      setExpirationDate(new Date(couponToEdit.expirationDate).toISOString().split('T')[0]);
      setIsActive(couponToEdit.isActive);
      setDescription(couponToEdit.description || "");
      setCouponExists(true);
    } else {
      setCouponExists(false);
      // navigate("/dashboard/coupons");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code.trim() || discountValue === "" || !expirationDate) {
      alert("Please fill in all required fields: Code, Discount Value, and Expiration Date.");
      return;
    }

    const couponIndex = mockCoupons.findIndex((coupon) => coupon.id === id);

    if (couponIndex !== -1) {
      const updatedCoupon: Coupon = {
        id: id!,
        code,
        discountType,
        discountValue: Number(discountValue),
        expirationDate: new Date(expirationDate).toISOString(),
        isActive,
        description: description || undefined,
      };
      mockCoupons[couponIndex] = updatedCoupon;
      navigate("/dashboard/coupons");
    } else {
      alert("Coupon not found. Could not update.");
      navigate("/dashboard/coupons");
    }
  };

  if (!id || (!couponExists && !mockCoupons.find(c => c.id === id))) {
    navigate("/dashboard/coupons");
    return <Typography>Coupon not found. Redirecting...</Typography>;
  }

  return (
    <Card className="h-full w-full max-w-2xl mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Edit Coupon (ID: {id})
        </Typography>
      </CardHeader>
      <CardBody>
        {couponExists ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Coupon Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              size="lg"
              crossOrigin={undefined}
            />
            <Select
              label="Discount Type"
              value={discountType}
              onChange={(val) => setDiscountType(val as DiscountType)}
              size="lg"
            >
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed Amount</Option>
            </Select>
            <Input
              label="Discount Value"
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              required
              size="lg"
              crossOrigin={undefined}
            />
            <Input
              label="Expiration Date"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
              size="lg"
              crossOrigin={undefined}
            />
            <Checkbox
              label="Is Active?"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              crossOrigin={undefined}
            />
            <Textarea
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
            />
            <Button type="submit" color="blue" ripple={true} className="mt-2">
              Update Coupon
            </Button>
          </form>
        ) : (
          <Typography>
            Coupon with ID "{id}" not found. You might be redirected.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default CouponEdit;
