import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],publicDir:false,define:{'process.env.NODE_ENV':JSON.stringify('production')},build:{outDir:'public/assets/planning',emptyOutDir:false,lib:{entry:'src/PlanningExperience.jsx',formats:['es'],fileName:()=> 'planning.js'},rollupOptions:{output:{inlineDynamicImports:true}}}});
