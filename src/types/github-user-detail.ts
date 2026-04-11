export interface GitHubUserDetail {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  company: string | null;
  bio: string | null;
  location: string | null;
}
