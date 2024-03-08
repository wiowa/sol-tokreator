'use client';

import * as React from 'react';

interface PhantomContextValue {
  provider: any;
  wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>> | null;
  setProvider: React.Dispatch<React.SetStateAction<null>> | null;
}

const PhantomContext = React.createContext<PhantomContextValue | any>('');
const usePhantomContext = () => React.useContext(PhantomContext);

function PhantomProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [provider, setProvider] = React.useState(null);
  const [wallet, setWallet] = React.useState('');
  const value = React.useMemo(
    () => ({ provider, setProvider, wallet, setWallet }),
    [provider, wallet],
  );
  return (
    <PhantomContext.Provider value={value} {...props}>
      {children}
    </PhantomContext.Provider>
  );
}

export { usePhantomContext, PhantomProvider };
