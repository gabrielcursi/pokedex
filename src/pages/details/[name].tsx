/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import api from '@/services/api'
import { useRouter } from 'next/router'
import { Box, BoxProps, Chip, Grid, Paper, styled } from '@mui/material';
import { PokemonProps } from '@/types/pokemon';
import { PokemonSpeciesProps } from '@/types/pokemon-species';
import { motion } from "framer-motion"
// import { StylesProvider } from "@material-ui/core/styles";
import { colorTypeGradients } from '@/utils';
import { capitalize } from '@/components/PokeCard';
import Delayed from '@/components/Delayed';
import axios from 'axios';

import { EvolutionChain } from '@/types/evolution-chain';
// import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { ArrowRightAlt, FemaleRounded, MaleRounded } from '@mui/icons-material'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Paragraph } from '@/components/Paragraph';
import { OtherEvoChain } from '@/types/other-evo-chain';
import PokeTypes from '@/components/PokeTypes';
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

interface EvoChainProps {
	data: PokemonProps
}

interface BoxFlexProps extends BoxProps {
	male: string
	female: string
}

function PokemonDetails() {
	const [detailsPoke, setDetailsPoke] = useState<PokemonProps>()
	const [pokeSpecies, setPokeSpecies] = useState<PokemonSpeciesProps>()
	const [evoChain, setEvoChain] = useState<EvolutionChain>()
	const [theOtherEvoChain, setTheOtherEvoChain] = useState<OtherEvoChain[]>([])

	const { query } = useRouter()
	const fetchGenderRate = (genderRate: number) => {

		const MaleIcon = () => (
			<MaleRounded style={{
				color: '#7070ff'
			}} />
		)

		const FemaleIcon = () => (
			<FemaleRounded style={{
				color: '#e03d58'
			}} />
		)

		const BoxFlex = ({ female, male }: BoxFlexProps) => (
			<Grid container justifyContent='center'>
				<Grid item>
					<Grid container alignItems='center'>

						<Paragraph size='Pnormal' VT>{male}%</Paragraph>&nbsp;<MaleIcon />&nbsp;&nbsp;
					</Grid>
				</Grid>
				<Grid item>
					<Grid container alignItems='center'>
						<Paragraph size='Pnormal' VT>{female}%</Paragraph>&nbsp;<FemaleIcon />
					</Grid>
				</Grid>
			</Grid>
		)

		const gender = {
			0: <BoxFlex male='100' female='0' />,
			1: <BoxFlex male='87.5' female='12.5' />,
			2: <BoxFlex male='75' female='25' />,
			3: <BoxFlex male='62.5' female='37.5' />,
			4: <BoxFlex male='50' female='50' />,
			5: <BoxFlex male='37.5' female='62.5' />,
			6: <BoxFlex male='25' female='75' />,
			7: <BoxFlex male='12.5' female='87.5' />,
			8: <BoxFlex male='0' female='0' />,
		} as unknown as React.JSX.Element[]

		return gender[genderRate] || 'Not found'
	}

	const nameQuery = query.name;

	let finalColor: (string | undefined)[];

	if (detailsPoke?.types.length === 2) {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[1].type.name, detailsPoke?.types.length);
	} else if (detailsPoke?.types) {
		finalColor = colorTypeGradients(detailsPoke?.types[0].type.name, detailsPoke?.types[0].type.name, detailsPoke?.types.length);
	}


	const getDetailsPokemon = async () => {
		try {
			if (nameQuery !== undefined) {
				const response = await api.get(`/pokemon/${nameQuery}`)
				setDetailsPoke(response.data)
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const getPokemonSpecies = async () => {
			if (nameQuery !== undefined) {
				await api.get(`/pokemon-species/${nameQuery}`).then(res => {
					axios.get(res.data.evolution_chain.url).then(resUrl => {
						const evoChain: OtherEvoChain[] = [];
						let evoData = resUrl.data.chain;
						do {
							const evoDetails = evoData['evolution_details'][0];
							evoChain.push({
								"species_name": evoData.species.name,
								"min_level": !evoDetails ? 1 : evoDetails.min_level,
								"trigger_name": !evoDetails ? null : evoDetails.trigger.name,
								"item": !evoDetails ? null : evoDetails.item,
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

		const fetchEvoImages = async (evoChainArr: OtherEvoChain[]) => {
			for (let i = 0; i < evoChainArr.length; i++) {
				const { data: { sprites } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`).catch((err) => console.log("Error:", err)) as unknown as EvoChainProps
				sprites.other.dream_world.front_default ? evoChainArr[i]['image_url'] = sprites.other.dream_world.front_default : evoChainArr[i]['image_url'] = sprites.other['official-artwork'].front_default;
			}
			setTheOtherEvoChain(evoChainArr)
		}
		getPokemonSpecies()
		getDetailsPokemon()
		pokeSpecies?.evolution_chain.url && fetchEvoDetails(pokeSpecies?.evolution_chain.url)
	}, [nameQuery])

	const MainReturn = () => {

		if (detailsPoke !== undefined && pokeSpecies !== undefined) return (
			<Box height={'100vh'} display='flex' justifyContent='center' alignItems='center'>

				<Card sx={{ height: '85vh', width: '80vw' }} style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} >
					<CardContent style={{
						padding: '0px', height: '100%',
						minHeight: '60vh', overflow: 'auto'
					}}>
						<Grid container style={{
							padding: '16px',
						}} justifyContent={'space-between'} height={'100%'}>
							<Grid item md={3.5} alignItems={'center'}>
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
										<Paragraph size='Plarge' bold>{capitalize(detailsPoke?.name)}</Paragraph>
									</Box>
									<Box mb={2}>
										<Chip style={{ background: finalColor[0] }} label={<Paragraph size='Pnormal'>{pokeSpecies.genera[7].genus}</Paragraph>} />
									</Box>
									<Box mb={3}>
										<CardMedia
											component="img"
											// width={200}
											sx={{ width: 120 }}
											image={detailsPoke?.sprites.other['dream_world'].front_default}
											alt="poke-img"
										/>
										{/* <img src={detailsPoke?.sprites.other['official-artwork'].front_default} alt="poke-img" /> */}
									</Box>
									<Box display={'flex'} mb={3}>

										<PokeTypes types={detailsPoke.types} />
									</Box>
									<Box display={'flex'}>
										<Paragraph size='Pnormal' bold VT>Height</Paragraph>&nbsp;
										<Paragraph size='Pnormal' VT>{`${detailsPoke.height / 10} m/${`${Math.floor(detailsPoke.height / 10 * 3.28)}'${Math.round(((detailsPoke.height / 10 * 3.28) % 1) * 12)}"`} `}</Paragraph>
										{/* <Typography>Height 0.7 m/2' 4"</Typography> */}
									</Box>
									<Box display={'flex'}>
										<Paragraph size='Pnormal' bold VT>Weight</Paragraph>&nbsp;
										<Paragraph size='Pnormal' VT>{` ${(detailsPoke.weight / 10).toFixed(1)} kg/${(detailsPoke.weight * 0.2205).toFixed(1)} lbs`}</Paragraph>
									</Box>
									{fetchGenderRate(pokeSpecies?.gender_rate)}
								</Box>
								{/* </Card> */}

								{/* </Card> */}
							</Grid>

							<Grid item md={8}>
								<Box mb={1}>
									<Paragraph size='Pmedium' bold>
										About
									</Paragraph>

									<div style={{
										backgroundColor: '#ffffff40',
										padding: '10px',
										borderRadius: '1rem',
										marginTop: '0.5rem',

									}}>

										<Paragraph size='Pnormal'>{pokeSpecies.form_descriptions.length > 0 && pokeSpecies.form_descriptions[0].description ? pokeSpecies.form_descriptions[0].description : pokeSpecies.flavor_text_entries[0].flavor_text}</Paragraph>
									</div>
								</Box>
								<Box mb={1}>
									<Paragraph size='Pmedium' bold>Abilities</Paragraph>

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
														<Paragraph size='Pnormal' style={{
															textTransform: 'capitalize'
														}}>{abilitie.ability.name}&nbsp;</Paragraph>
													</li>
												))}
										</ul>
									</div>

								</Box>
								<Box mb={1}>
									<Paragraph size='Pmedium' bold>Base Stats</Paragraph>
									<div style={{
										backgroundColor: '#ffffff40',
										padding: '5px',
										borderRadius: '1rem',
										marginTop: '0.5rem',
									}}>
										<Grid container item>
											{
												detailsPoke.stats.map((stat) => (
													<>
														<Grid md={4}>
															<Box>
																<Paragraph size='Pnormal' colorRed style={{ textTransform: 'capitalize' }}>{stat.stat.name.toUpperCase()}</Paragraph>
																<Paragraph size='Pnormal'>{stat.base_stat.toString()}</Paragraph>
															</Box>
														</Grid>
													</>
												))
											}
										</Grid>
									</div>
								</Box>
								<Box>
									<Paragraph size='Pmedium' bold>Evolutions</Paragraph>
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