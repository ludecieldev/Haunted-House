import restart from 'vite-plugin-restart'

export default {
    root: 'src/', // Dossier des fichiers sources (généralement où se trouve index.html)
    publicDir: '../static/', // Chemin depuis "root" vers les assets statiques (fichiers servis tels quels)
    base: '/Haunted-House/', // Chemin de base pour toutes les ressources (IMPORTANT pour GitHub Pages)
    server: {
        host: true, // Ouvrir sur le réseau local et afficher l'URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Ouvrir si ce n'est pas dans un CodeSandbox
    },
    build: {
        outDir: '../dist', // Sortie dans le dossier dist/
        emptyOutDir: true, // Vider d'abord le dossier
        sourcemap: true // Ajouter une sourcemap
    },
    plugins: [
        restart({ restart: ['../static/**'] }) // Redémarrer le serveur lors de changements de fichiers statiques
    ],
}
