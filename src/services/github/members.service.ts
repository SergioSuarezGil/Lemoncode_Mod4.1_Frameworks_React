import { GitHubMember } from "../../types/github";

const GITHUB_API_BASE_URL =
  import.meta.env.VITE_GITHUB_API_BASE_URL ?? "https://api.github.com";

interface OrganizationMembersResponse {
  members: GitHubMember[];
  totalPages: number;
}

const getTotalPagesFromLinkHeader = (
  linkHeader: string | null,
  currentPage: number,
  currentPageSize: number
): number => {
  if (!linkHeader) {
    return currentPageSize === 0 ? 1 : currentPage;
  }

  const lastPageMatch = linkHeader.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);

  if (lastPageMatch) {
    return Number(lastPageMatch[1]);
  }

  const hasNextPage = /rel="next"/.test(linkHeader);

  if (hasNextPage) {
    return currentPage + 1;
  }

  return Math.max(1, currentPage);
};

export const getOrganizationMembers = async (
  organization: string,
  page: number,
  perPage: number
): Promise<OrganizationMembersResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage)
  });

  const response = await fetch(
    `${GITHUB_API_BASE_URL}/orgs/${encodeURIComponent(organization)}/members?${params.toString()}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No se encontro esa organizacion en GitHub.");
    }

    throw new Error("No se pudo cargar el listado de miembros.");
  }

  const members: GitHubMember[] = await response.json();
  const totalPages = getTotalPagesFromLinkHeader(
    response.headers.get("link"),
    page,
    members.length
  );

  return {
    members,
    totalPages
  };
};
