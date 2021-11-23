import React from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button, Grid } from '@geist-ui/react';
import Card from 'src/components/ListItem';

const ScrollableButtons = styled('ul')`
  height: 400px;
	overflow: auto;
	margin: 20px;
	width: inherit;
`;

const List = ({ listItems }) => {
	return (
		<>
			<Grid.Container>
				{
					listItems.length > 0
					? <ScrollableButtons>{
							listItems.map((l, inx) => (
							<Card key={inx}/>
							))
						}</ScrollableButtons>
					: <>
						<Grid.Container className="nav" justify="space-around">
							<Grid md={8}></Grid>
							<Grid md={8}>
								<h1>
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
									🧼 🧼 🧼 🧼 🧼
								</h1>
							</Grid>
							<Grid md={8}></Grid>
						</Grid.Container>				
					</>
				}
			</Grid.Container>
		</>
	);
};

export default List;
