/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // 👈 define your custom env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
