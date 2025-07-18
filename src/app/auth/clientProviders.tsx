'use client';

import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { ReactNode } from 'react';
import Script from 'next/script';
import { theme } from '@/theme';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        {children}
        <Script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d895cc249f60bcc302467ed13331611&autoload=false&libraries=services,clusterer&autoload=false" />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ClientProviders;
