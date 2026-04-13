import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { RickAndMortyCharacter } from "../../types/rick-and-morty";

interface CharacterDetailProps {
  character: RickAndMortyCharacter | null;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character
}) => {
  const detailRows = character
    ? [
        { label: "Estado", value: character.status },
        { label: "Especie", value: character.species },
        { label: "Genero", value: character.gender },
        { label: "Origen", value: character.origin.name },
        { label: "Ubicacion", value: character.location.name }
      ]
    : [];

  return (
    <Card className="rick-character-detail">
      <CardContent>
        {!character ? (
          <Typography variant="body1">
            Selecciona un personaje para ver su detalle.
          </Typography>
        ) : (
          <div className="rick-character-detail__content">
            <Avatar
              src={character.image}
              alt={character.name}
              className="rick-character-detail__avatar"
            />
            <Typography variant="h5">{character.name}</Typography>
            {detailRows.map((row) => (
              <Typography key={row.label}>
                <strong>{row.label}:</strong> {row.value}
              </Typography>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
