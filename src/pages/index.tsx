import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ChangeEvent, useEffect, useState } from 'react'
import api from '@/services/api'
import axios from 'axios'
import PokeHeader from '@/components/PokeHeader'
import { Box, CircularProgress, Container, Grid } from '@mui/material'
import PokeCard from '@/components/PokeCard'
import { PokemonProps } from '@/types/pokemon'

export default function Home() {
	const [load, setLoad] = useState(true)
	const [pokemons, setPokemons] = useState<PokemonProps[]>([])
	
	useEffect(() => {
		const getPokemons = async () => {
			let endpoints = []
			let newPokemons = [] as PokemonProps[]
			try {
				const response = await api.get('/pokemon?limit=50')
				for (let i = 1; i < response.data.results.length + 1; i++) {
					endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
				}

				let resEndpoint = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(res => res)
				console.log('resEndpoint', resEndpoint)
				for (let i = 0; i < resEndpoint.length; i++) {
					newPokemons = [
						...newPokemons,
						{
							...resEndpoint[i].data
						}
					]
				}
				setPokemons(newPokemons)
				setLoad(false)
			} catch (error) {
				console.log('error', error)
				setLoad(false)
			}
		}

		getPokemons()
	}, [])


	return (

		<div>
			<PokeHeader />
			<Container maxWidth={false}>
				<Box marginX={5}>
					<Grid container spacing={8}>
						{!load ? pokemons.map((pokemon, key) => (
							<Grid item xs={12} sm={6} md={4} xl={2} key={key}>
								<PokeCard
									pokemon={pokemon}
									image={pokemon.sprites.other.dream_world.front_default}
								/>
							</Grid>
						)) : (
							<Grid justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex', width: '100%', height: '50vh' }}>
								<CircularProgress />
							</Grid>
						)}
					</Grid>
				</Box>
			</Container>

		</div>
	)
}
