import { GitHubMember } from "../types/github-member";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const getOrganizationMembers = async (
  organization: string
): Promise<GitHubMember[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/orgs/${encodeURIComponent(organization)}/members`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No se encontro esa organizacion en GitHub.");
    }

    throw new Error("No se pudo cargar el listado de miembros.");
  }

  return response.json();
};
