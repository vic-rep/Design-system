import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface NavbarProps {
    title: string;
    onThemeToggle?: () => void;
    isDark?: boolean;
}
declare const Navbar: React.FC<NavbarProps>;

interface SidebarItem {
    id: string;
    label: string;
    href: string;
}
interface SidebarSection {
    title: string;
    items: SidebarItem[];
}
interface SidebarProps {
    sections: SidebarSection[];
    activeId?: string;
    onNavigate?: (id: string, href: string) => void;
}
declare const Sidebar: React.FC<SidebarProps>;

interface DataTableColumn {
    key: string;
    label: string;
    width?: string;
}
type SortDirection = "asc" | "desc";
interface DataTableProps {
    columns: DataTableColumn[];
    rows: Record<string, React.ReactNode>[];
    sortable?: boolean;
    onSort?: (key: string, direction: SortDirection) => void;
}
declare const DataTable: React.FC<DataTableProps>;

type ModalSize = "sm" | "md" | "lg";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: ModalSize;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
declare const Modal: React.FC<ModalProps>;

/**
 * Accordion — Organism
 * Figma: Node 648:1547
 *
 * Flat list with divider lines (top/bottom borders per item).
 * Expanded: accent-colored top line, title (18px medium) + chevron-up, content (14px)
 * Collapsed: title (18px medium) + chevron-down
 * Chevron: 12px fa-regular, no rotation animation — just swaps up/down
 * Padding: px-l for title and content, gap-l between title and content
 * Bottom padding: pb-4xl below each expanded item
 */
interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
}
interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpenIds?: string[];
    className?: string;
}
declare function Accordion({ items, allowMultiple, defaultOpenIds, className, }: AccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var displayName: string;
}

/**
 * Drawer — Organism (slide-in panel replacing modals)
 * Figma: Node 4032:12225
 *
 * Types:
 *   info   — Informative, read-only content. Right-slide on all screens.
 *   action — Actionable content (forms, selections). Bottom-slide on mobile, right-slide on desktop.
 *
 * Mobile info: right→left, 300px max-width, full height, X close, 20px padding, 480ms
 * Mobile action: bottom→top, 600px max-width, content-hugged height, optional notch, 480ms open / 240ms close
 * Desktop: right→left, 480px width, header + X + content + footer, 24px padding, 600ms
 *
 * Overlay: #191919 at 25% opacity
 * Easing: cubic-bezier(0.32, 0.72, 0, 1)
 */
type DrawerType = "info" | "action";
interface DrawerProps {
    open: boolean;
    onClose: () => void;
    type?: DrawerType;
    title?: string;
    /** Show drag handle notch (mobile action only) */
    notch?: boolean;
    /** Footer content */
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
declare function Drawer({ open, onClose, type, title, notch, footer, children, className, }: DrawerProps): react_jsx_runtime.JSX.Element;
declare namespace Drawer {
    var displayName: string;
}

type OfferProductType = "mtpl" | "casco" | "travel" | "quickLoans" | "fines" | "carLeasing";
interface OfferPrice {
    amount: number;
    currency?: string;
    euroEquivalent?: number;
}
/** MTPL / Casco / Travel offer */
interface InsuranceOffer {
    id: string;
    type: "mtpl" | "casco" | "travel";
    companyName: string;
    companyLogo?: string;
    recommended?: boolean;
    showInstallments?: boolean;
    installmentLabel?: string;
    installmentPrice: OfferPrice;
    totalLabel?: string;
    totalPrice: OfferPrice;
}
/** QuickLoans offer */
interface QuickLoanOffer {
    id: string;
    type: "quickLoans";
    companyName: string;
    companyLogo?: string;
    duration: string;
    selected?: boolean;
}
/** Fines offer */
interface FineOffer {
    id: string;
    type: "fines";
    title: string;
    date: string;
    price: OfferPrice;
    status: string;
    statusIcon?: string;
}
/** Car Leasing offer */
interface CarLeasingOffer {
    id: string;
    type: "carLeasing";
    companyName: string;
    companyLogo?: string;
    installmentLabel?: string;
    installmentPrice: OfferPrice;
    selected?: boolean;
}
type Offer = InsuranceOffer | QuickLoanOffer | FineOffer | CarLeasingOffer;
interface OffersListProps {
    offers: Offer[];
    loading?: boolean;
    onSelect?: (offerId: string) => void;
    onToggle?: (offerId: string, selected: boolean) => void;
    className?: string;
}
declare function OffersList({ offers, loading, onSelect, onToggle, className, }: OffersListProps): react_jsx_runtime.JSX.Element;
declare namespace OffersList {
    var displayName: string;
}

export { Accordion, type AccordionItem, type AccordionProps, type CarLeasingOffer, DataTable, type DataTableColumn, type DataTableProps, Drawer, type DrawerProps, type DrawerType, type FineOffer, type InsuranceOffer, Modal, type ModalProps, type ModalSize, Navbar, type NavbarProps, type Offer, type OfferPrice, type OfferProductType, OffersList, type OffersListProps, type QuickLoanOffer, Sidebar, type SidebarItem, type SidebarProps, type SidebarSection, type SortDirection };
