import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router-dom"
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configuraciones globales opcionales (ej: desactivar recarga al cambiar de ventana)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
