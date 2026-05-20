# Campaign Model - Advert

## Purpose
Define how campaigns are planned, validated and prepared for content generation inside Advert. A campaign is the bridge between a brand profile and the content calendar.

## Campaign definition
A campaign is a structured promotion effort for one BrandProfile with objective, audience, offer, channels, cadence and measurable outcomes.

## Required fields
- id
- brandProfileId
- name
- objective
- audience
- offer
- channels
- cadence
- startDate
- endDate
- status
- owner
- successCriteria
- constraints

## Optional fields
- budgetNotes
- region
- language
- keywords
- competitors
- landingPageUrl
- sourceNotes

## Campaign objectives
- awareness: increase visibility of brand, person, service or product.
- authority: build credibility through educational content.
- lead_generation: drive inquiries, forms, WhatsApp contacts or calls.
- conversion: promote a specific offer or service.
- retention: keep existing audience engaged.
- launch: introduce a new product, profile, service or feature.

## Campaign readiness checklist
A campaign can become planned only when it has:
1. Active BrandProfile.
2. Clear objective.
3. Defined audience.
4. Defined offer or message.
5. At least one channel.
6. Cadence or publishing frequency.
7. Safety constraints reviewed.

## Campaign workflow
draft -> planned -> active -> paused -> completed -> archived

## Watcher role
Watcher may create a campaign package from a BrandProfile, including: objective options, audience hypothesis, channel plan, content calendar draft, draft topics and report template.

## MVP campaign examples

### HelpUS BR service awareness
Brand: HelpUS BR
Objective: authority and lead generation
Audience: Brazilian and Portuguese-speaking clients looking for services in the US or Brazil.
Channels: site, LinkedIn, Instagram, Facebook.
Cadence: three posts per week.

### Advert product build-in-public
Brand: Advert HelpUS BR
Objective: authority and product documentation
Audience: internal operators, future clients and partners.
Channels: site, docs, LinkedIn.
Cadence: weekly progress summary.

## Stage 2 screen implication
The /campaigns page should show seed campaigns, status, objective, channels, cadence and readiness.
