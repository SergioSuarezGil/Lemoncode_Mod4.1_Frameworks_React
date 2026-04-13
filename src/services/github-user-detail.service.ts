import { GitHubUserDetail } from "../types/github-user-detail";

const GITHUB_API_BASE_URL =
  import.meta.env.VITE_GITHUB_API_BASE_URL ?? "https://api.github.com";

export const getGitHubUserDetail = async (
  login: string
): Promise<GitHubUserDetail> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/users/${encodeURIComponent(login)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No se encontro ese usuario en GitHub.");
    }

    throw new Error("No se pudo cargar el detalle del usuario.");
  }

  return response.json();
};
