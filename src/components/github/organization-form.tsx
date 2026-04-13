import React from "react";
import { Button, TextField, Typography } from "@mui/material";

interface OrganizationFormProps {
  organization: string;
  onSearch: (organization: string) => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organization,
  onSearch
}) => {
  const [organizationInput, setOrganizationInput] =
    React.useState<string>(organization);

  React.useEffect(() => {
    setOrganizationInput(organization);
  }, [organization]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(organizationInput);
  };

  return (
    <form className="github-members__filters" onSubmit={handleSubmit}>
      <Typography
        className="github-members__label"
        component="label"
        htmlFor="organization"
      >
        Organización
      </Typography>
      <TextField
        id="organization"
        size="small"
        placeholder="Ejemplo: lemoncode"
        value={organizationInput}
        onChange={(event) => setOrganizationInput(event.target.value)}
      />
      <Button
        className="github-members__button"
        type="submit"
        variant="contained"
      >
        Buscar
      </Button>
    </form>
  );
};
