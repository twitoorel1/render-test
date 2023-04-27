import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import Router from 'src/routes';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* <ThemeProvider> */}
        <Router />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </HelmetProvider>
  );
}
