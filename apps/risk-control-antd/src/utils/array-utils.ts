export function filterValidValueMap(obj: any) {
  const filteredObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      filteredObj[key] = value;
    }
  }
  return filteredObj;
}
