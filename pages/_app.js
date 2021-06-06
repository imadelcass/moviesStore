import '../styles/globals.css';
import Layout from '../components/Layout';
import { ShoppingCardProvider } from '../context/ShoppingCardContext';
import { PaginationProvider } from '../context/PaginationContext';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ShoppingCardProvider>
        <PaginationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PaginationProvider>
      </ShoppingCardProvider>
    </AuthProvider>
  );
}

export default MyApp;
