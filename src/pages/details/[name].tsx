import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '@/services/api'
import { useRouter } from 'next/router'
import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { PokemonProps } from '@/types/pokemon';
import { PokemonSpeciesProps } from '@/types/pokemon-species';
// import { StylesProvider } from "@material-ui/core/styles";
import { colorTypeGradients, getTypeIconSrc } from '@/utils';
import { capitalize, changeColorChip } from '@/components/PokeCard';
// import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { motion } from "framer-motion"


function PokemonDetails() {
	const [detailsPoke, setDetailsPoke] = useState<PokemonProps>()
	const [pokeSpecies, setPokeSpecies] = useState<PokemonSpeciesProps>()
	const { query } = useRouter()
	const fetchGenderRate = (genderRate) => {

		switch (genderRate) {
			case 0:
				return <div><span class="gender-male">100% <i class="fa fa-mars"></i></span><span> 0% <i class="fa fa-venus"></i></span></div>;
			case 1:
				return <div><span>87.5% <i class="fa fa-mars"></i></span><span>  12.5% <i class="fa fa-venus"></i></span></div>;
			case 2:
				return <div><span>75% <i class="fa fa-mars"></i></span><span>  25% <i class="fa fa-venus"></i></span></div>;
			case 3:
				return <div><span>62.5% <i class="fa fa-mars"></i></span><span>  37.5% <i class="fa fa-venus"></i></span></div>;
			case 4:
				return <div><span>50% <i class="fa fa-mars"></i></span><span>  50% <i class="fa fa-venus"></i></span></div>;
			case 5:
				return <div><span>37.5% <i class="fa fa-mars"></i></span><span>  62.5% <i class="fa fa-venus"></i></span></div>;
			case 6:
				return <div><span>25% <i class="fa fa-mars"></i></span><span>  75% <i class="fa fa-venus"></i></span></div>;
			case 7:
				return <div><span>12.5% <i class="fa fa-mars"></i></span><span>  87.5% <i class="fa fa-venus"></i></span></div>;
			case 8:
				return <div><span>0% <i class="fa fa-mars"></i></span><span>  100% <i class="fa fa-venus"></i></span></div>;
			default:
				return <span>Loading...</span>
		}
	}

	const nameQuery = query.name;

	let finalColor;

	if (detailsPoke?.types.length === 2) {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[1].type.name, detailsPoke?.types.length);
	} else {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[0].type.name, detailsPoke?.types.length);
	}


	useEffect(() => {
		const getDetailsPokemon = async () => {
			try {
				if (nameQuery !== undefined) {

					const response = await api.get(`/pokemon/${nameQuery}`)
					setDetailsPoke(response.data)
				}

			} catch (error) {

			}
		}

		const getPokemonSpecies = async () => {
			if (nameQuery !== undefined) {

				const response = await api.get(`/pokemon-species/${nameQuery}`)
				console.log('aaaa', response.data)
				setPokeSpecies(response.data)
			}

		}

		getPokemonSpecies()
		getDetailsPokemon()
	}, [nameQuery])



	// const { id, flavor_text_entries, form_descriptions } = detailsPoke

	const MainReturn = () => {

		if (detailsPoke !== undefined && pokeSpecies !== undefined) return (
			<Box height={'100vh'} display='flex' justifyContent='center' alignItems='center'>

				<Card sx={{ height: '85vh' }} style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} >
					{/* <div><pre>{JSON.stringify(detailsPoke, null, 2)}</pre></div> */}
					{/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
					<CardContent style={{ padding: '0px', height: '100%' }}>
						<Grid container style={{ padding: '16px', height: '100%' }}>

							<Grid md={'auto'} alignItems={'center'}>

								{/* <Card style={{ background: 'hsla(0,0%,100%,.47058823529411764)' }}> */}
								{/* <Card style={{
										background: 'none'
									}}> */}
								<Box
									height={1}
									style={{ background: 'hsla(0,0%,100%,.47058823529411764)' }}
									justifyContent={'space-evenly'}
									display={'flex'}
									flexDirection={'column'}
									paddingX={3}
									alignItems={'center'}>
									<Box>

										<Typography variant='h4'>#${String(detailsPoke.id).padStart(3, '0')}</Typography>
									</Box>
									<Box>
										<Typography>{capitalize(detailsPoke?.name)}</Typography>
									</Box>
									<Box>
										<Box>Seed Pokemon</Box>
									</Box>
									<Box>
										<CardMedia
											component="img"
											// width={200}
											sx={{ width: 120 }}
											image={detailsPoke?.sprites.other['dream_world'].front_default}
											alt="poke-img"
										/>
										{/* <img src={detailsPoke?.sprites.other['official-artwork'].front_default} alt="poke-img" /> */}
									</Box>
									<Box>

										Icon
									</Box>
									<Box>
										<Typography>Height 0.7 m/2' 4"</Typography>
									</Box>
									<Box>
										<Typography>Height 0.7 m/2' 4"</Typography>
									</Box>
									<Box>
										<Typography>Weight 6.9 kg/15.2 lbs</Typography>
									</Box>
								</Box>
								{/* </Card> */}

								{/* </Card> */}
							</Grid>

							<Grid md={'auto'}>
								<Box>
									<Typography>About</Typography>
									<Typography>{pokeSpecies.form_descriptions.length > 0 && pokeSpecies.form_descriptions[0].description ? pokeSpecies.form_descriptions[0].description : pokeSpecies.flavor_text_entries[0].flavor_text}</Typography>
								</Box>

							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>


		)

	}

	return (
		<MainReturn />
	)
}

export default PokemonDetails