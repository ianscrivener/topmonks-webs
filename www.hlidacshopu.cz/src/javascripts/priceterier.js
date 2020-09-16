import { html, render, svg } from "lit-html/lit-html";
import { formatMoney, formatPercents } from "./lib/format";
import { fetchPriceterierData } from "./lib/remoting";
import { shops } from "./lib/shops.js";

const tableRoot = document.getElementById("table-root");

addEventListener("DOMContentLoaded", async e => {
  try {
    let data = await fetchPriceterierData();
    console.log("fetched data from fetchPriceterierData() ");
    console.log(data);
    //add sequenceId
    let a = data;
    for (let i = 0; i < a.length; i++) {
      let obj = a[i];
      obj.sequenceId = i + 1;
    }
    data = a;
    render(tableTemplate(data), tableRoot);
  } catch (ex) {
    console.error(ex);
  }
});

function tableTemplate(data) {
  //return data.sort((a, b) => a.sortKey - b.sortKey).map(shopTemplate);
  console.log(data.map(shopTemplate));

  return data.map(shopTemplate);
}

function shopTemplate({
  sequenceId,
  historyItems30Days,
  date,
  shop,
  itemId,
  itemName,
  itemUrl,
  minPrice30Days,
  currentPrice,
  max_price,
  sale_abs,
  sale_perc
}) {
  return html`
    <tr class="dashboard-row">
      <th>${sequenceId}</th>
      <td>${formatPercents(sale_perc / 100)}</td>
      <td>${formatMoney(Math.round(minPrice30Days))}</td>
      <td>${formatMoney(Math.round(sale_abs))}</td>
      <td>${formatMoney(Math.round(currentPrice))}</td>
      <td>${date}</td>
      <td>${productLinkTemplate(shops.get(shop), itemName, itemUrl)}</td>
      <td>${logoTemplate(shops.get(shop))}</td>
    </tr>
  `;
}

function logoTemplate({ logo, name, url, viewBox }) {
  const image = svg`
      <svg viewBox="${viewBox}">
        <title>${name}</title>
        <use href="#${logo}"/>
      </svg>
    `;
  return html`
    <a
      href="${url}"
      class="sprite sprite--${logo}"
      title="${name}"
      target="_blank"
      >${image}</a
    >
  `;
}

function productLinkTemplate({ logo, name, url, viewBox }, itemName, itemUrl) {
  return html`
    <a href="${itemUrl}" target="_blank">${itemName}</a>
  `;
}