import React from "react";
import { Link } from "react-router-dom";
import { GitHubMember } from "../types/github-member";

interface GitHubMemberRowProps {
  member: GitHubMember;
  searchQuery: string;
}

export const GitHubMemberRow: React.FC<GitHubMemberRowProps> = ({
  member,
  searchQuery
}) => {
  const detailPath = `/detail/${member.login}${searchQuery}`;

  return (
    <Link className="github-members__row" to={detailPath}>
      <img
        className="github-members__avatar"
        src={member.avatar_url}
        alt={member.login}
      />
      <span className="github-members__value">{member.id}</span>
      <span className="github-members__value github-members__value--name">
        {member.login}
      </span>
    </Link>
  );
};
