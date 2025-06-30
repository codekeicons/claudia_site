// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({

    /* Agregar output: 'server' ayuda que el sitio se renderice del lado del servidor y/o la pagina se hibrida  */
    output: 'server',
    vite: {
        plugins: [tailwindcss()],

    },
    integrations: [react()]
});
