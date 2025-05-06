import puppeteer from "puppeteer-core";

export async function POST(request: any, response: any) {
  const body = await request.json();
  const { username, password, school } = body;
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://production-sfo.browserless.io?token=SG6HTbe2tAItQOb3b7dd51663f011f2548fccaa457`,
  });
  const page = await browser.newPage();
  await page.goto(`https://${school}.edunav.net/login`);
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  const navigationPromise = page.waitForNavigation();
  await navigationPromise;
  const url = page.url();

  if (url === `https://${school}.edunav.net/`) {
    const name =
      "body > div.page > div > div > div.col-lg-8 > div.row > div:nth-child(1) > div.widget.widget-shadow.mb-15 > div.widget-header.bg-primary.p-15.clearfix > div.font-size-18.mt-10";
    const classs =
      "body > div.page > div > div > div.col-lg-8 > div.row > div:nth-child(1) > div.widget.widget-shadow.mb-15 > div.widget-header.bg-primary.p-15.clearfix > div.font-size-14";
    const extractedName = await page.$eval(name, (el) =>
      el.textContent?.trim()
    );
    const extractedClass = await page.$eval(classs, (el) =>
      el.textContent?.trim()
    );
    const text = {
      name: extractedName,
      class: extractedClass,
    };
    await browser.close();
    response.status(200).json(text);
  } else {
    await browser.close();
    response.status(401).json({
      error: "Invalid username or password",
    });
  }
}
