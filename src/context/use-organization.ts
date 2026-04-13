import React from "react";
import { OrganizationContextValue } from "../types/common";

export const OrganizationContext =
  React.createContext<OrganizationContextValue | null>(null);

export const useOrganization = (): OrganizationContextValue => {
  const context = React.useContext(OrganizationContext);

  if (!context) {
    throw new Error(
      "useOrganization debe utilizarse dentro de OrganizationProvider"
    );
  }

  return context;
};
