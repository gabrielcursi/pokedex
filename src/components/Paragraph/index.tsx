import { Typography } from '@mui/material'
import { styled, SxProps, Theme } from '@mui/material/styles'

interface ParagraphProps extends StyledProps {
	id?: string
	size: 'Plarge' | 'Pmedium' | 'Psmall' | 'normal' | 'medium'
	children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
	sx?: SxProps<Theme>
}

interface StyledProps {
	color?: string | undefined
	bold?: boolean
	fm?: 'Press Start'
}

const StyledParagraphPokeLarge = styled(
	Typography,
	{}
)<StyledProps>(({ theme, bold, fm }) => ({
	fontSize: 8 * 5,
	color: "#000",
	textTransform: 'capitalize',
	fontFamily: fm !== "Press Start" ? "'VT323', monospace" : "'Press Start 2P', display",
	fontWeight: bold ? 'bold' : 'inherit',
	[theme.breakpoints.down('sm')]: {
		fontSize: 8 * 3,
	}
}))

const StyledParagraphPokeMedium = styled(
	Typography,
	{}
)<StyledProps>(({ theme, color, bold, fm }) => ({
	fontSize: '16px',
	color: "#000",
	fontFamily: fm !== "Press Start" ? "'VT323', monospace" : "'Press Start 2P', display",
	fontWeight: bold ? 'bold' : 'inherit',
	margin: 0,
	lineHeight: '150%',
}))

const StyledParagraphPokeSmall = styled(
	Typography,
	{}
)<StyledProps>(({ theme, bold, fm }) => ({
	fontSize: '14px',
	color: "#000",
	fontFamily: fm !== "Press Start" ? "'VT323', monospace" : "'Press Start 2P', display",
	fontWeight: bold ? 'bold' : 'inherit',
	margin: 0,
	lineHeight: '150%',
}))

const StyledParagraphNormal = styled(
	Typography,
	{})<StyledProps>(({ bold }) => ({
		color: "#252a41",
		fontWeight: bold ? 'bold' : 'inherit',
		fontFamily: "Teko Variable, sans-serif",

		fontSize: '32px'
	}))

const StyledParagracphMedium = styled(
	Typography,
	{})<StyledProps>(({ bold }) => ({
		color: "#252a41",
		fontWeight: bold ? 'bold' : 'inherit',
		fontFamily: "Teko Variable, sans-serif",

		fontSize: '40px'
	}))

export function Paragraph({ children, size, id, sx, bold }: ParagraphProps) {
	const paragraphComponents = {
		Plarge: StyledParagraphPokeLarge,
		Pmedium: StyledParagraphPokeMedium,
		Psmall: StyledParagraphPokeSmall,
		normal: StyledParagraphNormal,
		medium: StyledParagracphMedium
	}

	const CurrentComponent = paragraphComponents[size]

	return <CurrentComponent id={id} sx={sx} bold={bold}>{children}</CurrentComponent>
}