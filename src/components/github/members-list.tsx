import React from "react";
import { PaginationControl } from "../common";
import { GitHubMember } from "../../types/github";
import { MemberRow } from "./member-row";

interface MembersListProps {
  members: GitHubMember[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
}

export const MembersList: React.FC<MembersListProps> = ({
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
            <MemberRow
              key={member.id}
              member={member}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </div>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};
