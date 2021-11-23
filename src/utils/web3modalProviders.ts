import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import Authereum from 'authereum'
import { getAddressAndSigner } from 'src/controllers/provider';

export const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: { infuraId: '8043bb2cf99347b1bfadfb233c5325c0' }
	},
	fortmatic: {
		package: Fortmatic,
		options: { key: 'pk_test_391E26A3B43A3350' }
	},
	authereum: {
		package: Authereum // required
	}
};

export const setup = async (setProvider, setWC, setAddress, setSigner) => {
	if (!(window as any).web3) {
		const web3Modal = new Web3Modal({
			cacheProvider: true, // optional
			providerOptions, // required
			disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
		});
		const provider = await web3Modal.connect()
		setProvider(provider);
		setWC(true);
		const { address, signer } = await getAddressAndSigner(true);
		setAddress(address);
		setSigner(signer);
	} else {
		setProvider((window as any).web3.currentProvider);
		const { address, signer } = await getAddressAndSigner(false);
		setAddress(address);
		setSigner(signer);
	}
}