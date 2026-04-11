import React from "react";
import { useSearchParams } from "react-router-dom";
import { GitHubMemberRow } from "../components/github-member-row";
import { GitHubMember } from "../types/github-member";
import { getOrganizationMembers } from "../services/github-members.service";

const DEFAULT_ORGANIZATION = "lemoncode";

export const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const organizationFromUrl = searchParams.get("org")?.trim() || DEFAULT_ORGANIZATION;
  const organizationUrl = `https://github.com/orgs/${organizationFromUrl}/people`;
  const detailSearchQuery = searchParams.toString();

  const [members, setMembers] = React.useState<GitHubMember[]>([]);
  const [organizationInput, setOrganizationInput] = React.useState<string>(organizationFromUrl);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const hasError = errorMessage !== "";
  const hasMembers = members.length > 0;
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
        const responseMembers = await getOrganizationMembers(organizationFromUrl);
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedOrganization = organizationInput.trim();

    if (!normalizedOrganization) {
      setSearchParams({});
      return;
    }

    setSearchParams({ org: normalizedOrganization, searched: "1" });
  };

  return (
    <section className="github-members">
      <h2 className="github-members__title">Miembros de GitHub</h2>

      <form className="github-members__filters" onSubmit={handleSearch}>
        <label className="github-members__label" htmlFor="organization">
          Organización:
        </label>
        <input
          id="organization"
          className="github-members__input"
          value={organizationInput}
          onChange={(event) => setOrganizationInput(event.target.value)}
        />
        <button className="github-members__button" type="submit">
          Buscar
        </button>
      </form>

      <p className="github-members__status">
        Organización actual: <span className="github-members__status-value">{organizationFromUrl}</span>
        {!errorMessage ? (
          <a
            className="github-members__status-link"
            href={organizationUrl}
            target="_blank"
            rel="noreferrer"
          >
            # Abrir en GitHub
          </a>
        ) : null}
      </p>

      {isLoading && (
        <p className="github-members__feedback">Cargando miembros...</p>
      )}

      {hasError && (
        <p className="github-members__feedback github-members__feedback--error">
          {errorMessage}
        </p>
      )}

      {showEmptyState && (
        <p className="github-members__feedback">
          Esta organización no tiene miembros públicos.
        </p>
      )}

      {showMembersTable && (
        <div className="github-members__table">
          <div className="github-members__grid github-members__grid--header">
            <span className="github-members__header">Avatar</span>
            <span className="github-members__header">Id</span>
            <span className="github-members__header">Nombre</span>
          </div>

          <div className="github-members__rows">
            {members.map((member) => (
              <GitHubMemberRow
                key={member.id}
                member={member}
                searchQuery={detailSearchQuery ? `?${detailSearchQuery}` : ""}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
