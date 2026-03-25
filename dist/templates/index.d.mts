import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface DashboardLayoutProps {
    sidebar: React.ReactNode;
    navbar: React.ReactNode;
    children: React.ReactNode;
}
declare const DashboardLayout: React.FC<DashboardLayoutProps>;

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}
declare const AuthLayout: React.FC<AuthLayoutProps>;

interface CarouselSlide {
    id: string;
    content: React.ReactNode;
}
interface CarouselProps {
    slides: CarouselSlide[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    className?: string;
}
declare function Carousel({ slides, autoPlay, autoPlayInterval, className, }: CarouselProps): react_jsx_runtime.JSX.Element | null;
declare namespace Carousel {
    var displayName: string;
}

interface CartItem {
    id: string;
    label: string;
    description?: string;
    price: number;
    removable?: boolean;
}
interface CartProps {
    items: CartItem[];
    currency?: string;
    onRemove?: (itemId: string) => void;
    onCheckout?: () => void;
    checkoutLabel?: string;
    className?: string;
}
declare function Cart({ items, currency, onRemove, onCheckout, checkoutLabel, className, }: CartProps): react_jsx_runtime.JSX.Element;
declare namespace Cart {
    var displayName: string;
}

interface FAQItem {
    question: string;
    answer: React.ReactNode;
}
interface FAQProps {
    title?: string;
    items: FAQItem[];
    className?: string;
}
declare function FAQ({ title, items, className, }: FAQProps): react_jsx_runtime.JSX.Element;
declare namespace FAQ {
    var displayName: string;
}

interface FooterLink {
    label: string;
    href: string;
}
interface FooterColumn {
    title: string;
    links: FooterLink[];
}
interface SocialLink {
    icon: string;
    href: string;
    label: string;
}
interface FooterProps {
    logoText?: string;
    columns: FooterColumn[];
    socialLinks?: SocialLink[];
    legalText?: string;
    className?: string;
}
declare function Footer({ logoText, columns, socialLinks, legalText, className, }: FooterProps): react_jsx_runtime.JSX.Element;
declare namespace Footer {
    var displayName: string;
}

interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}
interface NavigationProps {
    logoText?: string;
    links: NavLink[];
    actions?: React.ReactNode;
    className?: string;
}
declare function Navigation({ logoText, links, actions, className, }: NavigationProps): react_jsx_runtime.JSX.Element;
declare namespace Navigation {
    var displayName: string;
}

interface VehicleDetails {
    make: string;
    model: string;
    year: number;
    plate?: string;
    talonNumber?: string;
    verified?: boolean;
}
interface VehicleDetailsCardProps {
    vehicle: VehicleDetails;
    onEdit?: () => void;
    className?: string;
}
declare function VehicleDetailsCard({ vehicle, onEdit, className, }: VehicleDetailsCardProps): react_jsx_runtime.JSX.Element;
declare namespace VehicleDetailsCard {
    var displayName: string;
}

export { AuthLayout, type AuthLayoutProps, Carousel, type CarouselProps, type CarouselSlide, Cart, type CartItem, type CartProps, DashboardLayout, type DashboardLayoutProps, FAQ, type FAQItem, type FAQProps, Footer, type FooterColumn, type FooterLink, type FooterProps, type NavLink, Navigation, type NavigationProps, type SocialLink, type VehicleDetails, VehicleDetailsCard, type VehicleDetailsCardProps };
