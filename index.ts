/* eslint-disable */
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {
  registerAutoTags,
  createCertificate,
  createGoogleMxRecords,
  createTxtRecord,
  Website,
  AssetsCachingLambda,
  SecurityHeadersLambda
} from "@topmonks/pulumi-aws";
import * as arx from "./arx.monks.cloud/infra";
import * as monksroom from "./room.monks.cloud/infra";
import * as postcube from "./postcube.cz/infra";
import * as hookamonk from "./www.hookamonk.com/infra";

// Automatically inject tags.
registerAutoTags({
  "user:Project": pulumi.getProject(),
  "user:Stack": pulumi.getStack()
});

const usProvider = new aws.Provider(`topmonks-webs/us-east-1`, {
  region: aws.USEast1Region
});

createCertificate("www.topmonks.cz");
createCertificate("www.topmonks.com");

createCertificate("www.cbx.cz");
createCertificate("www.hookamonk.com");
createCertificate("www.ingridapp.io");
createCertificate("monks.cloud");
createCertificate("www.postcube.cz");
createCertificate("www.postcube.com");
createCertificate("www.zive.tv");

createCertificate("www.hackercamp.cz");
createGoogleMxRecords("hackercamp.cz");
createTxtRecord(
  "hc-google-site-verification",
  "hackercamp.cz",
  "google-site-verification=eIaBVqhznPV-0AAEEbFJN82j3w063w_tW0-DUZWX5C0"
);

createCertificate("www.chytrybox.cz");
createGoogleMxRecords("chytrybox.cz");
createTxtRecord(
  "google-site-verification",
  "chytrybox.cz",
  "google-site-verification=KlEgvM1Rx9iOnZm53YPCzRsHkmltTuIEMV63L50gfus"
);
const assetsCachingLambda = AssetsCachingLambda.create("topmonks-webs-caching");

const securityHeadersLambda = SecurityHeadersLambda.create(
  "topmonks-webs-security"
);

export const assetsCachingLambdaArn = assetsCachingLambda.arn;
export const securityHeadersLambdaArn = securityHeadersLambda.arn;

const websites = require("./websites.json");
export const sites: any = {};
for (const domain of Object.keys(websites)) {
  const website = Website.create(
    domain,
    Object.assign(
      {
        assetsCachingLambdaArn,
        securityHeadersLambdaArn
      },
      websites[domain]
    )
  );
  sites[domain] = {
    url: website.url,
    s3BucketUri: website.s3BucketUri,
    s3WebsiteUrl: website.s3WebsiteUrl,
    cloudFrontId: website.cloudFrontId
  };
}

const redirects = require("./redirects.json");
export const redirectSites: any = {};
for (const domain of Object.keys(redirects)) {
  const website = Website.createRedirect(
    domain,
    Object.assign(
      {
        assetsCachingLambdaArn,
        securityHeadersLambdaArn
      },
      redirects[domain]
    )
  );
  redirectSites[domain] = {
    url: website.url,
    s3BucketUri: website.s3BucketUri,
    cloudFrontId: website.cloudFrontId
  };
}

export const arxDocumentsBucketUri = arx.documentsBucketUri;
export const arxDocumentsBucketEndpoint = arx.documentsBucketEndpoint;
export const arxDocumentsTable = arx.documentsTable;
export const arxDocumentsApi = arx.documentsApi;
export const monksroomApiHost = monksroom.apiDistribution.url;
export const postCubeApi = postcube.api.url;
export const hookamonkApiHost = hookamonk.apiDistribution.url;
