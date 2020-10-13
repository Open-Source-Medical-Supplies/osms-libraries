/** 
 * Airtable MD links are sent/recieved alike:
 *  "some url text[1] some other text ... [1]: https://example.com"
 * If someone were to use standard bracket notation on top of this, AT sends alike:
 *  "... out in public [[1][1]]. As supplies continue ... [1]: https://example.com"
 * and the problem is compounded.
 * 
 * @constant urlRxMatch - localized regex to test for the existence of the default "[1]:" phenomenom
 * @constant bracketNotation - a modified version to test for "[[n][n]]" with a subgroup
 * @constant linkRx - a modified modified version to capture the URL itself
 */

const urlRxMatch = new RegExp(/\[\d+\]:/);
const bracketNotation = new RegExp(/\[(\[\d+\])+\]/g);
const linkRx = new RegExp(/(?:\[\d+\]:\s)(.+)/g);
const getLinks = (md: string) => Array.from(md.matchAll(linkRx), (g) => g[1]);

const replaceBracketLinks = (md: string) => {
  const links = getLinks(md);
  if (!links) return md;
  
  let i = 0;
  return md.replace(bracketNotation, (_, subGroup) => {
    // returns [[n]](link) -- extra [] bc. one set gets consumed by MD
    const temp = `[${subGroup}](${links[i]})`
    i++;
    return temp;
  })
}

/** Slices, dices, and rehydrates AT MD to a normal MD link -> (foo)[www.foo.com] */
const replaceStandardLinks = (md: string) => {
  let tempMD = '';
  
  // Step 1 - split the MD into substrings.
  // -- The first half of the arr contains the MD to render
  // -- The second half contains dirty links -> ': www.example.foo\n'
  const urlArr = md.split(urlRxMatch);
  // S2 - cleanly parse the links from the original MD
  const links = getLinks(md);
  // S3 - calculate midpoint to terminate before running into the dirty links
  const mid = Math.round(urlArr.length / 2);
  for (let i = 0; i < (mid - 1); i++) {
    // Step 4 - grab the first length of MD which terminates with a URL that needs fixing and its URL
    const linkDesc = urlArr[i];
    const link = links[i];
    // S5 - slap everything back together. The linkDesc is already in the required [foo] notation for MD from AT
    tempMD += linkDesc + `(${link})`;
  }
  return tempMD;
}
const dateInBracketsRx = new RegExp(/\[\d+\/\d+\/\d+\]/g); // this works, but is brittle as it only applies to a specific date string
// try getting this to work -> \[.+\](?!\() aka anything in square brackets, but not a MD link.
export const fixMdUrls = (md: string): string => {
  if (dateInBracketsRx.test(md)) {
    const a = md.match(dateInBracketsRx);
    if (a) {
      const b = md.split(dateInBracketsRx)
      md = b.reduce((acc, str, ix) => {
        acc += str;
        if (a[ix]) {
          acc += "\\"+ a[ix].slice(0, a[ix].length - 1) + "\\]"
        }
      return acc;
      }, '')
    }
  }
  if (bracketNotation.test(md)) {
    return replaceBracketLinks(md);
  }
  else if (urlRxMatch.test(md)) {
    return replaceStandardLinks(md);
  }
  return md;
}
