/// <reference types="vite/client" />

declare module "*.css";

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_BASE_URL?: string;
  readonly VITE_RICK_AND_MORTY_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
