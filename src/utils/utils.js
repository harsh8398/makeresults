const tokenEpoch = new Date().getTime();

const MAP_TYPE_TOKENS = {
  number: `##number${tokenEpoch}##`,
  // string: `##string${tokenEpoch}##`,
  boolean: `##boolean${tokenEpoch}##`,
  // bigint: `##bigint${tokenEpoch}##`,
  // undefined: `##undefined${tokenEpoch}##`,
  // object: undefined, // uncludes null, [], {}, etc.
};

// const generateVar = (type, count) => `##${MAP_TYPE_TOKENS[type]}${count}##`;

const blacklist = ["object", "undefined", "bigint", "string"];

// const effectiveTokens = {};

export const convertToMakeResults = (data, tokenize) => {
  const varCounters = {
    number: 0,
    boolean: 0,
  };

  if (data.length === 0) {
    return [-1, null];
  }
  let json = {};
  if (tokenize) {
    try {
      json = JSON.parse(data, (key, value) => {
        if (blacklist.includes(typeof value)) {
          return value;
        } else {
          value = MAP_TYPE_TOKENS[typeof value];
          return value;
        }
      });
    } catch (e) {
      return [-1, json];
    }
    let tempString = { data: JSON.stringify(json) };
    let res = JSON.stringify(tempString)
      .slice(9, -2)
      .replace(
        new RegExp(`\\\\"${MAP_TYPE_TOKENS["number"]}\\\\"`, "g"),
        function (_) {
          console.log(_);
          varCounters["number"] += 1;
          return `".num${varCounters["number"]}."`;
        }
      )
      .replace(
        new RegExp(`\\\\"${MAP_TYPE_TOKENS["boolean"]}\\\\"`, "g"),
        function (_) {
          varCounters["boolean"] += 1;
          return `".boolean${varCounters["boolean"]}."`;
        }
      );
    return [inflateTemplate(res, varCounters), json];
  } else {
    try {
      json = JSON.parse(data);
    } catch (e) {
      return [-1, json];
    }

    return [inflateTemplate(data), json];
  }
};

function inflateTemplate(res, varCounters) {
  const baseTemplate = "| makeresults count=1";
  const numTemplate = (count) => `| eval num${count}=random()`;
  const booleanTemplate = (count) =>
    `| eval boolean${count}=if(random()%100 > 50, "true", "false") `;

  let output = baseTemplate;
  if (typeof varCounters !== "undefined") {
    for (let i = 1; i <= varCounters["number"]; i++) {
      output += "\n" + numTemplate(i);
    }
    for (let i = 1; i <= varCounters["boolean"]; i++) {
      output += "\n" + booleanTemplate(i);
    }
  }
  output += `
| eval _raw="${res}"
| collect index=main`;
  return output;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
