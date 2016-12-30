export const INPUT = 'input'
export const REMOVE = 'remove'

export function input(value) {
	return {
		type: INPUT,
		value
	}
}

export function remove(value) {
	return {
		type: REMOVE,
		value
	}
}