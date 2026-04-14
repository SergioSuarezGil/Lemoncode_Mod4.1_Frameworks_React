import React from "react";
import { Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  MembersHeader,
  MembersList,
  MembersStatus,
  OrganizationForm
} from "../../components/github";
import { PageFeedback } from "../../components/common";
import { GitHubMember } from "../../types/github";
import { getOrganizationMembers } from "../../services/github";
import { useOrganization } from "../../context";
import { useAsyncStatus, useQueryPage } from "../../hooks/common";

const MEMBERS_PER_PAGE = 10;

export const ListPage: React.FC = () => {
  const { organization, setOrganization } = useOrganization();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setPage } = useQueryPage({
    searchParams,
    setSearchParams
  });
  const detailSearchQuery = searchParams.toString();
  const { isLoading, errorMessage, run } = useAsyncStatus();

  const [members, setMembers] = React.useState<GitHubMember[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const hasError = errorMessage !== "";
  const hasMembers = members.length > 0;
  const showMembersTable = !isLoading && !hasError && hasMembers;
  const showEmptyState =
    !isLoading && !hasError && !hasMembers && currentPage === 1;

  React.useEffect(() => {
    const loadMembers = async () => {
      const response = await run(() =>
        getOrganizationMembers(organization, currentPage, MEMBERS_PER_PAGE)
      );

      if (!response) {
        setMembers([]);
        setTotalPages(1);
        return;
      }

      setMembers(response.members);
      setTotalPages(response.totalPages);
    };

    loadMembers();
  }, [currentPage, organization, run]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setPage(1);
    }
  }, [currentPage, setPage, totalPages]);

  const handleSearch = (organizationInput: string) => {
    setOrganization(organizationInput);
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <section className="github-members">
      <MembersHeader />

      <OrganizationForm organization={organization} onSearch={handleSearch} />

      <MembersStatus organization={organization} hasError={hasError} />

      <PageFeedback
        isLoading={isLoading}
        loadingText="Cargando miembros..."
        errorMessage={errorMessage}
        showEmptyState={false}
        emptyMessage=""
        loadingClassName="github-members__feedback"
      />

      {showEmptyState && (
        <Alert severity="info">
          Esta organización no tiene miembros públicos.
        </Alert>
      )}

      {showMembersTable && (
        <MembersList
          members={members}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={detailSearchQuery ? `?${detailSearchQuery}` : ""}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
