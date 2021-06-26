const puppeteer = require("puppeteer");
const sleep = require("sleep-promise");
//import captureWebsite from "capture-website";

//const authCookie = process.argv[1];
const authCookies = {
  ar_enduser:
    "s%3A40fef8cb62cd424789d060e564bb99c1%3A824469df5b9d49eab15034633104eabf.n57GfwFEoZsdX0d1U0CW6YkvK8mhHFKDD2QT4K6RRMU",
  ar_developer:
    "s%3A75b93ad1ce994f1b904ec829dae818cd%3Ae795eb48171a461b9f9a71e6b8c12279.NLZ4qDhOUehaln3D63izSYJrMsqFVLEQiRcfeI8PaTM",
};

var screenshots = [
  {
    account: "ar_enduser",
    url: "https://goto.my-agrirouter.com/app#AccountPairing-Display",
    width: 1368,
    height: 567,
    target: "modules/ROOT/assets/images/screenshots/accountpairing.png",
  },
  {
    account: "ar_enduser",
    url: "https://goto.my-agrirouter.com/app#Shell-home",
    width: 700,
    height: 1050,
    target: "modules/ROOT/assets/images/screenshots/homescreen.png",
    screenshotOptions: {
      clip: {
        x: 0,
        y: 0,
        width: 580,
        height: 1050,
      },
    },
  },
  {
    account: "ar_developer",
    url: "https://goto.my-agrirouter.com/app#Shell-home",
    width: 1100,
    height: 1300,
    target: "modules/ROOT/assets/images/screenshots/homescreen_dev.png",
    screenshotOptions: {
      clip: {
        x: 0,
        y: 0,
        width: 900,
        height: 1300,
      },
    },
  },
];

if (!isNaN(parseInt(process.argv[2]))) {
  screenshots = [screenshots[parseInt(process.argv[2])]];
}

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(
      () => document.body.innerHTML.length
    );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await sleep(checkDurationMsecs);
  }
};

const capture = async () => {
  console.log("Starting Chromium...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (const param of screenshots) {
    await page.setCookie({
      url: "https://goto.my-agrirouter.com",
      name: "agricore_sid",
      value: authCookies[param.account],
    });
    console.log("Processing " + param.target);
    await page.setViewport({ width: param.width, height: param.height });
    await page.goto(param.url);
    console.log("Waiting for page load to complete...");
    await waitTillHTMLRendered(page);
    await page.screenshot({ path: param.target, ...param.screenshotOptions });
    console.log("Screenshot of " + param.url + " saved as " + param.target);
  }
  browser.close();
};
capture();
