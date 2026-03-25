// Atoms
export {
  Badge,
  Typography,
  Icon,
} from "./components/atoms";
export type {
  BadgeProps, BadgeVariant, BadgeSize,
  TypographyProps, TypographyVariant, TypographyColor,
  IconProps, IconSize, IconWeight,
} from "./components/atoms";

// Atoms that share names with molecules — export with Atom prefix
export {
  Button as AtomButton,
  Input as AtomInput,
  Toggle as AtomToggle,
} from "./components/atoms";
export type {
  ButtonProps as AtomButtonProps,
  ButtonVariant as AtomButtonVariant,
  ButtonSize as AtomButtonSize,
  InputProps as AtomInputProps,
  InputVariant as AtomInputVariant,
  InputSize as AtomInputSize,
  ToggleProps as AtomToggleProps,
  ToggleSize as AtomToggleSize,
} from "./components/atoms";

// Molecules (these take precedence for Button, Input, Toggle, Modal)
export * from "./components/molecules";

// Organisms — export with explicit names to avoid Modal collision
export {
  Navbar,
  Sidebar,
  DataTable,
  Accordion,
  Drawer,
  OffersList,
} from "./components/organisms";
export type {
  NavbarProps,
  SidebarProps, SidebarSection, SidebarItem,
  DataTableProps, DataTableColumn, SortDirection,
  AccordionProps, AccordionItem,
  DrawerProps, DrawerType,
  OffersListProps, Offer, OfferProductType, OfferPrice,
  InsuranceOffer, QuickLoanOffer, FineOffer, CarLeasingOffer,
} from "./components/organisms";
export {
  Modal as OrganismModal,
} from "./components/organisms";
export type {
  ModalProps as OrganismModalProps,
  ModalSize,
} from "./components/organisms";

// Templates
export * from "./components/templates";

// Theme
export { ThemeProvider, useTheme } from "./lib/theme";
