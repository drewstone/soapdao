import React from 'react';
import { Grid, User, Description, Button } from '@geist-ui/react';

const ListItem = (props) => {
	return (
		<>
			<Grid.Container className="card" justify="space-around">
				<div className="card-main">
					<Grid md={10} className="nav-col">
						<User src="https://react.geist-ui.dev/images/avatar.png" name=""/>
					</Grid>
					<Grid>
						<Description title={props.title || 'Jim Jones'} content={(
							<>
								<p>Location: {props.location || 'Weston'}</p>
								<p>Date: {props.date || 'Today'}</p>
							</>
						)} />
					</Grid>
				</div>
				<Grid md={6}>
					<Button className="centered-button" type="error" ghost auto>Join</Button>
				</Grid>
			</Grid.Container>
			<style>{`
				.centered-button {
					margin: 0;
					position: absolute;
					top: 25%;
				}

				.card {
					display: flex;                /* Children use Flexbox */
					flex-direction: row;       /* Rotate Axis */
					overflow: hidden;             /* Fixes the corners */
          transition: all 0.2s ease;
					border-radius: 6px;
          box-shadow: ${props.isDark ? 'none' : '0 5px 10px rgba(0, 0, 0, 0.12)'};
          box-sizing: border-box;
          border: ${props.isDark ? `1px solid ${props.theme.bordrColor}` : 'none'};					
				}

				.card:hover {
					box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
				}

				.card-header {
					color: #D32F2F;
					text-align: center;
					font-size: 12px;
					font-weight: 600;
					border-bottom: 1px solid #EF9A9A;
					background-color: #FFEBEE;
				}

				.card-main {
					display: flex;              /* Children use Flexbox */
					flex-direction: row;     /* Rotate Axis to Vertical */
					justify-content: center;    /* Group Children in Center */
					align-items: center;        /* Group Children in Center (on cross axis) */
					padding: 10px;
				}

				.main-description {
					color: #D32F2F;
					font-size: 12px;
					text-align: center;
					margin: 10px;
				}
			`}</style>
		</>
	);
};

export default ListItem;