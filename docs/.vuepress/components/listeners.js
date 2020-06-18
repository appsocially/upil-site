function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function resolveWeather() {
  const randomThird = getRandomInt(1, 4);
  switch (randomThird) {
    case 1:
      return "cloudy";
    case 2:
      return "sunny";
    case 3:
      return "rainy";
  }
}

function resolveCurrentTime() {
  const date = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date());

  return date;
}

async function lookupDefinition(payload) {
  const { args } = payload;
  const response = await fetch(
    `https://owlbot.info/api/v4/dictionary/${args.lookupWord}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token c8eb099deb57a74940226725672334ec09259393"
      }
    }
  );
  const rJson = await response.json();
  const success = rJson && rJson.definitions;
  const definition = success ? rJson.definitions[0].definition : null;
  return definition;
}

async function getExchangeRate(payload) {
  const {
    args: { inputCurrencyCode }
  } = payload;

  const currencyCodeUpper = inputCurrencyCode.toUpperCase();
  const fetchUrl = `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyCodeUpper}`;
  console.log("fetchUrl", fetchUrl);
  const response = await fetch(fetchUrl, {
    method: "GET"
  });
  const rJson = await response.json();
  const rate = parseFloat(rJson["rates"][currencyCodeUpper]).toFixed(4);
  return rate;
}

export default {
  async external(payload, preventDefault) {
    preventDefault();
    const { topic } = payload;
    switch (topic) {
      case "weather":
        return resolveWeather();
      case "currentTime":
        return resolveCurrentTime();
      case "usersCar":
        return "ferrari";
      default:
        return symbols.UNRESOLVED;
    }
  },
  async action(payload, preventDefault) {
    preventDefault();
    const {
      event: {
        node: { label }
      }
    } = payload;

    switch (label) {
      case "lookupDefinition":
        return lookupDefinition(payload);
      case "getExchangeRate":
        return getExchangeRate(payload);
    }
  }
};
