import api from '@/services/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function PokemonDetails() {
	const [detailsPoke, setDetailsPoke] = useState()
	const { query } = useRouter()

	console.log(query)
	useEffect(() => {
		const getDetailsPokemomByName = async () => {
			try {
				const nameQuery = query.id;

				const response = await api.get(`/pokemon/${nameQuery}`)
				console.log('v', response)
				setDetailsPoke(response.data)

			} catch (error) {

			}
		}

		getDetailsPokemomByName()
	}, [name])

	return (
		<div><pre>{JSON.stringify(detailsPoke, null, 2)}</pre></div>
	)
}

export default PokemonDetails