import React, { useState, useEffect } from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Keyring from '@polkadot/keyring';
import Body from './components/Body';
import Router from './Router';

const storageKey = 'theme';
const themes = {
  light: {
    foreground: '#000',
    background: '#FFF',
    gray: '#666',
    link: '#0070F3',
    bordrColor: '#EAEAEA'
  },
  dark: {
    foreground: '#FFF',
    background: '#000',
    gray: '#888',
    link: '#0076FF',
    bordrColor: '#333'
  }
};

function App() {
  const [newLoading, setNewLoading] = useState(false);
  const [keyring, setKeyring] = useState(new Keyring({ ss58Format: 42, type: 'ed25519' }));
  const [address, setAddress] = useState({});
  const [signer, setSigner] = useState({});
  const [pair, setPair] = useState({});
  
  const [isDark, setDark] = useState(true);
  const theme = themes[isDark ? 'dark' : 'light'];

  useEffect(() => {
    const keypairJSON = localStorage.getItem('substrate-keypair') || '';
    if (keypairJSON) {
      setPair(keyring.addFromJson(JSON.parse(keypairJSON)));
    }
  }, []);

  const setTheme = (theme: string) => {
    setDark(theme !== 'light');
    localStorage.setItem(storageKey, theme !== 'light' ? 'dark' : 'light');
  };
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');
  useEffect(() => setTheme(localStorage.getItem(storageKey) || 'light'), []);

  const props = {
    toggleTheme, theme,
    pair, setPair,
    address, setAddress,
    signer, setSigner,
    keyring, isDark
  };

  return (
    <GeistProvider>
      <CssBaseline />
      <Body>
        <Router {...props} />
      </Body>
      <style >{`
        ::selection {
          background: ${theme.foreground};
          color: ${theme.background};
        }
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: ${theme.background};
          color: ${theme.foreground};
          line-height: 1.47059;
          letter-spacing: -0.022em;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        a {
          cursor: pointer;
          color: ${theme.link};
          text-decoration: none;
        }
      `}</style>
      <style>{`
        .bio p {
          font-size: 18px;
          margin: 8px 0;
          font-weight: 300;
        }
        .social {
          line-height: 2em;
          font-weight: 400 !important;
        }
        .projects {
          display: flex;
          flex-wrap: wrap;
          margin: -12px;
        }
        .project {
          flex-basis: 33%;
          padding: 12px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .project {
            flex: 0 50%;
          }
        }
        @media (max-width: 576px) {
          .project {
            flex: 1;
          }
          .projects {
            flex-direction: column;
          }
        }
        .project img {
          height: 48px;
          width: 48px;
          border: 1px solid ${theme.bordrColor};
          border-radius: 50%;
        }
        .project h4 {
          font-weight: 600;
          margin: 12px 0px 0px;
        }
        .project p {
          font-size: 14px;
          margin: 6px 0px 0px;
          color: ${theme.gray};
        }
        .skils {
          display: flex;
          flex-wrap: wrap;
          margin: -4px;
        }
        .skil {
          background: ${theme.background};
          color: ${theme.foreground};
          padding: 8px 16px;
          margin: 4px;
          border-radius: 6px;
          border: 1px solid ${theme.bordrColor};
          transition: all 0.2s ease;
        }
      `}</style>
    </GeistProvider>
  );
}

export default App;
