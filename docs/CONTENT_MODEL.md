# Content Model - Advert

## Purpose
Define how Advert represents content ideas, drafts, asset briefs, review requirements and reusable publication packages.

## ContentDraft definition
A ContentDraft is any promotional content prepared for a BrandProfile and optionally linked to a Campaign. It can be a social post, article, short video script, landing page section, email draft, ad copy, caption, carousel outline or asset brief.

## Required fields
- id
- brandProfileId
- campaignId
- title
- channel
- format
- language
- body
- callToAction
- status
- createdBy
- createdAt
- updatedAt

## Optional fields
- assetBrief
- targetAudience
- contentPillar
- keywords
- hashtags
- landingPageUrl
- approvalId
- publishingTaskId
- reviewerNotes
- sourceNotes

## Supported formats
- social_post
- short_video_script
- carousel_outline
- article_outline
- article_draft
- landing_page_copy
- email_draft
- ad_copy
- google_business_post
- profile_bio
- comment_suggestion

## Supported channels
- owned_site
- linkedin
- instagram
- facebook
- google_business_profile
- youtube_shorts
- tiktok
- email
- internal_docs

## Content pillars
- authority: educational or expert positioning.
- proof: testimonials, case studies, progress and evidence.
- offer: clear service or product promotion.
- story: human narrative, founder story, client journey or behind the scenes.
- utility: checklist, guide, explanation or FAQ.
- update: product, company or project progress.

## Draft readiness checklist
A draft can move to in_review only when it has:
1. BrandProfile.
2. Campaign or clear standalone purpose.
3. Channel.
4. Format.
5. Body or assetBrief.
6. Call to action or reason for no CTA.
7. No obvious safety gate violation.

## AssetBrief fields
- visualType
- dimensions
- headline
- subheadline
- requiredElements
- forbiddenElements
- brandNotes
- imagePrompt
- layoutNotes

## Review checklist
- Is the content aligned with the brand tone?
- Is the audience clear?
- Is the offer or message clear?
- Is the CTA appropriate?
- Are claims supportable?
- Are there privacy, compliance or platform risks?
- Does it avoid spam, manipulation and fake engagement?

## Watcher role
Watcher may generate content ideas, drafts, variants, translations, asset briefs and review notes. Watcher must not mark content as approved unless an approval record exists.

## MVP examples

### LinkedIn authority post
Format: social_post
Channel: linkedin
Pillar: authority
CTA: invite reader to contact or read more.

### Instagram carousel brief
Format: carousel_outline
Channel: instagram
Pillar: utility
AssetBrief: slide structure, headlines and design notes.

### Google Business update
Format: google_business_post
Channel: google_business_profile
Pillar: offer
CTA: call, visit site or request service.

## Stage 2 screen implication
The /drafts page should show seed drafts with channel, format, status, CTA and review readiness.
