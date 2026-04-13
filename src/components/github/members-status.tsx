import React from "react";

interface MembersStatusProps {
  organization: string;
  hasError: boolean;
}

export const MembersStatus: React.FC<MembersStatusProps> = ({
  organization,
  hasError
}) => {
  const organizationUrl = `https://github.com/orgs/${organization}/people`;

  return (
    <p className="github-members__status">
      Organización actual:{" "}
      <span className="github-members__status-value">{organization}</span>
      {!hasError ? (
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
  );
};
