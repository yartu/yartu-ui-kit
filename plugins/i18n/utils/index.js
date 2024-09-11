const disallowedKeys = ['__proto__', 'prototype', 'constructor'];

export function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

export function isEmpty(obj) {
  return !(Array.isArray(obj) ? obj.length : Object.keys(obj).length);
}

export function isValidPath(segments) {
  return !segments.some((segment) => disallowedKeys.indexOf(segment) !== -1);
}

export function parsePath(path) {
  const pathArray = path.split('.');
  const parts = [];

  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i];

    while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.';
      p += pathArray[++i];
    }

    parts.push(p);
  }

  if (!isValidPath(parts)) {
    return [];
  }

  return parts;
}

export function getMessage(object, path) {
  if (!isObject(object)) {
    return '';
  }

  const paths = parsePath(path);
  if (paths.length === 0) {
    return '';
  }

  let rawObject = Object.assign({}, object);
  for (let i = 0; i < paths.length; i++) {
    if (typeof rawObject[paths[i]] === 'string') {
      return rawObject[paths[i]];
    }

    rawObject = rawObject[paths[i]];
    if (rawObject === undefined || rawObject === null) {
      if (i !== paths.length - 1) {
        return '';
      }
      break;
    }
  }

  return '';
}

export function parseLocaleValues(message, values) {
  if (Array.isArray(values)) {
    const parseValues = {};
    const matches = [...message.matchAll(/{(.+?)}/g)];
    if (matches) {
      matches.forEach((match, index) => {
        if (values[index]) {
          parseValues[match[1]] = values[index];
        }
      });
    }

    return parseValues;
  }

  return values;
}

export function replaceLocaleValues(message, values) {
  for (const key in values) {
    message = message.replace(`{${key}}`, String(values[key]));
  }

  return message;
}

export function mergeDeep(target, source) {
  Object.keys(source).forEach((key) => {
    if (source[key] instanceof Object && key in target) {
      source[key] = { ...source[key], ...mergeDeep(target[key], source[key]) };
    }
  });

  return { ...(target || {}), ...source };
}
