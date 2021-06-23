const puppeteer = require("puppeteer");
//import captureWebsite from "capture-website";

//const authCookie = process.argv[1];
const authCookie =
  "s%3A40fef8cb62cd424789d060e564bb99c1%3Ad42baf2ab44f4e189696a76083f67d42.KGaKkhQ%2BMC6ut9WZK%2Fr5H1Hr5o5KM6Chv5UeES%2Bvqlw";

const screenshots = [
  {
    url: "https://goto.my-agrirouter.com/app#AccountPairing-Display",
    width: 1368,
    height: 567,
    target: "modules/ROOT/assets/images/screenshots/accountpairing.png",
  },
];

const capture = async () => {
  console.log("Starting Chromium...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setCookie({
    url: "https://goto.my-agrirouter.com",
    name: "agricore_sid",
    value: authCookie,
  });
  for (const param of screenshots) {
    console.log("Processing " + param.target);
    await page.setViewport({ width: param.width, height: param.height });
    await page.goto(param.url);
    await page.screenshot({ path: param.target });
    console.log("Screenshot of " + param.url + " saved as " + param.target);
  }
  browser.close();
};
capture();
