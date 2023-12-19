import { Typography, TypographyProps } from '@mui/material'
import { styled, SxProps, Theme } from '@mui/material/styles'

interface ParagraphProps extends StyledProps {
	id?: string
	size: 'Plarge' | 'Pnormal' | 'Psmall' | 'Pmedium' | 'normal' | 'medium'
	children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
	sx?: SxProps<Theme>
}

interface StyledProps extends TypographyProps {
	colorRed?: boolean
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

const StyledParagraphPokeSmall = styled(
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

const StyledParagraphPokeNormal = styled(
	Typography,
	{}
)<StyledProps>(({ theme, bold, fm, colorRed }) => ({
	fontSize: '20px',
	color: !colorRed ? "#000" : '#dc143c',
	fontFamily: fm !== "Press Start" ? "'VT323', monospace" : "'Press Start 2P', display",
	fontWeight: bold ? 'bold' : 'inherit',
	margin: 0,
	lineHeight: '150%',
	// textTransform: up ? 'uppercase' : 'inherit'
}))

const StyledParagraphPokeMedium = styled(
	Typography,
	{}
)<StyledProps>(({ theme, bold, fm, colorRed }) => ({
	fontSize: '27px',
	color: !colorRed ? "#000" : '#dc143c',
	fontFamily: fm !== "Press Start" ? "'VT323', monospace" : "'Press Start 2P', display",
	fontWeight: bold ? 'bold' : 'inherit',
	margin: 0,
	lineHeight: '150%',
	// textTransform: up ? 'uppercase' : 'inherit'
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

export function Paragraph({ children, size, id, sx, bold, up, colorRed }: ParagraphProps) {
	const paragraphComponents = {
		Plarge: StyledParagraphPokeLarge,
		Psmall: StyledParagraphPokeSmall,
		Pnormal: StyledParagraphPokeNormal,
		Pmedium: StyledParagraphPokeMedium,
		normal: StyledParagraphNormal,
		medium: StyledParagracphMedium
	}

	const CurrentComponent = paragraphComponents[size]

	return <CurrentComponent id={id} sx={sx} bold={bold} colorRed={colorRed}>{children}</CurrentComponent>
}