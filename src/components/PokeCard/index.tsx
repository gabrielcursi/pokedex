/* eslint-disable react/jsx-key */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Backdrop, CardActionArea, CardActions, CardHeader, Chip, CircularProgress, Grid, IconButton, SvgIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { colorTypeGradients, getTypeIconSrc } from '@/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Paragraph } from '../Paragraph';
import { PokemonProps } from '@/types/pokemon';

interface PokeCardProps {
	pokemon: PokemonProps
	image: string
	
}

type ColorChip = {
	[key: string]: string
}

export const changeColorChip = (name: string) => {
	const typeName: ColorChip = {
		"bug": "#8cb230",
			"dark": "#58575f",
		"dragon":"#0f6ac0",
		"electric": "#eed535",
		"fairy": "#ed6ec7",
		"fighting": "#d04164",
		"fire": "#fd7d24",
		"flying": "#748fc9",
		"ghost": "#556aae",
		"grass": "#62b957",
		"ground": "#dd7748",
		"ice": "#61cec0",
		"normal": "#9da0aa",
		"poison": "#a552cc",
		"psychic": "#ea5d60",
		"rock": "#baab82",
		"steel": "#417d9a",
		"water": "#4a90da"
	}

	return typeName[name]
}

export const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.substr(1)
}

export default function PokeCard({ pokemon, image }: PokeCardProps) {
	const { name, types, id } = pokemon

	let finalColor;

	if (types.length === 2) {
		finalColor = colorTypeGradients(types[0].type.name, types[1].type.name, types.length);
	} else {
		finalColor = colorTypeGradients(types[0].type.name, types[0].type.name, types.length);
	}

	return (
		<Card
			style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`, height: '100%' }}
		>
			<Link
				style={{ textDecoration: 'none' }}
				href={{
					pathname: '/details/[name]',
					query: { name: name },
				}}
			>
				<CardActionArea>
					<CardHeader
						action={
							<IconButton aria-label="settings">
								{/* <MoreVertIcon /> */}
							</IconButton>
						}
						// subheader={<Paragraph size='Plarge'>{capitalize(name)}</Paragraph>}
						title={<Paragraph size='normal'>#{String(id).padStart(3, '0')}</Paragraph>}
					/>
					<Box display='flex' justifyContent='center'>

						<CardMedia
							component="img"
							// width={200}
							sx={{ width: 120 }}
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
						<Box >
							<Box textAlign='center'>

						<Paragraph size='Plarge'>{capitalize(name)}</Paragraph>
							</Box>
							<Box mt={2}>

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
						</Box>

					</CardContent>

				</CardActionArea>
			</Link>
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