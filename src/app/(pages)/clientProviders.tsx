'use client';

import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Navbar from '@/components/shared/nav/Navbar';
import ToastProvider from '@/components/shared/ToastProvider';
import { ReactNode } from 'react';
import Script from 'next/script';
import { User } from '@/prisma/client';
import { theme } from '@/theme';

interface ClientProvidersProps {
  children: ReactNode;
  currentUser?: User | null;
}

const ClientProviders = ({ children, currentUser }: ClientProvidersProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <Navbar currentUser={currentUser} />
        <ToastProvider />
        {children}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer&autoload=false`}
        />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ClientProviders;
