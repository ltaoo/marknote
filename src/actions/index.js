export const INPUT = 'input'
export const SCROLL = 'scroll'

export function input(value) {
	return {
		type: INPUT,
		value
	}
}

export function scroll(value) {
	return {
		type: SCROLL,
		value
	}
}