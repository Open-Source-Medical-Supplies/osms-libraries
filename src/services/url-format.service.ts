import ENV from "../env";

const FormatHostingURL = (url: string, isProd: boolean): string => {
  return /^\..+/.test(url) && isProd ?
    ENV.PROD_URL_PREPEND + url.slice(1, url.length) :
    url;
}

export default FormatHostingURL;