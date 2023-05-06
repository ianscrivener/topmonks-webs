/* eslint-disable */
import * as pulumi from "@pulumi/pulumi";
import {
  registerAutoTags,
  createCertificate,
  createCacheBoostingPolicy,
  createSecurityHeadersAndPermissionsPolicy,
  CloudFront,
  Website
} from "@topmonks/pulumi-aws";
import * as arx from "./arx.monks.cloud/infra";
import * as monksroom from "./room.monks.cloud/infra";
import * as postcube from "./postcube.cz/infra";
import * as hookamonk from "./www.hookamonk.com/infra";
import * as startupStudio from "./studio.topmonks.com/infra";

// Automatically inject tags.
registerAutoTags({
  "user:Project": pulumi.getProject(),
  "user:Stack": pulumi.getStack()
});

createCertificate("www.topmonks.cz");
createCertificate("www.topmonks.com");

createCertificate("www.cbx.cz");
createCertificate("www.hookamonk.com");
createCertificate("www.ingridapp.io");
createCertificate("monks.cloud");
createCertificate("www.zive.tv");

const websites = require("./websites.json");
export const sites: any = {};
for (const domain of Object.keys(websites)) {
  let cacheBoostingPolicy = createCacheBoostingPolicy(domain, {
    customName: "cache-boosting-" + domain.replace(/\./g, "-"),
    cookiesConfig: { cookieBehavior: "none" },
    headersConfig: { headerBehavior: "none" },
    queryStringsConfig: { queryStringBehavior: "none" }
  });
  let securityHeadersPolicy = createSecurityHeadersAndPermissionsPolicy(
    domain,
    { customName: "security-headers-" + domain.replace(/\./g, "-") }
  );
  const website = Website.create(
    domain,
    Object.assign(
      {
        assetsCachePolicyId: cacheBoostingPolicy.id,
        assetResponseHeadersPolicyId:
          CloudFront.ManagedResponseHeaderPolicy
            .CORSwithPreflightAndSecurityHeadersPolicy,
        cachePolicyId: CloudFront.ManagedCachePolicy.CachingOptimized,
        responseHeadersPolicyId: securityHeadersPolicy.id
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
    Object.assign({}, redirects[domain])
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
export const topmonksWebsApi = startupStudio.api.url;
export const hookamonkApiHost = hookamonk.apiDistribution.url;
