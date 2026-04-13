import React from "react";
import { Paper, TextField } from "@mui/material";

interface CharacterSearchProps {
  searchInput: string;
  onChange: (value: string) => void;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({
  searchInput,
  onChange
}) => {
  return (
    <Paper className="rick-page__search-panel">
      <TextField
        fullWidth
        label="Buscar personaje"
        placeholder="Ejemplo: Rick, Morty, Summer"
        value={searchInput}
        onChange={(event) => onChange(event.target.value)}
      />
    </Paper>
  );
};
