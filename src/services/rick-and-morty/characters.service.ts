import {
  RickAndMortyCharacter,
  RickAndMortyCharactersResponse
} from "../../types/rick-and-morty";

const RICK_AND_MORTY_API_URL =
  import.meta.env.VITE_RICK_AND_MORTY_API_URL ??
  "https://rickandmortyapi.com/api/character";

export const getRickAndMortyCharacters = async (
  name: string,
  page: number
): Promise<{ characters: RickAndMortyCharacter[]; totalPages: number }> => {
  const params = new URLSearchParams();

  if (name.trim()) {
    params.set("name", name.trim());
  }

  params.set("page", String(page));

  const response = await fetch(
    `${RICK_AND_MORTY_API_URL}?${params.toString()}`
  );

  if (response.status === 404) {
    return { characters: [], totalPages: 1 };
  }

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de personajes.");
  }

  const data: RickAndMortyCharactersResponse = await response.json();

  return {
    characters: data.results,
    totalPages: Math.max(1, data.info.pages)
  };
};
