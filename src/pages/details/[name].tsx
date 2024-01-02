import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '@/services/api'
import { useRouter } from 'next/router'
import { Avatar, Box, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, styled } from '@mui/material';
import { PokemonProps } from '@/types/pokemon';
import { PokemonSpeciesProps } from '@/types/pokemon-species';
import { motion } from "framer-motion"
// import { StylesProvider } from "@material-ui/core/styles";
import { colorTypeGradients, getTypeIconSrc } from '@/utils';
import { capitalize, changeColorChip } from '@/components/PokeCard';
import Delayed from '@/components/Delayed';
import axios from 'axios';

import { EvolutionChain } from '@/types/evolution-chain';
// import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { ArrowRightAlt, FemaleRounded, MaleRounded } from '@mui/icons-material'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Paragraph } from '@/components/Paragraph';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	backgroundColor: 'inherit',
	boxShadow: 'none',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	// color: theme.palette.text.secondary,
}));


function PokemonDetails() {
	const [detailsPoke, setDetailsPoke] = useState<PokemonProps>()
	const [pokeSpecies, setPokeSpecies] = useState<PokemonSpeciesProps>()
	const [evoChain, setEvoChain] = useState<EvolutionChain>()
	const [theOtherEvoChain, setTheOtherEvoChain] = useState([])

	const { query } = useRouter()
	const fetchGenderRate = (genderRate: number) => {

		console.log('asdasdsd', genderRate)

		const MaleIcon = () => (
			<MaleRounded />
		)

		const FemaleIcon = () => (
			<FemaleRounded />
		)

		const gender = {
			0: <><span>100% <MaleIcon /></span> <span>0%<FemaleIcon /></span></>,
			1: <><span>87.5% <MaleIcon /></span> <span>12.5%<FemaleIcon /></span></>,
			2: <><span>75% <MaleIcon /></span> <span>25%<FemaleIcon /></span></>,
			3: <><span>62.5% <MaleIcon /></span> <span>37.5%%<FemaleIcon /></span></>,
			4: <><span>50% <MaleIcon /></span> <span>50%<FemaleIcon /></span></>,
			5: <><span>37.5% <MaleIcon /></span> <span>62.5%<FemaleIcon /></span></>,
			6: <><span>25% <MaleIcon /></span> <span>75%<FemaleIcon /></span></>,
			7: <><span>12.5% <MaleIcon /></span> <span>87.5%<FemaleIcon /></span></>,
			8: <><span>0% <MaleIcon /></span> <span>0%<FemaleIcon /></span></>,
		} as unknown as React.JSX.Element[]

		return gender[genderRate] || 'Not found'
	}

	const nameQuery = query.name;

	let finalColor;

	if (detailsPoke?.types.length === 2) {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[1].type.name, detailsPoke?.types.length);
	} else {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[0].type.name, detailsPoke?.types.length);
	}


	const getDetailsPokemon = async () => {
		try {
			if (nameQuery !== undefined) {

				const response = await api.get(`/pokemon/${nameQuery}`)
				setDetailsPoke(response.data)
			}

		} catch (error) {

		}
	}
	useEffect(() => {

		const getPokemonSpecies = async () => {
			if (nameQuery !== undefined) {

				await api.get(`/pokemon-species/${nameQuery}`).then(res => {
					axios.get(res.data.evolution_chain.url).then(resUrl => {



						const evoChain = [];
						let evoData = resUrl.data.chain;

						do {
							const evoDetails = evoData['evolution_details'][0];

							evoChain.push({
								"species_name": evoData.species.name,
								"min_level": !evoDetails ? 1 : evoDetails.min_level,
								"trigger_name": !evoDetails ? null : evoDetails.trigger.name,
								"item": !evoDetails ? null : evoDetails.item
							});

							evoData = evoData['evolves_to'][0];
						} while (!!evoData && evoData.hasOwnProperty('evolves_to'));

						fetchEvoImages(evoChain);
					}).catch((err) => console.log("Error:", err));


					setPokeSpecies(res.data)
				})

			}

		}

		const fetchEvoDetails = async (url: string) => {
			try {
				const response = await axios.get(url)
				setEvoChain(response.data)
			} catch (error) {
				console.log('Error ->', error)
			}
		}

		const fetchEvoImages = async (evoChainArr) => {

			// debugger
			for (let i = 0; i < evoChainArr.length; i++) {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`).catch((err) => console.log("Error:", err));
				response.data.sprites.other.dream_world.front_default ? evoChainArr[i]['image_url'] = response.data.sprites.other.dream_world.front_default : evoChainArr[i]['image_url'] = response.data.sprites.other['official-artwork'].front_default;
			}
			setTheOtherEvoChain(evoChainArr)


		}

		getPokemonSpecies()
		getDetailsPokemon()
		pokeSpecies?.evolution_chain.url && fetchEvoDetails(pokeSpecies?.evolution_chain.url)
	}, [nameQuery])




	// const { id, flavor_text_entries, form_descriptions } = detailsPoke

	const MainReturn = () => {

		if (detailsPoke !== undefined && pokeSpecies !== undefined) return (
			<Box height={'100vh'} display='flex' justifyContent='center' alignItems='center'>

				<Card sx={{ height: '85vh', width: '80vw' }} style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} >
					{/* <div><pre>{JSON.stringify(detailsPoke, null, 2)}</pre></div> */}
					{/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
					<CardContent style={{ padding: '0px', height: '100%', 
					minHeight: '60vh', overflow: 'auto'
					 }}>
						<Grid container style={{ padding: '16px', 
					 }} justifyContent={'space-between'}>
							<Grid md={3} sm={3} alignItems={'center'}>
								<Box
									height={1}
									style={{ background: 'hsla(0,0%,100%,.47058823529411764)' }}
									justifyContent={'space-evenly'}
									display={'flex'}
									flexDirection={'column'}
									paddingX={3}
									alignItems={'center'}
								>
									<Box>
										<Paragraph size='medium'>#{String(detailsPoke.id).padStart(3, '0')}</Paragraph>
									</Box>
									<Box>
										<Paragraph size='Plarge'>{capitalize(detailsPoke?.name)}</Paragraph>
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
									<Box display={'flex'}>
										<Paragraph size='Pnormal' bold>Height</Paragraph>
										<Paragraph size='Pnormal' VT>Height</Paragraph>
										{/* <Typography>Height 0.7 m/2' 4"</Typography> */}
									</Box>
									<Box>
										<Typography>Weight 6.9 kg/15.2 lbs</Typography>
									</Box>
									{fetchGenderRate(pokeSpecies?.gender_rate)}
								</Box>
								{/* </Card> */}

								{/* </Card> */}
							</Grid>

							<Grid md={8}>
								<Box>
									<Paragraph size='Pmedium'>
										About
									</Paragraph>

									<div style={{
										backgroundColor: '#ffffff40',
										padding: '5px',
										borderRadius: '1rem',
										marginTop: '0.5rem',
									}}>

										<Paragraph size='Pnormal'>{pokeSpecies.form_descriptions.length > 0 && pokeSpecies.form_descriptions[0].description ? pokeSpecies.form_descriptions[0].description : pokeSpecies.flavor_text_entries[0].flavor_text}</Paragraph>
									</div>
								</Box>
								<Box>
									<Paragraph size='Pmedium' >Abilities</Paragraph>

									<div style={{
										backgroundColor: '#ffffff40',
										padding: '5px',
										borderRadius: '1rem',
										marginTop: '0.5rem',
									}}>

										<ul
											style={{
												display: 'flex',
												gap: '0 30px',
												paddingInlineStart: '1em',
											}}
										>
											{
												detailsPoke.abilities.map((abilitie, index) => (
													<li style={{
													}}>
														<Paragraph size='Pnormal' style={{ textTransform: 'capitalize' }}>{abilitie.ability.name}&nbsp;</Paragraph>
													</li>
												))}
										</ul>
									</div>

								</Box>
								<Box>
									<Paragraph size='Pmedium'>Base Stats</Paragraph>
									<div style={{
										backgroundColor: '#ffffff40',
										padding: '5px',
										borderRadius: '1rem',
										marginTop: '0.5rem',
									}}>
										<Grid container item>
											<Grid md={4}>

												<Box>
													<Paragraph size='Pnormal' colorRed>HP</Paragraph>
													<Paragraph size='Pnormal'>45</Paragraph> {/* mock */}

												</Box>
												<Box>
													<Paragraph size='Pnormal' colorRed>SPECIAL-ATTACK</Paragraph>
													<Paragraph size='Pnormal'>65</Paragraph> {/* mock */}
												</Box>
											</Grid>
											<Grid md={4}>
												<Box>
													<Paragraph size='Pnormal' colorRed>ATTACK</Paragraph>
													<Paragraph size='Pnormal'>45</Paragraph> {/* mock */}
												</Box>
												<Box>
													<Paragraph size='Pnormal' colorRed>SPECIAL-ATTACK</Paragraph>
													<Paragraph size='Pnormal'>65</Paragraph> {/* mock */}
												</Box>
											</Grid>
											<Grid md={4}>
												<Box>
													<Paragraph size='Pnormal' colorRed>DEFENSE</Paragraph>
													<Paragraph size='Pnormal'>45</Paragraph> {/* mock */}
												</Box>
												<Box>
													<Paragraph size='Pnormal' colorRed>SPEED</Paragraph>
													<Paragraph size='Pnormal'>65</Paragraph> {/* mock */}
												</Box>
											</Grid>
										</Grid>
									</div>
								</Box>
								<Box>
									<Paragraph size='Pmedium'>Evolutions</Paragraph>
									<div className="evolution__box">
										{theOtherEvoChain && theOtherEvoChain.map((value, index, elements) =>
											<Delayed waitBeforeShow={(index + 0) * 800} key={elements[index].species_name}>
												<div className="evolution__sub__box">
													<div>
														<motion.div
															animate={{ rotate: 360 }}
															transition={{ duration: 2, ease: "easeOut", type: 'spring', bounce: 0.65, damping: 25 }}
															whileHover={{ scale: 1.05 }}
														>
															<div className="evolution__img__div" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
																<div className="transparency__div">
																	<LazyLoadImage
																		alt="image-pokemon"
																		height={80}
																		width={80}
																		src={elements[index].image_url}
																		visibleByDefault={false}
																		delayMethod={'debounce'}
																		effect="blur"
																		className="evo_img"
																		onClick={() => {
																			console.log('clicou')
																		}}
																	// onClick={() => getDetailsPokemon()}
																	/>
																</div>
															</div>
														</motion.div>
														<Paragraph size='Pnormal'>{capitalize(elements[index].species_name)}</Paragraph>
														{/* <div className="evolution__poke__name">{elements[index].species_name}</div> */}
													</div>

													{elements[index + 1] && <ArrowRightAlt className="arrow__right"></ArrowRightAlt>}
												</div>
											</Delayed>
										)}
									</div>

								</Box>

							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box >


		)

	}

	return (
		<MainReturn />
	)
}

export default PokemonDetails