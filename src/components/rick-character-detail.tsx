import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { RickAndMortyCharacter } from "../types/rick-and-morty-character";

interface RickCharacterDetailProps {
  character: RickAndMortyCharacter | null;
}

export const RickCharacterDetail: React.FC<RickCharacterDetailProps> = ({
  character
}) => {
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
            <Typography>
              <strong>Estado:</strong> {character.status}
            </Typography>
            <Typography>
              <strong>Especie:</strong> {character.species}
            </Typography>
            <Typography>
              <strong>Genero:</strong> {character.gender}
            </Typography>
            <Typography>
              <strong>Origen:</strong> {character.origin.name}
            </Typography>
            <Typography>
              <strong>Ubicacion:</strong> {character.location.name}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
