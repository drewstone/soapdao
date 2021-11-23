/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Spacer, Description, Grid, Tooltip } from '@geist-ui/react';
import PrimaryButton from 'src/components/PrimaryButton';
import ButtonGroup from 'src/components/ButtonGroup';
import AddAppButton from 'src/components/AddAppButton';
import PageLayout from 'src/components/PageLayout';
import DarkToggle from 'src/components/DarkToggle';
import MainTitle from 'src/components/MainTitle';
import List from 'src/components/List';
import QRCodeModal from 'src/modals/QRCodeModal';
import { EthereumAddress } from 'src/controllers/provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import Keyring from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import ClaimWithTokenModal from 'src/modals/ClaimWithToken';
import Web3Modal from 'web3modal';
import { initialState, providerOptions, reducer } from 'src/utils/reducer';
import { providers } from 'ethers';

const StatsContainer = styled('div')`
	display: flex;
	flex-direction: row;
	width: fit-content;
	margin: auto;
`;

const CardContainer = styled('div')`
	height: fit-content;
	padding: 10px;
	border-radius: 10px;
	text-align: center;
	
	transition: 0.3s;

	:hover {
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}
`;

interface IProps {
    toggleTheme: () => void;
		theme: any;
    pair: KeyringPair;
		setPair: (a) => void;
    address: EthereumAddress;
		setAddress: (a) => void;
    signer: JsonRpcSigner;
		setSigner: (s) => void;
    keyring: Keyring;
		isDark: boolean;
		path: any;
		disablePhonetic: any;
		deemphasize: any;
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions: providerOptions, // required
  })
}

export const Home = (props: IProps): JSX.Element => {
	const [copiedTooltip, setCopiedTooltip] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const linkCopyClick = useCallback(() => {
    setCopiedTooltip(true);
		if (address) {
			navigator.clipboard.writeText(address);
		}    
    setTimeout(() => setCopiedTooltip(false), 1000);
  }, [address]);

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

	if (!provider) {
		return (
			<PageLayout center={true}>
				<MainTitle
						path={props.path}
						disablePhonetic={props.disablePhonetic}
						deemphasize={props.deemphasize}
				/>
				<div className='description'>Buy soap and be clean</div>
				<ButtonGroup>
					<PrimaryButton onClick={connect} size='large'>
						&nbsp;Sign in / Login&nbsp;
					</PrimaryButton>
				</ButtonGroup>
				<Spacer y={1.5} />
				<div className='btn-col'>
					<AddAppButton />
				</div>
				<Spacer y={2} />
				<DarkToggle onClick={props.toggleTheme} theme={props.isDark ? 'dark' : 'light'} />
			</PageLayout>
		);
	}

	return (
		<PageLayout center={true}>
			<Grid.Container className='nav' justify='space-around'>
				<Grid md={6} className='nav-col'>
					<h3>SoapDAO</h3>
				</Grid>
				<Grid md={6} className='nav-col'>
					<ClaimWithTokenModal {...props} />
				</Grid>
				<Grid md={6} className='nav-col'>
					<QRCodeModal {...props} />
				</Grid>
				<Grid md={6} className='nav-col'>
					<Tooltip
						text={"Copied!"}
						visible={copiedTooltip}
						trigger="click"
						type="dark"
						offset={-4}
					>
						<div>
						<h3 onClick={linkCopyClick}>
							{ (address)
								? `${address.slice(0,6)}...${address.slice(address.length - 6, address.length)}`
								: ''
							}
						</h3>
						</div>
					</Tooltip>
				</Grid>
			</Grid.Container>
			<style>{`
				.nav {
					display: flex;
					margin-top: 42px;
					text-align: center;
				}

				.tabs {
					float:none;
					display:inline-block;
					zoom:1;
					text-align:center;
				}
			`}</style>
			<StatsContainer>
				<CardContainer className='content'>
					<Description title={'Washes / week'} content={`${0}`} />
				</CardContainer>
				<CardContainer className='content'>
					<Description title={'Soap Friends'} content={`${0}`} />
				</CardContainer>
				<CardContainer className='content'>
					<Description title={'Upcoming Drops'} content={`${0}`} />
				</CardContainer>
			</StatsContainer>
			<Spacer y={0.5}/>
			<List {...props} listItems={[]} />
			<DarkToggle onClick={props.toggleTheme} theme={props.isDark ? 'dark' : 'light'} />
		</PageLayout>
	);
};

export default Home;