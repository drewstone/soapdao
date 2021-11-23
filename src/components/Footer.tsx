import React from 'react';

const Footer = (): JSX.Element => (
	<footer style={{ marginTop: "1em" }}>
			SoapDAO by{" "}
			<a
					href="https://www.github.com/drewstone"
					target="_blank"
					rel="noopener noreferrer"
			>
					Drew Stone
			</a>
			<br />
			<style>{`
				font-size: 12px;
				text-align: center;
				margin-bottom: 2em;

				a:hover {
						text-decoration: underline;
				}
			`}</style>
	</footer>
);

export default Footer;