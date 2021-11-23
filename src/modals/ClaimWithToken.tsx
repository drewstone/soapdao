// @ts-nocheck
import React, { useState } from 'react';
import { Modal, Button, Grid, Input, Spacer, Text, ButtonGroup, PrimaryButton } from '@geist-ui/react';

const ClaimWithTokenModal = (props) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [ secretToken, setSecretToken ] = useState('');

	const handler = () => {
		setModalOpen(true);
	};

	const close = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div>
				<Button onClick={handler} className="centered-button">{`
					Claim using a one-time token`}</Button>
				<Modal open={modalOpen} onClose={close}>
					<Modal.Content id="modal-content">
						<Grid.Container gap={1} justify="center">
							<div className="keygen-col">
								<p><b>Claim your SoapDAO membership NFT</b></p>
								<Input width="100%" size="large" placeholder="Enter the token on your soap" onChange={(e) => {
									setSecretToken(e.target.value);
								}}/>
								<Spacer y={0.5} />
								<Text className="description" style={{color: 'gray'}} small>
									Each token can only be claimed once!
								</Text>
							</div>
						</Grid.Container>
					</Modal.Content>
					<Modal.Action passive onClick={() => {				
						setModalOpen(false);
					}}>Cancel</Modal.Action>
					<Modal.Action passive onClick={() => {				
						alert(secretToken);
					}}>Claim NFT</Modal.Action>
				</Modal>
			</div>
		</>
	);
};

export default ClaimWithTokenModal;
