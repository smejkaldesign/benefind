import type { Locale } from "../types";

const en = {
  shortNames: {
    snap: "SNAP / Food Stamps",
    medicaid: "Medicaid",
    eitc: "EITC",
    wic: "WIC",
    liheap: "LIHEAP / Energy Assistance",
    chip: "CHIP",
    section8: "Section 8 Housing",
    ssi: "SSI",
    "pell-grant": "Pell Grant",
    "ca-calfresh": "CalFresh",
    "ca-calworks": "CalWORKs",
    "tx-snap": "TX SNAP / Lone Star",
    "fl-access": "ACCESS Florida",
    "ny-snap": "NY SNAP",
    "ny-essential-plan": "NY Essential Plan",
    "pa-snap": "PA SNAP",
  },
  pathways: {
    pregnancy: "pregnancy",
    children: "children",
    "disabled or elderly": "disabled or elderly",
    "adult expansion": "adult expansion",
    "adult non expansion": "adult non expansion",
  },
  text: {
    "Centers for Medicare & Medicaid Services (CMS)":
      "Centers for Medicare & Medicaid Services (CMS)",
    "Internal Revenue Service (IRS)": "Internal Revenue Service (IRS)",
    "U.S. Department of Education": "U.S. Department of Education",
    "U.S. Department of Housing and Urban Development (HUD)":
      "U.S. Department of Housing and Urban Development (HUD)",
    "Administration for Children and Families (ACF)":
      "Administration for Children and Families (ACF)",
    "USDA Food and Nutrition Service": "USDA Food and Nutrition Service",
    "Social Security Administration (SSA)":
      "Social Security Administration (SSA)",
    "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.":
      "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.",
    "50% of Area Median Income (AMI)": "50% of Area Median Income (AMI)",
    "80% AMI in some cases": "80% AMI in some cases",
    "Households paying >50% of income on rent may receive priority":
      "Households paying >50% of income on rent may receive priority",
    "60% of state median income (varies by state)":
      "60% of state median income (varies by state)",
    "Childless adults in non-expansion states may fall into coverage gap":
      "Childless adults in non-expansion states may fall into coverage gap",
    "Children's Health Insurance Program (CHIP)":
      "Children's Health Insurance Program (CHIP)",
    CHIP: "CHIP",
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.":
      "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.",
    "Photo ID for parent/guardian": "Photo ID for parent/guardian",
    "Child's birth certificate or Social Security number":
      "Child's birth certificate or Social Security number",
    "Proof of income": "Proof of income",
    "Proof of residency": "Proof of residency",
    "Household includes children under 19":
      "Household includes children under 19",
    None: "None",
    Required: "Required",
    "Income above Medicaid threshold (138% FPL)":
      "Income above Medicaid threshold (138% FPL)",
    "Income below 250% of FPL (varies by state, some up to 300%)":
      "Income below 250% of FPL (varies by state, some up to 300%)",
    "Children currently lack health insurance":
      "Children currently lack health insurance",
    "Some states extend CHIP to 300% FPL":
      "Some states extend CHIP to 300% FPL",
    "Current health insurance status for children":
      "Current health insurance status for children",
    "CHIP is for children under 19.": "CHIP is for children under 19.",
    "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.":
      "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.",
    "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.":
      "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.",
    "Apply through Healthcare.gov or your state CHIP program":
      "Apply through Healthcare.gov or your state CHIP program",
    "Coverage often starts immediately once approved":
      "Coverage often starts immediately once approved",
    "Premiums are very low or free depending on income":
      "Premiums are very low or free depending on income",
    "Earned Income Tax Credit (EITC)": "Earned Income Tax Credit (EITC)",
    EITC: "EITC",
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.":
      "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.",
    "W-2 forms from all employers": "W-2 forms from all employers",
    "Social Security numbers for you and dependents":
      "Social Security numbers for you and dependents",
    "Valid filing status information": "Valid filing status information",
    "Tax return (filed or to be filed)": "Tax return (filed or to be filed)",
    "Has earned income (wages, salary, or self-employment)":
      "Has earned income (wages, salary, or self-employment)",
    "Must be > $0": "Must be > $0",
    "Filer age 25-64 (or has qualifying children)":
      "Filer age 25-64 (or has qualifying children)",
    "Any age": "Any age",
    "Investment income below $11,600 (2025)":
      "Investment income below $11,600 (2025)",
    "Income qualifies for IRS Free File (<$84,000)":
      "Income qualifies for IRS Free File (<$84,000)",
    "Investment income (dividends, interest, capital gains)":
      "Investment income (dividends, interest, capital gains)",
    "Tax filing status (single, MFJ, HOH, MFS)":
      "Tax filing status (single, MFJ, HOH, MFS)",
    "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.":
      "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.",
    "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.":
      "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.",
    "File a federal tax return to claim the credit":
      "File a federal tax return to claim the credit",
    "Use IRS Free File; it's actually free":
      "Use IRS Free File; it's actually free",
    "Use your preferred tax software or a CPA":
      "Use your preferred tax software or a CPA",
    "Check if your state has added a state EITC recently":
      "Check if your state has added a state EITC recently",
    "The credit is refundable; you can get money back even if you owe $0 in taxes":
      "The credit is refundable; you can get money back even if you owe $0 in taxes",
    "Low Income Home Energy Assistance Program (LIHEAP)":
      "Low Income Home Energy Assistance Program (LIHEAP)",
    "LIHEAP / Energy Assistance": "LIHEAP / Energy Assistance",
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.":
      "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.",
    "Photo ID": "Photo ID",
    "Proof of income for all household members":
      "Proof of income for all household members",
    "Recent utility bill": "Recent utility bill",
    "Social Security numbers": "Social Security numbers",
    "Household income below 150% of FPL (some states use higher thresholds)":
      "Household income below 150% of FPL (some states use higher thresholds)",
    "Household includes elderly (60+) or disabled members":
      "Household includes elderly (60+) or disabled members",
    "Household includes children under 18":
      "Household includes children under 18",
    "Energy costs are a significant share of income":
      "Energy costs are a significant share of income",
    "Monthly utility and energy expenses":
      "Monthly utility and energy expenses",
    "Income exceeds 150% FPL. Some states use higher thresholds; check your state.":
      "Income exceeds 150% FPL. Some states use higher thresholds; check your state.",
    "You qualify and may receive priority as a household with elderly or disabled members.":
      "You qualify and may receive priority as a household with elderly or disabled members.",
    "Your income is within LIHEAP limits for your household size.":
      "Your income is within LIHEAP limits for your household size.",
    "Apply through your local Community Action Agency":
      "Apply through your local Community Action Agency",
    "Apply before winter heating season for best chances":
      "Apply before winter heating season for best chances",
    "Mention elderly/disabled status; you may get priority":
      "Mention elderly/disabled status; you may get priority",
    Medicaid: "Medicaid",
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.":
      "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.",
    "Social Security number": "Social Security number",
    "Proof of citizenship or immigration status":
      "Proof of citizenship or immigration status",
    "At least one household member is a US citizen or qualified immigrant":
      "At least one household member is a US citizen or qualified immigrant",
    Yes: "Yes",
    No: "No",
    "Not applicable (user qualifies via another pathway)":
      "Not applicable (user qualifies via another pathway)",
    "Has alternate pathway": "Has alternate pathway",
    "Required for childless adult eligibility":
      "Required for childless adult eligibility",
    "Pregnant household member (highest priority pathway)":
      "Pregnant household member (highest priority pathway)",
    "Children under 19 in household (CHIP-adjacent pathway)":
      "Children under 19 in household (CHIP-adjacent pathway)",
    "Disabled household member (SSI pathway available)":
      "Disabled household member (SSI pathway available)",
    "Citizenship or immigration status for all household members":
      "Citizenship or immigration status for all household members",
    "Disability status (affects SSI-linked Medicaid pathway)":
      "Disability status (affects SSI-linked Medicaid pathway)",
    "Medicaid requires at least one household member to be a US citizen or qualified immigrant.":
      "Medicaid requires at least one household member to be a US citizen or qualified immigrant.",
    "Pregnant women in most states qualify for Medicaid at up to 200% FPL.":
      "Pregnant women in most states qualify for Medicaid at up to 200% FPL.",
    "Children under 19 typically qualify at higher income levels than adults.":
      "Children under 19 typically qualify at higher income levels than adults.",
    "Apply through Healthcare.gov or your state Medicaid office":
      "Apply through Healthcare.gov or your state Medicaid office",
    "Coverage can begin the same month you apply":
      "Coverage can begin the same month you apply",
    "Expect a 30-45 day enrollment window":
      "Expect a 30-45 day enrollment window",
    "Check your state's managed care plan options":
      "Check your state's managed care plan options",
    "Federal Pell Grant": "Federal Pell Grant",
    "Pell Grant": "Pell Grant",
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.":
      "Free money for college; does not need to be repaid. For undergraduate students with financial need.",
    "Federal tax returns or W-2 forms": "Federal tax returns or W-2 forms",
    "Driver's license (if applicable)": "Driver's license (if applicable)",
    "Records of untaxed income": "Records of untaxed income",
    "Bank statements": "Bank statements",
    "Household includes a current or prospective undergraduate student":
      "Household includes a current or prospective undergraduate student",
    "Family income below typical Pell Grant threshold (~$60,000)":
      "Family income below typical Pell Grant threshold (~$60,000)",
    "Income under $30,000 (likely qualifies for maximum Pell)":
      "Income under $30,000 (likely qualifies for maximum Pell)",
    "Household has dependent children (increases financial need)":
      "Household has dependent children (increases financial need)",
    "Savings and investment balances (affects EFC calculation)":
      "Savings and investment balances (affects EFC calculation)",
    "Student enrollment status for household members":
      "Student enrollment status for household members",
    "Pell Grants are for current or prospective undergraduate students.":
      "Pell Grants are for current or prospective undergraduate students.",
    "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.":
      "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.",
    "Based on household income, you likely qualify for a Pell Grant.":
      "Based on household income, you likely qualify for a Pell Grant.",
    "Complete the FAFSA at studentaid.gov":
      "Complete the FAFSA at studentaid.gov",
    "FAFSA opens October 1 each year": "FAFSA opens October 1 each year",
    "You can receive Pell Grants for up to 12 semesters":
      "You can receive Pell Grants for up to 12 semesters",
    "No repayment required; this is free money":
      "No repayment required; this is free money",
    "Housing Choice Voucher Program (Section 8)":
      "Housing Choice Voucher Program (Section 8)",
    "Section 8 Housing": "Section 8 Housing",
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.":
      "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.",
    "Photo ID for all adult household members":
      "Photo ID for all adult household members",
    "Birth certificates for children": "Birth certificates for children",
    "Social Security cards": "Social Security cards",
    "Proof of income (pay stubs, tax returns, benefit letters)":
      "Proof of income (pay stubs, tax returns, benefit letters)",
    "Proof of citizenship or eligible immigration status":
      "Proof of citizenship or eligible immigration status",
    "Income below 80% of Area Median Income (approximate national average)":
      "Income below 80% of Area Median Income (approximate national average)",
    "≤160% of 50% AMI (~80% AMI)": "≤160% of 50% AMI (~80% AMI)",
    "Household includes elderly (62+) or disabled members":
      "Household includes elderly (62+) or disabled members",
    "Families with children often receive preference":
      "Families with children often receive preference",
    "Rent exceeds 50% of income (priority indicator)":
      "Rent exceeds 50% of income (priority indicator)",
    "Income below 50% AMI (very low income, higher priority)":
      "Income below 50% AMI (very low income, higher priority)",
    "Current monthly rent payment": "Current monthly rent payment",
    "Liquid assets (bank accounts, cash)":
      "Liquid assets (bank accounts, cash)",
    "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.":
      "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.",
    "You may qualify based on household income. Waitlists can be long; apply early.":
      "You may qualify based on household income. Waitlists can be long; apply early.",
    "Contact your local Public Housing Authority (PHA)":
      "Contact your local Public Housing Authority (PHA)",
    "Waitlists are common; apply as soon as possible":
      "Waitlists are common; apply as soon as possible",
    "Your rent is over 50% of income; mention this for possible priority":
      "Your rent is over 50% of income; mention this for possible priority",
    "Elderly/disabled households may qualify for preference":
      "Elderly/disabled households may qualify for preference",
    "Families with children often get preference":
      "Families with children often get preference",
    "Supplemental Nutrition Assistance Program (SNAP)":
      "Supplemental Nutrition Assistance Program (SNAP)",
    "SNAP / Food Stamps": "SNAP / Food Stamps",
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.":
      "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.",
    "Proof of income (pay stubs, tax return)":
      "Proof of income (pay stubs, tax return)",
    "Proof of residency (utility bill, lease)":
      "Proof of residency (utility bill, lease)",
    "Social Security numbers for household members":
      "Social Security numbers for household members",
    "Bank statements (if applicable)": "Bank statements (if applicable)",
    "At least one household member is a US citizen or eligible immigrant":
      "At least one household member is a US citizen or eligible immigrant",
    "Gross income below 130% of FPL (or elderly/disabled exempt)":
      "Gross income below 130% of FPL (or elderly/disabled exempt)",
    "Net income (after deductions) below 100% of FPL":
      "Net income (after deductions) below 100% of FPL",
    "Household includes someone age 60+ or disabled":
      "Household includes someone age 60+ or disabled",
    "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)":
      "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)",
    "Liquid asset total (bank accounts, cash)":
      "Liquid asset total (bank accounts, cash)",
    "Monthly expenses (rent, childcare, medical) for accurate deductions":
      "Monthly expenses (rent, childcare, medical) for accurate deductions",
    "SNAP requires at least one household member to be a US citizen or qualified immigrant.":
      "SNAP requires at least one household member to be a US citizen or qualified immigrant.",
    "Based on your household size and income, you likely qualify for SNAP benefits.":
      "Based on your household size and income, you likely qualify for SNAP benefits.",
    "Apply online through your state SNAP office":
      "Apply online through your state SNAP office",
    "Prepare income verification documents (last 30 days of pay stubs)":
      "Prepare income verification documents (last 30 days of pay stubs)",
    "Schedule an interview (phone or in-person)":
      "Schedule an interview (phone or in-person)",
    "Bring ID, proof of residency, and Social Security numbers":
      "Bring ID, proof of residency, and Social Security numbers",
    "Supplemental Security Income (SSI)": "Supplemental Security Income (SSI)",
    SSI: "SSI",
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.":
      "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.",
    "Social Security card": "Social Security card",
    "Birth certificate or proof of age": "Birth certificate or proof of age",
    "Proof of disability (medical records)":
      "Proof of disability (medical records)",
    "Proof of income and resources": "Proof of income and resources",
    "Proof of living situation": "Proof of living situation",
    "Household includes someone who is 65+, blind, or disabled":
      "Household includes someone who is 65+, blind, or disabled",
    "Not provided": "Not provided",
    "Single individual (different limits than couples)":
      "Single individual (different limits than couples)",
    "Many states add a supplement on top of federal SSI":
      "Many states add a supplement on top of federal SSI",
    "Countable resources (bank accounts, cash, investments)":
      "Countable resources (bank accounts, cash, investments)",
    "SSI is for people who are 65+, blind, or disabled.":
      "SSI is for people who are 65+, blind, or disabled.",
    "You may qualify based on age/disability and income level.":
      "You may qualify based on age/disability and income level.",
    "Apply at your local Social Security office or call 1-800-772-1213":
      "Apply at your local Social Security office or call 1-800-772-1213",
    "Gather medical records documenting disability":
      "Gather medical records documenting disability",
    "The application process can take 3-6 months":
      "The application process can take 3-6 months",
    "Women, Infants, and Children (WIC)": "Women, Infants, and Children (WIC)",
    WIC: "WIC",
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.":
      "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.",
    "Proof of pregnancy or child birth certificate":
      "Proof of pregnancy or child birth certificate",
    "Immunization records for children": "Immunization records for children",
    "Household includes a pregnant/postpartum woman or child under 5":
      "Household includes a pregnant/postpartum woman or child under 5",
    "Household income below 185% of FPL": "Household income below 185% of FPL",
    "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)":
      "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)",
    "Household includes infants under 1 year":
      "Household includes infants under 1 year",
    "Pregnancy status for household members":
      "Pregnancy status for household members",
    "WIC is for pregnant/postpartum women and children under 5.":
      "WIC is for pregnant/postpartum women and children under 5.",
    "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.":
      "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.",
    "Contact your local WIC office to schedule an appointment":
      "Contact your local WIC office to schedule an appointment",
    "Bring proof of income and residency":
      "Bring proof of income and residency",
    "Appointments are usually available within 2 weeks":
      "Appointments are usually available within 2 weeks",
    "CalFresh (California SNAP)": "CalFresh (California SNAP)",
    CalFresh: "CalFresh",
    "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.":
      "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.",
    "Proof of CA residency": "Proof of CA residency",
    "SSN or immigration documents": "SSN or immigration documents",
    "CalFresh is a California program.": "CalFresh is a California program.",
    "Income exceeds California's expanded 200% FPL limit for CalFresh.":
      "Income exceeds California's expanded 200% FPL limit for CalFresh.",
    "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.":
      "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.",
    "Apply at GetCalFresh.org (takes 10 minutes)":
      "Apply at GetCalFresh.org (takes 10 minutes)",
    "Call 1-877-847-3663 for help in your language":
      "Call 1-877-847-3663 for help in your language",
    "CalWORKs (California Cash Aid)": "CalWORKs (California Cash Aid)",
    CalWORKs: "CalWORKs",
    "Cash assistance for families with children. Includes job training, childcare, and housing support.":
      "Cash assistance for families with children. Includes job training, childcare, and housing support.",
    "Children's birth certificates": "Children's birth certificates",
    "CalWORKs is a California program.": "CalWORKs is a California program.",
    "CalWORKs requires children under 18 in the household.":
      "CalWORKs requires children under 18 in the household.",
    "Income exceeds CalWORKs limits.": "Income exceeds CalWORKs limits.",
    "You have children and meet income requirements for CalWORKs cash aid.":
      "You have children and meet income requirements for CalWORKs cash aid.",
    "Apply at your county welfare office":
      "Apply at your county welfare office",
    "Also provides childcare, job training, and transportation":
      "Also provides childcare, job training, and transportation",
    "Texas SNAP (Lone Star Card)": "Texas SNAP (Lone Star Card)",
    "TX SNAP / Lone Star": "TX SNAP / Lone Star",
    "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.":
      "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.",
    "Proof of TX residency": "Proof of TX residency",
    "SSN for all applicants": "SSN for all applicants",
    "This is a Texas program.": "This is a Texas program.",
    "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).":
      "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).",
    "Texas uses broad-based categorical eligibility at 165% FPL.":
      "Texas uses broad-based categorical eligibility at 165% FPL.",
    "Apply at YourTexasBenefits.com": "Apply at YourTexasBenefits.com",
    "Texas has NO Medicaid expansion; check CHIP for children":
      "Texas has NO Medicaid expansion; check CHIP for children",
    "ACCESS Florida (FL SNAP)": "ACCESS Florida (FL SNAP)",
    "ACCESS Florida": "ACCESS Florida",
    "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.":
      "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.",
    "Proof of FL residency": "Proof of FL residency",
    SSN: "SSN",
    "This is a Florida program.": "This is a Florida program.",
    "Income exceeds Florida SNAP limits.":
      "Income exceeds Florida SNAP limits.",
    "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.":
      "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.",
    "Apply at MyFlorida.com/accessflorida":
      "Apply at MyFlorida.com/accessflorida",
    "One application covers SNAP, Medicaid, and cash aid":
      "One application covers SNAP, Medicaid, and cash aid",
    "Florida has NO Medicaid expansion for adults":
      "Florida has NO Medicaid expansion for adults",
    "New York SNAP": "New York SNAP",
    "NY SNAP": "NY SNAP",
    "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.":
      "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.",
    "Proof of NY residency": "Proof of NY residency",
    "Rent/utility bills": "Rent/utility bills",
    "This is a New York program.": "This is a New York program.",
    "Income exceeds NY SNAP limits (200% FPL).":
      "Income exceeds NY SNAP limits (200% FPL).",
    "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.":
      "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.",
    "Apply at mybenefits.ny.gov": "Apply at mybenefits.ny.gov",
    "NY has expanded Medicaid; apply for both at once":
      "NY has expanded Medicaid; apply for both at once",
    "NYC residents can also call 311": "NYC residents can also call 311",
    "Essential Plan (NY Health)": "Essential Plan (NY Health)",
    "NY Essential Plan": "NY Essential Plan",
    "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.":
      "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.",
    "Essential Plan is a New York program.":
      "Essential Plan is a New York program.",
    "You likely qualify for full Medicaid instead (lower income).":
      "You likely qualify for full Medicaid instead (lower income).",
    "Income exceeds Essential Plan limits (200% FPL).":
      "Income exceeds Essential Plan limits (200% FPL).",
    "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.":
      "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.",
    "Apply at NY State of Health marketplace":
      "Apply at NY State of Health marketplace",
    "Plans cost $0 or $20/month with no deductible":
      "Plans cost $0 or $20/month with no deductible",
    "Covers doctor visits, prescriptions, hospital, and mental health":
      "Covers doctor visits, prescriptions, hospital, and mental health",
    "Pennsylvania SNAP": "Pennsylvania SNAP",
    "PA SNAP": "PA SNAP",
    "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.":
      "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.",
    "Proof of PA residency": "Proof of PA residency",
    "This is a Pennsylvania program.": "This is a Pennsylvania program.",
    "Income exceeds PA SNAP limits (160% FPL).":
      "Income exceeds PA SNAP limits (160% FPL).",
    "Pennsylvania uses broad-based categorical eligibility at 160% FPL.":
      "Pennsylvania uses broad-based categorical eligibility at 160% FPL.",
    "Apply at COMPASS.state.pa.us": "Apply at COMPASS.state.pa.us",
    "PA has expanded Medicaid; apply for both at once":
      "PA has expanded Medicaid; apply for both at once",
    "Passed eligibility check": "Passed eligibility check",
    "Failed eligibility check": "Failed eligibility check",
    "Detailed rule-by-rule breakdown": "Detailed rule-by-rule breakdown",
    "A government-issued ID that proves who you are.":
      "A government-issued ID that proves who you are.",
    "Driver's license": "Driver's license",
    "State ID card": "State ID card",
    Passport: "Passport",
    "Expired IDs may be accepted in some states.":
      "Expired IDs may be accepted in some states.",
    "Shows how much money you earn each month.":
      "Shows how much money you earn each month.",
    "Pay stubs (last 30 days)": "Pay stubs (last 30 days)",
    "Tax return": "Tax return",
    "Letter from employer": "Letter from employer",
    "Benefit award letter": "Benefit award letter",
    "If self-employed, bring records of your earnings.":
      "If self-employed, bring records of your earnings.",
    "Shows you live in the state where you are applying.":
      "Shows you live in the state where you are applying.",
    "Utility bill": "Utility bill",
    "Lease agreement": "Lease agreement",
    "Mortgage statement": "Mortgage statement",
    "Letter from landlord": "Letter from landlord",
    "For every person in your household applying for benefits.":
      "For every person in your household applying for benefits.",
    "SSN cards": "SSN cards",
    "SSA letter": "SSA letter",
    "Tax documents showing SSN": "Tax documents showing SSN",
    "If someone does not have an SSN, they can still apply. The rest of the household may qualify.":
      "If someone does not have an SSN, they can still apply. The rest of the household may qualify.",
    "Shows your savings and checking account balances.":
      "Shows your savings and checking account balances.",
    "Most states have eliminated the asset test for SNAP, but some still check.":
      "Most states have eliminated the asset test for SNAP, but some still check.",
    "Medical bills": "Medical bills",
    "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.":
      "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.",
    "Keep receipts for prescriptions, doctor visits, and medical equipment.":
      "Keep receipts for prescriptions, doctor visits, and medical equipment.",
    "Childcare expenses": "Childcare expenses",
    "If you pay for childcare to work or attend school, this counts as a deduction.":
      "If you pay for childcare to work or attend school, this counts as a deduction.",
    "Daycare receipts": "Daycare receipts",
    "After-school program invoices": "After-school program invoices",
    "A government-issued ID for the person applying.":
      "A government-issued ID for the person applying.",
    "State ID": "State ID",
    "Your household income for the current month.":
      "Your household income for the current month.",
    "Pay stubs": "Pay stubs",
    "Self-employment records": "Self-employment records",
    "Shows you are a US citizen or have qualified immigration status.":
      "Shows you are a US citizen or have qualified immigration status.",
    "Birth certificate": "Birth certificate",
    "Naturalization certificate": "Naturalization certificate",
    "Permanent resident card": "Permanent resident card",
    "Children born in the US are citizens regardless of parents' status.":
      "Children born in the US are citizens regardless of parents' status.",
    "Required for each person applying for coverage.":
      "Required for each person applying for coverage.",
    "Proof of pregnancy": "Proof of pregnancy",
    "If applying based on pregnancy, a doctor's note helps speed up approval.":
      "If applying based on pregnancy, a doctor's note helps speed up approval.",
    "Proof of disability": "Proof of disability",
    "If applying based on disability, medical records can help.":
      "If applying based on disability, medical records can help.",
    "Doctor's letter": "Doctor's letter",
    "SSI/SSDI award letter": "SSI/SSDI award letter",
    "W-2 forms": "W-2 forms",
    "From every job you worked during the tax year.":
      "From every job you worked during the tax year.",
    "Employers must send W-2s by January 31st each year.":
      "Employers must send W-2s by January 31st each year.",
    "For yourself, your spouse (if filing jointly), and all dependents.":
      "For yourself, your spouse (if filing jointly), and all dependents.",
    "Filing status information": "Filing status information",
    "Whether you file as single, married, or head of household.":
      "Whether you file as single, married, or head of household.",
    "Head of household often gives a bigger credit if you have dependents.":
      "Head of household often gives a bigger credit if you have dependents.",
    "1099 forms": "1099 forms",
    "If you did freelance or gig work (Uber, DoorDash, etc.).":
      "If you did freelance or gig work (Uber, DoorDash, etc.).",
    "Childcare provider information": "Childcare provider information",
    "Name, address, and tax ID of your childcare provider to claim additional credits.":
      "Name, address, and tax ID of your childcare provider to claim additional credits.",
    "For the parent or guardian applying.":
      "For the parent or guardian applying.",
    "Shows household income is within WIC limits.":
      "Shows household income is within WIC limits.",
    "Benefit letters": "Benefit letters",
    "Shows you live in the state.": "Shows you live in the state.",
    Lease: "Lease",
    "Proof of pregnancy or child": "Proof of pregnancy or child",
    "Doctor's note for pregnancy, or birth certificate for children.":
      "Doctor's note for pregnancy, or birth certificate for children.",
    "Pregnancy verification": "Pregnancy verification",
    "Hospital records": "Hospital records",
    "Immunization records": "Immunization records",
    "For children. Your WIC office may be able to look these up.":
      "For children. Your WIC office may be able to look these up.",
    "Proof of other benefits": "Proof of other benefits",
    "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.":
      "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.",
    "For the head of household.": "For the head of household.",
    "For all household members.": "For all household members.",
    "Shows your energy costs and account number.":
      "Shows your energy costs and account number.",
    "Bring both heating and electric bills if they are separate.":
      "Bring both heating and electric bills if they are separate.",
    "May qualify you for priority assistance.":
      "May qualify you for priority assistance.",
    "Disconnection notice": "Disconnection notice",
    "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.":
      "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.",
    "Parent/guardian photo ID": "Parent/guardian photo ID",
    "Government-issued ID for the applying parent.":
      "Government-issued ID for the applying parent.",
    "Child's birth certificate": "Child's birth certificate",
    "Proves age and citizenship.": "Proves age and citizenship.",
    "For children being enrolled.": "For children being enrolled.",
    "Household income documentation.": "Household income documentation.",
    "Current insurance information": "Current insurance information",
    "If children currently have insurance that is ending.":
      "If children currently have insurance that is ending.",
    "Photo ID for all adults": "Photo ID for all adults",
    "Every adult household member needs a government-issued ID.":
      "Every adult household member needs a government-issued ID.",
    "Proves ages and household composition.":
      "Proves ages and household composition.",
    "All sources for all household members.":
      "All sources for all household members.",
    "Tax returns": "Tax returns",
    "Child support documentation": "Child support documentation",
    "Proof of citizenship/immigration": "Proof of citizenship/immigration",
    "May be requested to verify assets.": "May be requested to verify assets.",
    "Landlord reference": "Landlord reference",
    "A letter from a current or previous landlord.":
      "A letter from a current or previous landlord.",
    "Criminal background info": "Criminal background info",
    "Some PHAs run background checks. Be upfront about any issues.":
      "Some PHAs run background checks. Be upfront about any issues.",
    "Or document showing your SSN.": "Or document showing your SSN.",
    "If applying based on age (65+).": "If applying based on age (65+).",
    "Medical records": "Medical records",
    "If applying based on disability: doctor's notes, hospital records, test results.":
      "If applying based on disability: doctor's notes, hospital records, test results.",
    "The more medical evidence you provide, the stronger your application.":
      "The more medical evidence you provide, the stronger your application.",
    "Pay stubs, bank statements, investment statements.":
      "Pay stubs, bank statements, investment statements.",
    "Lease, mortgage statement, or letter from someone you live with.":
      "Lease, mortgage statement, or letter from someone you live with.",
    "Previous work history": "Previous work history",
    "List of jobs for the past 15 years. This helps evaluate disability claim.":
      "List of jobs for the past 15 years. This helps evaluate disability claim.",
    "Medications list": "Medications list",
    "All current medications with dosages.":
      "All current medications with dosages.",
    "Required for the FAFSA application.":
      "Required for the FAFSA application.",
    "Federal tax returns": "Federal tax returns",
    "Your (and your parents' if dependent) most recent tax return.":
      "Your (and your parents' if dependent) most recent tax return.",
    "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.":
      "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.",
    "From all jobs during the tax year.": "From all jobs during the tax year.",
    "Optional but helps verify identity.":
      "Optional but helps verify identity.",
    "Child support received, veterans' benefits, etc.":
      "Child support received, veterans' benefits, etc.",
    "Current savings and checking balances.":
      "Current savings and checking balances.",
    "{count} child": "{count} child",
    "{count} children": "{count} children",
    "{pct}% FPL (estimated)": "{pct}% FPL (estimated)",
    "${amount}/yr": "${amount}/yr",
    "≤${amount}/yr": "≤${amount}/yr",
    "${amount}/mo": "${amount}/mo",
    "≤${amount}/mo": "≤${amount}/mo",
    "Income below EITC limit for {count} qualifying children":
      "Income below EITC limit for {count} qualifying children",
    "{age} years old": "{age} years old",
    "{count} qualifying child": "{count} qualifying child",
    "{count} qualifying children": "{count} qualifying children",
    "{state} offers a state EITC that stacks with the federal credit":
      "{state} offers a state EITC that stacks with the federal credit",
    "Claim the {state} state EITC on your state return":
      "Claim the {state} state EITC on your state return",
    "Income below {pct}% FPL for the {pathway} pathway":
      "Income below {pct}% FPL for the {pathway} pathway",
    "{state} has a Medicaid pathway for childless adults":
      "{state} has a Medicaid pathway for childless adults",
    "{state} has not expanded Medicaid": "{state} has not expanded Medicaid",
    "{state} has expanded Medicaid to {pct}% FPL":
      "{state} has expanded Medicaid to {pct}% FPL",
    "Check {state}-specific eligibility rules (non-expansion state)":
      "Check {state}-specific eligibility rules (non-expansion state)",
    "~{pct}% of {base}% AMI": "~{pct}% of {base}% AMI",
    "Monthly income below SSI limit (${amount})":
      "Monthly income below SSI limit (${amount})",
    "Countable resources below ${amount} (home and one vehicle excluded)":
      "Countable resources below ${amount} (home and one vehicle excluded)",
    "{count} eligible member": "{count} eligible member",
    "{count} eligible members": "{count} eligible members",
    "{count} child may qualify for CHIP coverage.":
      "{count} child may qualify for CHIP coverage.",
    "{count} children may qualify for CHIP coverage.":
      "{count} children may qualify for CHIP coverage.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.":
      "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.":
      "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.",
    "You likely qualify for the EITC with {count} qualifying child.":
      "You likely qualify for the EITC with {count} qualifying child.",
    "You likely qualify for the EITC with {count} qualifying children.":
      "You likely qualify for the EITC with {count} qualifying children.",
    "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.":
      "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.",
    "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.":
      "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.",
    "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.":
      "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.",
    "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.":
      "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.",
    "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.":
      "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.",
    "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.":
      "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.",
    "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.":
      "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.",
    "Monthly income (${income}) exceeds SSI limit of ${limit}.":
      "Monthly income (${income}) exceeds SSI limit of ${limit}.",
    "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.":
      "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.",
    "You have {count} eligible household member and meet income requirements.":
      "You have {count} eligible household member and meet income requirements.",
    "You have {count} eligible household members and meet income requirements.":
      "You have {count} eligible household members and meet income requirements.",
  },
};

export type ProgramsMessages = typeof en;

const es: ProgramsMessages = {
  shortNames: {
    snap: "SNAP (cupones de alimentos)",
    medicaid: "Medicaid",
    eitc: "EITC",
    wic: "WIC",
    liheap: "LIHEAP / Ayuda con la energía",
    chip: "CHIP",
    section8: "Vivienda Sección 8",
    ssi: "SSI",
    "pell-grant": "Beca Pell",
    "ca-calfresh": "CalFresh",
    "ca-calworks": "CalWORKs",
    "tx-snap": "SNAP de Texas / Lone Star",
    "fl-access": "ACCESS Florida",
    "ny-snap": "SNAP de Nueva York",
    "ny-essential-plan": "Essential Plan de Nueva York",
    "pa-snap": "SNAP de Pensilvania",
  },
  pathways: {
    pregnancy: "embarazo",
    children: "niños",
    "disabled or elderly": "discapacidad o edad avanzada",
    "adult expansion": "ampliación para adultos",
    "adult non expansion": "adultos sin ampliación",
  },
  text: {
    "Centers for Medicare & Medicaid Services (CMS)":
      "Centros de Servicios de Medicare y Medicaid (CMS)",
    "Internal Revenue Service (IRS)": "Servicio de Impuestos Internos (IRS)",
    "U.S. Department of Education": "Departamento de Educación de EE. UU.",
    "U.S. Department of Housing and Urban Development (HUD)":
      "Departamento de Vivienda y Desarrollo Urbano de EE. UU. (HUD)",
    "Administration for Children and Families (ACF)":
      "Administración para Niños y Familias (ACF)",
    "USDA Food and Nutrition Service":
      "Servicio de Alimentos y Nutrición del USDA",
    "Social Security Administration (SSA)":
      "Administración del Seguro Social (SSA)",
    "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.":
      "Cubre a niños con ingresos entre el límite de Medicaid (aproximadamente 138% del nivel federal de pobreza) y aproximadamente 250% del nivel federal de pobreza. Algunos estados llegan hasta 300%.",
    "50% of Area Median Income (AMI)": "50% del ingreso medio del área (AMI)",
    "80% AMI in some cases": "80% del AMI en algunos casos",
    "Households paying >50% of income on rent may receive priority":
      "Los hogares que pagan más del 50% de sus ingresos en renta pueden recibir prioridad",
    "60% of state median income (varies by state)":
      "60% del ingreso medio del estado (varía según el estado)",
    "Childless adults in non-expansion states may fall into coverage gap":
      "Los adultos sin hijos en estados que no ampliaron Medicaid pueden quedar sin cobertura",
    "Children's Health Insurance Program (CHIP)":
      "Programa de Seguro Médico para Niños (CHIP)",
    CHIP: "CHIP",
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.":
      "Seguro médico de bajo costo para niños de familias que ganan demasiado para Medicaid, pero no pueden pagar un seguro privado.",
    "Photo ID for parent/guardian":
      "Identificación con foto del padre, madre o tutor",
    "Child's birth certificate or Social Security number":
      "Acta de nacimiento o número de Seguro Social del niño",
    "Proof of income": "Comprobante de ingresos",
    "Proof of residency": "Comprobante de domicilio",
    "Household includes children under 19":
      "En el hogar hay niños menores de 19 años",
    None: "Ninguno",
    Required: "Obligatorio",
    "Income above Medicaid threshold (138% FPL)":
      "Ingresos por encima del límite de Medicaid (138% FPL)",
    "Income below 250% of FPL (varies by state, some up to 300%)":
      "Ingresos por debajo del 250% del FPL (varía según el estado; en algunos llega al 300%)",
    "Children currently lack health insurance":
      "Los niños no tienen seguro médico actualmente",
    "Some states extend CHIP to 300% FPL":
      "Algunos estados amplían CHIP hasta el 300% del FPL",
    "Current health insurance status for children":
      "Si los niños tienen seguro médico actualmente",
    "CHIP is for children under 19.": "CHIP es para niños menores de 19 años.",
    "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.":
      "Es probable que sus hijos califiquen para Medicaid (cuesta menos). Revise Medicaid primero.",
    "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.":
      "Sus ingresos podrían superar los límites de CHIP en la mayoría de los estados. Algunos estados llegan al 300% del FPL; consulte en su estado.",
    "Apply through Healthcare.gov or your state CHIP program":
      "Presente su solicitud en Healthcare.gov o en el programa CHIP de su estado",
    "Coverage often starts immediately once approved":
      "La cobertura suele empezar en cuanto lo aprueban",
    "Premiums are very low or free depending on income":
      "Las primas son muy bajas o gratuitas, según sus ingresos",
    "Earned Income Tax Credit (EITC)":
      "Crédito Tributario por Ingreso del Trabajo (EITC)",
    EITC: "EITC",
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.":
      "Un crédito tributario para personas que trabajan y tienen ingresos bajos o moderados. Puede recibir dinero aunque no deba impuestos.",
    "W-2 forms from all employers": "Formularios W-2 de todos sus empleadores",
    "Social Security numbers for you and dependents":
      "Números de Seguro Social suyos y de sus dependientes",
    "Valid filing status information":
      "Información sobre su estado civil para la declaración",
    "Tax return (filed or to be filed)":
      "Declaración de impuestos (presentada o por presentar)",
    "Has earned income (wages, salary, or self-employment)":
      "Tiene ingresos del trabajo (sueldo, salario o trabajo por cuenta propia)",
    "Must be > $0": "Debe ser mayor que $0",
    "Filer age 25-64 (or has qualifying children)":
      "Persona que declara de 25 a 64 años (o con hijos que califican)",
    "Any age": "Cualquier edad",
    "Investment income below $11,600 (2025)":
      "Ingresos por inversiones menores de $11,600 (2025)",
    "Income qualifies for IRS Free File (<$84,000)":
      "Sus ingresos califican para IRS Free File (menos de $84,000)",
    "Investment income (dividends, interest, capital gains)":
      "Ingresos por inversiones (dividendos, intereses, ganancias de capital)",
    "Tax filing status (single, MFJ, HOH, MFS)":
      "Estado civil para la declaración (soltero, casado declarando en conjunto, cabeza de familia, casado declarando por separado)",
    "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.":
      "El EITC requiere ingresos del trabajo (sueldo, salario o trabajo por cuenta propia). Si tiene ingresos en efectivo no declarados, también cuentan si presenta una declaración.",
    "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.":
      "Sin hijos que califiquen, el EITC requiere que la persona que declara tenga entre 25 y 64 años.",
    "File a federal tax return to claim the credit":
      "Presente una declaración de impuestos federal para reclamar el crédito",
    "Use IRS Free File; it's actually free":
      "Use IRS Free File; de verdad es gratis",
    "Use your preferred tax software or a CPA":
      "Use el programa de impuestos que prefiera o un contador público (CPA)",
    "Check if your state has added a state EITC recently":
      "Revise si su estado agregó hace poco un EITC estatal",
    "The credit is refundable; you can get money back even if you owe $0 in taxes":
      "El crédito es reembolsable; puede recibir dinero aunque deba $0 en impuestos",
    "Low Income Home Energy Assistance Program (LIHEAP)":
      "Programa de Asistencia de Energía para Hogares de Bajos Ingresos (LIHEAP)",
    "LIHEAP / Energy Assistance": "LIHEAP / Ayuda con la energía",
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.":
      "Ayuda a pagar las facturas de calefacción y aire acondicionado. También puede ayudar con el aislamiento y reparaciones del hogar relacionadas con la energía.",
    "Photo ID": "Identificación con foto",
    "Proof of income for all household members":
      "Comprobante de ingresos de todas las personas del hogar",
    "Recent utility bill": "Factura reciente de servicios (luz, gas o agua)",
    "Social Security numbers": "Números de Seguro Social",
    "Household income below 150% of FPL (some states use higher thresholds)":
      "Ingresos del hogar por debajo del 150% del FPL (algunos estados usan límites más altos)",
    "Household includes elderly (60+) or disabled members":
      "En el hogar hay personas mayores (60+) o con discapacidad",
    "Household includes children under 18":
      "En el hogar hay niños menores de 18 años",
    "Energy costs are a significant share of income":
      "Los gastos de energía son una parte importante de sus ingresos",
    "Monthly utility and energy expenses":
      "Gastos mensuales de servicios y energía",
    "Income exceeds 150% FPL. Some states use higher thresholds; check your state.":
      "Sus ingresos superan el 150% del FPL. Algunos estados usan límites más altos; consulte en su estado.",
    "You qualify and may receive priority as a household with elderly or disabled members.":
      "Usted califica y podría recibir prioridad por ser un hogar con personas mayores o con discapacidad.",
    "Your income is within LIHEAP limits for your household size.":
      "Sus ingresos están dentro de los límites de LIHEAP para el tamaño de su hogar.",
    "Apply through your local Community Action Agency":
      "Presente su solicitud en su Agencia de Acción Comunitaria local",
    "Apply before winter heating season for best chances":
      "Presente su solicitud antes de la temporada de calefacción de invierno para tener más posibilidades",
    "Mention elderly/disabled status; you may get priority":
      "Mencione si hay personas mayores o con discapacidad; podría recibir prioridad",
    Medicaid: "Medicaid",
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.":
      "Seguro médico gratuito o de bajo costo para adultos de bajos ingresos, niños, mujeres embarazadas, personas mayores y personas con discapacidad.",
    "Social Security number": "Número de Seguro Social",
    "Proof of citizenship or immigration status":
      "Comprobante de ciudadanía o estatus migratorio",
    "At least one household member is a US citizen or qualified immigrant":
      "Al menos una persona del hogar es ciudadana de EE. UU. o inmigrante calificada",
    Yes: "Sí",
    No: "No",
    "Not applicable (user qualifies via another pathway)":
      "No aplica (califica por otra vía)",
    "Has alternate pathway": "Tiene otra vía para calificar",
    "Required for childless adult eligibility":
      "Necesario para que califiquen adultos sin hijos",
    "Pregnant household member (highest priority pathway)":
      "Persona embarazada en el hogar (vía de mayor prioridad)",
    "Children under 19 in household (CHIP-adjacent pathway)":
      "Niños menores de 19 años en el hogar (vía relacionada con CHIP)",
    "Disabled household member (SSI pathway available)":
      "Persona con discapacidad en el hogar (vía de SSI disponible)",
    "Citizenship or immigration status for all household members":
      "Ciudadanía o estatus migratorio de todas las personas del hogar",
    "Disability status (affects SSI-linked Medicaid pathway)":
      "Situación de discapacidad (afecta la vía de Medicaid vinculada a SSI)",
    "Medicaid requires at least one household member to be a US citizen or qualified immigrant.":
      "Medicaid requiere que al menos una persona del hogar sea ciudadana de EE. UU. o inmigrante calificada.",
    "Pregnant women in most states qualify for Medicaid at up to 200% FPL.":
      "En la mayoría de los estados, las mujeres embarazadas califican para Medicaid con ingresos de hasta el 200% del FPL.",
    "Children under 19 typically qualify at higher income levels than adults.":
      "Los niños menores de 19 años suelen calificar con ingresos más altos que los adultos.",
    "Apply through Healthcare.gov or your state Medicaid office":
      "Presente su solicitud en Healthcare.gov o en la oficina de Medicaid de su estado",
    "Coverage can begin the same month you apply":
      "La cobertura puede empezar el mismo mes en que presenta la solicitud",
    "Expect a 30-45 day enrollment window":
      "Cuente con un proceso de inscripción de 30 a 45 días",
    "Check your state's managed care plan options":
      "Revise las opciones de planes de atención administrada de su estado",
    "Federal Pell Grant": "Beca Federal Pell",
    "Pell Grant": "Beca Pell",
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.":
      "Dinero gratis para la universidad que no hay que devolver. Para estudiantes de licenciatura con necesidad económica.",
    "Federal tax returns or W-2 forms":
      "Declaraciones de impuestos federales o formularios W-2",
    "Driver's license (if applicable)": "Licencia de conducir (si aplica)",
    "Records of untaxed income": "Registros de ingresos no sujetos a impuestos",
    "Bank statements": "Estados de cuenta bancarios",
    "Household includes a current or prospective undergraduate student":
      "En el hogar hay un estudiante universitario actual o futuro",
    "Family income below typical Pell Grant threshold (~$60,000)":
      "Ingresos familiares por debajo del límite habitual de la Beca Pell (~$60,000)",
    "Income under $30,000 (likely qualifies for maximum Pell)":
      "Ingresos menores de $30,000 (es probable que califique para la Beca Pell máxima)",
    "Household has dependent children (increases financial need)":
      "El hogar tiene hijos dependientes (aumenta la necesidad económica)",
    "Savings and investment balances (affects EFC calculation)":
      "Saldos de ahorros e inversiones (afecta el cálculo de la ayuda)",
    "Student enrollment status for household members":
      "Situación de inscripción escolar de las personas del hogar",
    "Pell Grants are for current or prospective undergraduate students.":
      "Las Becas Pell son para estudiantes universitarios actuales o futuros.",
    "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.":
      "Los ingresos familiares podrían superar el límite habitual de la Beca Pell. Llene la FAFSA para confirmarlo; algunas circunstancias especiales pueden calificar.",
    "Based on household income, you likely qualify for a Pell Grant.":
      "Según los ingresos de su hogar, es probable que califique para una Beca Pell.",
    "Complete the FAFSA at studentaid.gov": "Llene la FAFSA en studentaid.gov",
    "FAFSA opens October 1 each year":
      "La FAFSA abre el 1 de octubre de cada año",
    "You can receive Pell Grants for up to 12 semesters":
      "Puede recibir Becas Pell hasta por 12 semestres",
    "No repayment required; this is free money":
      "No hay que devolverlo; es dinero gratis",
    "Housing Choice Voucher Program (Section 8)":
      "Programa de Vales de Elección de Vivienda (Sección 8)",
    "Section 8 Housing": "Vivienda Sección 8",
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.":
      "Vales que ayudan a pagar la renta de una vivienda privada. Usted encuentra un apartamento y el vale cubre parte de la renta.",
    "Photo ID for all adult household members":
      "Identificación con foto de todos los adultos del hogar",
    "Birth certificates for children": "Actas de nacimiento de los niños",
    "Social Security cards": "Tarjetas de Seguro Social",
    "Proof of income (pay stubs, tax returns, benefit letters)":
      "Comprobante de ingresos (talones de pago, declaraciones de impuestos, cartas de beneficios)",
    "Proof of citizenship or eligible immigration status":
      "Comprobante de ciudadanía o de un estatus migratorio elegible",
    "Income below 80% of Area Median Income (approximate national average)":
      "Ingresos por debajo del 80% del ingreso medio de la zona (promedio nacional aproximado)",
    "≤160% of 50% AMI (~80% AMI)": "≤160% del 50% del AMI (~80% del AMI)",
    "Household includes elderly (62+) or disabled members":
      "En el hogar hay personas mayores (62+) o con discapacidad",
    "Families with children often receive preference":
      "Las familias con hijos suelen recibir preferencia",
    "Rent exceeds 50% of income (priority indicator)":
      "La renta supera el 50% de sus ingresos (indica prioridad)",
    "Income below 50% AMI (very low income, higher priority)":
      "Ingresos por debajo del 50% del AMI (ingresos muy bajos, mayor prioridad)",
    "Current monthly rent payment": "Pago mensual de renta actual",
    "Liquid assets (bank accounts, cash)":
      "Bienes líquidos (cuentas bancarias, efectivo)",
    "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.":
      "Es probable que sus ingresos superen el 80% del ingreso medio de la zona. Los límites cambian mucho según el lugar.",
    "You may qualify based on household income. Waitlists can be long; apply early.":
      "Podría calificar según los ingresos de su hogar. Las listas de espera pueden ser largas; presente su solicitud pronto.",
    "Contact your local Public Housing Authority (PHA)":
      "Comuníquese con su Autoridad de Vivienda Pública (PHA) local",
    "Waitlists are common; apply as soon as possible":
      "Las listas de espera son comunes; presente su solicitud lo antes posible",
    "Your rent is over 50% of income; mention this for possible priority":
      "Su renta es más del 50% de sus ingresos; menciónelo, porque podría darle prioridad",
    "Elderly/disabled households may qualify for preference":
      "Los hogares con personas mayores o con discapacidad pueden recibir preferencia",
    "Families with children often get preference":
      "Las familias con hijos suelen tener preferencia",
    "Supplemental Nutrition Assistance Program (SNAP)":
      "Programa de Asistencia Nutricional Suplementaria (SNAP)",
    "SNAP / Food Stamps": "SNAP (cupones de alimentos)",
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.":
      "Beneficios mensuales en una tarjeta EBT para comprar comida. Se aceptan en la mayoría de los supermercados y mercados de agricultores.",
    "Proof of income (pay stubs, tax return)":
      "Comprobante de ingresos (talones de pago, declaración de impuestos)",
    "Proof of residency (utility bill, lease)":
      "Comprobante de domicilio (factura de servicios, contrato de renta)",
    "Social Security numbers for household members":
      "Números de Seguro Social de las personas del hogar",
    "Bank statements (if applicable)":
      "Estados de cuenta bancarios (si aplica)",
    "At least one household member is a US citizen or eligible immigrant":
      "Al menos una persona del hogar es ciudadana de EE. UU. o inmigrante elegible",
    "Gross income below 130% of FPL (or elderly/disabled exempt)":
      "Ingresos brutos por debajo del 130% del FPL (o exento por edad avanzada o discapacidad)",
    "Net income (after deductions) below 100% of FPL":
      "Ingresos netos (después de deducciones) por debajo del 100% del FPL",
    "Household includes someone age 60+ or disabled":
      "En el hogar hay alguien de 60 años o más o con discapacidad",
    "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)":
      "Bienes líquidos menores de $2,750 (o $4,250 en hogares con personas mayores o con discapacidad)",
    "Liquid asset total (bank accounts, cash)":
      "Total de bienes líquidos (cuentas bancarias, efectivo)",
    "Monthly expenses (rent, childcare, medical) for accurate deductions":
      "Gastos mensuales (renta, cuidado de niños, gastos médicos) para calcular bien las deducciones",
    "SNAP requires at least one household member to be a US citizen or qualified immigrant.":
      "SNAP requiere que al menos una persona del hogar sea ciudadana de EE. UU. o inmigrante calificada.",
    "Based on your household size and income, you likely qualify for SNAP benefits.":
      "Según el tamaño y los ingresos de su hogar, es probable que califique para los beneficios de SNAP.",
    "Apply online through your state SNAP office":
      "Presente su solicitud en línea con la oficina de SNAP de su estado",
    "Prepare income verification documents (last 30 days of pay stubs)":
      "Prepare los documentos que comprueban sus ingresos (talones de pago de los últimos 30 días)",
    "Schedule an interview (phone or in-person)":
      "Programe una entrevista (por teléfono o en persona)",
    "Bring ID, proof of residency, and Social Security numbers":
      "Lleve su identificación, comprobante de domicilio y números de Seguro Social",
    "Supplemental Security Income (SSI)":
      "Seguridad de Ingreso Suplementario (SSI)",
    SSI: "SSI",
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.":
      "Pagos mensuales en efectivo para personas mayores (65+), ciegas o con discapacidad que tienen pocos ingresos y recursos.",
    "Social Security card": "Tarjeta de Seguro Social",
    "Birth certificate or proof of age":
      "Acta de nacimiento o comprobante de edad",
    "Proof of disability (medical records)":
      "Comprobante de discapacidad (expedientes médicos)",
    "Proof of income and resources": "Comprobante de ingresos y recursos",
    "Proof of living situation": "Comprobante de su situación de vivienda",
    "Household includes someone who is 65+, blind, or disabled":
      "En el hogar hay alguien de 65 años o más, ciego o con discapacidad",
    "Not provided": "No se indicó",
    "Single individual (different limits than couples)":
      "Persona sola (los límites son distintos a los de las parejas)",
    "Many states add a supplement on top of federal SSI":
      "Muchos estados agregan un pago adicional al SSI federal",
    "Countable resources (bank accounts, cash, investments)":
      "Recursos que cuentan (cuentas bancarias, efectivo, inversiones)",
    "SSI is for people who are 65+, blind, or disabled.":
      "SSI es para personas de 65 años o más, ciegas o con discapacidad.",
    "You may qualify based on age/disability and income level.":
      "Podría calificar según su edad o discapacidad y su nivel de ingresos.",
    "Apply at your local Social Security office or call 1-800-772-1213":
      "Presente su solicitud en su oficina local del Seguro Social o llame al 1-800-772-1213",
    "Gather medical records documenting disability":
      "Reúna los expedientes médicos que documentan la discapacidad",
    "The application process can take 3-6 months":
      "El proceso de solicitud puede tardar de 3 a 6 meses",
    "Women, Infants, and Children (WIC)": "Mujeres, Bebés y Niños (WIC)",
    WIC: "WIC",
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.":
      "Ayuda de nutrición para mujeres embarazadas, que amamantan o que dieron a luz hace poco, y para niños menores de 5 años. Ofrece vales de comida, educación sobre nutrición y referidos a servicios de salud.",
    "Proof of pregnancy or child birth certificate":
      "Comprobante de embarazo o acta de nacimiento del niño",
    "Immunization records for children": "Cartillas de vacunación de los niños",
    "Household includes a pregnant/postpartum woman or child under 5":
      "En el hogar hay una mujer embarazada o que dio a luz hace poco, o un niño menor de 5 años",
    "Household income below 185% of FPL":
      "Ingresos del hogar por debajo del 185% del FPL",
    "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)":
      "Recibe SNAP, Medicaid o TANF (cumple automáticamente el requisito de ingresos de WIC)",
    "Household includes infants under 1 year":
      "En el hogar hay bebés menores de 1 año",
    "Pregnancy status for household members":
      "Si hay personas embarazadas en el hogar",
    "WIC is for pregnant/postpartum women and children under 5.":
      "WIC es para mujeres embarazadas o que dieron a luz hace poco y niños menores de 5 años.",
    "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.":
      "Sus ingresos superan el 185% del FPL. Sin embargo, si recibe SNAP, Medicaid o TANF, califica automáticamente.",
    "Contact your local WIC office to schedule an appointment":
      "Comuníquese con su oficina local de WIC para hacer una cita",
    "Bring proof of income and residency":
      "Lleve comprobantes de ingresos y de domicilio",
    "Appointments are usually available within 2 weeks":
      "Por lo general hay citas disponibles en 2 semanas",
    "CalFresh (California SNAP)": "CalFresh (SNAP de California)",
    CalFresh: "CalFresh",
    "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.":
      "El programa SNAP de California, con ayuda adicional del estado. Sus requisitos son más amplios que los del SNAP federal e incluyen a algunos estudiantes universitarios e inmigrantes.",
    "Proof of CA residency": "Comprobante de domicilio en California",
    "SSN or immigration documents":
      "Número de Seguro Social o documentos de inmigración",
    "CalFresh is a California program.":
      "CalFresh es un programa de California.",
    "Income exceeds California's expanded 200% FPL limit for CalFresh.":
      "Sus ingresos superan el límite ampliado de California para CalFresh (200% del FPL).",
    "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.":
      "California amplió los requisitos de SNAP hasta el 200% del FPL. Es probable que califique para CalFresh.",
    "Apply at GetCalFresh.org (takes 10 minutes)":
      "Presente su solicitud en GetCalFresh.org (toma 10 minutos)",
    "Call 1-877-847-3663 for help in your language":
      "Llame al 1-877-847-3663 para recibir ayuda en su idioma",
    "CalWORKs (California Cash Aid)":
      "CalWORKs (ayuda en efectivo de California)",
    CalWORKs: "CalWORKs",
    "Cash assistance for families with children. Includes job training, childcare, and housing support.":
      "Ayuda en efectivo para familias con hijos. Incluye capacitación laboral, cuidado de niños y apoyo con la vivienda.",
    "Children's birth certificates": "Actas de nacimiento de los niños",
    "CalWORKs is a California program.":
      "CalWORKs es un programa de California.",
    "CalWORKs requires children under 18 in the household.":
      "CalWORKs requiere que haya niños menores de 18 años en el hogar.",
    "Income exceeds CalWORKs limits.":
      "Sus ingresos superan los límites de CalWORKs.",
    "You have children and meet income requirements for CalWORKs cash aid.":
      "Tiene hijos y cumple los requisitos de ingresos para la ayuda en efectivo de CalWORKs.",
    "Apply at your county welfare office":
      "Presente su solicitud en la oficina de asistencia social de su condado",
    "Also provides childcare, job training, and transportation":
      "También ofrece cuidado de niños, capacitación laboral y transporte",
    "Texas SNAP (Lone Star Card)": "SNAP de Texas (tarjeta Lone Star)",
    "TX SNAP / Lone Star": "SNAP de Texas / Lone Star",
    "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.":
      "Beneficios de SNAP de Texas que se cargan en una tarjeta Lone Star. Texas NO amplió Medicaid, así que SNAP podría ser su beneficio principal.",
    "Proof of TX residency": "Comprobante de domicilio en Texas",
    "SSN for all applicants":
      "Número de Seguro Social de todas las personas que solicitan",
    "This is a Texas program.": "Este es un programa de Texas.",
    "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).":
      "Sus ingresos superan los límites de SNAP de Texas (165% del FPL con elegibilidad categórica amplia).",
    "Texas uses broad-based categorical eligibility at 165% FPL.":
      "Texas usa elegibilidad categórica amplia hasta el 165% del FPL.",
    "Apply at YourTexasBenefits.com":
      "Presente su solicitud en YourTexasBenefits.com",
    "Texas has NO Medicaid expansion; check CHIP for children":
      "Texas NO amplió Medicaid; revise CHIP para los niños",
    "ACCESS Florida (FL SNAP)": "ACCESS Florida (SNAP de Florida)",
    "ACCESS Florida": "ACCESS Florida",
    "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.":
      "El programa de ayuda con alimentos de Florida. Solicite en línea SNAP, Medicaid y ayuda en efectivo, todo a la vez.",
    "Proof of FL residency": "Comprobante de domicilio en Florida",
    SSN: "Número de Seguro Social",
    "This is a Florida program.": "Este es un programa de Florida.",
    "Income exceeds Florida SNAP limits.":
      "Sus ingresos superan los límites de SNAP de Florida.",
    "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.":
      "Florida usa elegibilidad categórica amplia hasta el 200% del FPL para SNAP.",
    "Apply at MyFlorida.com/accessflorida":
      "Presente su solicitud en MyFlorida.com/accessflorida",
    "One application covers SNAP, Medicaid, and cash aid":
      "Una sola solicitud cubre SNAP, Medicaid y ayuda en efectivo",
    "Florida has NO Medicaid expansion for adults":
      "Florida NO amplió Medicaid para adultos",
    "New York SNAP": "SNAP de Nueva York",
    "NY SNAP": "SNAP de Nueva York",
    "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.":
      "El programa SNAP de Nueva York, con algunos de los beneficios más altos del país porque se ajustan al alto costo de vida.",
    "Proof of NY residency": "Comprobante de domicilio en Nueva York",
    "Rent/utility bills": "Facturas de renta o de servicios",
    "This is a New York program.": "Este es un programa de Nueva York.",
    "Income exceeds NY SNAP limits (200% FPL).":
      "Sus ingresos superan los límites de SNAP de Nueva York (200% del FPL).",
    "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.":
      "Nueva York amplió los requisitos de SNAP y ofrece beneficios más altos por el costo de vida.",
    "Apply at mybenefits.ny.gov": "Presente su solicitud en mybenefits.ny.gov",
    "NY has expanded Medicaid; apply for both at once":
      "Nueva York amplió Medicaid; solicite ambos a la vez",
    "NYC residents can also call 311":
      "Quienes viven en la ciudad de Nueva York también pueden llamar al 311",
    "Essential Plan (NY Health)": "Essential Plan (salud de Nueva York)",
    "NY Essential Plan": "Essential Plan de Nueva York",
    "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.":
      "El plan de salud de bajo costo de Nueva York para personas que ganan demasiado para Medicaid pero no pueden pagar los planes del mercado de seguros. $0-$20 al mes.",
    "Essential Plan is a New York program.":
      "Essential Plan es un programa de Nueva York.",
    "You likely qualify for full Medicaid instead (lower income).":
      "Es probable que califique para Medicaid completo (ingresos más bajos).",
    "Income exceeds Essential Plan limits (200% FPL).":
      "Sus ingresos superan los límites de Essential Plan (200% del FPL).",
    "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.":
      "Sus ingresos están entre el 138% y el 200% del FPL; califica para Essential Plan por $0-$20 al mes.",
    "Apply at NY State of Health marketplace":
      "Presente su solicitud en el mercado de seguros NY State of Health",
    "Plans cost $0 or $20/month with no deductible":
      "Los planes cuestan $0 o $20 al mes y no tienen deducible",
    "Covers doctor visits, prescriptions, hospital, and mental health":
      "Cubre consultas médicas, recetas, hospital y salud mental",
    "Pennsylvania SNAP": "SNAP de Pensilvania",
    "PA SNAP": "SNAP de Pensilvania",
    "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.":
      "La ayuda con alimentos de Pensilvania, con elegibilidad categórica amplia hasta el 160% del FPL.",
    "Proof of PA residency": "Comprobante de domicilio en Pensilvania",
    "This is a Pennsylvania program.": "Este es un programa de Pensilvania.",
    "Income exceeds PA SNAP limits (160% FPL).":
      "Sus ingresos superan los límites de SNAP de Pensilvania (160% del FPL).",
    "Pennsylvania uses broad-based categorical eligibility at 160% FPL.":
      "Pensilvania usa elegibilidad categórica amplia hasta el 160% del FPL.",
    "Apply at COMPASS.state.pa.us":
      "Presente su solicitud en COMPASS.state.pa.us",
    "PA has expanded Medicaid; apply for both at once":
      "Pensilvania amplió Medicaid; solicite ambos a la vez",
    "Passed eligibility check": "Cumple los requisitos",
    "Failed eligibility check": "No cumple los requisitos",
    "Detailed rule-by-rule breakdown": "Detalle de cada requisito",
    "A government-issued ID that proves who you are.":
      "Una identificación del gobierno que demuestra quién es usted.",
    "Driver's license": "Licencia de conducir",
    "State ID card": "Tarjeta de identificación del estado",
    Passport: "Pasaporte",
    "Expired IDs may be accepted in some states.":
      "En algunos estados se aceptan identificaciones vencidas.",
    "Shows how much money you earn each month.":
      "Muestra cuánto dinero gana cada mes.",
    "Pay stubs (last 30 days)": "Talones de pago (últimos 30 días)",
    "Tax return": "Declaración de impuestos",
    "Letter from employer": "Carta del empleador",
    "Benefit award letter": "Carta de aprobación de beneficios",
    "If self-employed, bring records of your earnings.":
      "Si trabaja por cuenta propia, lleve registros de lo que gana.",
    "Shows you live in the state where you are applying.":
      "Demuestra que vive en el estado donde presenta la solicitud.",
    "Utility bill": "Factura de servicios (luz, gas o agua)",
    "Lease agreement": "Contrato de renta",
    "Mortgage statement": "Estado de cuenta de la hipoteca",
    "Letter from landlord": "Carta del dueño de la vivienda",
    "For every person in your household applying for benefits.":
      "De cada persona de su hogar que solicita beneficios.",
    "SSN cards": "Tarjetas de Seguro Social",
    "SSA letter": "Carta de la Administración del Seguro Social (SSA)",
    "Tax documents showing SSN":
      "Documentos de impuestos que muestren el número de Seguro Social",
    "If someone does not have an SSN, they can still apply. The rest of the household may qualify.":
      "Si alguien no tiene número de Seguro Social, aun así puede presentar la solicitud. El resto del hogar podría calificar.",
    "Shows your savings and checking account balances.":
      "Muestra los saldos de sus cuentas de ahorro y de cheques.",
    "Most states have eliminated the asset test for SNAP, but some still check.":
      "La mayoría de los estados ya no revisan los bienes para SNAP, pero algunos todavía lo hacen.",
    "Medical bills": "Facturas médicas",
    "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.":
      "Si alguien de su hogar es una persona mayor o tiene una discapacidad, los gastos médicos pueden aumentar su beneficio.",
    "Keep receipts for prescriptions, doctor visits, and medical equipment.":
      "Guarde los recibos de medicinas, consultas médicas y equipo médico.",
    "Childcare expenses": "Gastos de cuidado de niños",
    "If you pay for childcare to work or attend school, this counts as a deduction.":
      "Si paga por el cuidado de sus hijos para poder trabajar o estudiar, esto cuenta como deducción.",
    "Daycare receipts": "Recibos de la guardería",
    "After-school program invoices":
      "Facturas del programa después de la escuela",
    "A government-issued ID for the person applying.":
      "Una identificación del gobierno de la persona que presenta la solicitud.",
    "State ID": "Identificación del estado",
    "Your household income for the current month.":
      "Los ingresos de su hogar del mes actual.",
    "Pay stubs": "Talones de pago",
    "Self-employment records": "Registros de trabajo por cuenta propia",
    "Shows you are a US citizen or have qualified immigration status.":
      "Demuestra que es ciudadano de EE. UU. o que tiene un estatus migratorio calificado.",
    "Birth certificate": "Acta de nacimiento",
    "Naturalization certificate": "Certificado de naturalización",
    "Permanent resident card": "Tarjeta de residente permanente",
    "Children born in the US are citizens regardless of parents' status.":
      "Los niños nacidos en EE. UU. son ciudadanos, sin importar el estatus de sus padres.",
    "Required for each person applying for coverage.":
      "Se necesita para cada persona que solicita cobertura.",
    "Proof of pregnancy": "Comprobante de embarazo",
    "If applying based on pregnancy, a doctor's note helps speed up approval.":
      "Si lo solicita por embarazo, una nota del médico ayuda a que lo aprueben más rápido.",
    "Proof of disability": "Comprobante de discapacidad",
    "If applying based on disability, medical records can help.":
      "Si lo solicita por discapacidad, los expedientes médicos pueden ayudar.",
    "Doctor's letter": "Carta del médico",
    "SSI/SSDI award letter": "Carta de aprobación de SSI o SSDI",
    "W-2 forms": "Formularios W-2",
    "From every job you worked during the tax year.":
      "De cada trabajo que tuvo durante el año fiscal.",
    "Employers must send W-2s by January 31st each year.":
      "Los empleadores deben enviar los formularios W-2 a más tardar el 31 de enero de cada año.",
    "For yourself, your spouse (if filing jointly), and all dependents.":
      "Suyo, de su cónyuge (si declaran en conjunto) y de todos sus dependientes.",
    "Filing status information":
      "Información sobre su estado civil para la declaración",
    "Whether you file as single, married, or head of household.":
      "Si declara como soltero, casado o cabeza de familia.",
    "Head of household often gives a bigger credit if you have dependents.":
      "Declarar como cabeza de familia suele dar un crédito mayor si tiene dependientes.",
    "1099 forms": "Formularios 1099",
    "If you did freelance or gig work (Uber, DoorDash, etc.).":
      "Si trabajó por su cuenta o en trabajos por aplicación (Uber, DoorDash, etc.).",
    "Childcare provider information": "Información de quien cuida a sus hijos",
    "Name, address, and tax ID of your childcare provider to claim additional credits.":
      "Nombre, dirección y número de identificación fiscal de quien cuida a sus hijos, para reclamar créditos adicionales.",
    "For the parent or guardian applying.":
      "Del padre, madre o tutor que presenta la solicitud.",
    "Shows household income is within WIC limits.":
      "Demuestra que los ingresos del hogar están dentro de los límites de WIC.",
    "Benefit letters": "Cartas de beneficios",
    "Shows you live in the state.": "Demuestra que vive en el estado.",
    Lease: "Contrato de renta",
    "Proof of pregnancy or child": "Comprobante de embarazo o del niño",
    "Doctor's note for pregnancy, or birth certificate for children.":
      "Nota del médico si está embarazada, o acta de nacimiento de los niños.",
    "Pregnancy verification": "Constancia de embarazo",
    "Hospital records": "Registros del hospital",
    "Immunization records": "Cartillas de vacunación",
    "For children. Your WIC office may be able to look these up.":
      "De los niños. Es posible que su oficina de WIC pueda buscarlos.",
    "Proof of other benefits": "Comprobante de otros beneficios",
    "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.":
      "Si recibe SNAP, Medicaid o TANF, cumple automáticamente el requisito de ingresos de WIC.",
    "For the head of household.": "De la persona cabeza de familia.",
    "For all household members.": "De todas las personas del hogar.",
    "Shows your energy costs and account number.":
      "Muestra sus gastos de energía y su número de cuenta.",
    "Bring both heating and electric bills if they are separate.":
      "Lleve las facturas de calefacción y de electricidad si llegan por separado.",
    "May qualify you for priority assistance.":
      "Puede darle prioridad para recibir ayuda.",
    "Disconnection notice": "Aviso de corte de servicio",
    "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.":
      "Si le van a cortar los servicios, lleve el aviso. Podría recibir ayuda de emergencia más rápido.",
    "Parent/guardian photo ID":
      "Identificación con foto del padre, madre o tutor",
    "Government-issued ID for the applying parent.":
      "Identificación del gobierno del padre o la madre que presenta la solicitud.",
    "Child's birth certificate": "Acta de nacimiento del niño",
    "Proves age and citizenship.": "Demuestra la edad y la ciudadanía.",
    "For children being enrolled.": "De los niños que se van a inscribir.",
    "Household income documentation.": "Documentos de los ingresos del hogar.",
    "Current insurance information": "Información de su seguro actual",
    "If children currently have insurance that is ending.":
      "Si los niños tienen un seguro que está por terminar.",
    "Photo ID for all adults": "Identificación con foto de todos los adultos",
    "Every adult household member needs a government-issued ID.":
      "Cada adulto del hogar necesita una identificación del gobierno.",
    "Proves ages and household composition.":
      "Demuestra las edades y quiénes forman el hogar.",
    "All sources for all household members.":
      "Todas las fuentes de ingresos de todas las personas del hogar.",
    "Tax returns": "Declaraciones de impuestos",
    "Child support documentation": "Documentos de manutención de los hijos",
    "Proof of citizenship/immigration":
      "Comprobante de ciudadanía o estatus migratorio",
    "May be requested to verify assets.":
      "Se lo pueden pedir para verificar sus bienes.",
    "Landlord reference": "Referencia del dueño de la vivienda",
    "A letter from a current or previous landlord.":
      "Una carta del dueño de su vivienda actual o anterior.",
    "Criminal background info": "Información sobre antecedentes penales",
    "Some PHAs run background checks. Be upfront about any issues.":
      "Algunas PHA revisan antecedentes. Hable con sinceridad sobre cualquier problema.",
    "Or document showing your SSN.":
      "O un documento que muestre su número de Seguro Social.",
    "If applying based on age (65+).": "Si lo solicita por su edad (65+).",
    "Medical records": "Expedientes médicos",
    "If applying based on disability: doctor's notes, hospital records, test results.":
      "Si lo solicita por discapacidad: notas del médico, registros del hospital, resultados de exámenes.",
    "The more medical evidence you provide, the stronger your application.":
      "Mientras más pruebas médicas entregue, más sólida será su solicitud.",
    "Pay stubs, bank statements, investment statements.":
      "Talones de pago, estados de cuenta bancarios, estados de cuenta de inversiones.",
    "Lease, mortgage statement, or letter from someone you live with.":
      "Contrato de renta, estado de cuenta de la hipoteca o carta de alguien con quien vive.",
    "Previous work history": "Historial de trabajo",
    "List of jobs for the past 15 years. This helps evaluate disability claim.":
      "Lista de sus trabajos de los últimos 15 años. Esto ayuda a evaluar la solicitud por discapacidad.",
    "Medications list": "Lista de medicamentos",
    "All current medications with dosages.":
      "Todos los medicamentos que toma ahora, con sus dosis.",
    "Required for the FAFSA application.":
      "Se necesita para la solicitud FAFSA.",
    "Federal tax returns": "Declaraciones de impuestos federales",
    "Your (and your parents' if dependent) most recent tax return.":
      "Su declaración de impuestos más reciente (y la de sus padres si depende de ellos).",
    "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.":
      "Puede usar la herramienta de recuperación de datos del IRS para llenar automáticamente la información de impuestos en la FAFSA.",
    "From all jobs during the tax year.":
      "De todos sus trabajos durante el año fiscal.",
    "Optional but helps verify identity.":
      "Opcional, pero ayuda a verificar su identidad.",
    "Child support received, veterans' benefits, etc.":
      "Manutención de hijos recibida, beneficios de veteranos, etc.",
    "Current savings and checking balances.":
      "Saldos actuales de sus cuentas de ahorro y de cheques.",
    "{count} child": "{count} niño",
    "{count} children": "{count} niños",
    "{pct}% FPL (estimated)": "{pct}% del FPL (estimado)",
    "${amount}/yr": "${amount}/año",
    "≤${amount}/yr": "≤${amount}/año",
    "${amount}/mo": "${amount}/mes",
    "≤${amount}/mo": "≤${amount}/mes",
    "Income below EITC limit for {count} qualifying children":
      "Ingresos por debajo del límite del EITC para {count} hijos que califican",
    "{age} years old": "{age} años",
    "{count} qualifying child": "{count} hijo que califica",
    "{count} qualifying children": "{count} hijos que califican",
    "{state} offers a state EITC that stacks with the federal credit":
      "{state} ofrece un EITC estatal que se suma al crédito federal",
    "Claim the {state} state EITC on your state return":
      "Reclame el EITC estatal de {state} en su declaración estatal",
    "Income below {pct}% FPL for the {pathway} pathway":
      "Ingresos por debajo del {pct}% del FPL para la vía de {pathway}",
    "{state} has a Medicaid pathway for childless adults":
      "{state} tiene una vía de Medicaid para adultos sin hijos",
    "{state} has not expanded Medicaid": "{state} no ha ampliado Medicaid",
    "{state} has expanded Medicaid to {pct}% FPL":
      "{state} amplió Medicaid hasta el {pct}% del FPL",
    "Check {state}-specific eligibility rules (non-expansion state)":
      "Revise las reglas de elegibilidad propias de {state} (estado que no amplió Medicaid)",
    "~{pct}% of {base}% AMI": "~{pct}% del {base}% del AMI",
    "Monthly income below SSI limit (${amount})":
      "Ingresos mensuales por debajo del límite de SSI (${amount})",
    "Countable resources below ${amount} (home and one vehicle excluded)":
      "Recursos que cuentan por debajo de ${amount} (sin contar la casa y un vehículo)",
    "{count} eligible member": "{count} persona que califica",
    "{count} eligible members": "{count} personas que califican",
    "{count} child may qualify for CHIP coverage.":
      "{count} niño podría calificar para la cobertura de CHIP.",
    "{count} children may qualify for CHIP coverage.":
      "{count} niños podrían calificar para la cobertura de CHIP.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.":
      "Sus ingresos anuales (${income}) superan el límite del EITC de ${limit} para {count} hijo que califica.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.":
      "Sus ingresos anuales (${income}) superan el límite del EITC de ${limit} para {count} hijos que califican.",
    "You likely qualify for the EITC with {count} qualifying child.":
      "Es probable que califique para el EITC con {count} hijo que califica.",
    "You likely qualify for the EITC with {count} qualifying children.":
      "Es probable que califique para el EITC con {count} hijos que califican.",
    "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.":
      "Es probable que califique para el EITC con {count} hijo que califica. {state} también ofrece un crédito estatal equivalente.",
    "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.":
      "Es probable que califique para el EITC con {count} hijos que califican. {state} también ofrece un crédito estatal equivalente.",
    "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.":
      'Podría quedar en la "brecha de cobertura" de Medicaid en {state}. Los adultos sin hijos en estados que no ampliaron Medicaid tienen pocas opciones; revise los subsidios del mercado de seguros de la ACA.',
    "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.":
      "Sus ingresos ({pct}% del FPL) superan el límite del {threshold}% para la vía de {pathway}. Revise los subsidios del mercado de seguros de la ACA.",
    "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.":
      "Sus ingresos están por debajo del {threshold}% del FPL. Es probable que califique por la vía de {pathway}.",
    "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.":
      "Sus ingresos brutos ({pct}% del FPL) superan el límite del 130% de SNAP.",
    "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.":
      "Sus ingresos netos estimados ({pct}% del FPL) superan el límite del 100%. Las deducciones reales pueden ser distintas; presente su solicitud para confirmarlo.",
    "Monthly income (${income}) exceeds SSI limit of ${limit}.":
      "Sus ingresos mensuales (${income}) superan el límite de SSI de ${limit}.",
    "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.":
      "Sus recursos que cuentan (${assets}) superan el límite de ${limit}. Por lo general no se cuentan la casa ni un vehículo.",
    "You have {count} eligible household member and meet income requirements.":
      "Tiene {count} persona en el hogar que califica y cumple los requisitos de ingresos.",
    "You have {count} eligible household members and meet income requirements.":
      "Tiene {count} personas en el hogar que califican y cumple los requisitos de ingresos.",
  },
};

const zh: ProgramsMessages = {
  shortNames: {
    snap: "SNAP（食品券）",
    medicaid: "Medicaid",
    eitc: "EITC",
    wic: "WIC",
    liheap: "LIHEAP / 能源援助",
    chip: "CHIP",
    section8: "Section 8 住房",
    ssi: "SSI",
    "pell-grant": "Pell 助学金",
    "ca-calfresh": "CalFresh",
    "ca-calworks": "CalWORKs",
    "tx-snap": "德州 SNAP / Lone Star",
    "fl-access": "ACCESS Florida",
    "ny-snap": "纽约州 SNAP",
    "ny-essential-plan": "纽约州 Essential Plan",
    "pa-snap": "宾州 SNAP",
  },
  pathways: {
    pregnancy: "怀孕",
    children: "儿童",
    "disabled or elderly": "残障或老人",
    "adult expansion": "成年人扩大覆盖",
    "adult non expansion": "未扩大覆盖的成年人",
  },
  text: {
    "Centers for Medicare & Medicaid Services (CMS)":
      "联邦医疗保险和医疗补助服务中心（CMS）",
    "Internal Revenue Service (IRS)": "美国国税局（IRS）",
    "U.S. Department of Education": "美国教育部",
    "U.S. Department of Housing and Urban Development (HUD)":
      "美国住房和城市发展部（HUD）",
    "Administration for Children and Families (ACF)": "儿童和家庭管理局（ACF）",
    "USDA Food and Nutrition Service": "美国农业部食品和营养服务局",
    "Social Security Administration (SSA)": "社会保障局（SSA）",
    "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.":
      "覆盖收入在 Medicaid 标准（约为联邦贫困线的 138%）到约联邦贫困线 250% 之间的儿童。部分州的上限为 300%。",
    "50% of Area Median Income (AMI)": "地区收入中位数（AMI）的 50%",
    "80% AMI in some cases": "部分情况下为 AMI 的 80%",
    "Households paying >50% of income on rent may receive priority":
      "房租超过收入 50% 的家庭可能获得优先",
    "60% of state median income (varies by state)":
      "州收入中位数的 60%（各州不同）",
    "Childless adults in non-expansion states may fall into coverage gap":
      "在未扩大 Medicaid 的州，没有子女的成年人可能无法获得任何医疗保险",
    "Children's Health Insurance Program (CHIP)": "儿童健康保险计划 (CHIP)",
    CHIP: "CHIP",
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.":
      "为收入超出 Medicaid 标准、但又负担不起私人保险的家庭的孩子提供低价医疗保险。",
    "Photo ID for parent/guardian": "父母或监护人的带照片身份证件",
    "Child's birth certificate or Social Security number":
      "孩子的出生证明或社会安全号码",
    "Proof of income": "收入证明",
    "Proof of residency": "居住证明",
    "Household includes children under 19": "家中有 19 岁以下的孩子",
    None: "无",
    Required: "必需",
    "Income above Medicaid threshold (138% FPL)":
      "收入高于 Medicaid 标准 (138% FPL)",
    "Income below 250% of FPL (varies by state, some up to 300%)":
      "收入低于 FPL 的 250%（各州不同，有些州可达 300%）",
    "Children currently lack health insurance": "孩子目前没有医疗保险",
    "Some states extend CHIP to 300% FPL": "有些州将 CHIP 扩大到 300% FPL",
    "Current health insurance status for children": "孩子目前的医疗保险情况",
    "CHIP is for children under 19.": "CHIP 适用于 19 岁以下的儿童。",
    "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.":
      "您的孩子很可能符合 Medicaid 的条件（费用更低）。请先查看 Medicaid。",
    "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.":
      "在大多数州，您的收入可能超出 CHIP 限额。有些州可达 300% FPL，请查询您所在的州。",
    "Apply through Healthcare.gov or your state CHIP program":
      "通过 Healthcare.gov 或您所在州的 CHIP 计划申请",
    "Coverage often starts immediately once approved":
      "获批后通常可以立即开始享受保险",
    "Premiums are very low or free depending on income":
      "根据收入不同，保费很低或免费",
    "Earned Income Tax Credit (EITC)": "劳动所得税抵免 (EITC)",
    EITC: "EITC",
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.":
      "面向中低收入工作人士的税收抵免。即使您不欠税，也可能拿到退款。",
    "W-2 forms from all employers": "所有雇主提供的 W-2 表格",
    "Social Security numbers for you and dependents":
      "您和受抚养人的社会安全号码",
    "Valid filing status information": "有效的报税身份信息",
    "Tax return (filed or to be filed)": "报税表（已提交或待提交）",
    "Has earned income (wages, salary, or self-employment)":
      "有劳动收入（工资、薪水或自雇收入）",
    "Must be > $0": "必须大于 $0",
    "Filer age 25-64 (or has qualifying children)":
      "报税人年龄 25-64 岁（或有符合条件的子女）",
    "Any age": "任何年龄",
    "Investment income below $11,600 (2025)": "投资收入低于 $11,600 (2025)",
    "Income qualifies for IRS Free File (<$84,000)":
      "收入符合 IRS Free File 免费报税条件 (<$84,000)",
    "Investment income (dividends, interest, capital gains)":
      "投资收入（股息、利息、资本利得）",
    "Tax filing status (single, MFJ, HOH, MFS)":
      "报税身份（单身、夫妻合并申报、户主、夫妻分开申报）",
    "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.":
      "EITC 要求有来自工资、薪水或自雇的劳动收入。如果您有未申报的现金收入，只要报税也同样算数。",
    "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.":
      "如果没有符合条件的子女，EITC 要求报税人年龄在 25 到 64 岁之间。",
    "File a federal tax return to claim the credit":
      "提交联邦报税表以申领这项抵免",
    "Use IRS Free File; it's actually free": "使用 IRS Free File，确实免费",
    "Use your preferred tax software or a CPA":
      "使用您常用的报税软件或请注册会计师 (CPA) 帮忙",
    "Check if your state has added a state EITC recently":
      "查看您所在的州最近是否新增了州 EITC",
    "The credit is refundable; you can get money back even if you owe $0 in taxes":
      "这项抵免可以退款，即使您的应缴税额为 $0 也能拿到钱",
    "Low Income Home Energy Assistance Program (LIHEAP)":
      "低收入家庭能源援助计划 (LIHEAP)",
    "LIHEAP / Energy Assistance": "LIHEAP / 能源援助",
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.":
      "帮助支付取暖和制冷费用，也可能帮助做房屋保温和与能源有关的维修。",
    "Photo ID": "带照片的身份证件",
    "Proof of income for all household members": "所有家庭成员的收入证明",
    "Recent utility bill": "最近的水电煤账单",
    "Social Security numbers": "社会安全号码",
    "Household income below 150% of FPL (some states use higher thresholds)":
      "家庭收入低于 FPL 的 150%（有些州的标准更高）",
    "Household includes elderly (60+) or disabled members":
      "家中有老人（60 岁以上）或残障人士",
    "Household includes children under 18": "家中有 18 岁以下的孩子",
    "Energy costs are a significant share of income":
      "能源费用占收入的比例很高",
    "Monthly utility and energy expenses": "每月的水电煤和能源支出",
    "Income exceeds 150% FPL. Some states use higher thresholds; check your state.":
      "收入超过 150% FPL。有些州的标准更高，请查询您所在的州。",
    "You qualify and may receive priority as a household with elderly or disabled members.":
      "您符合条件，并且作为有老人或残障成员的家庭，可能获得优先照顾。",
    "Your income is within LIHEAP limits for your household size.":
      "按您的家庭人数，您的收入在 LIHEAP 限额以内。",
    "Apply through your local Community Action Agency":
      "通过当地的社区行动机构 (Community Action Agency) 申请",
    "Apply before winter heating season for best chances":
      "在冬季供暖季之前申请，机会最大",
    "Mention elderly/disabled status; you may get priority":
      "请说明家中有老人或残障人士，您可能获得优先照顾",
    Medicaid: "Medicaid",
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.":
      "为低收入成年人、儿童、孕妇、老人和残障人士提供免费或低价医疗保险。",
    "Social Security number": "社会安全号码",
    "Proof of citizenship or immigration status": "公民身份或移民身份证明",
    "At least one household member is a US citizen or qualified immigrant":
      "至少有一名家庭成员是美国公民或合格移民",
    Yes: "是",
    No: "否",
    "Not applicable (user qualifies via another pathway)":
      "不适用（通过其他途径符合条件）",
    "Has alternate pathway": "有其他符合条件的途径",
    "Required for childless adult eligibility":
      "无子女成年人符合条件的必要条件",
    "Pregnant household member (highest priority pathway)":
      "家中有孕妇（最优先的途径）",
    "Children under 19 in household (CHIP-adjacent pathway)":
      "家中有 19 岁以下的孩子（与 CHIP 相关的途径）",
    "Disabled household member (SSI pathway available)":
      "家中有残障成员（可通过 SSI 途径）",
    "Citizenship or immigration status for all household members":
      "所有家庭成员的公民或移民身份",
    "Disability status (affects SSI-linked Medicaid pathway)":
      "残障情况（影响与 SSI 相关的 Medicaid 途径）",
    "Medicaid requires at least one household member to be a US citizen or qualified immigrant.":
      "Medicaid 要求至少有一名家庭成员是美国公民或合格移民。",
    "Pregnant women in most states qualify for Medicaid at up to 200% FPL.":
      "在大多数州，收入不超过 200% FPL 的孕妇都符合 Medicaid 条件。",
    "Children under 19 typically qualify at higher income levels than adults.":
      "19 岁以下儿童的收入标准通常比成年人宽松。",
    "Apply through Healthcare.gov or your state Medicaid office":
      "通过 Healthcare.gov 或您所在州的 Medicaid 办公室申请",
    "Coverage can begin the same month you apply": "保险可以在您申请的当月开始",
    "Expect a 30-45 day enrollment window": "预计办理登记需要 30-45 天",
    "Check your state's managed care plan options":
      "查看您所在州的管理式医疗计划选项",
    "Federal Pell Grant": "联邦佩尔助学金 (Pell Grant)",
    "Pell Grant": "Pell 助学金",
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.":
      "上大学的免费资金，无需偿还。适用于有经济需要的本科生。",
    "Federal tax returns or W-2 forms": "联邦报税表或 W-2 表格",
    "Driver's license (if applicable)": "驾照（如适用）",
    "Records of untaxed income": "免税收入的记录",
    "Bank statements": "银行对账单",
    "Household includes a current or prospective undergraduate student":
      "家中有在读或即将入学的本科生",
    "Family income below typical Pell Grant threshold (~$60,000)":
      "家庭收入低于 Pell 助学金的一般标准 (~$60,000)",
    "Income under $30,000 (likely qualifies for maximum Pell)":
      "收入低于 $30,000（很可能获得最高额 Pell 助学金）",
    "Household has dependent children (increases financial need)":
      "家中有受抚养子女（经济需要更大）",
    "Savings and investment balances (affects EFC calculation)":
      "储蓄和投资余额（影响资助额计算）",
    "Student enrollment status for household members": "家庭成员的在读情况",
    "Pell Grants are for current or prospective undergraduate students.":
      "Pell 助学金面向在读或即将入学的本科生。",
    "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.":
      "家庭收入可能高于 Pell 助学金的一般标准。请填写 FAFSA 确认，特殊情况也可能符合条件。",
    "Based on household income, you likely qualify for a Pell Grant.":
      "根据家庭收入，您很可能符合 Pell 助学金的条件。",
    "Complete the FAFSA at studentaid.gov": "在 studentaid.gov 填写 FAFSA",
    "FAFSA opens October 1 each year": "FAFSA 每年 10 月 1 日开放",
    "You can receive Pell Grants for up to 12 semesters":
      "您最多可以领取 12 个学期的 Pell 助学金",
    "No repayment required; this is free money": "无需偿还，这是免费的资金",
    "Housing Choice Voucher Program (Section 8)":
      "住房选择券计划（第 8 条款，Section 8）",
    "Section 8 Housing": "Section 8 住房",
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.":
      "帮助支付私人住房租金的租房券。您自己找房子，租房券支付部分房租。",
    "Photo ID for all adult household members":
      "所有成年家庭成员的带照片身份证件",
    "Birth certificates for children": "孩子的出生证明",
    "Social Security cards": "社会安全卡",
    "Proof of income (pay stubs, tax returns, benefit letters)":
      "收入证明（工资单、报税表、福利通知信）",
    "Proof of citizenship or eligible immigration status":
      "公民身份或符合条件的移民身份证明",
    "Income below 80% of Area Median Income (approximate national average)":
      "收入低于地区收入中位数 (AMI) 的 80%（按全国大致平均值）",
    "≤160% of 50% AMI (~80% AMI)": "≤50% AMI 的 160%（约 80% AMI）",
    "Household includes elderly (62+) or disabled members":
      "家中有老人（62 岁以上）或残障人士",
    "Families with children often receive preference":
      "有孩子的家庭通常会优先考虑",
    "Rent exceeds 50% of income (priority indicator)":
      "房租超过收入的 50%（优先考虑的指标）",
    "Income below 50% AMI (very low income, higher priority)":
      "收入低于 50% AMI（极低收入，更优先）",
    "Current monthly rent payment": "目前每月的房租",
    "Liquid assets (bank accounts, cash)": "流动资产（银行账户、现金）",
    "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.":
      "收入很可能超过地区收入中位数的 80%。各地的限额差别很大。",
    "You may qualify based on household income. Waitlists can be long; apply early.":
      "根据家庭收入，您可能符合条件。排队名单可能很长，请尽早申请。",
    "Contact your local Public Housing Authority (PHA)":
      "联系当地的公共住房管理局 (PHA)",
    "Waitlists are common; apply as soon as possible":
      "通常需要排队，请尽快申请",
    "Your rent is over 50% of income; mention this for possible priority":
      "您的房租超过收入的 50%，请说明这一点，可能获得优先考虑",
    "Elderly/disabled households may qualify for preference":
      "有老人或残障人士的家庭可能获得优先考虑",
    "Families with children often get preference": "有孩子的家庭通常会优先考虑",
    "Supplemental Nutrition Assistance Program (SNAP)":
      "补充营养援助计划 (SNAP)",
    "SNAP / Food Stamps": "SNAP（食品券）",
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.":
      "每月存入 EBT 卡的福利，可用来买食品。大多数超市和农贸市场都接受。",
    "Proof of income (pay stubs, tax return)": "收入证明（工资单、报税表）",
    "Proof of residency (utility bill, lease)": "居住证明（水电煤账单、租约）",
    "Social Security numbers for household members": "家庭成员的社会安全号码",
    "Bank statements (if applicable)": "银行对账单（如适用）",
    "At least one household member is a US citizen or eligible immigrant":
      "至少有一名家庭成员是美国公民或符合条件的移民",
    "Gross income below 130% of FPL (or elderly/disabled exempt)":
      "税前收入低于 FPL 的 130%（老人或残障家庭可豁免）",
    "Net income (after deductions) below 100% of FPL":
      "净收入（扣除后）低于 FPL 的 100%",
    "Household includes someone age 60+ or disabled":
      "家中有 60 岁以上或残障的成员",
    "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)":
      "流动资产低于 $2,750（有老人或残障人士的家庭为 $4,250）",
    "Liquid asset total (bank accounts, cash)":
      "流动资产总额（银行账户、现金）",
    "Monthly expenses (rent, childcare, medical) for accurate deductions":
      "每月支出（房租、托儿、医疗），用于准确计算扣除额",
    "SNAP requires at least one household member to be a US citizen or qualified immigrant.":
      "SNAP 要求至少有一名家庭成员是美国公民或合格移民。",
    "Based on your household size and income, you likely qualify for SNAP benefits.":
      "根据您的家庭人数和收入，您很可能符合 SNAP 福利的条件。",
    "Apply online through your state SNAP office":
      "通过您所在州的 SNAP 办公室在线申请",
    "Prepare income verification documents (last 30 days of pay stubs)":
      "准备收入证明文件（最近 30 天的工资单）",
    "Schedule an interview (phone or in-person)": "预约面谈（电话或当面）",
    "Bring ID, proof of residency, and Social Security numbers":
      "带上身份证件、居住证明和社会安全号码",
    "Supplemental Security Income (SSI)": "补充保障收入 (SSI)",
    SSI: "SSI",
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.":
      "为收入和资产有限的老人（65 岁以上）、盲人或残障人士提供的每月现金补助。",
    "Social Security card": "社会安全卡",
    "Birth certificate or proof of age": "出生证明或年龄证明",
    "Proof of disability (medical records)": "残障证明（病历）",
    "Proof of income and resources": "收入和资产证明",
    "Proof of living situation": "居住情况证明",
    "Household includes someone who is 65+, blind, or disabled":
      "家中有 65 岁以上、失明或残障的成员",
    "Not provided": "未提供",
    "Single individual (different limits than couples)":
      "单身个人（限额与夫妻不同）",
    "Many states add a supplement on top of federal SSI":
      "许多州会在联邦 SSI 之外再发放补助",
    "Countable resources (bank accounts, cash, investments)":
      "计入的资产（银行账户、现金、投资）",
    "SSI is for people who are 65+, blind, or disabled.":
      "SSI 适用于 65 岁以上、失明或残障人士。",
    "You may qualify based on age/disability and income level.":
      "根据年龄或残障情况以及收入水平，您可能符合条件。",
    "Apply at your local Social Security office or call 1-800-772-1213":
      "到当地的社会安全办公室申请，或拨打 1-800-772-1213",
    "Gather medical records documenting disability": "收集能证明残障情况的病历",
    "The application process can take 3-6 months": "申请过程可能需要 3-6 个月",
    "Women, Infants, and Children (WIC)": "妇女、婴儿和儿童营养计划 (WIC)",
    WIC: "WIC",
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.":
      "为孕妇、哺乳期和产后妇女以及 5 岁以下儿童提供营养援助，包括食品券、营养教育和医疗转介。",
    "Proof of pregnancy or child birth certificate": "怀孕证明或孩子的出生证明",
    "Immunization records for children": "孩子的疫苗接种记录",
    "Household includes a pregnant/postpartum woman or child under 5":
      "家中有孕妇、产后妇女或 5 岁以下儿童",
    "Household income below 185% of FPL": "家庭收入低于 FPL 的 185%",
    "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)":
      "领取 SNAP、Medicaid 或 TANF（自动符合 WIC 收入要求）",
    "Household includes infants under 1 year": "家中有 1 岁以下的婴儿",
    "Pregnancy status for household members": "家庭成员的怀孕情况",
    "WIC is for pregnant/postpartum women and children under 5.":
      "WIC 适用于孕妇、产后妇女和 5 岁以下儿童。",
    "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.":
      "收入超过 185% FPL。不过，如果您领取 SNAP、Medicaid 或 TANF，就会自动符合条件。",
    "Contact your local WIC office to schedule an appointment":
      "联系当地的 WIC 办公室预约",
    "Bring proof of income and residency": "带上收入证明和居住证明",
    "Appointments are usually available within 2 weeks":
      "通常 2 周内可以预约到",
    "CalFresh (California SNAP)": "CalFresh（加州 SNAP）",
    CalFresh: "CalFresh",
    "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.":
      "加州的 SNAP 计划，附有州政府补贴。资格范围比联邦 SNAP 更宽，包括部分大学生和移民。",
    "Proof of CA residency": "加州居住证明",
    "SSN or immigration documents": "社会安全号码或移民文件",
    "CalFresh is a California program.": "CalFresh 是加州的计划。",
    "Income exceeds California's expanded 200% FPL limit for CalFresh.":
      "收入超过加州 CalFresh 扩大后的 200% FPL 限额。",
    "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.":
      "加州已将 SNAP 资格放宽到 200% FPL。您很可能符合 CalFresh 的条件。",
    "Apply at GetCalFresh.org (takes 10 minutes)":
      "在 GetCalFresh.org 申请（只需 10 分钟）",
    "Call 1-877-847-3663 for help in your language":
      "拨打 1-877-847-3663 获取您语言的帮助",
    "CalWORKs (California Cash Aid)": "CalWORKs（加州现金援助）",
    CalWORKs: "CalWORKs",
    "Cash assistance for families with children. Includes job training, childcare, and housing support.":
      "为有孩子的家庭提供现金援助，还包括职业培训、托儿和住房支持。",
    "Children's birth certificates": "孩子的出生证明",
    "CalWORKs is a California program.": "CalWORKs 是加州的计划。",
    "CalWORKs requires children under 18 in the household.":
      "CalWORKs 要求家中有 18 岁以下的孩子。",
    "Income exceeds CalWORKs limits.": "收入超过 CalWORKs 限额。",
    "You have children and meet income requirements for CalWORKs cash aid.":
      "您有孩子，并且符合 CalWORKs 现金援助的收入要求。",
    "Apply at your county welfare office": "到您所在县的福利办公室申请",
    "Also provides childcare, job training, and transportation":
      "还提供托儿、职业培训和交通帮助",
    "Texas SNAP (Lone Star Card)": "德州 SNAP（Lone Star 卡）",
    "TX SNAP / Lone Star": "德州 SNAP / Lone Star",
    "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.":
      "德州 SNAP 福利存入 Lone Star 卡。德州没有扩大 Medicaid，所以 SNAP 可能是您最主要的福利。",
    "Proof of TX residency": "德州居住证明",
    "SSN for all applicants": "所有申请人的社会安全号码",
    "This is a Texas program.": "这是德州的计划。",
    "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).":
      "收入超过德州 SNAP 限额（广泛类别资格标准为 165% FPL）。",
    "Texas uses broad-based categorical eligibility at 165% FPL.":
      "德州采用广泛类别资格标准，上限为 165% FPL。",
    "Apply at YourTexasBenefits.com": "在 YourTexasBenefits.com 申请",
    "Texas has NO Medicaid expansion; check CHIP for children":
      "德州没有扩大 Medicaid，孩子可以看看 CHIP",
    "ACCESS Florida (FL SNAP)": "ACCESS Florida（佛州 SNAP）",
    "ACCESS Florida": "ACCESS Florida",
    "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.":
      "佛州的食品援助计划。可在网上一次申请 SNAP、Medicaid 和现金援助。",
    "Proof of FL residency": "佛州居住证明",
    SSN: "社会安全号码",
    "This is a Florida program.": "这是佛州的计划。",
    "Income exceeds Florida SNAP limits.": "收入超过佛州 SNAP 限额。",
    "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.":
      "佛州的 SNAP 采用广泛类别资格标准，上限为 200% FPL。",
    "Apply at MyFlorida.com/accessflorida":
      "在 MyFlorida.com/accessflorida 申请",
    "One application covers SNAP, Medicaid, and cash aid":
      "一份申请就可以涵盖 SNAP、Medicaid 和现金援助",
    "Florida has NO Medicaid expansion for adults":
      "佛州没有为成年人扩大 Medicaid",
    "New York SNAP": "纽约州 SNAP",
    "NY SNAP": "纽约州 SNAP",
    "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.":
      "纽约州的 SNAP 计划，由于生活成本调整较高，福利水平位居全国前列。",
    "Proof of NY residency": "纽约州居住证明",
    "Rent/utility bills": "房租或水电煤账单",
    "This is a New York program.": "这是纽约州的计划。",
    "Income exceeds NY SNAP limits (200% FPL).":
      "收入超过纽约州 SNAP 限额 (200% FPL)。",
    "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.":
      "由于生活成本较高，纽约州放宽了 SNAP 资格并提高了福利金额。",
    "Apply at mybenefits.ny.gov": "在 mybenefits.ny.gov 申请",
    "NY has expanded Medicaid; apply for both at once":
      "纽约州已扩大 Medicaid，可以同时申请两项",
    "NYC residents can also call 311": "纽约市居民也可以拨打 311",
    "Essential Plan (NY Health)": "Essential Plan（纽约州医疗）",
    "NY Essential Plan": "纽约州 Essential Plan",
    "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.":
      "纽约州的低价医疗计划，适合收入超出 Medicaid 标准、又负担不起保险市场计划的人。每月 $0-$20。",
    "Essential Plan is a New York program.": "Essential Plan 是纽约州的计划。",
    "You likely qualify for full Medicaid instead (lower income).":
      "您很可能符合完整 Medicaid 的条件（收入较低）。",
    "Income exceeds Essential Plan limits (200% FPL).":
      "收入超过 Essential Plan 限额 (200% FPL)。",
    "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.":
      "您的收入在 138-200% FPL 之间，符合 Essential Plan 的条件，每月 $0-$20。",
    "Apply at NY State of Health marketplace":
      "通过 NY State of Health 保险市场申请",
    "Plans cost $0 or $20/month with no deductible":
      "计划每月 $0 或 $20，没有自付额",
    "Covers doctor visits, prescriptions, hospital, and mental health":
      "涵盖看医生、处方药、住院和心理健康服务",
    "Pennsylvania SNAP": "宾州 SNAP",
    "PA SNAP": "宾州 SNAP",
    "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.":
      "宾州的食品援助，采用广泛类别资格标准，上限为 160% FPL。",
    "Proof of PA residency": "宾州居住证明",
    "This is a Pennsylvania program.": "这是宾州的计划。",
    "Income exceeds PA SNAP limits (160% FPL).":
      "收入超过宾州 SNAP 限额 (160% FPL)。",
    "Pennsylvania uses broad-based categorical eligibility at 160% FPL.":
      "宾州采用广泛类别资格标准，上限为 160% FPL。",
    "Apply at COMPASS.state.pa.us": "在 COMPASS.state.pa.us 申请",
    "PA has expanded Medicaid; apply for both at once":
      "宾州已扩大 Medicaid，可以同时申请两项",
    "Passed eligibility check": "通过资格审核",
    "Failed eligibility check": "未通过资格审核",
    "Detailed rule-by-rule breakdown": "逐条规则的详细说明",
    "A government-issued ID that proves who you are.":
      "能证明您身份的政府签发证件。",
    "Driver's license": "驾照",
    "State ID card": "州身份证",
    Passport: "护照",
    "Expired IDs may be accepted in some states.": "有些州接受过期的证件。",
    "Shows how much money you earn each month.": "显示您每月挣多少钱。",
    "Pay stubs (last 30 days)": "工资单（最近 30 天）",
    "Tax return": "报税表",
    "Letter from employer": "雇主出具的信函",
    "Benefit award letter": "福利批准通知信",
    "If self-employed, bring records of your earnings.":
      "如果您是自雇人士，请带上收入记录。",
    "Shows you live in the state where you are applying.":
      "证明您住在申请所在的州。",
    "Utility bill": "水电煤账单",
    "Lease agreement": "租房合同",
    "Mortgage statement": "房贷对账单",
    "Letter from landlord": "房东出具的信函",
    "For every person in your household applying for benefits.":
      "家中每位申请福利的人都需要。",
    "SSN cards": "社会安全卡",
    "SSA letter": "社会安全局 (SSA) 的信函",
    "Tax documents showing SSN": "显示社会安全号码的税务文件",
    "If someone does not have an SSN, they can still apply. The rest of the household may qualify.":
      "如果有人没有社会安全号码，仍然可以申请。家中的其他人可能符合条件。",
    "Shows your savings and checking account balances.":
      "显示您储蓄账户和支票账户的余额。",
    "Most states have eliminated the asset test for SNAP, but some still check.":
      "大多数州已取消 SNAP 的资产审查，但仍有一些州会查。",
    "Medical bills": "医疗账单",
    "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.":
      "如果家中有老人或残障人士，医疗费用可以提高您的福利金额。",
    "Keep receipts for prescriptions, doctor visits, and medical equipment.":
      "保留处方药、看医生和医疗设备的收据。",
    "Childcare expenses": "托儿费用",
    "If you pay for childcare to work or attend school, this counts as a deduction.":
      "如果您为了工作或上学而支付托儿费用，这可以算作扣除额。",
    "Daycare receipts": "托儿所收据",
    "After-school program invoices": "课后班的账单",
    "A government-issued ID for the person applying.": "申请人的政府签发证件。",
    "State ID": "州身份证",
    "Your household income for the current month.": "您家庭本月的收入。",
    "Pay stubs": "工资单",
    "Self-employment records": "自雇收入记录",
    "Shows you are a US citizen or have qualified immigration status.":
      "证明您是美国公民或有合格的移民身份。",
    "Birth certificate": "出生证明",
    "Naturalization certificate": "入籍证书",
    "Permanent resident card": "永久居民卡（绿卡）",
    "Children born in the US are citizens regardless of parents' status.":
      "在美国出生的孩子是美国公民，与父母的身份无关。",
    "Required for each person applying for coverage.":
      "每位申请保险的人都需要。",
    "Proof of pregnancy": "怀孕证明",
    "If applying based on pregnancy, a doctor's note helps speed up approval.":
      "如果是因怀孕申请，医生证明可以加快审批。",
    "Proof of disability": "残障证明",
    "If applying based on disability, medical records can help.":
      "如果是因残障申请，病历会有帮助。",
    "Doctor's letter": "医生出具的信函",
    "SSI/SSDI award letter": "SSI/SSDI 批准通知信",
    "W-2 forms": "W-2 表格",
    "From every job you worked during the tax year.":
      "来自您在该纳税年度做过的每份工作。",
    "Employers must send W-2s by January 31st each year.":
      "雇主必须在每年 1 月 31 日前寄出 W-2。",
    "For yourself, your spouse (if filing jointly), and all dependents.":
      "您本人、配偶（如合并申报）和所有受抚养人。",
    "Filing status information": "报税身份信息",
    "Whether you file as single, married, or head of household.":
      "您是以单身、已婚还是户主身份报税。",
    "Head of household often gives a bigger credit if you have dependents.":
      "如果您有受抚养人，以户主身份报税通常能拿到更多抵免。",
    "1099 forms": "1099 表格",
    "If you did freelance or gig work (Uber, DoorDash, etc.).":
      "如果您做过自由职业或零工（Uber、DoorDash 等）。",
    "Childcare provider information": "托儿服务提供者的信息",
    "Name, address, and tax ID of your childcare provider to claim additional credits.":
      "托儿服务提供者的姓名、地址和税号，用于申领额外抵免。",
    "For the parent or guardian applying.": "申请的父母或监护人的证件。",
    "Shows household income is within WIC limits.":
      "证明家庭收入在 WIC 限额以内。",
    "Benefit letters": "福利通知信",
    "Shows you live in the state.": "证明您住在该州。",
    Lease: "租约",
    "Proof of pregnancy or child": "怀孕或孩子的证明",
    "Doctor's note for pregnancy, or birth certificate for children.":
      "怀孕的医生证明，或孩子的出生证明。",
    "Pregnancy verification": "怀孕确认证明",
    "Hospital records": "医院记录",
    "Immunization records": "疫苗接种记录",
    "For children. Your WIC office may be able to look these up.":
      "孩子的记录。WIC 办公室也许可以帮您查到。",
    "Proof of other benefits": "其他福利的证明",
    "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.":
      "如果您领取 SNAP、Medicaid 或 TANF，就自动符合 WIC 的收入要求。",
    "For the head of household.": "户主的证件。",
    "For all household members.": "所有家庭成员都需要。",
    "Shows your energy costs and account number.":
      "显示您的能源费用和账户号码。",
    "Bring both heating and electric bills if they are separate.":
      "如果取暖费和电费是分开的，请两份都带上。",
    "May qualify you for priority assistance.": "可能使您获得优先援助。",
    "Disconnection notice": "停止供应通知",
    "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.":
      "如果您的水电煤即将被停，请带上通知。您可能更快获得紧急帮助。",
    "Parent/guardian photo ID": "父母或监护人的带照片身份证件",
    "Government-issued ID for the applying parent.":
      "申请人（父母）的政府签发证件。",
    "Child's birth certificate": "孩子的出生证明",
    "Proves age and citizenship.": "证明年龄和公民身份。",
    "For children being enrolled.": "需要登记的孩子都要提供。",
    "Household income documentation.": "家庭收入的证明文件。",
    "Current insurance information": "目前的保险信息",
    "If children currently have insurance that is ending.":
      "如果孩子目前的保险即将到期。",
    "Photo ID for all adults": "所有成年人的带照片身份证件",
    "Every adult household member needs a government-issued ID.":
      "每位成年家庭成员都需要政府签发的证件。",
    "Proves ages and household composition.": "证明年龄和家庭成员组成。",
    "All sources for all household members.": "所有家庭成员的全部收入来源。",
    "Tax returns": "报税表",
    "Child support documentation": "子女抚养费的证明文件",
    "Proof of citizenship/immigration": "公民或移民身份证明",
    "May be requested to verify assets.": "可能会要求提供以核实资产。",
    "Landlord reference": "房东推荐信",
    "A letter from a current or previous landlord.":
      "现任或前任房东出具的信函。",
    "Criminal background info": "犯罪背景信息",
    "Some PHAs run background checks. Be upfront about any issues.":
      "有些 PHA 会做背景调查。如有任何问题，请如实说明。",
    "Or document showing your SSN.": "或能显示您社会安全号码的文件。",
    "If applying based on age (65+).": "如果是因年龄（65 岁以上）申请。",
    "Medical records": "病历",
    "If applying based on disability: doctor's notes, hospital records, test results.":
      "如果是因残障申请：医生证明、医院记录、检查结果。",
    "The more medical evidence you provide, the stronger your application.":
      "您提供的医疗证据越多，申请就越有说服力。",
    "Pay stubs, bank statements, investment statements.":
      "工资单、银行对账单、投资对账单。",
    "Lease, mortgage statement, or letter from someone you live with.":
      "租约、房贷对账单，或同住人出具的信函。",
    "Previous work history": "以往的工作经历",
    "List of jobs for the past 15 years. This helps evaluate disability claim.":
      "过去 15 年的工作清单，有助于评估残障申请。",
    "Medications list": "用药清单",
    "All current medications with dosages.": "目前所有用药及剂量。",
    "Required for the FAFSA application.": "申请 FAFSA 时需要。",
    "Federal tax returns": "联邦报税表",
    "Your (and your parents' if dependent) most recent tax return.":
      "您最近一次的报税表（如果您是受抚养人，还需要父母的）。",
    "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.":
      "您可以使用 IRS 数据提取工具在 FAFSA 中自动填写税务信息。",
    "From all jobs during the tax year.": "来自该纳税年度的所有工作。",
    "Optional but helps verify identity.": "可选，但有助于核实身份。",
    "Child support received, veterans' benefits, etc.":
      "收到的子女抚养费、退伍军人福利等。",
    "Current savings and checking balances.": "目前储蓄和支票账户的余额。",
    "{count} child": "{count} 个孩子",
    "{count} children": "{count} 个孩子",
    "{pct}% FPL (estimated)": "{pct}% FPL（估算）",
    "${amount}/yr": "${amount}/年",
    "≤${amount}/yr": "≤${amount}/年",
    "${amount}/mo": "${amount}/月",
    "≤${amount}/mo": "≤${amount}/月",
    "Income below EITC limit for {count} qualifying children":
      "收入低于有 {count} 名符合条件子女时的 EITC 限额",
    "{age} years old": "{age} 岁",
    "{count} qualifying child": "{count} 名符合条件的子女",
    "{count} qualifying children": "{count} 名符合条件的子女",
    "{state} offers a state EITC that stacks with the federal credit":
      "{state} 州提供州 EITC，可以和联邦抵免叠加",
    "Claim the {state} state EITC on your state return":
      "在州报税表上申领 {state} 州的 EITC",
    "Income below {pct}% FPL for the {pathway} pathway":
      "收入低于 {pathway} 途径的 {pct}% FPL 标准",
    "{state} has a Medicaid pathway for childless adults":
      "{state} 州为无子女成年人提供 Medicaid 途径",
    "{state} has not expanded Medicaid": "{state} 州尚未扩大 Medicaid",
    "{state} has expanded Medicaid to {pct}% FPL":
      "{state} 州已将 Medicaid 扩大到 {pct}% FPL",
    "Check {state}-specific eligibility rules (non-expansion state)":
      "查看 {state} 州自己的资格规定（未扩大 Medicaid 的州）",
    "~{pct}% of {base}% AMI": "约为 {base}% AMI 的 {pct}%",
    "Monthly income below SSI limit (${amount})":
      "月收入低于 SSI 限额 (${amount})",
    "Countable resources below ${amount} (home and one vehicle excluded)":
      "计入的资产低于 ${amount}（不含住房和一辆车）",
    "{count} eligible member": "{count} 名符合条件的成员",
    "{count} eligible members": "{count} 名符合条件的成员",
    "{count} child may qualify for CHIP coverage.":
      "{count} 个孩子可能符合 CHIP 保险的条件。",
    "{count} children may qualify for CHIP coverage.":
      "{count} 个孩子可能符合 CHIP 保险的条件。",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.":
      "您的年收入 (${income}) 超过了有 {count} 名符合条件子女时的 EITC 限额 ${limit}。",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.":
      "您的年收入 (${income}) 超过了有 {count} 名符合条件子女时的 EITC 限额 ${limit}。",
    "You likely qualify for the EITC with {count} qualifying child.":
      "有 {count} 名符合条件的子女，您很可能符合 EITC 的条件。",
    "You likely qualify for the EITC with {count} qualifying children.":
      "有 {count} 名符合条件的子女，您很可能符合 EITC 的条件。",
    "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.":
      "有 {count} 名符合条件的子女，您很可能符合 EITC 的条件。{state} 州也提供相应的州抵免。",
    "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.":
      "有 {count} 名符合条件的子女，您很可能符合 EITC 的条件。{state} 州也提供相应的州抵免。",
    "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.":
      "您在 {state} 州可能处于 Medicaid 保障缺口。在未扩大 Medicaid 的州，无子女成年人的选择有限，请改为查看 ACA 保险市场补贴。",
    "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.":
      "您的收入 ({pct}% FPL) 高于 {pathway} 途径的 {threshold}% 标准。请查看 ACA 保险市场补贴。",
    "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.":
      "您的收入低于 {threshold}% FPL，很可能可以通过 {pathway} 途径符合条件。",
    "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.":
      "您的税前收入 ({pct}% FPL) 超过 SNAP 的 130% 标准。",
    "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.":
      "您估算的净收入 ({pct}% FPL) 超过 100% 标准。实际扣除额可能不同，请申请以确认。",
    "Monthly income (${income}) exceeds SSI limit of ${limit}.":
      "月收入 (${income}) 超过 SSI 限额 ${limit}。",
    "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.":
      "计入的资产 (${assets}) 超过 ${limit} 限额。住房和一辆车通常不计入。",
    "You have {count} eligible household member and meet income requirements.":
      "您家中有 {count} 名符合条件的成员，并且符合收入要求。",
    "You have {count} eligible household members and meet income requirements.":
      "您家中有 {count} 名符合条件的成员，并且符合收入要求。",
  },
};

const vi: ProgramsMessages = {
  shortNames: {
    snap: "SNAP (phiếu thực phẩm)",
    medicaid: "Medicaid",
    eitc: "EITC",
    wic: "WIC",
    liheap: "LIHEAP / Hỗ trợ năng lượng",
    chip: "CHIP",
    section8: "Nhà ở Section 8",
    ssi: "SSI",
    "pell-grant": "Trợ cấp Pell",
    "ca-calfresh": "CalFresh",
    "ca-calworks": "CalWORKs",
    "tx-snap": "SNAP Texas / Lone Star",
    "fl-access": "ACCESS Florida",
    "ny-snap": "SNAP New York",
    "ny-essential-plan": "Essential Plan New York",
    "pa-snap": "SNAP Pennsylvania",
  },
  pathways: {
    pregnancy: "mang thai",
    children: "trẻ em",
    "disabled or elderly": "khuyết tật hoặc cao tuổi",
    "adult expansion": "mở rộng cho người lớn",
    "adult non expansion": "người lớn không mở rộng",
  },
  text: {
    "Centers for Medicare & Medicaid Services (CMS)":
      "Trung tâm Dịch vụ Medicare & Medicaid (CMS)",
    "Internal Revenue Service (IRS)": "Sở Thuế Vụ Hoa Kỳ (IRS)",
    "U.S. Department of Education": "Bộ Giáo dục Hoa Kỳ",
    "U.S. Department of Housing and Urban Development (HUD)":
      "Bộ Gia cư và Phát triển Đô thị Hoa Kỳ (HUD)",
    "Administration for Children and Families (ACF)":
      "Cơ quan Trẻ em và Gia đình (ACF)",
    "USDA Food and Nutrition Service":
      "Cơ quan Thực phẩm và Dinh dưỡng thuộc USDA",
    "Social Security Administration (SSA)": "Sở An sinh Xã hội (SSA)",
    "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.":
      "Dành cho trẻ em trong gia đình có thu nhập từ mức giới hạn của Medicaid (khoảng 138% mức nghèo liên bang) đến khoảng 250% mức nghèo liên bang. Một số tiểu bang nâng lên 300%.",
    "50% of Area Median Income (AMI)":
      "50% thu nhập trung bình của khu vực (AMI)",
    "80% AMI in some cases": "80% AMI trong một số trường hợp",
    "Households paying >50% of income on rent may receive priority":
      "Hộ gia đình trả hơn 50% thu nhập cho tiền thuê nhà có thể được ưu tiên",
    "60% of state median income (varies by state)":
      "60% thu nhập trung bình của tiểu bang (khác nhau tùy tiểu bang)",
    "Childless adults in non-expansion states may fall into coverage gap":
      "Người lớn không có con ở các tiểu bang chưa mở rộng Medicaid có thể không đủ điều kiện cho bảo hiểm y tế nào",
    "Children's Health Insurance Program (CHIP)":
      "Chương trình Bảo hiểm Y tế cho Trẻ em (CHIP)",
    CHIP: "CHIP",
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.":
      "Bảo hiểm y tế chi phí thấp cho trẻ em trong các gia đình có thu nhập quá mức để nhận Medicaid nhưng không đủ khả năng mua bảo hiểm tư nhân.",
    "Photo ID for parent/guardian":
      "Giấy tờ tùy thân có ảnh của cha mẹ hoặc người giám hộ",
    "Child's birth certificate or Social Security number":
      "Giấy khai sinh hoặc số An sinh Xã hội của trẻ",
    "Proof of income": "Giấy tờ chứng minh thu nhập",
    "Proof of residency": "Giấy tờ chứng minh nơi cư trú",
    "Household includes children under 19":
      "Hộ gia đình có trẻ em dưới 19 tuổi",
    None: "Không có",
    Required: "Bắt buộc",
    "Income above Medicaid threshold (138% FPL)":
      "Thu nhập cao hơn ngưỡng Medicaid (138% FPL)",
    "Income below 250% of FPL (varies by state, some up to 300%)":
      "Thu nhập dưới 250% FPL (khác nhau tùy tiểu bang, một số nơi lên tới 300%)",
    "Children currently lack health insurance":
      "Trẻ em hiện chưa có bảo hiểm y tế",
    "Some states extend CHIP to 300% FPL":
      "Một số tiểu bang mở rộng CHIP tới 300% FPL",
    "Current health insurance status for children":
      "Tình trạng bảo hiểm y tế hiện tại của trẻ em",
    "CHIP is for children under 19.": "CHIP dành cho trẻ em dưới 19 tuổi.",
    "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.":
      "Con của bạn có thể đủ điều kiện nhận Medicaid (chi phí thấp hơn). Hãy xem Medicaid trước.",
    "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.":
      "Thu nhập có thể vượt giới hạn CHIP ở hầu hết các tiểu bang. Một số tiểu bang cho phép tới 300% FPL; hãy kiểm tra với tiểu bang của bạn.",
    "Apply through Healthcare.gov or your state CHIP program":
      "Nộp đơn qua Healthcare.gov hoặc chương trình CHIP của tiểu bang bạn",
    "Coverage often starts immediately once approved":
      "Bảo hiểm thường có hiệu lực ngay sau khi được duyệt",
    "Premiums are very low or free depending on income":
      "Phí bảo hiểm rất thấp hoặc miễn phí tùy theo thu nhập",
    "Earned Income Tax Credit (EITC)": "Tín thuế Thu nhập Kiếm được (EITC)",
    EITC: "EITC",
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.":
      "Khoản tín thuế dành cho người đi làm có thu nhập thấp đến trung bình. Bạn có thể được nhận tiền hoàn lại ngay cả khi không nợ thuế.",
    "W-2 forms from all employers": "Mẫu W-2 từ tất cả các chủ lao động",
    "Social Security numbers for you and dependents":
      "Số An sinh Xã hội của bạn và những người phụ thuộc",
    "Valid filing status information":
      "Thông tin hợp lệ về tình trạng khai thuế",
    "Tax return (filed or to be filed)": "Tờ khai thuế (đã nộp hoặc sắp nộp)",
    "Has earned income (wages, salary, or self-employment)":
      "Có thu nhập từ làm việc (tiền công, lương hoặc tự kinh doanh)",
    "Must be > $0": "Phải lớn hơn $0",
    "Filer age 25-64 (or has qualifying children)":
      "Người khai thuế từ 25-64 tuổi (hoặc có con đủ điều kiện)",
    "Any age": "Mọi độ tuổi",
    "Investment income below $11,600 (2025)":
      "Thu nhập đầu tư dưới $11,600 (2025)",
    "Income qualifies for IRS Free File (<$84,000)":
      "Thu nhập đủ điều kiện dùng IRS Free File (<$84,000)",
    "Investment income (dividends, interest, capital gains)":
      "Thu nhập đầu tư (cổ tức, tiền lãi, lãi vốn)",
    "Tax filing status (single, MFJ, HOH, MFS)":
      "Tình trạng khai thuế (độc thân, vợ chồng khai chung, chủ hộ, vợ chồng khai riêng)",
    "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.":
      "EITC yêu cầu có thu nhập từ tiền công, lương hoặc tự kinh doanh. Nếu bạn có thu nhập tiền mặt chưa khai báo, khoản đó vẫn được tính khi bạn khai thuế.",
    "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.":
      "Nếu không có con đủ điều kiện, EITC yêu cầu người khai thuế từ 25 đến 64 tuổi.",
    "File a federal tax return to claim the credit":
      "Nộp tờ khai thuế liên bang để nhận khoản tín thuế này",
    "Use IRS Free File; it's actually free":
      "Dùng IRS Free File; thực sự miễn phí",
    "Use your preferred tax software or a CPA":
      "Dùng phần mềm khai thuế bạn quen dùng hoặc nhờ kế toán viên (CPA)",
    "Check if your state has added a state EITC recently":
      "Kiểm tra xem tiểu bang của bạn gần đây có thêm EITC cấp tiểu bang không",
    "The credit is refundable; you can get money back even if you owe $0 in taxes":
      "Khoản tín thuế này có thể hoàn lại; bạn vẫn nhận được tiền dù nợ thuế $0",
    "Low Income Home Energy Assistance Program (LIHEAP)":
      "Chương trình Hỗ trợ Năng lượng cho Hộ Gia đình Thu nhập Thấp (LIHEAP)",
    "LIHEAP / Energy Assistance": "LIHEAP / Hỗ trợ năng lượng",
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.":
      "Giúp trả hóa đơn sưởi ấm và làm mát. Cũng có thể hỗ trợ cách nhiệt nhà và sửa chữa liên quan đến năng lượng.",
    "Photo ID": "Giấy tờ tùy thân có ảnh",
    "Proof of income for all household members":
      "Giấy tờ chứng minh thu nhập của tất cả thành viên trong hộ",
    "Recent utility bill": "Hóa đơn tiện ích gần đây",
    "Social Security numbers": "Số An sinh Xã hội",
    "Household income below 150% of FPL (some states use higher thresholds)":
      "Thu nhập hộ gia đình dưới 150% FPL (một số tiểu bang dùng ngưỡng cao hơn)",
    "Household includes elderly (60+) or disabled members":
      "Hộ gia đình có người cao tuổi (60+) hoặc người khuyết tật",
    "Household includes children under 18":
      "Hộ gia đình có trẻ em dưới 18 tuổi",
    "Energy costs are a significant share of income":
      "Chi phí năng lượng chiếm phần đáng kể trong thu nhập",
    "Monthly utility and energy expenses":
      "Chi phí tiện ích và năng lượng hằng tháng",
    "Income exceeds 150% FPL. Some states use higher thresholds; check your state.":
      "Thu nhập vượt quá 150% FPL. Một số tiểu bang dùng ngưỡng cao hơn; hãy kiểm tra với tiểu bang của bạn.",
    "You qualify and may receive priority as a household with elderly or disabled members.":
      "Bạn đủ điều kiện và có thể được ưu tiên vì hộ có người cao tuổi hoặc người khuyết tật.",
    "Your income is within LIHEAP limits for your household size.":
      "Thu nhập của bạn nằm trong giới hạn LIHEAP theo số người trong hộ.",
    "Apply through your local Community Action Agency":
      "Nộp đơn qua Cơ quan Hành động Cộng đồng (Community Action Agency) tại địa phương",
    "Apply before winter heating season for best chances":
      "Nộp đơn trước mùa sưởi ấm mùa đông để có cơ hội tốt nhất",
    "Mention elderly/disabled status; you may get priority":
      "Hãy nêu rõ có người cao tuổi hoặc khuyết tật; bạn có thể được ưu tiên",
    Medicaid: "Medicaid",
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.":
      "Bảo hiểm y tế miễn phí hoặc chi phí thấp cho người lớn thu nhập thấp, trẻ em, phụ nữ mang thai, người cao tuổi và người khuyết tật.",
    "Social Security number": "Số An sinh Xã hội",
    "Proof of citizenship or immigration status":
      "Giấy tờ chứng minh quốc tịch hoặc tình trạng di trú",
    "At least one household member is a US citizen or qualified immigrant":
      "Ít nhất một thành viên trong hộ là công dân Hoa Kỳ hoặc người nhập cư đủ điều kiện",
    Yes: "Có",
    No: "Không",
    "Not applicable (user qualifies via another pathway)":
      "Không áp dụng (đủ điều kiện theo diện khác)",
    "Has alternate pathway": "Có diện đủ điều kiện khác",
    "Required for childless adult eligibility":
      "Bắt buộc để người lớn không có con đủ điều kiện",
    "Pregnant household member (highest priority pathway)":
      "Có thành viên mang thai trong hộ (diện ưu tiên cao nhất)",
    "Children under 19 in household (CHIP-adjacent pathway)":
      "Có trẻ em dưới 19 tuổi trong hộ (diện liên quan đến CHIP)",
    "Disabled household member (SSI pathway available)":
      "Có thành viên khuyết tật trong hộ (có diện SSI)",
    "Citizenship or immigration status for all household members":
      "Quốc tịch hoặc tình trạng di trú của tất cả thành viên trong hộ",
    "Disability status (affects SSI-linked Medicaid pathway)":
      "Tình trạng khuyết tật (ảnh hưởng đến diện Medicaid liên quan đến SSI)",
    "Medicaid requires at least one household member to be a US citizen or qualified immigrant.":
      "Medicaid yêu cầu ít nhất một thành viên trong hộ là công dân Hoa Kỳ hoặc người nhập cư đủ điều kiện.",
    "Pregnant women in most states qualify for Medicaid at up to 200% FPL.":
      "Ở hầu hết các tiểu bang, phụ nữ mang thai có thu nhập tới 200% FPL đủ điều kiện nhận Medicaid.",
    "Children under 19 typically qualify at higher income levels than adults.":
      "Trẻ em dưới 19 tuổi thường đủ điều kiện ở mức thu nhập cao hơn người lớn.",
    "Apply through Healthcare.gov or your state Medicaid office":
      "Nộp đơn qua Healthcare.gov hoặc văn phòng Medicaid của tiểu bang",
    "Coverage can begin the same month you apply":
      "Bảo hiểm có thể bắt đầu ngay trong tháng bạn nộp đơn",
    "Expect a 30-45 day enrollment window":
      "Dự kiến thời gian ghi danh là 30-45 ngày",
    "Check your state's managed care plan options":
      "Xem các lựa chọn chương trình chăm sóc có quản lý của tiểu bang",
    "Federal Pell Grant": "Trợ cấp Pell Liên bang",
    "Pell Grant": "Trợ cấp Pell",
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.":
      "Tiền miễn phí để học đại học, không cần hoàn trả. Dành cho sinh viên đại học có nhu cầu tài chính.",
    "Federal tax returns or W-2 forms": "Tờ khai thuế liên bang hoặc mẫu W-2",
    "Driver's license (if applicable)": "Bằng lái xe (nếu có)",
    "Records of untaxed income": "Hồ sơ thu nhập không chịu thuế",
    "Bank statements": "Sao kê ngân hàng",
    "Household includes a current or prospective undergraduate student":
      "Hộ gia đình có sinh viên đại học hiện tại hoặc sắp nhập học",
    "Family income below typical Pell Grant threshold (~$60,000)":
      "Thu nhập gia đình dưới ngưỡng thông thường của Trợ cấp Pell (~$60,000)",
    "Income under $30,000 (likely qualifies for maximum Pell)":
      "Thu nhập dưới $30,000 (có thể đủ điều kiện nhận Pell tối đa)",
    "Household has dependent children (increases financial need)":
      "Hộ gia đình có con phụ thuộc (tăng nhu cầu tài chính)",
    "Savings and investment balances (affects EFC calculation)":
      "Số dư tiết kiệm và đầu tư (ảnh hưởng đến cách tính hỗ trợ)",
    "Student enrollment status for household members":
      "Tình trạng ghi danh học của các thành viên trong hộ",
    "Pell Grants are for current or prospective undergraduate students.":
      "Trợ cấp Pell dành cho sinh viên đại học hiện tại hoặc sắp nhập học.",
    "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.":
      "Thu nhập gia đình có thể cao hơn ngưỡng thông thường của Trợ cấp Pell. Hãy nộp FAFSA để kiểm tra; một số hoàn cảnh đặc biệt vẫn có thể đủ điều kiện.",
    "Based on household income, you likely qualify for a Pell Grant.":
      "Dựa trên thu nhập hộ gia đình, bạn có thể đủ điều kiện nhận Trợ cấp Pell.",
    "Complete the FAFSA at studentaid.gov": "Hoàn tất FAFSA tại studentaid.gov",
    "FAFSA opens October 1 each year": "FAFSA mở vào ngày 1 tháng 10 hằng năm",
    "You can receive Pell Grants for up to 12 semesters":
      "Bạn có thể nhận Trợ cấp Pell tối đa 12 học kỳ",
    "No repayment required; this is free money":
      "Không cần hoàn trả; đây là tiền miễn phí",
    "Housing Choice Voucher Program (Section 8)":
      "Chương trình Phiếu Chọn Nhà ở (Section 8)",
    "Section 8 Housing": "Nhà ở Section 8",
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.":
      "Phiếu hỗ trợ trả tiền thuê nhà tư nhân. Bạn tự tìm căn hộ, và phiếu sẽ trả một phần tiền thuê.",
    "Photo ID for all adult household members":
      "Giấy tờ tùy thân có ảnh của tất cả người lớn trong hộ",
    "Birth certificates for children": "Giấy khai sinh của trẻ em",
    "Social Security cards": "Thẻ An sinh Xã hội",
    "Proof of income (pay stubs, tax returns, benefit letters)":
      "Giấy tờ chứng minh thu nhập (cuống lương, tờ khai thuế, thư trợ cấp)",
    "Proof of citizenship or eligible immigration status":
      "Giấy tờ chứng minh quốc tịch hoặc tình trạng di trú đủ điều kiện",
    "Income below 80% of Area Median Income (approximate national average)":
      "Thu nhập dưới 80% thu nhập trung bình của khu vực (ước tính theo trung bình toàn quốc)",
    "≤160% of 50% AMI (~80% AMI)": "≤160% của 50% AMI (~80% AMI)",
    "Household includes elderly (62+) or disabled members":
      "Hộ gia đình có người cao tuổi (62+) hoặc người khuyết tật",
    "Families with children often receive preference":
      "Gia đình có trẻ em thường được ưu tiên",
    "Rent exceeds 50% of income (priority indicator)":
      "Tiền thuê nhà vượt quá 50% thu nhập (dấu hiệu được ưu tiên)",
    "Income below 50% AMI (very low income, higher priority)":
      "Thu nhập dưới 50% AMI (thu nhập rất thấp, ưu tiên cao hơn)",
    "Current monthly rent payment": "Tiền thuê nhà hằng tháng hiện tại",
    "Liquid assets (bank accounts, cash)":
      "Tài sản thanh khoản (tài khoản ngân hàng, tiền mặt)",
    "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.":
      "Thu nhập có thể vượt quá 80% thu nhập trung bình của khu vực. Giới hạn khác nhau nhiều tùy nơi.",
    "You may qualify based on household income. Waitlists can be long; apply early.":
      "Bạn có thể đủ điều kiện dựa trên thu nhập hộ gia đình. Danh sách chờ có thể dài; hãy nộp đơn sớm.",
    "Contact your local Public Housing Authority (PHA)":
      "Liên hệ Cơ quan Nhà ở Công cộng (PHA) tại địa phương",
    "Waitlists are common; apply as soon as possible":
      "Danh sách chờ là chuyện thường gặp; hãy nộp đơn càng sớm càng tốt",
    "Your rent is over 50% of income; mention this for possible priority":
      "Tiền thuê nhà của bạn trên 50% thu nhập; hãy nêu điều này để có thể được ưu tiên",
    "Elderly/disabled households may qualify for preference":
      "Hộ có người cao tuổi hoặc khuyết tật có thể được ưu tiên",
    "Families with children often get preference":
      "Gia đình có trẻ em thường được ưu tiên",
    "Supplemental Nutrition Assistance Program (SNAP)":
      "Chương trình Hỗ trợ Dinh dưỡng Bổ sung (SNAP)",
    "SNAP / Food Stamps": "SNAP (phiếu thực phẩm)",
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.":
      "Trợ cấp hằng tháng nạp vào thẻ EBT để mua thực phẩm. Được chấp nhận ở hầu hết cửa hàng tạp hóa và chợ nông sản.",
    "Proof of income (pay stubs, tax return)":
      "Giấy tờ chứng minh thu nhập (cuống lương, tờ khai thuế)",
    "Proof of residency (utility bill, lease)":
      "Giấy tờ chứng minh nơi cư trú (hóa đơn tiện ích, hợp đồng thuê nhà)",
    "Social Security numbers for household members":
      "Số An sinh Xã hội của các thành viên trong hộ",
    "Bank statements (if applicable)": "Sao kê ngân hàng (nếu có)",
    "At least one household member is a US citizen or eligible immigrant":
      "Ít nhất một thành viên trong hộ là công dân Hoa Kỳ hoặc người nhập cư đủ điều kiện",
    "Gross income below 130% of FPL (or elderly/disabled exempt)":
      "Tổng thu nhập dưới 130% FPL (hoặc được miễn nếu là người cao tuổi/khuyết tật)",
    "Net income (after deductions) below 100% of FPL":
      "Thu nhập ròng (sau khấu trừ) dưới 100% FPL",
    "Household includes someone age 60+ or disabled":
      "Hộ gia đình có người từ 60 tuổi trở lên hoặc người khuyết tật",
    "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)":
      "Tài sản thanh khoản dưới $2,750 (hoặc $4,250 với hộ có người cao tuổi/khuyết tật)",
    "Liquid asset total (bank accounts, cash)":
      "Tổng tài sản thanh khoản (tài khoản ngân hàng, tiền mặt)",
    "Monthly expenses (rent, childcare, medical) for accurate deductions":
      "Chi phí hằng tháng (tiền thuê nhà, giữ trẻ, y tế) để tính khấu trừ chính xác",
    "SNAP requires at least one household member to be a US citizen or qualified immigrant.":
      "SNAP yêu cầu ít nhất một thành viên trong hộ là công dân Hoa Kỳ hoặc người nhập cư đủ điều kiện.",
    "Based on your household size and income, you likely qualify for SNAP benefits.":
      "Dựa trên số người và thu nhập của hộ, bạn có thể đủ điều kiện nhận trợ cấp SNAP.",
    "Apply online through your state SNAP office":
      "Nộp đơn trực tuyến qua văn phòng SNAP của tiểu bang",
    "Prepare income verification documents (last 30 days of pay stubs)":
      "Chuẩn bị giấy tờ xác minh thu nhập (cuống lương 30 ngày gần nhất)",
    "Schedule an interview (phone or in-person)":
      "Đặt lịch phỏng vấn (qua điện thoại hoặc trực tiếp)",
    "Bring ID, proof of residency, and Social Security numbers":
      "Mang theo giấy tờ tùy thân, giấy tờ chứng minh nơi cư trú và số An sinh Xã hội",
    "Supplemental Security Income (SSI)": "Thu nhập An sinh Bổ sung (SSI)",
    SSI: "SSI",
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.":
      "Khoản tiền mặt hằng tháng cho người cao tuổi (65+), người mù hoặc người khuyết tật có thu nhập và tài sản hạn chế.",
    "Social Security card": "Thẻ An sinh Xã hội",
    "Birth certificate or proof of age":
      "Giấy khai sinh hoặc giấy tờ chứng minh tuổi",
    "Proof of disability (medical records)":
      "Giấy tờ chứng minh khuyết tật (hồ sơ y tế)",
    "Proof of income and resources": "Giấy tờ chứng minh thu nhập và tài sản",
    "Proof of living situation": "Giấy tờ chứng minh hoàn cảnh sinh sống",
    "Household includes someone who is 65+, blind, or disabled":
      "Hộ gia đình có người từ 65 tuổi trở lên, người mù hoặc người khuyết tật",
    "Not provided": "Chưa cung cấp",
    "Single individual (different limits than couples)":
      "Người độc thân (giới hạn khác với vợ chồng)",
    "Many states add a supplement on top of federal SSI":
      "Nhiều tiểu bang trả thêm khoản bổ sung ngoài SSI liên bang",
    "Countable resources (bank accounts, cash, investments)":
      "Tài sản được tính (tài khoản ngân hàng, tiền mặt, đầu tư)",
    "SSI is for people who are 65+, blind, or disabled.":
      "SSI dành cho người từ 65 tuổi trở lên, người mù hoặc người khuyết tật.",
    "You may qualify based on age/disability and income level.":
      "Bạn có thể đủ điều kiện dựa trên tuổi hoặc tình trạng khuyết tật và mức thu nhập.",
    "Apply at your local Social Security office or call 1-800-772-1213":
      "Nộp đơn tại văn phòng An sinh Xã hội địa phương hoặc gọi 1-800-772-1213",
    "Gather medical records documenting disability":
      "Thu thập hồ sơ y tế chứng minh tình trạng khuyết tật",
    "The application process can take 3-6 months":
      "Quá trình xét đơn có thể mất 3-6 tháng",
    "Women, Infants, and Children (WIC)": "Phụ nữ, Trẻ sơ sinh và Trẻ em (WIC)",
    WIC: "WIC",
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.":
      "Hỗ trợ dinh dưỡng cho phụ nữ mang thai, đang cho con bú, sau sinh và trẻ em dưới 5 tuổi. Cung cấp phiếu thực phẩm, hướng dẫn dinh dưỡng và giới thiệu dịch vụ y tế.",
    "Proof of pregnancy or child birth certificate":
      "Giấy xác nhận mang thai hoặc giấy khai sinh của trẻ",
    "Immunization records for children": "Hồ sơ tiêm chủng của trẻ em",
    "Household includes a pregnant/postpartum woman or child under 5":
      "Hộ gia đình có phụ nữ mang thai/sau sinh hoặc trẻ em dưới 5 tuổi",
    "Household income below 185% of FPL": "Thu nhập hộ gia đình dưới 185% FPL",
    "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)":
      "Đang nhận SNAP, Medicaid hoặc TANF (tự động đạt yêu cầu thu nhập của WIC)",
    "Household includes infants under 1 year":
      "Hộ gia đình có trẻ sơ sinh dưới 1 tuổi",
    "Pregnancy status for household members":
      "Tình trạng mang thai của các thành viên trong hộ",
    "WIC is for pregnant/postpartum women and children under 5.":
      "WIC dành cho phụ nữ mang thai/sau sinh và trẻ em dưới 5 tuổi.",
    "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.":
      "Thu nhập vượt quá 185% FPL. Tuy nhiên, nếu bạn đang nhận SNAP, Medicaid hoặc TANF, bạn sẽ tự động đủ điều kiện.",
    "Contact your local WIC office to schedule an appointment":
      "Liên hệ văn phòng WIC địa phương để đặt lịch hẹn",
    "Bring proof of income and residency":
      "Mang theo giấy tờ chứng minh thu nhập và nơi cư trú",
    "Appointments are usually available within 2 weeks":
      "Thường có lịch hẹn trong vòng 2 tuần",
    "CalFresh (California SNAP)": "CalFresh (SNAP của California)",
    CalFresh: "CalFresh",
    "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.":
      "Chương trình SNAP của California có thêm trợ cấp của tiểu bang. Điều kiện rộng hơn SNAP liên bang; bao gồm một số sinh viên đại học và người nhập cư.",
    "Proof of CA residency": "Giấy tờ chứng minh cư trú tại California",
    "SSN or immigration documents": "Số An sinh Xã hội hoặc giấy tờ di trú",
    "CalFresh is a California program.":
      "CalFresh là chương trình của California.",
    "Income exceeds California's expanded 200% FPL limit for CalFresh.":
      "Thu nhập vượt giới hạn mở rộng 200% FPL của California cho CalFresh.",
    "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.":
      "California đã mở rộng điều kiện SNAP lên 200% FPL. Bạn có thể đủ điều kiện nhận CalFresh.",
    "Apply at GetCalFresh.org (takes 10 minutes)":
      "Nộp đơn tại GetCalFresh.org (mất 10 phút)",
    "Call 1-877-847-3663 for help in your language":
      "Gọi 1-877-847-3663 để được hỗ trợ bằng ngôn ngữ của bạn",
    "CalWORKs (California Cash Aid)":
      "CalWORKs (Trợ cấp tiền mặt của California)",
    CalWORKs: "CalWORKs",
    "Cash assistance for families with children. Includes job training, childcare, and housing support.":
      "Trợ cấp tiền mặt cho gia đình có trẻ em. Bao gồm đào tạo nghề, giữ trẻ và hỗ trợ nhà ở.",
    "Children's birth certificates": "Giấy khai sinh của trẻ em",
    "CalWORKs is a California program.":
      "CalWORKs là chương trình của California.",
    "CalWORKs requires children under 18 in the household.":
      "CalWORKs yêu cầu hộ gia đình có trẻ em dưới 18 tuổi.",
    "Income exceeds CalWORKs limits.": "Thu nhập vượt giới hạn của CalWORKs.",
    "You have children and meet income requirements for CalWORKs cash aid.":
      "Bạn có con và đáp ứng yêu cầu thu nhập để nhận trợ cấp tiền mặt CalWORKs.",
    "Apply at your county welfare office":
      "Nộp đơn tại văn phòng phúc lợi của quận",
    "Also provides childcare, job training, and transportation":
      "Còn hỗ trợ giữ trẻ, đào tạo nghề và đi lại",
    "Texas SNAP (Lone Star Card)": "SNAP Texas (thẻ Lone Star)",
    "TX SNAP / Lone Star": "SNAP Texas / Lone Star",
    "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.":
      "Trợ cấp SNAP Texas được nạp vào thẻ Lone Star. Texas KHÔNG mở rộng Medicaid, nên SNAP có thể là trợ cấp chính của bạn.",
    "Proof of TX residency": "Giấy tờ chứng minh cư trú tại Texas",
    "SSN for all applicants": "Số An sinh Xã hội của tất cả người nộp đơn",
    "This is a Texas program.": "Đây là chương trình của Texas.",
    "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).":
      "Thu nhập vượt giới hạn SNAP Texas (165% FPL theo diện đủ điều kiện mở rộng).",
    "Texas uses broad-based categorical eligibility at 165% FPL.":
      "Texas áp dụng diện đủ điều kiện mở rộng ở mức 165% FPL.",
    "Apply at YourTexasBenefits.com": "Nộp đơn tại YourTexasBenefits.com",
    "Texas has NO Medicaid expansion; check CHIP for children":
      "Texas KHÔNG mở rộng Medicaid; hãy xem CHIP cho trẻ em",
    "ACCESS Florida (FL SNAP)": "ACCESS Florida (SNAP Florida)",
    "ACCESS Florida": "ACCESS Florida",
    "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.":
      "Chương trình hỗ trợ thực phẩm của Florida. Nộp đơn trực tuyến cho SNAP, Medicaid và trợ cấp tiền mặt cùng một lúc.",
    "Proof of FL residency": "Giấy tờ chứng minh cư trú tại Florida",
    SSN: "Số An sinh Xã hội",
    "This is a Florida program.": "Đây là chương trình của Florida.",
    "Income exceeds Florida SNAP limits.":
      "Thu nhập vượt giới hạn SNAP Florida.",
    "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.":
      "Florida áp dụng diện đủ điều kiện mở rộng ở mức 200% FPL cho SNAP.",
    "Apply at MyFlorida.com/accessflorida":
      "Nộp đơn tại MyFlorida.com/accessflorida",
    "One application covers SNAP, Medicaid, and cash aid":
      "Một đơn duy nhất cho cả SNAP, Medicaid và trợ cấp tiền mặt",
    "Florida has NO Medicaid expansion for adults":
      "Florida KHÔNG mở rộng Medicaid cho người lớn",
    "New York SNAP": "SNAP New York",
    "NY SNAP": "SNAP New York",
    "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.":
      "Chương trình SNAP của New York, có mức trợ cấp thuộc hàng cao nhất cả nước nhờ điều chỉnh theo chi phí sinh hoạt cao.",
    "Proof of NY residency": "Giấy tờ chứng minh cư trú tại New York",
    "Rent/utility bills": "Hóa đơn tiền thuê nhà/tiện ích",
    "This is a New York program.": "Đây là chương trình của New York.",
    "Income exceeds NY SNAP limits (200% FPL).":
      "Thu nhập vượt giới hạn SNAP New York (200% FPL).",
    "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.":
      "New York đã mở rộng điều kiện SNAP và có mức trợ cấp cao hơn do chi phí sinh hoạt.",
    "Apply at mybenefits.ny.gov": "Nộp đơn tại mybenefits.ny.gov",
    "NY has expanded Medicaid; apply for both at once":
      "New York đã mở rộng Medicaid; hãy nộp đơn cho cả hai cùng lúc",
    "NYC residents can also call 311":
      "Cư dân Thành phố New York cũng có thể gọi 311",
    "Essential Plan (NY Health)": "Essential Plan (Y tế New York)",
    "NY Essential Plan": "Essential Plan New York",
    "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.":
      "Chương trình y tế chi phí thấp của New York cho người có thu nhập quá mức để nhận Medicaid nhưng không đủ khả năng mua bảo hiểm trên thị trường. $0-$20/tháng.",
    "Essential Plan is a New York program.":
      "Essential Plan là chương trình của New York.",
    "You likely qualify for full Medicaid instead (lower income).":
      "Bạn có thể đủ điều kiện nhận Medicaid đầy đủ thay vào đó (thu nhập thấp hơn).",
    "Income exceeds Essential Plan limits (200% FPL).":
      "Thu nhập vượt giới hạn Essential Plan (200% FPL).",
    "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.":
      "Thu nhập của bạn trong khoảng 138-200% FPL; bạn đủ điều kiện nhận Essential Plan với giá $0-$20/tháng.",
    "Apply at NY State of Health marketplace":
      "Nộp đơn tại thị trường bảo hiểm NY State of Health",
    "Plans cost $0 or $20/month with no deductible":
      "Gói bảo hiểm có giá $0 hoặc $20/tháng, không có khoản khấu trừ",
    "Covers doctor visits, prescriptions, hospital, and mental health":
      "Chi trả khám bác sĩ, thuốc theo toa, bệnh viện và sức khỏe tâm thần",
    "Pennsylvania SNAP": "SNAP Pennsylvania",
    "PA SNAP": "SNAP Pennsylvania",
    "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.":
      "Hỗ trợ thực phẩm của Pennsylvania, áp dụng diện đủ điều kiện mở rộng ở mức 160% FPL.",
    "Proof of PA residency": "Giấy tờ chứng minh cư trú tại Pennsylvania",
    "This is a Pennsylvania program.": "Đây là chương trình của Pennsylvania.",
    "Income exceeds PA SNAP limits (160% FPL).":
      "Thu nhập vượt giới hạn SNAP Pennsylvania (160% FPL).",
    "Pennsylvania uses broad-based categorical eligibility at 160% FPL.":
      "Pennsylvania áp dụng diện đủ điều kiện mở rộng ở mức 160% FPL.",
    "Apply at COMPASS.state.pa.us": "Nộp đơn tại COMPASS.state.pa.us",
    "PA has expanded Medicaid; apply for both at once":
      "Pennsylvania đã mở rộng Medicaid; hãy nộp đơn cho cả hai cùng lúc",
    "Passed eligibility check": "Đạt kiểm tra điều kiện",
    "Failed eligibility check": "Không đạt kiểm tra điều kiện",
    "Detailed rule-by-rule breakdown": "Phân tích chi tiết từng quy tắc",
    "A government-issued ID that proves who you are.":
      "Giấy tờ tùy thân do chính phủ cấp để chứng minh bạn là ai.",
    "Driver's license": "Bằng lái xe",
    "State ID card": "Thẻ căn cước tiểu bang",
    Passport: "Hộ chiếu",
    "Expired IDs may be accepted in some states.":
      "Một số tiểu bang có thể chấp nhận giấy tờ đã hết hạn.",
    "Shows how much money you earn each month.":
      "Cho biết mỗi tháng bạn kiếm được bao nhiêu tiền.",
    "Pay stubs (last 30 days)": "Cuống lương (30 ngày gần nhất)",
    "Tax return": "Tờ khai thuế",
    "Letter from employer": "Thư của chủ lao động",
    "Benefit award letter": "Thư chấp thuận trợ cấp",
    "If self-employed, bring records of your earnings.":
      "Nếu bạn tự kinh doanh, hãy mang theo hồ sơ thu nhập.",
    "Shows you live in the state where you are applying.":
      "Chứng minh bạn sống tại tiểu bang nơi bạn nộp đơn.",
    "Utility bill": "Hóa đơn tiện ích",
    "Lease agreement": "Hợp đồng thuê nhà",
    "Mortgage statement": "Bảng sao kê thế chấp nhà",
    "Letter from landlord": "Thư của chủ nhà",
    "For every person in your household applying for benefits.":
      "Cho mỗi người trong hộ đang xin trợ cấp.",
    "SSN cards": "Thẻ An sinh Xã hội",
    "SSA letter": "Thư của Sở An sinh Xã hội (SSA)",
    "Tax documents showing SSN": "Giấy tờ thuế có ghi số An sinh Xã hội",
    "If someone does not have an SSN, they can still apply. The rest of the household may qualify.":
      "Nếu ai đó không có số An sinh Xã hội, họ vẫn có thể nộp đơn. Những người còn lại trong hộ có thể đủ điều kiện.",
    "Shows your savings and checking account balances.":
      "Cho biết số dư tài khoản tiết kiệm và tài khoản thanh toán của bạn.",
    "Most states have eliminated the asset test for SNAP, but some still check.":
      "Hầu hết các tiểu bang đã bỏ việc xét tài sản cho SNAP, nhưng một số nơi vẫn kiểm tra.",
    "Medical bills": "Hóa đơn y tế",
    "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.":
      "Nếu trong hộ có người cao tuổi hoặc khuyết tật, chi phí y tế có thể giúp tăng trợ cấp của bạn.",
    "Keep receipts for prescriptions, doctor visits, and medical equipment.":
      "Giữ lại biên lai thuốc theo toa, khám bác sĩ và thiết bị y tế.",
    "Childcare expenses": "Chi phí giữ trẻ",
    "If you pay for childcare to work or attend school, this counts as a deduction.":
      "Nếu bạn trả tiền giữ trẻ để đi làm hoặc đi học, khoản này được tính là khấu trừ.",
    "Daycare receipts": "Biên lai nhà trẻ",
    "After-school program invoices": "Hóa đơn chương trình sau giờ học",
    "A government-issued ID for the person applying.":
      "Giấy tờ tùy thân do chính phủ cấp của người nộp đơn.",
    "State ID": "Thẻ căn cước tiểu bang",
    "Your household income for the current month.":
      "Thu nhập hộ gia đình của bạn trong tháng hiện tại.",
    "Pay stubs": "Cuống lương",
    "Self-employment records": "Hồ sơ tự kinh doanh",
    "Shows you are a US citizen or have qualified immigration status.":
      "Chứng minh bạn là công dân Hoa Kỳ hoặc có tình trạng di trú đủ điều kiện.",
    "Birth certificate": "Giấy khai sinh",
    "Naturalization certificate": "Giấy chứng nhận nhập tịch",
    "Permanent resident card": "Thẻ thường trú nhân",
    "Children born in the US are citizens regardless of parents' status.":
      "Trẻ em sinh ra tại Hoa Kỳ là công dân, bất kể tình trạng của cha mẹ.",
    "Required for each person applying for coverage.":
      "Bắt buộc cho mỗi người xin bảo hiểm.",
    "Proof of pregnancy": "Giấy xác nhận mang thai",
    "If applying based on pregnancy, a doctor's note helps speed up approval.":
      "Nếu nộp đơn vì mang thai, giấy của bác sĩ giúp được duyệt nhanh hơn.",
    "Proof of disability": "Giấy tờ chứng minh khuyết tật",
    "If applying based on disability, medical records can help.":
      "Nếu nộp đơn vì khuyết tật, hồ sơ y tế có thể giúp ích.",
    "Doctor's letter": "Thư của bác sĩ",
    "SSI/SSDI award letter": "Thư chấp thuận SSI/SSDI",
    "W-2 forms": "Mẫu W-2",
    "From every job you worked during the tax year.":
      "Từ mọi công việc bạn đã làm trong năm tính thuế.",
    "Employers must send W-2s by January 31st each year.":
      "Chủ lao động phải gửi mẫu W-2 trước ngày 31 tháng 1 hằng năm.",
    "For yourself, your spouse (if filing jointly), and all dependents.":
      "Của bạn, vợ/chồng (nếu khai chung) và tất cả người phụ thuộc.",
    "Filing status information": "Thông tin về tình trạng khai thuế",
    "Whether you file as single, married, or head of household.":
      "Bạn khai thuế với tư cách độc thân, đã kết hôn hay chủ hộ.",
    "Head of household often gives a bigger credit if you have dependents.":
      "Khai với tư cách chủ hộ thường được tín thuế cao hơn nếu bạn có người phụ thuộc.",
    "1099 forms": "Mẫu 1099",
    "If you did freelance or gig work (Uber, DoorDash, etc.).":
      "Nếu bạn làm nghề tự do hoặc việc thời vụ qua ứng dụng (Uber, DoorDash, v.v.).",
    "Childcare provider information": "Thông tin người/nơi giữ trẻ",
    "Name, address, and tax ID of your childcare provider to claim additional credits.":
      "Tên, địa chỉ và mã số thuế của người/nơi giữ trẻ để nhận thêm tín thuế.",
    "For the parent or guardian applying.":
      "Của cha mẹ hoặc người giám hộ nộp đơn.",
    "Shows household income is within WIC limits.":
      "Chứng minh thu nhập hộ gia đình nằm trong giới hạn của WIC.",
    "Benefit letters": "Thư trợ cấp",
    "Shows you live in the state.": "Chứng minh bạn sống tại tiểu bang.",
    Lease: "Hợp đồng thuê nhà",
    "Proof of pregnancy or child": "Giấy tờ chứng minh mang thai hoặc có con",
    "Doctor's note for pregnancy, or birth certificate for children.":
      "Giấy của bác sĩ xác nhận mang thai, hoặc giấy khai sinh của trẻ.",
    "Pregnancy verification": "Giấy xác nhận mang thai",
    "Hospital records": "Hồ sơ bệnh viện",
    "Immunization records": "Hồ sơ tiêm chủng",
    "For children. Your WIC office may be able to look these up.":
      "Của trẻ em. Văn phòng WIC có thể tra cứu giúp bạn.",
    "Proof of other benefits": "Giấy tờ chứng minh đang nhận trợ cấp khác",
    "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.":
      "Nếu bạn đang nhận SNAP, Medicaid hoặc TANF, bạn tự động đạt yêu cầu thu nhập của WIC.",
    "For the head of household.": "Của chủ hộ.",
    "For all household members.": "Của tất cả thành viên trong hộ.",
    "Shows your energy costs and account number.":
      "Cho biết chi phí năng lượng và số tài khoản của bạn.",
    "Bring both heating and electric bills if they are separate.":
      "Mang theo cả hóa đơn sưởi và hóa đơn điện nếu chúng tách riêng.",
    "May qualify you for priority assistance.":
      "Có thể giúp bạn được ưu tiên hỗ trợ.",
    "Disconnection notice": "Thông báo cắt dịch vụ",
    "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.":
      "Nếu dịch vụ tiện ích sắp bị cắt, hãy mang theo thông báo. Bạn có thể được hỗ trợ khẩn cấp nhanh hơn.",
    "Parent/guardian photo ID":
      "Giấy tờ tùy thân có ảnh của cha mẹ/người giám hộ",
    "Government-issued ID for the applying parent.":
      "Giấy tờ tùy thân do chính phủ cấp của cha/mẹ nộp đơn.",
    "Child's birth certificate": "Giấy khai sinh của trẻ",
    "Proves age and citizenship.": "Chứng minh tuổi và quốc tịch.",
    "For children being enrolled.": "Của những trẻ được ghi danh.",
    "Household income documentation.": "Giấy tờ về thu nhập hộ gia đình.",
    "Current insurance information": "Thông tin bảo hiểm hiện tại",
    "If children currently have insurance that is ending.":
      "Nếu trẻ hiện có bảo hiểm sắp hết hạn.",
    "Photo ID for all adults": "Giấy tờ tùy thân có ảnh của tất cả người lớn",
    "Every adult household member needs a government-issued ID.":
      "Mỗi người lớn trong hộ cần có giấy tờ tùy thân do chính phủ cấp.",
    "Proves ages and household composition.":
      "Chứng minh tuổi và thành phần hộ gia đình.",
    "All sources for all household members.":
      "Mọi nguồn thu nhập của tất cả thành viên trong hộ.",
    "Tax returns": "Tờ khai thuế",
    "Child support documentation": "Giấy tờ về tiền cấp dưỡng nuôi con",
    "Proof of citizenship/immigration": "Giấy tờ chứng minh quốc tịch/di trú",
    "May be requested to verify assets.":
      "Có thể được yêu cầu để xác minh tài sản.",
    "Landlord reference": "Thư giới thiệu của chủ nhà",
    "A letter from a current or previous landlord.":
      "Thư của chủ nhà hiện tại hoặc trước đây.",
    "Criminal background info": "Thông tin lý lịch tư pháp",
    "Some PHAs run background checks. Be upfront about any issues.":
      "Một số PHA kiểm tra lý lịch. Hãy thành thật về bất kỳ vấn đề nào.",
    "Or document showing your SSN.":
      "Hoặc giấy tờ có ghi số An sinh Xã hội của bạn.",
    "If applying based on age (65+).": "Nếu nộp đơn dựa trên tuổi (65+).",
    "Medical records": "Hồ sơ y tế",
    "If applying based on disability: doctor's notes, hospital records, test results.":
      "Nếu nộp đơn vì khuyết tật: giấy của bác sĩ, hồ sơ bệnh viện, kết quả xét nghiệm.",
    "The more medical evidence you provide, the stronger your application.":
      "Bạn cung cấp càng nhiều bằng chứng y tế, hồ sơ của bạn càng vững.",
    "Pay stubs, bank statements, investment statements.":
      "Cuống lương, sao kê ngân hàng, sao kê đầu tư.",
    "Lease, mortgage statement, or letter from someone you live with.":
      "Hợp đồng thuê nhà, sao kê thế chấp, hoặc thư của người sống cùng bạn.",
    "Previous work history": "Quá trình làm việc trước đây",
    "List of jobs for the past 15 years. This helps evaluate disability claim.":
      "Danh sách các công việc trong 15 năm qua. Điều này giúp đánh giá đơn xin trợ cấp khuyết tật.",
    "Medications list": "Danh sách thuốc",
    "All current medications with dosages.":
      "Tất cả các loại thuốc đang dùng kèm liều lượng.",
    "Required for the FAFSA application.": "Bắt buộc cho đơn FAFSA.",
    "Federal tax returns": "Tờ khai thuế liên bang",
    "Your (and your parents' if dependent) most recent tax return.":
      "Tờ khai thuế gần nhất của bạn (và của cha mẹ nếu bạn là người phụ thuộc).",
    "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.":
      "Bạn có thể dùng Công cụ Truy xuất Dữ liệu IRS để tự động điền thông tin thuế vào FAFSA.",
    "From all jobs during the tax year.":
      "Từ tất cả công việc trong năm tính thuế.",
    "Optional but helps verify identity.":
      "Không bắt buộc nhưng giúp xác minh danh tính.",
    "Child support received, veterans' benefits, etc.":
      "Tiền cấp dưỡng nuôi con nhận được, trợ cấp cựu chiến binh, v.v.",
    "Current savings and checking balances.":
      "Số dư hiện tại của tài khoản tiết kiệm và thanh toán.",
    "{count} child": "{count} trẻ",
    "{count} children": "{count} trẻ",
    "{pct}% FPL (estimated)": "{pct}% FPL (ước tính)",
    "${amount}/yr": "${amount}/năm",
    "≤${amount}/yr": "≤${amount}/năm",
    "${amount}/mo": "${amount}/tháng",
    "≤${amount}/mo": "≤${amount}/tháng",
    "Income below EITC limit for {count} qualifying children":
      "Thu nhập dưới giới hạn EITC cho {count} con đủ điều kiện",
    "{age} years old": "{age} tuổi",
    "{count} qualifying child": "{count} con đủ điều kiện",
    "{count} qualifying children": "{count} con đủ điều kiện",
    "{state} offers a state EITC that stacks with the federal credit":
      "{state} có EITC cấp tiểu bang cộng thêm vào khoản tín thuế liên bang",
    "Claim the {state} state EITC on your state return":
      "Nhận EITC của tiểu bang {state} trên tờ khai thuế tiểu bang",
    "Income below {pct}% FPL for the {pathway} pathway":
      "Thu nhập dưới {pct}% FPL theo diện {pathway}",
    "{state} has a Medicaid pathway for childless adults":
      "{state} có diện Medicaid cho người lớn không có con",
    "{state} has not expanded Medicaid": "{state} chưa mở rộng Medicaid",
    "{state} has expanded Medicaid to {pct}% FPL":
      "{state} đã mở rộng Medicaid lên {pct}% FPL",
    "Check {state}-specific eligibility rules (non-expansion state)":
      "Xem quy định điều kiện riêng của {state} (tiểu bang chưa mở rộng Medicaid)",
    "~{pct}% of {base}% AMI": "~{pct}% của {base}% AMI",
    "Monthly income below SSI limit (${amount})":
      "Thu nhập hằng tháng dưới giới hạn SSI (${amount})",
    "Countable resources below ${amount} (home and one vehicle excluded)":
      "Tài sản được tính dưới ${amount} (không tính nhà ở và một xe)",
    "{count} eligible member": "{count} thành viên đủ điều kiện",
    "{count} eligible members": "{count} thành viên đủ điều kiện",
    "{count} child may qualify for CHIP coverage.":
      "{count} trẻ có thể đủ điều kiện nhận bảo hiểm CHIP.",
    "{count} children may qualify for CHIP coverage.":
      "{count} trẻ có thể đủ điều kiện nhận bảo hiểm CHIP.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.":
      "Thu nhập hằng năm của bạn (${income}) vượt giới hạn EITC ${limit} cho {count} con đủ điều kiện.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.":
      "Thu nhập hằng năm của bạn (${income}) vượt giới hạn EITC ${limit} cho {count} con đủ điều kiện.",
    "You likely qualify for the EITC with {count} qualifying child.":
      "Bạn có thể đủ điều kiện nhận EITC với {count} con đủ điều kiện.",
    "You likely qualify for the EITC with {count} qualifying children.":
      "Bạn có thể đủ điều kiện nhận EITC với {count} con đủ điều kiện.",
    "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.":
      "Bạn có thể đủ điều kiện nhận EITC với {count} con đủ điều kiện. {state} cũng có khoản tín thuế tiểu bang tương ứng.",
    "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.":
      "Bạn có thể đủ điều kiện nhận EITC với {count} con đủ điều kiện. {state} cũng có khoản tín thuế tiểu bang tương ứng.",
    "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.":
      'Bạn có thể rơi vào "khoảng trống bảo hiểm" Medicaid tại {state}. Người lớn không có con ở tiểu bang chưa mở rộng Medicaid có ít lựa chọn; hãy xem trợ cấp trên thị trường bảo hiểm ACA.',
    "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.":
      "Thu nhập của bạn ({pct}% FPL) cao hơn ngưỡng {threshold}% của diện {pathway}. Hãy xem trợ cấp trên thị trường bảo hiểm ACA.",
    "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.":
      "Thu nhập của bạn dưới {threshold}% FPL. Bạn có thể đủ điều kiện theo diện {pathway}.",
    "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.":
      "Tổng thu nhập của bạn ({pct}% FPL) vượt ngưỡng 130% của SNAP.",
    "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.":
      "Thu nhập ròng ước tính của bạn ({pct}% FPL) vượt ngưỡng 100%. Khấu trừ thực tế có thể khác; hãy nộp đơn để xác nhận.",
    "Monthly income (${income}) exceeds SSI limit of ${limit}.":
      "Thu nhập hằng tháng (${income}) vượt giới hạn SSI ${limit}.",
    "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.":
      "Tài sản được tính (${assets}) vượt giới hạn ${limit}. Nhà ở và một xe thường không được tính.",
    "You have {count} eligible household member and meet income requirements.":
      "Hộ của bạn có {count} thành viên đủ điều kiện và đáp ứng yêu cầu thu nhập.",
    "You have {count} eligible household members and meet income requirements.":
      "Hộ của bạn có {count} thành viên đủ điều kiện và đáp ứng yêu cầu thu nhập.",
  },
};

const ar: ProgramsMessages = {
  shortNames: {
    snap: "SNAP (قسائم الطعام)",
    medicaid: "Medicaid",
    eitc: "EITC",
    wic: "WIC",
    liheap: "LIHEAP / مساعدة الطاقة",
    chip: "CHIP",
    section8: "سكن Section 8",
    ssi: "SSI",
    "pell-grant": "منحة Pell",
    "ca-calfresh": "CalFresh",
    "ca-calworks": "CalWORKs",
    "tx-snap": "SNAP تكساس / Lone Star",
    "fl-access": "ACCESS Florida",
    "ny-snap": "SNAP نيويورك",
    "ny-essential-plan": "Essential Plan نيويورك",
    "pa-snap": "SNAP بنسلفانيا",
  },
  pathways: {
    pregnancy: "الحمل",
    children: "الأطفال",
    "disabled or elderly": "ذوي الإعاقة أو كبار السن",
    "adult expansion": "توسيع التغطية للبالغين",
    "adult non expansion": "البالغين دون توسيع التغطية",
  },
  text: {
    "Centers for Medicare & Medicaid Services (CMS)":
      "مراكز خدمات Medicare وMedicaid (CMS)",
    "Internal Revenue Service (IRS)": "دائرة الإيرادات الداخلية (IRS)",
    "U.S. Department of Education": "وزارة التعليم الأمريكية",
    "U.S. Department of Housing and Urban Development (HUD)":
      "وزارة الإسكان والتنمية الحضرية الأمريكية (HUD)",
    "Administration for Children and Families (ACF)":
      "إدارة الأطفال والأسر (ACF)",
    "USDA Food and Nutrition Service":
      "خدمة الغذاء والتغذية التابعة لوزارة الزراعة الأمريكية (USDA)",
    "Social Security Administration (SSA)": "إدارة الضمان الاجتماعي (SSA)",
    "Covers children between Medicaid threshold (~138% FPL) and ~250% FPL. Some states extend to 300% FPL.":
      "يغطي الأطفال الذين يقع دخل أسرهم بين حد Medicaid (حوالي 138% من خط الفقر الفيدرالي) وحوالي 250% من خط الفقر الفيدرالي. بعض الولايات ترفع الحد إلى 300%.",
    "50% of Area Median Income (AMI)": "50% من متوسط دخل المنطقة (AMI)",
    "80% AMI in some cases": "80% من AMI في بعض الحالات",
    "Households paying >50% of income on rent may receive priority":
      "قد تحصل الأسر التي تدفع أكثر من 50% من دخلها على الإيجار على أولوية",
    "60% of state median income (varies by state)":
      "60% من متوسط دخل الولاية (يختلف حسب الولاية)",
    "Childless adults in non-expansion states may fall into coverage gap":
      "قد لا يحصل البالغون الذين ليس لديهم أطفال في الولايات التي لم توسّع Medicaid على أي تغطية صحية",
    "Children's Health Insurance Program (CHIP)":
      "برنامج التأمين الصحي للأطفال (CHIP)",
    CHIP: "CHIP",
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.":
      "تغطية صحية منخفضة التكلفة لأطفال الأسر التي يزيد دخلها عن حد Medicaid لكنها لا تستطيع تحمّل تكلفة التأمين الخاص.",
    "Photo ID for parent/guardian": "هوية تحمل صورة لأحد الوالدين أو الوصي",
    "Child's birth certificate or Social Security number":
      "شهادة ميلاد الطفل أو رقم الضمان الاجتماعي الخاص به",
    "Proof of income": "إثبات الدخل",
    "Proof of residency": "إثبات الإقامة",
    "Household includes children under 19": "تضم الأسرة أطفالاً دون 19 عاماً",
    None: "لا يوجد",
    Required: "مطلوب",
    "Income above Medicaid threshold (138% FPL)":
      "الدخل أعلى من حد Medicaid (138% من FPL)",
    "Income below 250% of FPL (varies by state, some up to 300%)":
      "الدخل أقل من 250% من FPL (يختلف حسب الولاية، ويصل في بعضها إلى 300%)",
    "Children currently lack health insurance":
      "الأطفال ليس لديهم تأمين صحي حالياً",
    "Some states extend CHIP to 300% FPL":
      "بعض الولايات توسّع CHIP حتى 300% من FPL",
    "Current health insurance status for children":
      "وضع التأمين الصحي الحالي للأطفال",
    "CHIP is for children under 19.": "برنامج CHIP مخصص للأطفال دون 19 عاماً.",
    "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.":
      "من المرجح أن يكون أطفالك مؤهلين لبرنامج Medicaid بدلاً من ذلك (تكلفة أقل). تحقق من Medicaid أولاً.",
    "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.":
      "قد يتجاوز دخلك حدود CHIP في معظم الولايات. بعض الولايات تصل إلى 300% من FPL، فتحقق من ولايتك.",
    "Apply through Healthcare.gov or your state CHIP program":
      "قدّم طلبك عبر Healthcare.gov أو برنامج CHIP في ولايتك",
    "Coverage often starts immediately once approved":
      "غالباً ما تبدأ التغطية فور الموافقة",
    "Premiums are very low or free depending on income":
      "الأقساط منخفضة جداً أو مجانية حسب الدخل",
    "Earned Income Tax Credit (EITC)":
      "الإعفاء الضريبي على الدخل المكتسب (EITC)",
    EITC: "EITC",
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.":
      "إعفاء ضريبي للعاملين ذوي الدخل المنخفض أو المتوسط. قد تسترد أموالاً حتى لو لم تكن مديناً بأي ضريبة.",
    "W-2 forms from all employers": "نماذج W-2 من جميع أصحاب العمل",
    "Social Security numbers for you and dependents":
      "أرقام الضمان الاجتماعي لك ولمن تعولهم",
    "Valid filing status information":
      "معلومات صحيحة عن حالة تقديم الإقرار الضريبي",
    "Tax return (filed or to be filed)":
      "الإقرار الضريبي (المقدَّم أو الذي سيُقدَّم)",
    "Has earned income (wages, salary, or self-employment)":
      "لديك دخل من العمل (أجور أو راتب أو عمل حر)",
    "Must be > $0": "يجب أن يكون أكثر من $0",
    "Filer age 25-64 (or has qualifying children)":
      "عمر مقدّم الإقرار بين 25 و64 عاماً (أو لديه أطفال مؤهلون)",
    "Any age": "أي عمر",
    "Investment income below $11,600 (2025)":
      "دخل الاستثمار أقل من $11,600 (2025)",
    "Income qualifies for IRS Free File (<$84,000)":
      "الدخل مؤهل لخدمة IRS Free File (أقل من $84,000)",
    "Investment income (dividends, interest, capital gains)":
      "دخل الاستثمار (أرباح الأسهم، الفوائد، الأرباح الرأسمالية)",
    "Tax filing status (single, MFJ, HOH, MFS)":
      "حالة تقديم الإقرار (أعزب، متزوج بإقرار مشترك، رب أسرة، متزوج بإقرار منفصل)",
    "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.":
      "يتطلب EITC دخلاً من العمل (أجور أو راتب أو عمل حر). إذا كان لديك دخل نقدي غير مُبلَّغ عنه، فإنه يُحتسب أيضاً عند تقديم إقرار ضريبي.",
    "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.":
      "بدون أطفال مؤهلين، يشترط EITC أن يكون عمر مقدّم الإقرار بين 25 و64 عاماً.",
    "File a federal tax return to claim the credit":
      "قدّم إقراراً ضريبياً فيدرالياً للمطالبة بالإعفاء",
    "Use IRS Free File; it's actually free":
      "استخدم IRS Free File، فهو مجاني فعلاً",
    "Use your preferred tax software or a CPA":
      "استخدم برنامج الضرائب الذي تفضله أو محاسباً قانونياً (CPA)",
    "Check if your state has added a state EITC recently":
      "تحقق مما إذا كانت ولايتك قد أضافت مؤخراً EITC خاصاً بالولاية",
    "The credit is refundable; you can get money back even if you owe $0 in taxes":
      "هذا الإعفاء قابل للاسترداد، ويمكنك استرداد أموال حتى لو كانت ضريبتك $0",
    "Low Income Home Energy Assistance Program (LIHEAP)":
      "برنامج مساعدة الأسر منخفضة الدخل في تكاليف الطاقة (LIHEAP)",
    "LIHEAP / Energy Assistance": "LIHEAP / مساعدة الطاقة",
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.":
      "يساعد في دفع فواتير التدفئة والتبريد. وقد يساعد أيضاً في عزل المنزل وإصلاحات المنزل المتعلقة بالطاقة.",
    "Photo ID": "هوية تحمل صورة",
    "Proof of income for all household members": "إثبات دخل جميع أفراد الأسرة",
    "Recent utility bill": "فاتورة خدمات حديثة",
    "Social Security numbers": "أرقام الضمان الاجتماعي",
    "Household income below 150% of FPL (some states use higher thresholds)":
      "دخل الأسرة أقل من 150% من FPL (تستخدم بعض الولايات حدوداً أعلى)",
    "Household includes elderly (60+) or disabled members":
      "تضم الأسرة كبار سن (60+) أو أفراداً من ذوي الإعاقة",
    "Household includes children under 18": "تضم الأسرة أطفالاً دون 18 عاماً",
    "Energy costs are a significant share of income":
      "تكاليف الطاقة تمثل جزءاً كبيراً من الدخل",
    "Monthly utility and energy expenses": "النفقات الشهرية للخدمات والطاقة",
    "Income exceeds 150% FPL. Some states use higher thresholds; check your state.":
      "الدخل يتجاوز 150% من FPL. تستخدم بعض الولايات حدوداً أعلى، فتحقق من ولايتك.",
    "You qualify and may receive priority as a household with elderly or disabled members.":
      "أنت مؤهل، وقد تحصل على أولوية لأن أسرتك تضم كبار سن أو أفراداً من ذوي الإعاقة.",
    "Your income is within LIHEAP limits for your household size.":
      "دخلك ضمن حدود LIHEAP لحجم أسرتك.",
    "Apply through your local Community Action Agency":
      "قدّم طلبك عبر وكالة العمل المجتمعي (Community Action Agency) المحلية",
    "Apply before winter heating season for best chances":
      "قدّم طلبك قبل موسم التدفئة الشتوي لزيادة فرصك",
    "Mention elderly/disabled status; you may get priority":
      "اذكر وجود كبار سن أو ذوي إعاقة، فقد تحصل على أولوية",
    Medicaid: "Medicaid",
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.":
      "تغطية صحية مجانية أو منخفضة التكلفة للبالغين ذوي الدخل المنخفض والأطفال والحوامل وكبار السن وذوي الإعاقة.",
    "Social Security number": "رقم الضمان الاجتماعي",
    "Proof of citizenship or immigration status": "إثبات الجنسية أو وضع الهجرة",
    "At least one household member is a US citizen or qualified immigrant":
      "فرد واحد على الأقل من الأسرة مواطن أمريكي أو مهاجر مؤهل",
    Yes: "نعم",
    No: "لا",
    "Not applicable (user qualifies via another pathway)":
      "لا ينطبق (مؤهل عبر مسار آخر)",
    "Has alternate pathway": "يوجد مسار بديل",
    "Required for childless adult eligibility":
      "مطلوب لأهلية البالغين بدون أطفال",
    "Pregnant household member (highest priority pathway)":
      "وجود فرد حامل في الأسرة (المسار الأعلى أولوية)",
    "Children under 19 in household (CHIP-adjacent pathway)":
      "أطفال دون 19 عاماً في الأسرة (مسار مرتبط بـ CHIP)",
    "Disabled household member (SSI pathway available)":
      "فرد من ذوي الإعاقة في الأسرة (مسار SSI متاح)",
    "Citizenship or immigration status for all household members":
      "الجنسية أو وضع الهجرة لجميع أفراد الأسرة",
    "Disability status (affects SSI-linked Medicaid pathway)":
      "حالة الإعاقة (تؤثر على مسار Medicaid المرتبط بـ SSI)",
    "Medicaid requires at least one household member to be a US citizen or qualified immigrant.":
      "يشترط Medicaid أن يكون فرد واحد على الأقل من الأسرة مواطناً أمريكياً أو مهاجراً مؤهلاً.",
    "Pregnant women in most states qualify for Medicaid at up to 200% FPL.":
      "في معظم الولايات، تتأهل الحوامل لبرنامج Medicaid بدخل يصل إلى 200% من FPL.",
    "Children under 19 typically qualify at higher income levels than adults.":
      "عادةً ما يتأهل الأطفال دون 19 عاماً بمستويات دخل أعلى من البالغين.",
    "Apply through Healthcare.gov or your state Medicaid office":
      "قدّم طلبك عبر Healthcare.gov أو مكتب Medicaid في ولايتك",
    "Coverage can begin the same month you apply":
      "قد تبدأ التغطية في نفس الشهر الذي تقدّم فيه الطلب",
    "Expect a 30-45 day enrollment window":
      "توقّع أن تستغرق عملية التسجيل من 30 إلى 45 يوماً",
    "Check your state's managed care plan options":
      "اطّلع على خيارات خطط الرعاية المُدارة في ولايتك",
    "Federal Pell Grant": "منحة Pell الفيدرالية",
    "Pell Grant": "منحة Pell",
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.":
      "أموال مجانية للدراسة الجامعية لا يلزم ردّها. مخصصة لطلاب المرحلة الجامعية الأولى ذوي الحاجة المالية.",
    "Federal tax returns or W-2 forms":
      "الإقرارات الضريبية الفيدرالية أو نماذج W-2",
    "Driver's license (if applicable)": "رخصة القيادة (إن وُجدت)",
    "Records of untaxed income": "سجلات الدخل غير الخاضع للضريبة",
    "Bank statements": "كشوف الحساب البنكي",
    "Household includes a current or prospective undergraduate student":
      "تضم الأسرة طالباً جامعياً حالياً أو مستقبلياً",
    "Family income below typical Pell Grant threshold (~$60,000)":
      "دخل الأسرة أقل من الحد المعتاد لمنحة Pell (~$60,000)",
    "Income under $30,000 (likely qualifies for maximum Pell)":
      "الدخل أقل من $30,000 (من المرجح التأهل للحد الأقصى لمنحة Pell)",
    "Household has dependent children (increases financial need)":
      "لدى الأسرة أطفال معالون (يزيد من الحاجة المالية)",
    "Savings and investment balances (affects EFC calculation)":
      "أرصدة المدخرات والاستثمارات (تؤثر على حساب المساعدة)",
    "Student enrollment status for household members":
      "حالة التسجيل الدراسي لأفراد الأسرة",
    "Pell Grants are for current or prospective undergraduate students.":
      "منح Pell مخصصة لطلاب المرحلة الجامعية الأولى الحاليين أو المستقبليين.",
    "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.":
      "قد يكون دخل الأسرة أعلى من الحد المعتاد لمنحة Pell. قدّم طلب FAFSA للتحقق، فقد تتأهل في ظروف خاصة.",
    "Based on household income, you likely qualify for a Pell Grant.":
      "بناءً على دخل أسرتك، من المرجح أنك مؤهل لمنحة Pell.",
    "Complete the FAFSA at studentaid.gov": "أكمل طلب FAFSA على studentaid.gov",
    "FAFSA opens October 1 each year": "يُفتح طلب FAFSA في 1 أكتوبر من كل عام",
    "You can receive Pell Grants for up to 12 semesters":
      "يمكنك الحصول على منح Pell لمدة تصل إلى 12 فصلاً دراسياً",
    "No repayment required; this is free money":
      "لا يلزم السداد، فهذه أموال مجانية",
    "Housing Choice Voucher Program (Section 8)":
      "برنامج قسائم اختيار السكن (Section 8)",
    "Section 8 Housing": "سكن Section 8",
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.":
      "قسائم تساعد في دفع إيجار سكن خاص. أنت تجد الشقة، والقسيمة تغطي جزءاً من الإيجار.",
    "Photo ID for all adult household members":
      "هوية تحمل صورة لجميع البالغين في الأسرة",
    "Birth certificates for children": "شهادات ميلاد الأطفال",
    "Social Security cards": "بطاقات الضمان الاجتماعي",
    "Proof of income (pay stubs, tax returns, benefit letters)":
      "إثبات الدخل (قسائم الراتب، الإقرارات الضريبية، خطابات المزايا)",
    "Proof of citizenship or eligible immigration status":
      "إثبات الجنسية أو وضع هجرة مؤهل",
    "Income below 80% of Area Median Income (approximate national average)":
      "الدخل أقل من 80% من متوسط دخل المنطقة (متوسط وطني تقريبي)",
    "≤160% of 50% AMI (~80% AMI)": "≤160% من 50% من AMI (~80% من AMI)",
    "Household includes elderly (62+) or disabled members":
      "تضم الأسرة كبار سن (62+) أو أفراداً من ذوي الإعاقة",
    "Families with children often receive preference":
      "غالباً ما تحصل الأسر التي لديها أطفال على أفضلية",
    "Rent exceeds 50% of income (priority indicator)":
      "الإيجار يتجاوز 50% من الدخل (مؤشر على الأولوية)",
    "Income below 50% AMI (very low income, higher priority)":
      "الدخل أقل من 50% من AMI (دخل منخفض جداً، أولوية أعلى)",
    "Current monthly rent payment": "قيمة الإيجار الشهري الحالي",
    "Liquid assets (bank accounts, cash)":
      "الأصول السائلة (الحسابات البنكية، النقد)",
    "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.":
      "من المرجح أن يتجاوز الدخل 80% من متوسط دخل المنطقة. تختلف الحدود كثيراً حسب الموقع.",
    "You may qualify based on household income. Waitlists can be long; apply early.":
      "قد تكون مؤهلاً بناءً على دخل أسرتك. قوائم الانتظار قد تكون طويلة، فقدّم طلبك مبكراً.",
    "Contact your local Public Housing Authority (PHA)":
      "تواصل مع هيئة الإسكان العام (PHA) المحلية",
    "Waitlists are common; apply as soon as possible":
      "قوائم الانتظار شائعة، فقدّم طلبك في أقرب وقت ممكن",
    "Your rent is over 50% of income; mention this for possible priority":
      "إيجارك يزيد عن 50% من دخلك، اذكر ذلك فقد تحصل على أولوية",
    "Elderly/disabled households may qualify for preference":
      "قد تحصل الأسر التي تضم كبار سن أو ذوي إعاقة على أفضلية",
    "Families with children often get preference":
      "غالباً ما تحصل الأسر التي لديها أطفال على أفضلية",
    "Supplemental Nutrition Assistance Program (SNAP)":
      "برنامج المساعدة الغذائية التكميلية (SNAP)",
    "SNAP / Food Stamps": "SNAP (قسائم الطعام)",
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.":
      "مزايا شهرية على بطاقة EBT لشراء البقالة. تُقبل في معظم متاجر البقالة وأسواق المزارعين.",
    "Proof of income (pay stubs, tax return)":
      "إثبات الدخل (قسائم الراتب، الإقرار الضريبي)",
    "Proof of residency (utility bill, lease)":
      "إثبات الإقامة (فاتورة خدمات، عقد إيجار)",
    "Social Security numbers for household members":
      "أرقام الضمان الاجتماعي لأفراد الأسرة",
    "Bank statements (if applicable)": "كشوف الحساب البنكي (إن وُجدت)",
    "At least one household member is a US citizen or eligible immigrant":
      "فرد واحد على الأقل من الأسرة مواطن أمريكي أو مهاجر مؤهل",
    "Gross income below 130% of FPL (or elderly/disabled exempt)":
      "إجمالي الدخل أقل من 130% من FPL (أو معفى لكبار السن وذوي الإعاقة)",
    "Net income (after deductions) below 100% of FPL":
      "صافي الدخل (بعد الخصومات) أقل من 100% من FPL",
    "Household includes someone age 60+ or disabled":
      "تضم الأسرة شخصاً عمره 60 عاماً أو أكثر أو من ذوي الإعاقة",
    "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)":
      "الأصول السائلة أقل من $2,750 (أو $4,250 للأسر التي تضم كبار سن أو ذوي إعاقة)",
    "Liquid asset total (bank accounts, cash)":
      "إجمالي الأصول السائلة (الحسابات البنكية، النقد)",
    "Monthly expenses (rent, childcare, medical) for accurate deductions":
      "النفقات الشهرية (الإيجار، رعاية الأطفال، العلاج) لحساب الخصومات بدقة",
    "SNAP requires at least one household member to be a US citizen or qualified immigrant.":
      "يشترط SNAP أن يكون فرد واحد على الأقل من الأسرة مواطناً أمريكياً أو مهاجراً مؤهلاً.",
    "Based on your household size and income, you likely qualify for SNAP benefits.":
      "بناءً على حجم أسرتك ودخلها، من المرجح أنك مؤهل لمزايا SNAP.",
    "Apply online through your state SNAP office":
      "قدّم طلبك عبر الإنترنت من خلال مكتب SNAP في ولايتك",
    "Prepare income verification documents (last 30 days of pay stubs)":
      "جهّز مستندات إثبات الدخل (قسائم راتب آخر 30 يوماً)",
    "Schedule an interview (phone or in-person)":
      "حدّد موعداً للمقابلة (عبر الهاتف أو حضورياً)",
    "Bring ID, proof of residency, and Social Security numbers":
      "أحضر الهوية وإثبات الإقامة وأرقام الضمان الاجتماعي",
    "Supplemental Security Income (SSI)": "دخل الضمان التكميلي (SSI)",
    SSI: "SSI",
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.":
      "مدفوعات نقدية شهرية لكبار السن (65+) أو المكفوفين أو ذوي الإعاقة ممن لديهم دخل وموارد محدودة.",
    "Social Security card": "بطاقة الضمان الاجتماعي",
    "Birth certificate or proof of age": "شهادة الميلاد أو إثبات العمر",
    "Proof of disability (medical records)": "إثبات الإعاقة (السجلات الطبية)",
    "Proof of income and resources": "إثبات الدخل والموارد",
    "Proof of living situation": "إثبات وضع السكن",
    "Household includes someone who is 65+, blind, or disabled":
      "تضم الأسرة شخصاً عمره 65 عاماً أو أكثر أو كفيفاً أو من ذوي الإعاقة",
    "Not provided": "لم يُذكر",
    "Single individual (different limits than couples)":
      "فرد أعزب (الحدود تختلف عن الأزواج)",
    "Many states add a supplement on top of federal SSI":
      "تضيف ولايات كثيرة مبلغاً إضافياً فوق SSI الفيدرالي",
    "Countable resources (bank accounts, cash, investments)":
      "الموارد المحتسبة (الحسابات البنكية، النقد، الاستثمارات)",
    "SSI is for people who are 65+, blind, or disabled.":
      "برنامج SSI مخصص لمن عمرهم 65 عاماً أو أكثر أو المكفوفين أو ذوي الإعاقة.",
    "You may qualify based on age/disability and income level.":
      "قد تكون مؤهلاً بناءً على العمر أو الإعاقة ومستوى الدخل.",
    "Apply at your local Social Security office or call 1-800-772-1213":
      "قدّم طلبك في مكتب الضمان الاجتماعي المحلي أو اتصل على 1-800-772-1213",
    "Gather medical records documenting disability":
      "اجمع السجلات الطبية التي توثّق الإعاقة",
    "The application process can take 3-6 months":
      "قد تستغرق عملية الطلب من 3 إلى 6 أشهر",
    "Women, Infants, and Children (WIC)":
      "برنامج النساء والرضّع والأطفال (WIC)",
    WIC: "WIC",
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.":
      "مساعدة غذائية للحوامل والمرضعات والنساء بعد الولادة والأطفال دون 5 سنوات. تقدّم قسائم طعام وتثقيفاً غذائياً وإحالات للرعاية الصحية.",
    "Proof of pregnancy or child birth certificate":
      "إثبات الحمل أو شهادة ميلاد الطفل",
    "Immunization records for children": "سجلات تطعيم الأطفال",
    "Household includes a pregnant/postpartum woman or child under 5":
      "تضم الأسرة امرأة حاملاً أو بعد الولادة أو طفلاً دون 5 سنوات",
    "Household income below 185% of FPL": "دخل الأسرة أقل من 185% من FPL",
    "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)":
      "يحصل على SNAP أو Medicaid أو TANF (مؤهل تلقائياً من حيث دخل WIC)",
    "Household includes infants under 1 year": "تضم الأسرة رضّعاً دون عام واحد",
    "Pregnancy status for household members": "حالة الحمل لأفراد الأسرة",
    "WIC is for pregnant/postpartum women and children under 5.":
      "برنامج WIC مخصص للحوامل والنساء بعد الولادة والأطفال دون 5 سنوات.",
    "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.":
      "الدخل يتجاوز 185% من FPL. لكن إذا كنت تحصل على SNAP أو Medicaid أو TANF، فأنت مؤهل تلقائياً.",
    "Contact your local WIC office to schedule an appointment":
      "تواصل مع مكتب WIC المحلي لتحديد موعد",
    "Bring proof of income and residency": "أحضر إثبات الدخل والإقامة",
    "Appointments are usually available within 2 weeks":
      "عادةً تتوفر المواعيد خلال أسبوعين",
    "CalFresh (California SNAP)": "CalFresh (SNAP في كاليفورنيا)",
    CalFresh: "CalFresh",
    "California's SNAP program with state supplements. Broader eligibility than federal SNAP; includes some college students and immigrants.":
      "برنامج SNAP في كاليفورنيا مع إضافات من الولاية. شروط الأهلية أوسع من SNAP الفيدرالي، وتشمل بعض طلاب الجامعات والمهاجرين.",
    "Proof of CA residency": "إثبات الإقامة في كاليفورنيا",
    "SSN or immigration documents": "رقم الضمان الاجتماعي أو وثائق الهجرة",
    "CalFresh is a California program.":
      "CalFresh برنامج خاص بولاية كاليفورنيا.",
    "Income exceeds California's expanded 200% FPL limit for CalFresh.":
      "الدخل يتجاوز الحد الموسّع لـ CalFresh في كاليفورنيا (200% من FPL).",
    "California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.":
      "وسّعت كاليفورنيا أهلية SNAP حتى 200% من FPL. من المرجح أنك مؤهل لـ CalFresh.",
    "Apply at GetCalFresh.org (takes 10 minutes)":
      "قدّم طلبك على GetCalFresh.org (يستغرق 10 دقائق)",
    "Call 1-877-847-3663 for help in your language":
      "اتصل على 1-877-847-3663 للحصول على مساعدة بلغتك",
    "CalWORKs (California Cash Aid)":
      "CalWORKs (المساعدة النقدية في كاليفورنيا)",
    CalWORKs: "CalWORKs",
    "Cash assistance for families with children. Includes job training, childcare, and housing support.":
      "مساعدة نقدية للأسر التي لديها أطفال. تشمل التدريب على العمل ورعاية الأطفال ودعم السكن.",
    "Children's birth certificates": "شهادات ميلاد الأطفال",
    "CalWORKs is a California program.":
      "CalWORKs برنامج خاص بولاية كاليفورنيا.",
    "CalWORKs requires children under 18 in the household.":
      "يشترط CalWORKs وجود أطفال دون 18 عاماً في الأسرة.",
    "Income exceeds CalWORKs limits.": "الدخل يتجاوز حدود CalWORKs.",
    "You have children and meet income requirements for CalWORKs cash aid.":
      "لديك أطفال وتستوفي شروط الدخل للمساعدة النقدية من CalWORKs.",
    "Apply at your county welfare office":
      "قدّم طلبك في مكتب الرعاية الاجتماعية في مقاطعتك",
    "Also provides childcare, job training, and transportation":
      "يوفّر أيضاً رعاية الأطفال والتدريب على العمل والمواصلات",
    "Texas SNAP (Lone Star Card)": "SNAP في تكساس (بطاقة Lone Star)",
    "TX SNAP / Lone Star": "SNAP تكساس / Lone Star",
    "Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.":
      "تُضاف مزايا SNAP في تكساس إلى بطاقة Lone Star. لم توسّع تكساس برنامج Medicaid، لذا قد يكون SNAP هو الدعم الرئيسي لك.",
    "Proof of TX residency": "إثبات الإقامة في تكساس",
    "SSN for all applicants": "رقم الضمان الاجتماعي لجميع المتقدمين",
    "This is a Texas program.": "هذا برنامج خاص بولاية تكساس.",
    "Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).":
      "الدخل يتجاوز حدود SNAP في تكساس (165% من FPL وفق الأهلية الفئوية الموسّعة).",
    "Texas uses broad-based categorical eligibility at 165% FPL.":
      "تطبّق تكساس الأهلية الفئوية الموسّعة حتى 165% من FPL.",
    "Apply at YourTexasBenefits.com": "قدّم طلبك على YourTexasBenefits.com",
    "Texas has NO Medicaid expansion; check CHIP for children":
      "لم توسّع تكساس برنامج Medicaid، فتحقق من CHIP للأطفال",
    "ACCESS Florida (FL SNAP)": "ACCESS Florida (SNAP في فلوريدا)",
    "ACCESS Florida": "ACCESS Florida",
    "Florida's food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.":
      "برنامج المساعدة الغذائية في فلوريدا. قدّم طلباً واحداً عبر الإنترنت لـ SNAP وMedicaid والمساعدة النقدية معاً.",
    "Proof of FL residency": "إثبات الإقامة في فلوريدا",
    SSN: "رقم الضمان الاجتماعي",
    "This is a Florida program.": "هذا برنامج خاص بولاية فلوريدا.",
    "Income exceeds Florida SNAP limits.": "الدخل يتجاوز حدود SNAP في فلوريدا.",
    "Florida uses broad-based categorical eligibility at 200% FPL for SNAP.":
      "تطبّق فلوريدا الأهلية الفئوية الموسّعة حتى 200% من FPL لبرنامج SNAP.",
    "Apply at MyFlorida.com/accessflorida":
      "قدّم طلبك على MyFlorida.com/accessflorida",
    "One application covers SNAP, Medicaid, and cash aid":
      "طلب واحد يشمل SNAP وMedicaid والمساعدة النقدية",
    "Florida has NO Medicaid expansion for adults":
      "لم توسّع فلوريدا برنامج Medicaid للبالغين",
    "New York SNAP": "SNAP في نيويورك",
    "NY SNAP": "SNAP نيويورك",
    "New York's SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.":
      "برنامج SNAP في نيويورك، ومزاياه من الأعلى في البلاد بسبب تعديلات غلاء المعيشة.",
    "Proof of NY residency": "إثبات الإقامة في نيويورك",
    "Rent/utility bills": "فواتير الإيجار أو الخدمات",
    "This is a New York program.": "هذا برنامج خاص بولاية نيويورك.",
    "Income exceeds NY SNAP limits (200% FPL).":
      "الدخل يتجاوز حدود SNAP في نيويورك (200% من FPL).",
    "New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.":
      "وسّعت نيويورك أهلية SNAP وتقدّم مزايا أعلى بسبب غلاء المعيشة.",
    "Apply at mybenefits.ny.gov": "قدّم طلبك على mybenefits.ny.gov",
    "NY has expanded Medicaid; apply for both at once":
      "وسّعت نيويورك برنامج Medicaid، فقدّم طلباً للبرنامجين معاً",
    "NYC residents can also call 311":
      "يمكن لسكان مدينة نيويورك أيضاً الاتصال على 311",
    "Essential Plan (NY Health)": "Essential Plan (الصحة في نيويورك)",
    "NY Essential Plan": "Essential Plan نيويورك",
    "New York's low-cost health plan for people who earn too much for Medicaid but can't afford marketplace plans. $0-$20/month.":
      "خطة صحية منخفضة التكلفة في نيويورك لمن يزيد دخلهم عن حد Medicaid ولا يستطيعون تحمّل خطط سوق التأمين. من $0 إلى $20 شهرياً.",
    "Essential Plan is a New York program.":
      "Essential Plan برنامج خاص بولاية نيويورك.",
    "You likely qualify for full Medicaid instead (lower income).":
      "من المرجح أنك مؤهل لبرنامج Medicaid الكامل بدلاً من ذلك (دخل أقل).",
    "Income exceeds Essential Plan limits (200% FPL).":
      "الدخل يتجاوز حدود Essential Plan (200% من FPL).",
    "Your income is between 138-200% FPL; you qualify for the Essential Plan at $0-$20/month.":
      "دخلك بين 138% و200% من FPL، وأنت مؤهل لـ Essential Plan بتكلفة من $0 إلى $20 شهرياً.",
    "Apply at NY State of Health marketplace":
      "قدّم طلبك عبر سوق التأمين NY State of Health",
    "Plans cost $0 or $20/month with no deductible":
      "تكلفة الخطط $0 أو $20 شهرياً بدون مبلغ اقتطاع",
    "Covers doctor visits, prescriptions, hospital, and mental health":
      "تغطي زيارات الطبيب والأدوية الموصوفة والمستشفى والصحة النفسية",
    "Pennsylvania SNAP": "SNAP في بنسلفانيا",
    "PA SNAP": "SNAP بنسلفانيا",
    "Pennsylvania's food assistance with broad-based categorical eligibility at 160% FPL.":
      "المساعدة الغذائية في بنسلفانيا مع أهلية فئوية موسّعة حتى 160% من FPL.",
    "Proof of PA residency": "إثبات الإقامة في بنسلفانيا",
    "This is a Pennsylvania program.": "هذا برنامج خاص بولاية بنسلفانيا.",
    "Income exceeds PA SNAP limits (160% FPL).":
      "الدخل يتجاوز حدود SNAP في بنسلفانيا (160% من FPL).",
    "Pennsylvania uses broad-based categorical eligibility at 160% FPL.":
      "تطبّق بنسلفانيا الأهلية الفئوية الموسّعة حتى 160% من FPL.",
    "Apply at COMPASS.state.pa.us": "قدّم طلبك على COMPASS.state.pa.us",
    "PA has expanded Medicaid; apply for both at once":
      "وسّعت بنسلفانيا برنامج Medicaid، فقدّم طلباً للبرنامجين معاً",
    "Passed eligibility check": "اجتاز فحص الأهلية",
    "Failed eligibility check": "لم يجتز فحص الأهلية",
    "Detailed rule-by-rule breakdown": "تفصيل لكل قاعدة على حدة",
    "A government-issued ID that proves who you are.":
      "هوية صادرة عن جهة حكومية تثبت هويتك.",
    "Driver's license": "رخصة القيادة",
    "State ID card": "بطاقة هوية الولاية",
    Passport: "جواز السفر",
    "Expired IDs may be accepted in some states.":
      "قد تقبل بعض الولايات الهويات منتهية الصلاحية.",
    "Shows how much money you earn each month.":
      "يوضح المبلغ الذي تكسبه كل شهر.",
    "Pay stubs (last 30 days)": "قسائم الراتب (آخر 30 يوماً)",
    "Tax return": "الإقرار الضريبي",
    "Letter from employer": "خطاب من صاحب العمل",
    "Benefit award letter": "خطاب منح المزايا",
    "If self-employed, bring records of your earnings.":
      "إذا كنت تعمل لحسابك الخاص، فأحضر سجلات أرباحك.",
    "Shows you live in the state where you are applying.":
      "يثبت أنك تقيم في الولاية التي تقدّم فيها الطلب.",
    "Utility bill": "فاتورة الخدمات",
    "Lease agreement": "عقد الإيجار",
    "Mortgage statement": "كشف حساب الرهن العقاري",
    "Letter from landlord": "خطاب من المالك",
    "For every person in your household applying for benefits.":
      "لكل فرد في أسرتك يتقدّم بطلب للحصول على المزايا.",
    "SSN cards": "بطاقات الضمان الاجتماعي",
    "SSA letter": "خطاب من إدارة الضمان الاجتماعي (SSA)",
    "Tax documents showing SSN": "مستندات ضريبية تُظهر رقم الضمان الاجتماعي",
    "If someone does not have an SSN, they can still apply. The rest of the household may qualify.":
      "إذا لم يكن لدى أحدهم رقم ضمان اجتماعي، فلا يزال بإمكانه التقديم. قد يكون باقي أفراد الأسرة مؤهلين.",
    "Shows your savings and checking account balances.":
      "يوضح أرصدة حسابات التوفير والحسابات الجارية.",
    "Most states have eliminated the asset test for SNAP, but some still check.":
      "ألغت معظم الولايات اختبار الأصول لبرنامج SNAP، لكن بعضها لا يزال يتحقق منه.",
    "Medical bills": "الفواتير الطبية",
    "If anyone in your household is elderly or disabled, medical expenses can increase your benefit.":
      "إذا كان أحد أفراد أسرتك من كبار السن أو ذوي الإعاقة، فقد تزيد النفقات الطبية من المزايا التي تحصل عليها.",
    "Keep receipts for prescriptions, doctor visits, and medical equipment.":
      "احتفظ بإيصالات الأدوية وزيارات الطبيب والمعدات الطبية.",
    "Childcare expenses": "نفقات رعاية الأطفال",
    "If you pay for childcare to work or attend school, this counts as a deduction.":
      "إذا كنت تدفع مقابل رعاية الأطفال لتتمكن من العمل أو الدراسة، فهذا يُحتسب خصماً.",
    "Daycare receipts": "إيصالات الحضانة",
    "After-school program invoices": "فواتير برنامج ما بعد المدرسة",
    "A government-issued ID for the person applying.":
      "هوية صادرة عن جهة حكومية للشخص المتقدّم.",
    "State ID": "هوية الولاية",
    "Your household income for the current month.": "دخل أسرتك للشهر الحالي.",
    "Pay stubs": "قسائم الراتب",
    "Self-employment records": "سجلات العمل الحر",
    "Shows you are a US citizen or have qualified immigration status.":
      "يثبت أنك مواطن أمريكي أو لديك وضع هجرة مؤهل.",
    "Birth certificate": "شهادة الميلاد",
    "Naturalization certificate": "شهادة التجنّس",
    "Permanent resident card": "بطاقة الإقامة الدائمة",
    "Children born in the US are citizens regardless of parents' status.":
      "الأطفال المولودون في الولايات المتحدة مواطنون بغض النظر عن وضع والديهم.",
    "Required for each person applying for coverage.":
      "مطلوب لكل شخص يتقدّم بطلب للتغطية.",
    "Proof of pregnancy": "إثبات الحمل",
    "If applying based on pregnancy, a doctor's note helps speed up approval.":
      "إذا كنتِ تتقدمين بسبب الحمل، فإن تقريراً من الطبيب يساعد في تسريع الموافقة.",
    "Proof of disability": "إثبات الإعاقة",
    "If applying based on disability, medical records can help.":
      "إذا كنت تتقدم بسبب الإعاقة، فقد تساعد السجلات الطبية.",
    "Doctor's letter": "خطاب من الطبيب",
    "SSI/SSDI award letter": "خطاب منح SSI/SSDI",
    "W-2 forms": "نماذج W-2",
    "From every job you worked during the tax year.":
      "من كل وظيفة عملت بها خلال السنة الضريبية.",
    "Employers must send W-2s by January 31st each year.":
      "يجب على أصحاب العمل إرسال نماذج W-2 بحلول 31 يناير من كل عام.",
    "For yourself, your spouse (if filing jointly), and all dependents.":
      "لك ولزوجك أو زوجتك (إذا كان الإقرار مشتركاً) ولجميع من تعولهم.",
    "Filing status information": "معلومات حالة تقديم الإقرار",
    "Whether you file as single, married, or head of household.":
      "ما إذا كنت تقدّم الإقرار كأعزب أو متزوج أو رب أسرة.",
    "Head of household often gives a bigger credit if you have dependents.":
      "غالباً ما يمنحك التقديم كرب أسرة إعفاءً أكبر إذا كان لديك من تعولهم.",
    "1099 forms": "نماذج 1099",
    "If you did freelance or gig work (Uber, DoorDash, etc.).":
      "إذا عملت بشكل حر أو في وظائف مؤقتة عبر التطبيقات (Uber وDoorDash وغيرها).",
    "Childcare provider information": "معلومات مقدّم رعاية الأطفال",
    "Name, address, and tax ID of your childcare provider to claim additional credits.":
      "اسم مقدّم رعاية الأطفال وعنوانه ورقمه الضريبي للمطالبة بإعفاءات إضافية.",
    "For the parent or guardian applying.": "للوالد أو الوصي المتقدّم بالطلب.",
    "Shows household income is within WIC limits.":
      "يثبت أن دخل الأسرة ضمن حدود WIC.",
    "Benefit letters": "خطابات المزايا",
    "Shows you live in the state.": "يثبت أنك تقيم في الولاية.",
    Lease: "عقد الإيجار",
    "Proof of pregnancy or child": "إثبات الحمل أو وجود طفل",
    "Doctor's note for pregnancy, or birth certificate for children.":
      "تقرير طبي عن الحمل، أو شهادة ميلاد للأطفال.",
    "Pregnancy verification": "تأكيد الحمل",
    "Hospital records": "سجلات المستشفى",
    "Immunization records": "سجلات التطعيم",
    "For children. Your WIC office may be able to look these up.":
      "للأطفال. قد يتمكن مكتب WIC من البحث عنها لك.",
    "Proof of other benefits": "إثبات الحصول على مزايا أخرى",
    "If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.":
      "إذا كنت تحصل على SNAP أو Medicaid أو TANF، فأنت مؤهل تلقائياً لـ WIC من حيث الدخل.",
    "For the head of household.": "لربّ الأسرة.",
    "For all household members.": "لجميع أفراد الأسرة.",
    "Shows your energy costs and account number.":
      "يوضح تكاليف الطاقة ورقم حسابك.",
    "Bring both heating and electric bills if they are separate.":
      "أحضر فاتورتي التدفئة والكهرباء إذا كانتا منفصلتين.",
    "May qualify you for priority assistance.":
      "قد يؤهلك للحصول على مساعدة ذات أولوية.",
    "Disconnection notice": "إشعار قطع الخدمة",
    "If your utilities are about to be shut off, bring the notice. You may get emergency help faster.":
      "إذا كانت خدماتك على وشك الانقطاع، فأحضر الإشعار. قد تحصل على مساعدة طارئة بشكل أسرع.",
    "Parent/guardian photo ID": "هوية تحمل صورة للوالد أو الوصي",
    "Government-issued ID for the applying parent.":
      "هوية صادرة عن جهة حكومية للوالد المتقدّم.",
    "Child's birth certificate": "شهادة ميلاد الطفل",
    "Proves age and citizenship.": "يثبت العمر والجنسية.",
    "For children being enrolled.": "للأطفال الذين سيتم تسجيلهم.",
    "Household income documentation.": "مستندات دخل الأسرة.",
    "Current insurance information": "معلومات التأمين الحالي",
    "If children currently have insurance that is ending.":
      "إذا كان لدى الأطفال تأمين حالي على وشك الانتهاء.",
    "Photo ID for all adults": "هوية تحمل صورة لجميع البالغين",
    "Every adult household member needs a government-issued ID.":
      "يحتاج كل فرد بالغ في الأسرة إلى هوية صادرة عن جهة حكومية.",
    "Proves ages and household composition.": "يثبت الأعمار وتكوين الأسرة.",
    "All sources for all household members.":
      "جميع مصادر الدخل لجميع أفراد الأسرة.",
    "Tax returns": "الإقرارات الضريبية",
    "Child support documentation": "مستندات نفقة الأطفال",
    "Proof of citizenship/immigration": "إثبات الجنسية أو الهجرة",
    "May be requested to verify assets.": "قد يُطلب للتحقق من الأصول.",
    "Landlord reference": "توصية من المالك",
    "A letter from a current or previous landlord.":
      "خطاب من المالك الحالي أو السابق.",
    "Criminal background info": "معلومات السجل الجنائي",
    "Some PHAs run background checks. Be upfront about any issues.":
      "تُجري بعض هيئات PHA فحصاً للسجل. كن صريحاً بشأن أي مشكلات.",
    "Or document showing your SSN.":
      "أو مستند يُظهر رقم الضمان الاجتماعي الخاص بك.",
    "If applying based on age (65+).": "إذا كنت تتقدم بسبب العمر (65+).",
    "Medical records": "السجلات الطبية",
    "If applying based on disability: doctor's notes, hospital records, test results.":
      "إذا كنت تتقدم بسبب الإعاقة: تقارير الطبيب وسجلات المستشفى ونتائج الفحوصات.",
    "The more medical evidence you provide, the stronger your application.":
      "كلما قدّمت أدلة طبية أكثر، أصبح طلبك أقوى.",
    "Pay stubs, bank statements, investment statements.":
      "قسائم الراتب، كشوف الحساب البنكي، كشوف الاستثمار.",
    "Lease, mortgage statement, or letter from someone you live with.":
      "عقد الإيجار، أو كشف الرهن العقاري، أو خطاب من شخص تعيش معه.",
    "Previous work history": "سجل العمل السابق",
    "List of jobs for the past 15 years. This helps evaluate disability claim.":
      "قائمة بالوظائف خلال آخر 15 عاماً. يساعد ذلك في تقييم طلب الإعاقة.",
    "Medications list": "قائمة الأدوية",
    "All current medications with dosages.": "جميع الأدوية الحالية مع جرعاتها.",
    "Required for the FAFSA application.": "مطلوب لطلب FAFSA.",
    "Federal tax returns": "الإقرارات الضريبية الفيدرالية",
    "Your (and your parents' if dependent) most recent tax return.":
      "أحدث إقرار ضريبي لك (ولوالديك إذا كنت معالاً).",
    "You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.":
      "يمكنك استخدام أداة استرداد البيانات من IRS لملء معلومات الضرائب تلقائياً في FAFSA.",
    "From all jobs during the tax year.":
      "من جميع الوظائف خلال السنة الضريبية.",
    "Optional but helps verify identity.":
      "اختياري، لكنه يساعد في التحقق من الهوية.",
    "Child support received, veterans' benefits, etc.":
      "نفقة الأطفال المستلمة، ومزايا المحاربين القدامى، وغيرها.",
    "Current savings and checking balances.":
      "الأرصدة الحالية لحسابات التوفير والحسابات الجارية.",
    "{count} child": "{count} طفل",
    "{count} children": "{count} أطفال",
    "{pct}% FPL (estimated)": "{pct}% من FPL (تقديري)",
    "${amount}/yr": "${amount}/سنة",
    "≤${amount}/yr": "≤${amount}/سنة",
    "${amount}/mo": "${amount}/شهر",
    "≤${amount}/mo": "≤${amount}/شهر",
    "Income below EITC limit for {count} qualifying children":
      "الدخل أقل من حد EITC لعدد {count} من الأطفال المؤهلين",
    "{age} years old": "{age} عاماً",
    "{count} qualifying child": "{count} طفل مؤهل",
    "{count} qualifying children": "{count} أطفال مؤهلين",
    "{state} offers a state EITC that stacks with the federal credit":
      "تقدّم ولاية {state} إعفاء EITC خاصاً بها يُضاف إلى الإعفاء الفيدرالي",
    "Claim the {state} state EITC on your state return":
      "طالِب بإعفاء EITC لولاية {state} في إقرارك الضريبي للولاية",
    "Income below {pct}% FPL for the {pathway} pathway":
      "الدخل أقل من {pct}% من FPL لمسار {pathway}",
    "{state} has a Medicaid pathway for childless adults":
      "لدى ولاية {state} مسار Medicaid للبالغين بدون أطفال",
    "{state} has not expanded Medicaid":
      "لم توسّع ولاية {state} برنامج Medicaid",
    "{state} has expanded Medicaid to {pct}% FPL":
      "وسّعت ولاية {state} برنامج Medicaid حتى {pct}% من FPL",
    "Check {state}-specific eligibility rules (non-expansion state)":
      "راجع قواعد الأهلية الخاصة بولاية {state} (ولاية لم توسّع Medicaid)",
    "~{pct}% of {base}% AMI": "~{pct}% من {base}% من AMI",
    "Monthly income below SSI limit (${amount})":
      "الدخل الشهري أقل من حد SSI (${amount})",
    "Countable resources below ${amount} (home and one vehicle excluded)":
      "الموارد المحتسبة أقل من ${amount} (باستثناء المنزل ومركبة واحدة)",
    "{count} eligible member": "{count} فرد مؤهل",
    "{count} eligible members": "{count} أفراد مؤهلين",
    "{count} child may qualify for CHIP coverage.":
      "قد يكون {count} طفل مؤهلاً لتغطية CHIP.",
    "{count} children may qualify for CHIP coverage.":
      "قد يكون {count} أطفال مؤهلين لتغطية CHIP.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying child.":
      "دخلك السنوي (${income}) يتجاوز حد EITC البالغ ${limit} لعدد {count} طفل مؤهل.",
    "Your annual income (${income}) exceeds the EITC limit of ${limit} for {count} qualifying children.":
      "دخلك السنوي (${income}) يتجاوز حد EITC البالغ ${limit} لعدد {count} من الأطفال المؤهلين.",
    "You likely qualify for the EITC with {count} qualifying child.":
      "من المرجح أنك مؤهل لـ EITC مع {count} طفل مؤهل.",
    "You likely qualify for the EITC with {count} qualifying children.":
      "من المرجح أنك مؤهل لـ EITC مع {count} من الأطفال المؤهلين.",
    "You likely qualify for the EITC with {count} qualifying child. {state} also offers a matching state credit.":
      "من المرجح أنك مؤهل لـ EITC مع {count} طفل مؤهل. وتقدّم ولاية {state} أيضاً إعفاءً مماثلاً على مستوى الولاية.",
    "You likely qualify for the EITC with {count} qualifying children. {state} also offers a matching state credit.":
      "من المرجح أنك مؤهل لـ EITC مع {count} من الأطفال المؤهلين. وتقدّم ولاية {state} أيضاً إعفاءً مماثلاً على مستوى الولاية.",
    "You may fall into the Medicaid coverage gap in {state}. Childless adults without Medicaid expansion have limited options; check ACA marketplace subsidies instead.":
      "قد تقع في فجوة تغطية Medicaid في ولاية {state}. خيارات البالغين بدون أطفال محدودة في الولايات التي لم توسّع Medicaid، فتحقق بدلاً من ذلك من دعم سوق التأمين ACA.",
    "Your income ({pct}% FPL) is above the {threshold}% threshold for the {pathway} pathway. Check ACA marketplace subsidies.":
      "دخلك ({pct}% من FPL) أعلى من حد {threshold}% لمسار {pathway}. تحقق من دعم سوق التأمين ACA.",
    "Your income is below {threshold}% FPL. You likely qualify under the {pathway} pathway.":
      "دخلك أقل من {threshold}% من FPL. من المرجح أنك مؤهل عبر مسار {pathway}.",
    "Your gross income ({pct}% FPL) exceeds the 130% SNAP threshold.":
      "إجمالي دخلك ({pct}% من FPL) يتجاوز حد SNAP البالغ 130%.",
    "Your estimated net income ({pct}% FPL) exceeds the 100% threshold. Actual deductions may differ; apply to confirm.":
      "صافي دخلك التقديري ({pct}% من FPL) يتجاوز حد 100%. قد تختلف الخصومات الفعلية، فقدّم طلبك للتأكد.",
    "Monthly income (${income}) exceeds SSI limit of ${limit}.":
      "الدخل الشهري (${income}) يتجاوز حد SSI البالغ ${limit}.",
    "Countable resources (${assets}) exceed the ${limit} limit. Home and one vehicle are typically excluded.":
      "الموارد المحتسبة (${assets}) تتجاوز حد ${limit}. عادةً لا يُحتسب المنزل ومركبة واحدة.",
    "You have {count} eligible household member and meet income requirements.":
      "لديك {count} فرد مؤهل في الأسرة وتستوفي شروط الدخل.",
    "You have {count} eligible household members and meet income requirements.":
      "لديك {count} أفراد مؤهلين في الأسرة وتستوفي شروط الدخل.",
  },
};

export const programs: Record<Locale, ProgramsMessages> = {
  en,
  es,
  zh,
  vi,
  ar,
};
