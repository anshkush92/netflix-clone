import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '../layouts';
import { useRouter } from 'next/router';

import { nonLayoutPaths } from '../utils/constants';
import AuthProvider from '../providers/auth';
import ModalProvider from '../providers/modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}
