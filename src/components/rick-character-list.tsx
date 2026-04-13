import React from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from "@mui/material";
import { RickAndMortyCharacter } from "../types/rick-and-morty-character";

interface RickCharacterListProps {
  characters: RickAndMortyCharacter[];
  selectedCharacterId?: number;
  onSelectCharacter: (character: RickAndMortyCharacter) => void;
}

export const RickCharacterList: React.FC<RickCharacterListProps> = ({
  characters,
  selectedCharacterId,
  onSelectCharacter
}) => {
  return (
    <Paper className="rick-character-list">
      <List>
        {characters.map((character) => (
          <ListItemButton
            key={character.id}
            selected={selectedCharacterId === character.id}
            onClick={() => onSelectCharacter(character)}
          >
            <ListItemAvatar>
              <Avatar src={character.image} alt={character.name} />
            </ListItemAvatar>
            <ListItemText
              primary={character.name}
              secondary={`${character.species} - ${character.status}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};
