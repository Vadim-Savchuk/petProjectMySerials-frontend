
export const randomRadius = () => {

    return `${getRandomInt(5, 50)}% ${getRandomInt(5, 50)}% ${getRandomInt(5, 50)}% ${getRandomInt(5, 50)}%`
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}