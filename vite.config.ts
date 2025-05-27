// Import the defineConfig helper from Vite for better TypeScript support
import { defineConfig } from "vite";

// Import the React plugin (SWC version) for better performance and fast refresh
import react from "@vitejs/plugin-react-swc";

// Node's path module to handle directory resolution
import path from "path";

// Import lovable-tagger (adds helpful tags to React components during development)
import { componentTagger } from "lovable-tagger";

// Export Vite config using defineConfig for IntelliSense and better DX
export default defineConfig(({ mode }) => ({
  // Server config for development
  server: {
    host: "localhost",       // Allows access from local network (e.g., via mobile device)
    port: 8080,       // Runs dev server on http://localhost:8080
  },

  // Array of plugins used by Vite
  plugins: [
    react(), // Enables React Fast Refresh and SWC support
    mode === 'development' &&
      componentTagger(), // Only use componentTagger plugin in development mode
  ].filter(Boolean), // Removes false/null entries from the plugins array

  // Module resolution aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows '@' to point to the 'src' folder
      // Example usage: import Button from "@/components/ui/button"
    },
  },
}));
