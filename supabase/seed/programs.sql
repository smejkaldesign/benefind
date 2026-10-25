-- Seed: programs
--
-- Source: src/lib/benefits/programs/*.ts, src/lib/benefits/state-programs.ts,
-- and src/lib/benefits/company-programs/ (ALL_COMPANY_PROGRAMS)
-- Last verified: 2026-10-25
--
-- Idempotent: uses INSERT ... ON CONFLICT (id) DO UPDATE.
-- Every engine program id must exist here: screening_results.program_id has a
-- foreign key to programs.id, so a missing id makes the whole screening fail
-- to save. src/lib/benefits/__tests__/seed-sync.test.ts enforces this.
--
-- Category mapping (rule engine -> DB):
--   food       -> benefit
--   healthcare -> benefit
--   housing    -> assistance
--   income     -> benefit
--   energy     -> assistance
--   education  -> grant
--   tax-credit -> tax_credit

BEGIN;

INSERT INTO public.programs (
  id, name, category, track, description,
  agency, application_url, tier, status,
  eligibility_criteria, published_at
) VALUES

-- ------------------------------------------------------------------ chip
(
  'chip',
  'Children''s Health Insurance Program (CHIP)',
  'benefit',
  'individual',
  'Low-cost health coverage for children in families that earn too much for Medicaid but can''t afford private insurance.',
  'Centers for Medicare & Medicaid Services (CMS)',
  'https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/',
  'universal',
  'active',
  '{
    "income_limit_fpl_percent": 250,
    "medicaid_floor_fpl_percent": 138,
    "age_limit": 19,
    "requires_children": true,
    "notes": "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL."
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ eitc
(
  'eitc',
  'Earned Income Tax Credit (EITC)',
  'tax_credit',
  'individual',
  'A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.',
  'Internal Revenue Service (IRS)',
  'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc',
  'universal',
  'active',
  '{
    "requires_earned_income": true,
    "income_limits_by_children": {
      "0": {"max_income": 18591, "max_credit": 632},
      "1": {"max_income": 49084, "max_credit": 3995},
      "2": {"max_income": 55768, "max_credit": 6604},
      "3": {"max_income": 59899, "max_credit": 7430}
    },
    "filer_age_range_no_children": {"min": 25, "max": 64},
    "investment_income_limit": 11600,
    "refundable": true,
    "state_eitc_available": ["CA","CO","CT","DC","DE","IL","IA","KS","LA","ME","MD","MA","MI","MN","MT","NE","NJ","NM","NY","OH","OK","OR","RI","SC","VT","VA","WA","WI"]
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ liheap
(
  'liheap',
  'Low Income Home Energy Assistance Program (LIHEAP)',
  'assistance',
  'individual',
  'Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.',
  'Administration for Children and Families (ACF)',
  'https://www.acf.hhs.gov/ocs/programs/liheap',
  'universal',
  'active',
  '{
    "income_limit_fpl_percent": 150,
    "alternative_threshold": "60% of state median income (varies by state)",
    "priority_groups": ["elderly_60_plus", "disabled"],
    "estimated_annual_value": 600
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ medicaid
(
  'medicaid',
  'Medicaid',
  'benefit',
  'individual',
  'Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.',
  'Centers for Medicare & Medicaid Services (CMS)',
  'https://www.healthcare.gov/medicaid-chip/getting-medicaid-chip/',
  'universal',
  'active',
  '{
    "pathways": {
      "pregnancy": {"fpl_threshold": 200},
      "children": {"fpl_threshold": 200},
      "disabled_or_elderly": {"fpl_threshold": 138},
      "adult_expansion": {"fpl_threshold": 138},
      "adult_non_expansion": {"fpl_threshold": 100}
    },
    "requires_citizen_or_qualified_immigrant": true,
    "non_expansion_states": ["AL","FL","GA","KS","MS","SC","TN","TX","WI","WY"],
    "coverage_gap_warning": "Childless adults in non-expansion states may fall into coverage gap"
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ pell-grant
(
  'pell-grant',
  'Federal Pell Grant',
  'grant',
  'individual',
  'Free money for college; does not need to be repaid. For undergraduate students with financial need.',
  'U.S. Department of Education',
  'https://studentaid.gov/h/apply-for-aid/fafsa',
  'universal',
  'active',
  '{
    "requires_student_status": true,
    "degree_level": "undergraduate",
    "income_soft_cap": 60000,
    "max_award_2025_26": 7395,
    "max_semesters": 12,
    "repayment_required": false
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ section8
(
  'section8',
  'Housing Choice Voucher Program (Section 8)',
  'assistance',
  'individual',
  'Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.',
  'U.S. Department of Housing and Urban Development (HUD)',
  'https://www.hud.gov/topics/housing_choice_voucher_program_section_8',
  'universal',
  'active',
  '{
    "income_limit": "50% of Area Median Income (AMI)",
    "extended_limit": "80% AMI in some cases",
    "priority_groups": ["elderly_62_plus", "disabled", "families_with_children"],
    "waitlist_common": true,
    "rent_burden_priority": "Households paying >50% of income on rent may receive priority"
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ snap
(
  'snap',
  'Supplemental Nutrition Assistance Program (SNAP)',
  'benefit',
  'individual',
  'Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.',
  'USDA Food and Nutrition Service',
  'https://www.fns.usda.gov/snap/state-directory',
  'universal',
  'active',
  '{
    "gross_income_limit_fpl_percent": 130,
    "net_income_limit_fpl_percent": 100,
    "requires_citizen_or_qualified_immigrant": true,
    "elderly_disabled_gross_income_exempt": true,
    "asset_limits": {"general": 2750, "elderly_or_disabled": 4250},
    "standard_deduction_2025": 184,
    "max_allotments_monthly": {
      "1": 292, "2": 536, "3": 768, "4": 975,
      "5": 1158, "6": 1390, "7": 1536, "8": 1756
    },
    "minimum_allotment": 23
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ ssi
(
  'ssi',
  'Supplemental Security Income (SSI)',
  'benefit',
  'individual',
  'Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.',
  'Social Security Administration (SSA)',
  'https://www.ssa.gov/ssi/',
  'universal',
  'active',
  '{
    "eligible_groups": ["age_65_plus", "blind", "disabled"],
    "income_limits_monthly": {"individual": 1971, "couple": 2915},
    "resource_limits": {"individual": 2000, "couple": 3000},
    "max_federal_benefit_monthly": {"individual": 967, "couple": 1450},
    "excluded_resources": ["primary_home", "one_vehicle"],
    "state_supplements_common": true
  }'::jsonb,
  now()
),

-- ------------------------------------------------------------------ wic
(
  'wic',
  'Women, Infants, and Children (WIC)',
  'benefit',
  'individual',
  'Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.',
  'USDA Food and Nutrition Service',
  'https://www.fns.usda.gov/wic/wic-how-apply',
  'universal',
  'active',
  '{
    "income_limit_fpl_percent": 185,
    "eligible_groups": ["pregnant_women", "breastfeeding_women", "postpartum_women", "infants", "children_under_5"],
    "auto_qualify_if_receiving": ["SNAP", "Medicaid", "TANF"],
    "estimated_monthly_per_person": 75
  }'::jsonb,
  now()
)

ON CONFLICT (id) DO UPDATE SET
  name                = EXCLUDED.name,
  category            = EXCLUDED.category,
  track               = EXCLUDED.track,
  description         = EXCLUDED.description,
  agency              = EXCLUDED.agency,
  application_url     = EXCLUDED.application_url,
  tier                = EXCLUDED.tier,
  status              = EXCLUDED.status,
  eligibility_criteria = EXCLUDED.eligibility_criteria,
  published_at        = EXCLUDED.published_at,
  updated_at          = now();

-- State supplement programs. Eligibility rules live in state-programs.ts.
INSERT INTO public.programs (
  id, name, category, track, description,
  application_url, tier, state, status,
  eligibility_criteria, published_at
) VALUES
(
  'ca-calfresh',
  'CalFresh (California SNAP)',
  'benefit', 'individual',
  'California''s SNAP program with state supplements. Broader eligibility than federal SNAP — includes some college students and immigrants.',
  'https://www.getcalfresh.org',
  'state', 'CA', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'ca-calworks',
  'CalWORKs (California Cash Aid)',
  'benefit', 'individual',
  'Cash assistance for families with children. Includes job training, childcare, and housing support.',
  'https://www.cdss.ca.gov/calworks',
  'state', 'CA', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'tx-snap',
  'Texas SNAP (Lone Star Card)',
  'benefit', 'individual',
  'Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.',
  'https://www.yourtexasbenefits.com',
  'state', 'TX', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'fl-access',
  'ACCESS Florida (FL SNAP)',
  'benefit', 'individual',
  'Florida''s food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.',
  'https://www.myflorida.com/accessflorida/',
  'state', 'FL', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'ny-snap',
  'New York SNAP',
  'benefit', 'individual',
  'New York''s SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.',
  'https://mybenefits.ny.gov',
  'state', 'NY', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'ny-essential-plan',
  'Essential Plan (NY Health)',
  'benefit', 'individual',
  'New York''s low-cost health plan for people who earn too much for Medicaid but can''t afford marketplace plans. $0-$20/month.',
  'https://nystateofhealth.ny.gov',
  'state', 'NY', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
),
(
  'pa-snap',
  'Pennsylvania SNAP',
  'benefit', 'individual',
  'Pennsylvania''s food assistance with broad-based categorical eligibility at 160% FPL.',
  'https://www.compass.state.pa.us',
  'state', 'PA', 'active', '{"rules": "src/lib/benefits/state-programs.ts"}'::jsonb, now()
)
ON CONFLICT (id) DO UPDATE SET
  name                = EXCLUDED.name,
  category            = EXCLUDED.category,
  track               = EXCLUDED.track,
  description         = EXCLUDED.description,
  application_url     = EXCLUDED.application_url,
  tier                = EXCLUDED.tier,
  state               = EXCLUDED.state,
  status              = EXCLUDED.status,
  eligibility_criteria = EXCLUDED.eligibility_criteria,
  published_at        = EXCLUDED.published_at,
  updated_at          = now();

-- Company programs. Eligibility rules live in src/lib/benefits/company-programs/.
INSERT INTO public.programs (
  id, name, category, track, description,
  agency, application_url, deadline_info, tier, status,
  eligibility_criteria, published_at
) VALUES
(
  'rnd-tax-credit',
  'Research & Development Tax Credit (IRC Section 41)',
  'tax_credit', 'company',
  'Permanent federal tax credit for companies investing in research, product development, or process improvement. Up to 20% of qualifying R&D expenses.',
  'IRS',
  'https://www.irs.gov/businesses/research-credit',
  'Filed with annual tax return',
  'universal', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'state-workforce-training',
  'State Workforce Training Grants',
  'grant', 'company',
  'State-funded grants to help companies train current and new employees. Most states offer $3K-$10K per employee with company caps of $50K-$250K.',
  'State Workforce Agency',
  NULL,
  'Varies by state. Most accept applications year-round.',
  'universal', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'wotc',
  'Work Opportunity Tax Credit (WOTC)',
  'tax_credit', 'company',
  'Tax credit for hiring individuals from targeted groups (veterans, SNAP recipients, ex-felons, etc.). Up to $2,400-$9,600 per qualifying hire.',
  'IRS / State Workforce Agency',
  'https://www.irs.gov/businesses/small-businesses-self-employed/work-opportunity-tax-credit',
  'Expired Dec 31, 2025. Monitor for reauthorization.',
  'universal', 'expired', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'sbir-phase-i',
  'Small Business Innovation Research (SBIR) Phase I',
  'grant', 'company',
  'Federal grants for small businesses to conduct feasibility research on innovative ideas. $50K-$305K awards from 11 federal agencies.',
  'Multiple (NSF, NIH, DOE, DOD, etc.)',
  'https://www.sbir.gov',
  'Currently paused pending congressional reauthorization. Monitor SBIR.gov for updates.',
  'industry', 'paused', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'sbir-phase-ii',
  'Small Business Innovation Research (SBIR) Phase II',
  'grant', 'company',
  'Full R&D funding for companies that completed Phase I. $500K-$2.1M awards over 1-3 years.',
  'Multiple (NSF, NIH, DOE, DOD, etc.)',
  'https://www.sbir.gov',
  'Requires Phase I completion. Currently paused.',
  'industry', 'paused', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'clean-energy-itc',
  'Clean Energy Investment Tax Credit (Section 48)',
  'tax_credit', 'company',
  '30% federal tax credit for investments in solar, wind, geothermal, battery storage, and other clean energy property. Bonus credits for domestic content and energy community locations.',
  'IRS',
  'https://www.irs.gov/credits-deductions/clean-energy-tax-credits',
  NULL,
  'industry', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'step-export',
  'State Trade Expansion Program (STEP)',
  'grant', 'company',
  'SBA-funded grants through state governments to help small businesses enter or expand into export markets. Covers trade shows, marketing, and localization.',
  'SBA (via state agencies)',
  'https://www.sba.gov/funding-programs/grants/state-trade-expansion-program-step',
  'Varies by state. Typically annual application cycles.',
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'opportunity-zones',
  'Qualified Opportunity Zone Incentives',
  'incentive', 'company',
  'Tax incentives for investing capital gains in designated low-income communities. Includes tax deferral and potential exclusion of gains on OZ investments held 10+ years.',
  'IRS',
  'https://www.irs.gov/credits-deductions/opportunity-zones-frequently-asked-questions',
  'No deadline. Program extended indefinitely by the One Big Beautiful Bill Act.',
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'sba-8a',
  '8(a) Business Development Program',
  'contracting', 'company',
  'Nine-year federal program providing contracting preferences, mentoring, and business development support for socially and economically disadvantaged small businesses.',
  'SBA',
  'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
  NULL,
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'wosb-contracting',
  'Women-Owned Small Business Federal Contracting',
  'contracting', 'company',
  'Federal contracting preferences for women-owned small businesses. The government targets 5% of federal contracting dollars to WOSBs.',
  'SBA',
  'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program',
  NULL,
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'section-179d',
  'Energy-Efficient Commercial Buildings Deduction (Section 179D)',
  'tax_credit', 'company',
  'Federal tax deduction for energy-efficient improvements to commercial buildings. $0.59-$1.19 per square foot based on energy savings achieved.',
  'IRS',
  'https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction',
  'Construction must begin by June 30, 2026 (termination provision).',
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
),
(
  'usda-rural-business',
  'USDA Rural Business Development Grants',
  'grant', 'company',
  'Grants supporting economic development and job creation in rural areas. Covers business training, technical assistance, feasibility studies, and incubators.',
  'USDA Rural Development',
  'https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants',
  'Typically May-June annually.',
  'situation', 'active', '{"rules": "src/lib/benefits/company-programs/"}'::jsonb, now()
)
ON CONFLICT (id) DO UPDATE SET
  name                = EXCLUDED.name,
  category            = EXCLUDED.category,
  track               = EXCLUDED.track,
  description         = EXCLUDED.description,
  agency              = EXCLUDED.agency,
  application_url     = EXCLUDED.application_url,
  deadline_info       = EXCLUDED.deadline_info,
  tier                = EXCLUDED.tier,
  status              = EXCLUDED.status,
  eligibility_criteria = EXCLUDED.eligibility_criteria,
  published_at        = EXCLUDED.published_at,
  updated_at          = now();


COMMIT;
