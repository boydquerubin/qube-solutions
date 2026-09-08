import BoiseWebsiteCost from "./posts/boise-website-cost.jsx";
import AiChatbotVsAnswering from "./posts/ai-chatbot-vs-answering.jsx";
import HvacLeadCapture from "./posts/hvac-lead-capture.jsx";
import WixRebuildSudz from "./posts/wix-rebuild-sudz.jsx";
import BoisePlumbingWebsiteMobile from "./posts/boise-plumbing-website-mobile.jsx";
import GoogleBusinessProfileTreasureValley from "./posts/google-business-profile-treasure-valley.jsx";
import LocalSeoBoise from "./posts/local-seo-boise-service-businesses.jsx";
import LandscapingNampaGoogle from "./posts/landscaping-nampa-google.jsx";
import BoiseRoofingWebsiteMistakes from "./posts/boise-roofing-website-mistakes.jsx";
import AfterHoursLeadCapture from "./posts/after-hours-lead-capture.jsx";
import GoogleReviewsTreasureValley from "./posts/google-reviews-treasure-valley.jsx";
import ServiceAreaPagesSeo from "./posts/service-area-pages-seo.jsx";
import PressureWashingWebsiteBoise from "./posts/pressure-washing-website-boise.jsx";
import PestControlLeadCapture from "./posts/pest-control-lead-capture.jsx";
import GoogleAnalyticsSearchConsole from "./posts/google-analytics-search-console.jsx";
import TreeServiceWebsite from "./posts/tree-service-website-treasure-valley.jsx";
import MobileFirstWebsiteNampa from "./posts/mobile-first-website-nampa.jsx";
import EagleIdahoLocalSearch from "./posts/eagle-idaho-local-search.jsx";
import ElectriciansBoisWebsite from "./posts/electricians-boise-website.jsx";
import GarageDoorBoiseLeads from "./posts/garage-door-boise-leads.jsx";
import WebsiteHostingBoise from "./posts/website-hosting-boise-businesses.jsx";
import RespondToNegativeReviews from "./posts/respond-to-negative-reviews.jsx";
import StoneMasonryWebsiteBoise from "./posts/stone-masonry-website-boise.jsx";
import CarpetCleaningMeridianLeads from "./posts/carpet-cleaning-meridian-leads.jsx";
import CaldwellIdahoLocalSeo from "./posts/caldwell-idaho-local-seo.jsx";
import GoogleAdsVsSeoBoise from "./posts/google-ads-vs-seo-boise.jsx";
import WindowCleaningBoiseGoogle from "./posts/window-cleaning-boise-google.jsx";
import HomepageConvertsVisitors from "./posts/homepage-converts-visitors.jsx";
import IsYourWebsiteBringingLeads from "./posts/is-your-website-bringing-leads.jsx";
import HandymanWebsiteTreasureValley from "./posts/handyman-website-treasure-valley.jsx";
import ServicePagesSeo from "./posts/service-pages-seo-boise.jsx";
import PaintingContractorsBoise from "./posts/painting-contractors-boise.jsx";
import AiReceptionistVsContactForm from "./posts/ai-receptionist-vs-contact-form.jsx";
import WebsiteThatGetsCalls from "./posts/website-that-gets-calls.jsx";
import { postMeta } from "./postMeta.js";

export { isPublished, publishedAt } from "./postMeta.js";

/**
 * The article bodies, keyed by slug. Everything else about a post lives in
 * postMeta.js, which has no JSX in it so the sitemap function can read it.
 */
const components = {
  "how-much-does-a-website-cost-boise-idaho": BoiseWebsiteCost,
  "ai-chatbot-vs-answering-service-boise-contractors": AiChatbotVsAnswering,
  "boise-hvac-companies-24-7-lead-capture": HvacLeadCapture,
  "from-wix-to-custom-boise-window-cleaning": WixRebuildSudz,
  "boise-plumbing-website-mobile": BoisePlumbingWebsiteMobile,
  "google-business-profile-treasure-valley-contractors": GoogleBusinessProfileTreasureValley,
  "local-seo-boise-service-businesses": LocalSeoBoise,
  "landscaping-nampa-google": LandscapingNampaGoogle,
  "boise-roofing-website-mistakes": BoiseRoofingWebsiteMistakes,
  "after-hours-lead-capture-service-businesses": AfterHoursLeadCapture,
  "google-reviews-treasure-valley-businesses": GoogleReviewsTreasureValley,
  "service-area-pages-local-seo-boise": ServiceAreaPagesSeo,
  "pressure-washing-website-boise": PressureWashingWebsiteBoise,
  "pest-control-lead-capture-treasure-valley": PestControlLeadCapture,
  "google-analytics-search-console-boise": GoogleAnalyticsSearchConsole,
  "tree-service-website-treasure-valley": TreeServiceWebsite,
  "mobile-first-website-nampa-service-business": MobileFirstWebsiteNampa,
  "eagle-idaho-local-search-ranking": EagleIdahoLocalSearch,
  "electricians-boise-need-real-website": ElectriciansBoisWebsite,
  "garage-door-boise-website-leads": GarageDoorBoiseLeads,
  "website-hosting-explained-boise-businesses": WebsiteHostingBoise,
  "respond-to-negative-google-reviews": RespondToNegativeReviews,
  "stone-masonry-website-boise": StoneMasonryWebsiteBoise,
  "carpet-cleaning-meridian-lead-capture": CarpetCleaningMeridianLeads,
  "caldwell-idaho-local-seo": CaldwellIdahoLocalSeo,
  "google-ads-vs-seo-boise-contractors": GoogleAdsVsSeoBoise,
  "window-cleaning-boise-found-on-google": WindowCleaningBoiseGoogle,
  "homepage-converts-visitors-to-calls": HomepageConvertsVisitors,
  "is-your-website-bringing-in-leads": IsYourWebsiteBringingLeads,
  "handyman-business-website-treasure-valley": HandymanWebsiteTreasureValley,
  "service-pages-seo-boise": ServicePagesSeo,
  "painting-contractors-boise-online": PaintingContractorsBoise,
  "ai-receptionist-vs-contact-form": AiReceptionistVsContactForm,
  "website-that-gets-calls-boise": WebsiteThatGetsCalls,
};

export const posts = postMeta.map((meta) => ({
  ...meta,
  Component: components[meta.slug],
}));

const orphans = postMeta.filter((m) => !components[m.slug]).map((m) => m.slug);
if (orphans.length) {
  console.error("Blog post metadata with no article component:", orphans);
}
