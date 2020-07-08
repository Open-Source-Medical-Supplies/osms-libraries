import ENV from "../env";

const isProd = process.env.NODE_ENV !== "production";

const FormatHostingURL = (url: string): string => {
  if (/^\..+/.test(url) && isProd) {
    return ENV.PROD_URL_PREPEND + url.slice(1, url.length)
  } else {
    return url;
  }
}

export default FormatHostingURL;