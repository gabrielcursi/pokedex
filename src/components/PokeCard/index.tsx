import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, CardHeader, Chip, Grid, IconButton, SvgIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { colorTypeGradients, getTypeIconSrc } from '@/utils';


export default function PokeCard({ pokemon, image }) {
	const { name, types, id } = pokemon

	let finalColor;

	if (types.length === 2) {
		finalColor = colorTypeGradients(types[0].type.name, types[1].type.name, types.length);
	} else {
		finalColor = colorTypeGradients(types[0].type.name, types[0].type.name, types.length);
	}

	const changeColorChip = (name) => {
		switch (name) {
			case 'bug':
				return "#8cb230"
			case 'dark':
				return "#58575f"
			case 'dragon':
				return "#0f6ac0"
			case 'electric':
				return "#eed535"
			case 'fairy':
				return "#ed6ec7"
			case 'fighting':
				return "#d04164"
			case 'fire':
				return "#fd7d24"
			case 'flying':
				return "#748fc9"
			case 'ghost':
				return "#556aae"
			case 'grass':
				return "#62b957"
			case 'ground':
				return "#dd7748"
			case 'ice':
				return "#61cec0"
			case 'normal':
				return "#9da0aa"
			case 'poison':
				return "#a552cc"
			case 'psychic':
				return "#ea5d60"
			case 'rock':
				return "#baab82"
			case 'steel':
				return "#417d9a"
			case 'water':
				return "#4a90da"
			default:
				return ''
		}
	}

	const capitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.substr(1)
	}


	return (

		<Card
			style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}
			onClick={() => {

			}}
		>
			<a href={`/details/${name}`}>

				<CardActionArea>

					<CardHeader
						action={
							<IconButton aria-label="settings">
								{/* <MoreVertIcon /> */}
							</IconButton>
						}
						title={capitalize(name)}
						subheader={`#${String(id).padStart(3, '0')}`}
					/>
					<Box display='flex' justifyContent='center'>

						<CardMedia
							component="img"
							// width={200}
							sx={{ width: 200 }}
							image={image}
							alt="Live from space album cover"
						/>
					</Box>
					{/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
					<CardContent>
						<Box paddingTop={2} >
							<Grid container direction='row' justifyContent='center'>
								{
									types.map(type => {
										const typeImg = getTypeIconSrc(type.type.name);
										return (
											<Box mr={1}>
												<IconButton disabled style={{ background: changeColorChip(type.type.name) }}>
													<Avatar sx={{ height: 24, width: 24 }} alt={typeImg} src={typeImg} />
												</IconButton>
											</Box>
										)
									})
								}
							</Grid>
						</Box>

					</CardContent>

				</CardActionArea>
			</a>
			{/* <CardActions disableSpacing>
      </CardActions> */}
		</Card>


		// <Card sx={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}
		// 	style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}
		// >
		// 	<Box sx={{ display: 'flex', flexDirection: 'column' }}>
		// 		<CardContent sx={{ flex: '1 0 auto' }}>
		// 			<Typography component="div" variant="h5">
		// 				{capitalize(name)}
		// 			</Typography>
		// 			<Box paddingTop={2}>
		// 				{
		// 					types.map(type => {
		// 						const typeImg = getTypeIconSrc(type.type.name);
		// 						return (
		// 							<Box display='flex' paddingBottom={1 / 2} >
		// 								<Chip
		// 									style={{ background: changeColorChip(type.type.name) }}
		// 									label={capitalize(type.type.name)}
		// 									size='small'
		// 									avatar={<Avatar alt={typeImg} src={typeImg} />}
		// 								/>
		// 							</Box>
		// 						)
		// 					})
		// 				}
		// 			</Box>
		// 		</CardContent>
		// 	</Box>
		// 	{/* colocar id pokemon em cima da imagem */}
		// 	<CardMedia
		// 		component="img"
		// 		sx={{ width: 200 }}
		// 		image={image}
		// 		alt="Live from space album cover"
		// 	/>
		// </Card>
	);
}