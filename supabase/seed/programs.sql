-- Seed: programs
--
-- Source: src/lib/benefits/programs/*.ts (rule engine definitions)
-- Last verified: 2026-04-11
--
-- Idempotent: uses INSERT ... ON CONFLICT (id) DO UPDATE.
-- All 9 programs from the existing rule engine are included.
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

-- ------------------------------------------------------------------ section-8
(
  'section-8',
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

COMMIT;
