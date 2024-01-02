import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export default function PokeHeader(
	// { namePoke, handleFilterPokemon }
	) {

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box sx={{ flexGrow: 1, marginBottom: '2em' }} justifyContent='center' textAlign='center' >
			<Box style={{
				transition: 'ease all .5s'
			}} component="img" src="../assets/pokemon-logo.png" height={isMobile ? '5em' : '8em'} />
		</Box>
		// <Box sx={{ flexGrow: 1, marginBottom: '2em' }}>
		// 	<AppBar position="static">
		// 		<Toolbar>
		// 			<Box width={1} display='flex' alignItems='center' margin={'0 auto'} justifyContent='space-between'>

		// 				<Box component="img" src="/assets/pokemon-logo.png" height='3em' />
		// 				<Box position='relative' margin='auto' width={1 / 2}>

		// 					<Search onChange={handleFilterPokemon}>
		// 						<SearchIconWrapper>
		// 							<SearchIcon />
		// 						</SearchIconWrapper>
		// 						<StyledInputBase
		// 						fullWidth
		// 							placeholder="Search…"
		// 							inputProps={{ 'aria-label': 'search' }}

		// 						/>
		// 					</Search>
		// 				</Box>
		// 			</Box>
		// 		</Toolbar>
		// 	</AppBar>
		// </Box>
	);
}