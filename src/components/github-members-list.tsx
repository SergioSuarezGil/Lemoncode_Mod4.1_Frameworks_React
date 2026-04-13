import React from "react";
import { Box, Pagination } from "@mui/material";
import { GitHubMember } from "../types/github-member";
import { GitHubMemberRow } from "./github-member-row";

interface GitHubMembersListProps {
  members: GitHubMember[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
}

export const GitHubMembersList: React.FC<GitHubMembersListProps> = ({
  members,
  currentPage,
  totalPages,
  searchQuery,
  onPageChange
}) => {
  return (
    <>
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
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            count={totalPages}
            color="primary"
            onChange={onPageChange}
          />
        </Box>
      )}
    </>
  );
};
