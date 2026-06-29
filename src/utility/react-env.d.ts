import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    commandfor?: string;
    command?: string;
  }
}
