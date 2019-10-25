function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default {
  'external-weather'(payload, preventDefault) {
    return new Promise(async (resolve) => {
      preventDefault()
      const randomThird = getRandomInt(1, 4)
      switch (randomThird) {
        case 1:
          resolve('cloudy')
        case 2:
          resolve('sunny')
        case 3:
          resolve('rainy')
      }
    })
  },
  'external-currentTime': (payload, preventDefault) => {
    return new Promise(async (resolve) => {
      preventDefault()
      const date = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date())
      resolve(date)
    })
  },
  'external-usersCar': (payload, preventDefault) => {
    return new Promise(async (resolve) => {
      preventDefault()
      resolve("ferrari")
    })
  }
}