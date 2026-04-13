import React from "react";
import { OrganizationContext } from "./use-organization";
import { OrganizationContextValue } from "../types/common";

const DEFAULT_ORGANIZATION = "lemoncode";
const ORGANIZATION_STORAGE_KEY = "github.organization";

interface OrganizationProviderProps {
  children: React.ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
  children
}) => {
  const [organization, setOrganizationState] = React.useState<string>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_ORGANIZATION;
    }

    const storedOrganization =
      window.localStorage.getItem(ORGANIZATION_STORAGE_KEY)?.trim() ?? "";

    return storedOrganization || DEFAULT_ORGANIZATION;
  });

  const setOrganization = React.useCallback((nextOrganization: string) => {
    const normalizedOrganization = nextOrganization.trim();
    setOrganizationState(normalizedOrganization || DEFAULT_ORGANIZATION);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(ORGANIZATION_STORAGE_KEY, organization);
  }, [organization]);

  const value = React.useMemo<OrganizationContextValue>(
    () => ({ organization, setOrganization }),
    [organization, setOrganization]
  );

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
