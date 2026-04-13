import React from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  CharacterDetail,
  CharacterList,
  CharacterSearch,
  PageHeader
} from "../../components/rick-and-morty";
import { PageFeedback, PaginationControl } from "../../components/common";
import { useDebounce, useQueryPage } from "../../hooks/common";
import { getRickAndMortyCharacters } from "../../services/rick-and-morty";
import { RickAndMortyCharacter } from "../../types/rick-and-morty";

export const CharactersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setPage } = useQueryPage({
    searchParams,
    setSearchParams
  });
  const queryFromUrl = searchParams.get("q") ?? "";
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
    const extraParams = normalizedQuery ? { q: normalizedQuery } : {};
    setPage(page, extraParams);
  };

  const showEmptyState = !isLoading && !errorMessage && characters.length === 0;

  return (
    <Box className="rick-page">
      <PageHeader />

      <CharacterSearch searchInput={searchInput} onChange={setSearchInput} />

      <PageFeedback
        isLoading={isLoading}
        loadingText="Cargando personajes..."
        errorMessage={errorMessage}
        showEmptyState={showEmptyState}
        emptyMessage="No se encontraron personajes para esta búsqueda."
        loadingClassName="rick-page__feedback"
        alertClassName="rick-page__alert"
      />

      <div className="rick-page__layout">
        <CharacterList
          characters={characters}
          selectedCharacterId={selectedCharacter?.id}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail character={selectedCharacter} />
      </div>

      {characters.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="rick-page__pagination"
        />
      )}
    </Box>
  );
};
