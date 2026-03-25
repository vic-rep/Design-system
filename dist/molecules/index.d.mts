import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Button — Molecule
 * Figma: nG8PGu5CclffafrfZuMG9G node 108:2107
 * Doc: .claude/skills/docs/molecules/button.md
 *
 * Types: Primary, Secondary, Link, Icon
 * Sizes: S, M, L, XL
 * States: Default, Hover, Active, Focus, Disabled
 */
type ButtonType = "primary" | "secondary" | "link" | "icon";
type ButtonSize = "s" | "m" | "l" | "xl";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonType;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Input — Molecule
 * Figma: Page 45:8 → Node 156:1333
 *
 * Types: text, textarea, dropdown, plate, phone, datepicker
 * States: default, filled, focus, typing, error, disabled
 * Shared field: 41px height (60px textarea), --m padding, --s border-radius
 * Label: 10px caption, --xs horizontal padding
 * Error: bg --destructive-100, border --destructive-300, error tooltip top-right
 * Focus: border --primary-400
 * Disabled: opacity-20
 */
type InputType = "text" | "textarea" | "dropdown" | "plate" | "phone" | "datepicker";
interface InputOption {
    value: string;
    label: string;
}
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, "size" | "type"> {
    inputType?: InputType;
    label?: string;
    error?: string;
    showLabel?: boolean;
    options?: InputOption[];
    countryCode?: string;
    countryFlag?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>;

/**
 * Alert — Molecule (collapsible notification banner)
 * Figma: Page 45:13 → Node 269:4635
 * Doc: .claude/skills/docs/molecules/alert.md
 *
 * Variants: warning, error, info, success
 * Pattern: Single-item accordion — collapsed shows title, expanded shows description + buttons
 */
type AlertVariant = "warning" | "error" | "info" | "success";
interface AlertAction {
    label: string;
    onClick: () => void;
}
interface AlertProps {
    variant?: AlertVariant;
    title: string;
    description?: string;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onToggle?: (expanded: boolean) => void;
    primaryAction?: AlertAction;
    secondaryAction?: AlertAction;
    className?: string;
}
declare function Alert({ variant, title, description, expanded: controlledExpanded, defaultExpanded, onToggle, primaryAction, secondaryAction, className, }: AlertProps): react_jsx_runtime.JSX.Element;

/**
 * Toggle — Molecule (binary on/off switch)
 * Figma: Page 74:39 → Section 176:1866
 * Doc: .claude/skills/docs/molecules/toggle.md
 *
 * States: off (Primary-300 track), on (Accent-600 track), disabled, focused
 * Motion: 150ms ease on background + transform
 */
type ToggleSize = "sm" | "md";
interface ToggleProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: ToggleSize;
    label?: string;
    id?: string;
    className?: string;
}
declare function Toggle({ checked, onChange, disabled, size, label, id: externalId, className, }: ToggleProps): react_jsx_runtime.JSX.Element;

/**
 * Checkbox — Molecule (binary selection with label)
 * Figma: Page 45:6 → Node 157:11
 * Doc: .claude/skills/docs/molecules/checkbox.md
 *
 * States: unchecked, checked (Accent-600 fill + white checkmark), disabled, error, warning
 * Motion: Check/uncheck 150ms ease on background/border
 */
interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    error?: boolean;
    warning?: boolean;
    label?: string;
    message?: string;
    id?: string;
    className?: string;
}
declare function Checkbox({ checked, onChange, disabled, error, warning, label, message, id: externalId, className, }: CheckboxProps): react_jsx_runtime.JSX.Element;

/**
 * Tooltip — Molecule (contextual help on hover/focus)
 * Figma: Page 97:1419 → Node 176:2062
 *
 * Types: info (default), error
 * Positions: top, bottom, left, right
 * Info: Primary-900 bg, white text, dark arrow
 * Error: Primary-100 bg, destructive-200 border, destructive-600 text, matching arrow
 * Show: 200ms delay on hover/focus; hide instant
 */
type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipType = "info" | "error";
interface TooltipProps {
    content: string;
    type?: TooltipType;
    position?: TooltipPosition;
    children: React.ReactElement;
}
declare function Tooltip({ content, type, position, children, }: TooltipProps): react_jsx_runtime.JSX.Element;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
}
declare const Modal: React.FC<ModalProps>;

/**
 * Tabs — Molecule
 * Figma: Page 45:9 → Node 514:5451
 *
 * Pill-style tab group in a white rounded container.
 * Active tab: --primary-900 bg, white text
 * Default tab: transparent bg, --primary-600 text
 * Hover: --primary-100 bg
 * Container: --surface-adjacent bg, --s padding, full rounded
 */
interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
}
declare function Tabs({ items, value: controlledValue, defaultValue, onChange, className, }: TabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var displayName: string;
}

/**
 * ContextMenu — Molecule
 * Figma: Page 45:10 → Node 133:379
 * Doc: .claude/skills/docs/molecules/context-menu.md
 *
 * Container: surface-adjacent bg, primary-100 border, elevation-level1, rounded-s, p-m
 * Item: p-m, rounded-xs, 16px text, optional left icon (accent-600), additional text, right icon
 * States: Default, Hover (primary-100), Focus (accent-700 border), Pressed (primary-200), Disabled (opacity-20)
 */
interface ContextMenuItem {
    id: string;
    label: string;
    leftIcon?: string;
    rightIcon?: string;
    additionalText?: string;
    disabled?: boolean;
    destructive?: boolean;
    dividerAfter?: boolean;
}
interface ContextMenuProps {
    items: ContextMenuItem[];
    open: boolean;
    onClose: () => void;
    onSelect?: (id: string) => void;
    className?: string;
}
declare function ContextMenu({ items, open, onClose, onSelect, className, }: ContextMenuProps): react_jsx_runtime.JSX.Element | null;
declare namespace ContextMenu {
    var displayName: string;
}

/**
 * ProgressBar — Molecule (stepper / progress indicator)
 * Figma: Node 2474:42 (web) & 815:144 (mobile)
 * Doc: .claude/skills/docs/molecules/progress-bar.md
 *
 * Web: back button ("Назад") + step label on right + full-width progress track
 * Mobile: chevron-left back button + step label + progress track
 * Track: primary-300 bg, xs height, rounded-[1000px]
 * Fill: accent-600 (animated width)
 */
interface ProgressBarProps {
    /** Current step (1-based) */
    currentStep: number;
    /** Total steps */
    totalSteps: number;
    /** Label for current step */
    stepLabel?: string;
    /** Back button label (web only) */
    backLabel?: string;
    /** Show back button */
    showBack?: boolean;
    /** Back button handler */
    onBack?: () => void;
    className?: string;
}
declare function ProgressBar({ currentStep, totalSteps, stepLabel, backLabel, showBack, onBack, className, }: ProgressBarProps): react_jsx_runtime.JSX.Element;
declare namespace ProgressBar {
    var displayName: string;
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}
declare function Pagination({ currentPage, totalPages, onPageChange, className, }: PaginationProps): react_jsx_runtime.JSX.Element;
declare namespace Pagination {
    var displayName: string;
}

/**
 * Pill — Molecule (compact label / filter chip)
 * Figma: Page 74:11 → Node 409:3053
 * Doc: .claude/skills/docs/molecules/pill.md
 *
 * Sizes: XS, S, M, L (with size-specific padding, text, icon sizes)
 * Variants: default, accent, success, warning, destructive
 * Features: border/stroke, optional leading/trailing FA icons
 */
type PillVariant = "default" | "accent" | "success" | "warning" | "destructive";
type PillSize = "xs" | "s" | "m" | "l";
interface PillProps {
    children: React.ReactNode;
    variant?: PillVariant;
    size?: PillSize;
    selected?: boolean;
    onClick?: () => void;
    leftIcon?: string;
    rightIcon?: string;
    className?: string;
}
declare function Pill({ children, variant, size, selected, onClick, leftIcon, rightIcon, className, }: PillProps): react_jsx_runtime.JSX.Element;
declare namespace Pill {
    var displayName: string;
}

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface RadioGroupProps {
    name: string;
    legend?: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}
declare function RadioGroup({ name, legend, options, value, onChange, className, }: RadioGroupProps): react_jsx_runtime.JSX.Element;
declare namespace RadioGroup {
    var displayName: string;
}

interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    showValue?: boolean;
    formatValue?: (value: number) => string;
    disabled?: boolean;
    className?: string;
}
declare function Slider({ min, max, step, value, onChange, label, showValue, formatValue, disabled, className, }: SliderProps): react_jsx_runtime.JSX.Element;
declare namespace Slider {
    var displayName: string;
}

/**
 * Tag — Molecule (compact removable label)
 * Figma: Node 3101:727
 * Doc: .claude/skills/docs/molecules/tag.md
 *
 * Sizes: xs, s, m, l
 * Border: surface-adjacent-2 (#e1e5eb)
 * Border radius: var(--xs) (4px)
 * Optional left icon (FA solid)
 * Right icon is always close/remove button
 */
type TagSize = "xs" | "s" | "m" | "l";
interface TagProps {
    children: React.ReactNode;
    size?: TagSize;
    leftIcon?: string;
    onRemove?: () => void;
    className?: string;
}
declare function Tag({ children, size, leftIcon, onRemove, className, }: TagProps): react_jsx_runtime.JSX.Element;
declare namespace Tag {
    var displayName: string;
}

type ToastVariant = "info" | "success" | "warning" | "destructive";
interface ToastAction {
    label: string;
    onClick: () => void;
}
interface ToastProps {
    message: string;
    variant?: ToastVariant;
    duration?: number;
    action?: ToastAction;
    onDismiss: () => void;
    className?: string;
}
declare function Toast({ message, variant, duration, action, onDismiss, className, }: ToastProps): react_jsx_runtime.JSX.Element;
declare namespace Toast {
    var displayName: string;
}

export { Alert, type AlertAction, type AlertProps, type AlertVariant, Button, type ButtonProps, type ButtonSize, type ButtonType, Checkbox, type CheckboxProps, ContextMenu, type ContextMenuItem, type ContextMenuProps, Input, type InputOption, type InputProps, type InputType, Modal, type ModalProps, Pagination, type PaginationProps, Pill, type PillProps, type PillVariant, ProgressBar, type ProgressBarProps, RadioGroup, type RadioGroupProps, type RadioOption, Slider, type SliderProps, type TabItem, Tabs, type TabsProps, Tag, type TagProps, type TagSize, Toast, type ToastAction, type ToastProps, type ToastVariant, Toggle, type ToggleProps, type ToggleSize, Tooltip, type TooltipPosition, type TooltipProps, type TooltipType };
