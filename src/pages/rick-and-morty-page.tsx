import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { RickCharacterDetail } from "../components/rick-character-detail";
import { RickCharacterList } from "../components/rick-character-list";
import { useDebounce } from "../hooks/use-debounce";
import { getRickAndMortyCharacters } from "../services/rick-and-morty.service";
import { RickAndMortyCharacter } from "../types/rick-and-morty-character";

export const RickAndMortyPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;
  const normalizedQuery = queryFromUrl.trim();

  const [searchInput, setSearchInput] = React.useState(queryFromUrl);
  const [characters, setCharacters] = React.useState<RickAndMortyCharacter[]>(
    []
  );
  const [selectedCharacterId, setSelectedCharacterId] = React.useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(1);

  const debouncedSearch = useDebounce(searchInput, 500);

  React.useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  React.useEffect(() => {
    const normalizedDebouncedSearch = debouncedSearch.trim();

    if (normalizedDebouncedSearch === normalizedQuery) {
      return;
    }

    const nextParams: Record<string, string> = { page: "1" };

    if (normalizedDebouncedSearch) {
      nextParams.q = normalizedDebouncedSearch;
    }

    setSearchParams(nextParams);
  }, [debouncedSearch, normalizedQuery, setSearchParams]);

  React.useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getRickAndMortyCharacters(
          normalizedQuery,
          currentPage
        );
        setCharacters(response.characters);
        setTotalPages(response.totalPages);
      } catch (error) {
        setCharacters([]);
        setTotalPages(1);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Se produjo un error inesperado."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, [currentPage, normalizedQuery]);

  React.useEffect(() => {
    if (!characters.length) {
      setSelectedCharacterId(null);
      return;
    }

    const selectedExists = characters.some(
      (character) => character.id === selectedCharacterId
    );

    if (!selectedExists) {
      setSelectedCharacterId(characters[0].id);
    }
  }, [characters, selectedCharacterId]);

  const selectedCharacter =
    characters.find((character) => character.id === selectedCharacterId) ??
    null;

  const handleSelectCharacter = (character: RickAndMortyCharacter) => {
    setSelectedCharacterId(character.id);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const nextParams: Record<string, string> = { page: String(page) };

    if (normalizedQuery) {
      nextParams.q = normalizedQuery;
    }

    setSearchParams(nextParams);
  };

  const showEmptyState = !isLoading && !errorMessage && characters.length === 0;

  return (
    <Box className="rick-page">
      <div className="rick-page__header">
        <Typography variant="h4" component="h1">
          Personajes de Rick y Morty
        </Typography>
        <Button component={RouterLink} to="/list" variant="outlined">
          Volver a GitHub
        </Button>
      </div>

      <Paper className="rick-page__search-panel">
        <TextField
          fullWidth
          label="Buscar personaje"
          placeholder="Ejemplo: Rick, Morty, Summer"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </Paper>

      {isLoading && (
        <div className="rick-page__feedback">
          <CircularProgress size={20} />
          <Typography>Cargando personajes...</Typography>
        </div>
      )}

      {errorMessage && (
        <Alert severity="error" className="rick-page__alert">
          {errorMessage}
        </Alert>
      )}
      {showEmptyState && (
        <Alert severity="info" className="rick-page__alert">
          No se encontraron personajes para esta búsqueda.
        </Alert>
      )}

      <div className="rick-page__layout">
        <RickCharacterList
          characters={characters}
          selectedCharacterId={selectedCharacter?.id}
          onSelectCharacter={handleSelectCharacter}
        />
        <RickCharacterDetail character={selectedCharacter} />
      </div>

      {characters.length > 0 && totalPages > 1 && (
        <div className="rick-page__pagination">
          <Pagination
            page={currentPage}
            count={totalPages}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      )}
    </Box>
  );
};
