import { Button as ShadcnButton } from "@/components/ui/button";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

const variantMap: Record<ButtonVariant, ComponentProps<typeof ShadcnButton>["variant"]> = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  destructive: "destructive",
};

const sizeMap: Record<ButtonSize, ComponentProps<typeof ShadcnButton>["size"]> = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

type ButtonProps = Omit<ComponentProps<typeof ShadcnButton>, "variant" | "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      disabled={disabled}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};