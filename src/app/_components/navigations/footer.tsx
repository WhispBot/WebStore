import {
    Copyright,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";

const Footer = () => {
    return (
        <footer className="mt-16 border-t">
            <section className="container flex justify-around gap-8 py-20">
                <div>
                    <h4 className="pb-4 text-xl font-semibold">Information</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href=""
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                Term and conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/stickers"
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                Contact us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/stickers"
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/stickers"
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                FAQ / Help
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="pb-4 text-xl font-semibold">Category</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="/products/stickers"
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                Stickers
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/posters"
                                className="w-fit text-sm font-semibold text-primary hover:underline"
                            >
                                Posters
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="pb-4 text-xl font-semibold">Company information</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-primary" />
                            <span className="text-sm font-semibold">
                                Company Location 232 42
                            </span>
                        </div>
                        <Link
                            href="tel:1234567890"
                            className="flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                            <Phone />
                            123-456-7890
                        </Link>
                        <Link
                            href="mailto:info@companyname.com"
                            className="flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                            <Mail />
                            info@companyname.com
                        </Link>
                        <div className="flex gap-2">
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "icon" })
                                )}
                            >
                                <Facebook size={16} />
                            </Link>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "icon" })
                                )}
                            >
                                <Twitter size={16} />
                            </Link>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "icon" })
                                )}
                            >
                                <Instagram size={16} />
                            </Link>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "icon" })
                                )}
                            >
                                <Linkedin size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div className="flex items-center justify-center gap-2 bg-accent p-2">
                Copyright © 2018, All Right Reserved
                <Copyright size={16} />
                <span className="text-sm">Emil strömdahl</span>
            </div> */}
        </footer>
    );
};

export default Footer;
