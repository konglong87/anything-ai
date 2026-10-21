/** Editorial search hints only: never injected into executable prompt text. */
const UI_DOMAIN = 'digital-product-uiux';
const SOFTWARE_DOMAIN = 'software-engineering-architecture';
const DISCOVERY_RULES = [
  { domain: UI_DOMAIN, subdomains: ['visual-layout','information-architecture','design-system','design-tokens','dashboard-design'], phrases: ['有质感','高级感','好看'] },
  { domain: UI_DOMAIN, subdomains: ['interaction-motion','continuous-interaction','gesture-interaction'], phrases: ['顺滑','流畅','丝滑'] },
  { domain: SOFTWARE_DOMAIN, subdomains: ['high-availability','high-concurrency','idempotency','observability','scalability','backend-architecture'], phrases: ['稳定','稳定性','大型后端'] }
];
export function discoveryAliases(domainId, subdomainId) {
  return DISCOVERY_RULES.filter(rule => rule.domain === domainId && rule.subdomains.includes(subdomainId)).flatMap(rule => rule.phrases);
}
