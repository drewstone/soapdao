import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Spacer, User, Description, Grid, Tooltip } from '@geist-ui/react';
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
import * as providerUtil from 'src/controllers/provider';
import { setup } from 'src/utils/web3modalProviders';
import { propTypes } from 'react-bootstrap/esm/Image';

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

export const Home = (props: IProps): JSX.Element => {
	let history = useHistory();
	const [ secret, setSecret ] = useState('');
	const [ isWC, setWC ] = useState(false);
  const [ provider, setProvider ] = useState((window as any).web3
    ? (window as any).web3.currentProvider
    : null
	);
	const [copiedTooltip, setCopiedTooltip] = useState(false);

	useEffect(() => { setup(setProvider, setWC, props.setAddress, props.setSigner); }, [])

  async function handleClick() {
		const p = (isWC) ? provider : null
		const { address, signer } = await providerUtil.getAddressAndSigner(p);
		props.setAddress(address);
		props.setSigner(signer);

		const seed = await providerUtil.generateSeed(secret, p);
		// const identity = PrivateKey.fromRawEd25519Seed(seed)
		// console.log(identity.toString())
		const pair = props.keyring.addFromSeed(seed, {})
		props.setPair(pair);
		localStorage.setItem('substrate-keypair', JSON.stringify(pair.toJson()));
    history.push("/");
	}

  const linkCopyClick = useCallback(() => {
    setCopiedTooltip(true);
		if (props.address.value) {
			navigator.clipboard.writeText(props.address.value);
		}    
    setTimeout(() => setCopiedTooltip(false), 1000);
  }, [props.address]);

	if (!props.pair.address) {
		return (
			<PageLayout center={true}>
				<MainTitle
						path={props.path}
						disablePhonetic={props.disablePhonetic}
						deemphasize={props.deemphasize}
				/>
				<div className='description'>Buy soap and be clean</div>
				<ButtonGroup>
					<PrimaryButton onClick={handleClick} size='large'>
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
							{ (props.address.value)
								? `${props.address.value.slice(0,6)}...${props.address.value.slice(props.address.value.length - 6, props.address.value.length)}`
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
			{ props.pair.address && <div className='description'>{
				<div className='description-row'>
					
					
				</div>
				}</div>
			}
			<List {...props} listItems={[]} />
		</PageLayout>
	);
};

export default Home;