/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Tabs } from '@geist-ui/react';

const QRCodeModal = (props) => {
	const [qrCodeModal, setQRCodeModal] = useState(false);
	const [video, setVideo] = useState(document.createElement("video"))
	const [canvasElement, setCanvasElement] = useState(document.getElementById("qr-canvas"))
	const [canvas, setCanvas] = useState(canvasElement?.getContext("2d"))
	const [qrResult, setQrResult] = useState(document.getElementById("qr-result"))
	const [outputData, setOutputData] = useState(document.getElementById("outputData"))
	const [btnScanQR, setBtnScanQR] = useState(document.getElementById("btn-scan-qr"))
	const [localStream, setLocalStream] = useState({});

	const handler = () => {
		navigator.mediaDevices
		.getUserMedia({ video: { facingMode: "environment" } })
		.then(function(stream) {
			scanning = true;
			canvasElement.hidden = false;
			video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
			video.srcObject = stream;
			video.play();
			setLocalStream(stream);
			tick();
			scan();
		});
		setQRCodeModal(true);
	};

	const closeQRCodeHandler = () => {
		video.pause();
		video.src = "";
		localStream.getTracks().forEach(track => track.stop())
		setQRCodeModal(false);
	};

	useEffect(() => {
		setInterval(() => {
			if (canvasElement) {
				document.getElementById('qrcode-container')?.appendChild(canvasElement);
			}

			setCanvasElement(document.getElementById("qr-canvas"))
			setCanvas(canvasElement?.getContext("2d"))
			setQrResult(document.getElementById("qr-result"))
			setOutputData(document.getElementById("outputData"))
			setBtnScanQR(document.getElementById("btn-scan-qr"))
		}, 1000);
	}, [canvasElement]);
	
	let scanning = false;
	
	function tick() {
		canvasElement.height = video.videoHeight;
		canvasElement.width = video.videoWidth;
		canvas?.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
	
		scanning && requestAnimationFrame(tick);
	}
	
	function scan() {
		try {
			(window as any).qrcode.decode();
		} catch (e) {
			setTimeout(scan, 300);
		}
	}
	

	return (
		<>
			<div>
				<Button onClick={handler} className="centered-button">{`
					Claim using a QR code`}</Button>
				<Modal open={qrCodeModal} onClose={closeQRCodeHandler}>
					<Modal.Content id="modal-content">
						<div id="qrcode-container">
							<div id="qr-result">
								<b>Data: </b> <span id="outputData"></span>
							</div>
							<style>{`
								#qr-canvas {
									max-width: 100%;
								}
							`}</style>
						</div>
					</Modal.Content>
					<Modal.Action passive onClick={closeQRCodeHandler}>Cancel</Modal.Action>
				</Modal>
			</div>
		</>
	);
};

export default QRCodeModal;
