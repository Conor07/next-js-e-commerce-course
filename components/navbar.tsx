"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const { items } = useCartStore();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600">
          My Ecommerce
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>

          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>

          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Button
            variant={"ghost"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? (
              <XMarkIcon
                className="h-6 w-6 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              />
            ) : (
              <Bars3Icon
                className="h-6 w-6 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileOpen(true)}
              />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/checkout"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
