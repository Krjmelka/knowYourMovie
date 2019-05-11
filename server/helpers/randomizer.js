module.exports = (num, startFromZero = true) => {
	if(startFromZero){
		return Math.floor(Math.random()* num)
	}
	return Math.floor(Math.random() * num + 1)
}