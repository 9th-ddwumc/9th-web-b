/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
    readonly env: VITE_TMDB_KEY;
}