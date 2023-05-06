import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { response, notFound, withCORS } from "../http.mjs";

/** @typedef { import("@pulumi/awsx/classic/apigateway").Request } APIGatewayProxyEvent */
/** @typedef { import("@pulumi/awsx/classic/apigateway").Response } APIGatewayProxyResult */

/**
 * @param {APIGatewayProxyEvent} event
 * @returns {Promise.<APIGatewayProxyResult>}
 */
export async function handler(event) {
  const track = event.queryStringParameters["track"];
  /** @type Response */
  const resp = await fetch(
    `https://www.beatport.com/search?${new URLSearchParams({
      q: track,
      _pjax: "#pjax-inner-wrapper"
    })}`,
    {
      credentials: "include",
      headers: {
        "X-PJAX": "true",
        "X-PJAX-Container": "#pjax-inner-wrapper"
      },
      referrer: "https://www.beatport.com/",
      method: "GET",
      mode: "cors"
    }
  );
  const html = await resp.text();
  const $ = cheerio.load(html);
  const $tracks = $(".bucket-item.track");
  if (!$tracks.length) {
    return withCORS(["GET"])(notFound());
  }
  const $track = $tracks.first();
  return withCORS(["GET"])(
    response({
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      byArtist: $track.find(".buk-track-artists").text().trim(),
      name: $track.find(".buk-track-primary-title").text().trim(),
      version: $track.find(".buk-track-remixed").text().trim(),
      genre: $track.find(".buk-track-genre").text().trim(),
      url: `https://www.beatport.com${$track
        .find(".buk-track-title a")
        .attr("href")}`,
      image: $track.find("img").attr("src")
    })
  );
}
