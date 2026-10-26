import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] px-5 pb-8 pt-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Image
                      src="/images/SHOP.CO.png"
                      alt="Models wearing the latest fashion collection"
                      width={160} 
                      height={40}
                      />

            <p className="mb-5 max-w-xs text-sm leading-6 mt-3 text-gray-600">
              We have clothes that suit your style and make you proud to wear.
              From women to men, we have everything you need.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white"
              >
                <FaXTwitter size={16} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white"
              >
                <FaGithub size={17} />
              </a>
            </div>
          </div>

          <div className="font-league ">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 text-sm font-roboto text-gray-600">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Features</Link>
              </li>
              <li>
                <Link href="#">Works</Link>
              </li>
              <li>
                <Link href="#">Career</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold font-league uppercase tracking-wider">
              Help
            </h3>
            <ul className="space-y-3 font-roboto text-sm text-gray-600">
              <li>
                <Link href="#">Customer Support</Link>
              </li>
              <li>
                <Link href="#">Delivery Details</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-league text-sm font-semibold uppercase tracking-wider">
              FAQ
            </h3>
            <ul className="space-y-3 font-roboto text-sm text-gray-600">
              <li>
                <Link href="#">Account</Link>
              </li>
              <li>
                <Link href="#">Manage Deliveries</Link>
              </li>
              <li>
                <Link href="#">Orders</Link>
              </li>
              <li>
                <Link href="#">Payments</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold font-league uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3 font-roboto text-sm text-gray-600">
              <li>
                <Link href="#">Free eBooks</Link>
              </li>
              <li>
                <Link href="#">Development Tutorial</Link>
              </li>
              <li>
                <Link href="#">How to - Blog</Link>
              </li>
              <li>
                <Link href="#">YouTube Playlist</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-black/60">
            Shop.co © 2000–2026, All Rights Reserved
          </p>
 
          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold italic">
              VISA
            </span>
 
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              Mastercard
            </span>
 
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold italic">
              PayPal
            </span>
 
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              Apple Pay
            </span>
 
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              G Pay
            </span>
          </div>
          </div>
        </div>
   
    </footer>
  );
}
