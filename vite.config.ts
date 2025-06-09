import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/api": {
            target: "https://eu1.floogos.com/webhooks/856677c48afcaf7a2d6d085c22030b405388e6c0955e06cbdd9d9e9bb695f2df ",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""), // Reemplaza el prefijo /api
            configure: (proxy, options) => {
                proxy.on('proxyReq', (proxyReq, req, res) => {
                    // Si la petición no tiene el encabezado personalizado, redirige
                    if (!req.headers['x-custom-header']) {
                        res.writeHead(302, {
                            Location: '/',  // O a cualquier URL que quieras
                        });
                        res.end();
                    }
                });
            },
        },            
    },
},
})
