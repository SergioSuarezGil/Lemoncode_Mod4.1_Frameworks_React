import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { GitHubMembersList } from "../components/github-members-list";
import { GitHubMember } from "../types/github-member";
import { getOrganizationMembers } from "../services/github-members.service";

const DEFAULT_ORGANIZATION = "lemoncode";
const MEMBERS_PER_PAGE = 10;

export const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const organizationFromUrl =
    searchParams.get("org")?.trim() || DEFAULT_ORGANIZATION;
  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;
  const organizationUrl = `https://github.com/orgs/${organizationFromUrl}/people`;
  const detailSearchQuery = searchParams.toString();

  const [members, setMembers] = React.useState<GitHubMember[]>([]);
  const [organizationInput, setOrganizationInput] =
    React.useState<string>(organizationFromUrl);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const hasError = errorMessage !== "";
  const hasMembers = members.length > 0;
  const totalPages = Math.max(1, Math.ceil(members.length / MEMBERS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * MEMBERS_PER_PAGE;
  const visibleMembers = members.slice(
    pageStartIndex,
    pageStartIndex + MEMBERS_PER_PAGE
  );
  const showMembersTable = !isLoading && !hasError && hasMembers;
  const showEmptyState = !isLoading && !hasError && !hasMembers;

  React.useEffect(() => {
    setOrganizationInput(organizationFromUrl);
  }, [organizationFromUrl]);

  React.useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const responseMembers =
          await getOrganizationMembers(organizationFromUrl);
        setMembers(responseMembers);
      } catch (error) {
        setMembers([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Se produjo un error inesperado."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, [organizationFromUrl]);

  React.useEffect(() => {
    if (!hasMembers) {
      return;
    }

    if (currentPage > totalPages) {
      setSearchParams({ org: organizationFromUrl, searched: "1", page: "1" });
    }
  }, [
    currentPage,
    hasMembers,
    organizationFromUrl,
    setSearchParams,
    totalPages
  ]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedOrganization = organizationInput.trim();

    if (!normalizedOrganization) {
      setSearchParams({});
      return;
    }

    setSearchParams({ org: normalizedOrganization, searched: "1", page: "1" });
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSearchParams({
      org: organizationFromUrl,
      searched: "1",
      page: String(page)
    });
  };

  return (
    <section className="github-members">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <h2 className="github-members__title">Miembros de GitHub</h2>
        <Button variant="outlined" component={RouterLink} to="/rick-and-morty">
          Rick and Morty
        </Button>
      </Box>

      <form className="github-members__filters" onSubmit={handleSearch}>
        <Typography
          className="github-members__label"
          component="label"
          htmlFor="organization"
        >
          Organización
        </Typography>
        <TextField
          id="organization"
          size="small"
          placeholder="Ejemplo: lemoncode"
          value={organizationInput}
          onChange={(event) => setOrganizationInput(event.target.value)}
        />
        <Button
          className="github-members__button"
          type="submit"
          variant="contained"
        >
          Buscar
        </Button>
      </form>

      <p className="github-members__status">
        Organización actual:{" "}
        <span className="github-members__status-value">
          {organizationFromUrl}
        </span>
        {!errorMessage ? (
          <a
            className="github-members__status-link"
            href={organizationUrl}
            target="_blank"
            rel="noreferrer"
          >
            # Abrir en GitHub
          </a>
        ) : null}
      </p>

      {isLoading && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          className="github-members__feedback"
        >
          <CircularProgress size={20} />
          <span>Cargando miembros...</span>
        </Box>
      )}

      {hasError && <Alert severity="error">{errorMessage}</Alert>}

      {showEmptyState && (
        <Alert severity="info">
          Esta organización no tiene miembros públicos.
        </Alert>
      )}

      {showMembersTable && (
        <GitHubMembersList
          members={visibleMembers}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          searchQuery={detailSearchQuery ? `?${detailSearchQuery}` : ""}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
