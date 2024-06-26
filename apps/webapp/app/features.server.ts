import { env } from "./env.server";
import { requestUrl } from "./utils/requestUrl.server";

export type TriggerFeatures = {
  isManagedCloud: boolean;
  v3Enabled: boolean;
  alertsEnabled: boolean;
};

function isManagedCloud(host: string): boolean {
  return (
    host === "cloud.trigger.dev" ||
    host === "test-cloud.trigger.dev" ||
    host === "internal.trigger.dev" ||
    process.env.CLOUD_ENV === "development"
  );
}

function featuresForHost(host: string): TriggerFeatures {
  return {
    isManagedCloud: isManagedCloud(host),
    v3Enabled: env.V3_ENABLED === "true",
    alertsEnabled: env.ALERT_FROM_EMAIL !== undefined && env.ALERT_RESEND_API_KEY !== undefined,
  };
}

export function featuresForRequest(request: Request): TriggerFeatures {
  const url = requestUrl(request);
  return featuresForUrl(url);
}

export function featuresForUrl(url: URL): TriggerFeatures {
  return featuresForHost(url.host);
}
