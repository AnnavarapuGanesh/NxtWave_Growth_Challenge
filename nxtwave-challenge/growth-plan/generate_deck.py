import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Colors
    NAVY = RGBColor(15, 23, 42)        # #0F172A
    DARK_BLUE = RGBColor(30, 41, 59)   # #1E293B
    PRIMARY_BLUE = RGBColor(37, 99, 235) # #2563EB
    CYAN = RGBColor(6, 182, 212)       # #06B6D4
    ORANGE = RGBColor(249, 115, 22)    # #F97316
    EMERALD = RGBColor(16, 185, 129)   # #10B981
    WHITE = RGBColor(255, 255, 255)
    LIGHT_BG = RGBColor(248, 250, 252) # #F8FAFC
    CARD_BG = RGBColor(255, 255, 255)
    CARD_BORDER = RGBColor(226, 232, 240) # #E2E8F0
    TEXT_MUTED = RGBColor(100, 116, 139) # #64748B
    TEXT_MAIN = RGBColor(15, 23, 42)

    def add_header(slide, slide_num, category, title, subtitle):
        # Header banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = f"SLIDE {slide_num} // {category.upper()}"
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = PRIMARY_BLUE

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(22)
        p1.font.bold = True
        p1.font.color.rgb = NAVY

        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1.5)
        else:
            shape.line.fill.background()
        return shape

    # ==========================================
    # SLIDE 1: STUDENT UNDERSTANDING & PSYCHOLOGY
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    # Background fill
    bg = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = LIGHT_BG
    bg.line.fill.background()

    add_header(s1, "01", "Target Persona & Psychology", 
               "Understanding the Final-Year Engineering Student", 
               "Target: Tier-2 & Tier-3 engineering colleges (CSE/IT/ECE/Allied). Placement-anxious with zero unique AI projects.")

    # 3 Column Cards
    col_w = Inches(3.64)
    gap = Inches(0.4)
    top_pos = Inches(1.7)
    card_h = Inches(5.3)

    # Card 1: Core Persona & Reality
    add_card(s1, Inches(0.8), top_pos, col_w, card_h)
    tb1 = s1.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.2), col_w - Inches(0.4), card_h - Inches(0.4))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    
    p = tf1.paragraphs[0]
    p.text = "🎯 TARGET AUDIENCE PROFILE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    bullets1 = [
        ("Demographics: ", "Final-year B.Tech / BE students (2025/2026/2027 batch), Tier-2/Tier-3 colleges across India (AP, TS, TN, KA, MH, UP)."),
        ("Branches: ", "CSE, IT, ECE, EEE, plus core branches seeking IT/Software placement roles."),
        ("Placement Anxiety: ", "Campus drives are starting or bleak. 85%+ feel their resume is invisible among thousands of applicants."),
        ("The 'Tutorial Trap': ", "Resume has only boilerplate tutorial clones (ToDo App, Weather API, Netflix Clone) that recruiters instantly discard."),
        ("Imposter Syndrome: ", "Believe AI requires PhD-level linear algebra, high-end GPUs, and months of study.")
    ]
    for bold_txt, norm_txt in bullets1:
        p = tf1.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + bold_txt
        r1.font.bold = True
        r1.font.size = Pt(10)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = norm_txt
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = DARK_BLUE

    # Card 2: The Core Triggers
    add_card(s1, Inches(0.8) + col_w + gap, top_pos, col_w, card_h)
    tb2 = s1.shapes.add_textbox(Inches(0.8) + col_w + gap + Inches(0.2), top_pos + Inches(0.2), col_w - Inches(0.4), card_h - Inches(0.4))
    tf2 = tb2.text_frame
    tf2.word_wrap = True

    p = tf2.paragraphs[0]
    p.text = "⚡ CONVERSION TRIGGERS (WHY REGISTER?)"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = EMERALD

    triggers = [
        ("Tangible Resume Weapon: ", "Not theory. 'Walk away with a live deployed AI project on GitHub/Vercel to showcase in interviews within 60 mins'."),
        ("Zero Pre-requisite Mythbusting: ", "'If you know basic logic, you can build this.' Removing mathematical barrier to entry."),
        ("Verifiable Proof of Skill: ", "Official NxtWave Certificate of Participation (shareable on LinkedIn & verifiable for college placement cell records)."),
        ("Peer FOMO & Social Proof: ", "When campus ambassadors and class CRs share in official college WhatsApp groups, attendance becomes the norm."),
        ("Immediate Value Hook: ", "Interactive 'AI Project Idea Generator' gives them a custom project blueprint tailored to their branch immediately on visit.")
    ]
    for bold_txt, norm_txt in triggers:
        p = tf2.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + bold_txt
        r1.font.bold = True
        r1.font.size = Pt(10)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = norm_txt
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = DARK_BLUE

    # Card 3: Objections & Tactical Reframing
    add_card(s1, Inches(0.8) + (col_w + gap)*2, top_pos, col_w, card_h)
    tb3 = s1.shapes.add_textbox(Inches(0.8) + (col_w + gap)*2 + Inches(0.2), top_pos + Inches(0.2), col_w - Inches(0.4), card_h - Inches(0.4))
    tf3 = tb3.text_frame
    tf3.word_wrap = True

    p = tf3.paragraphs[0]
    p.text = "🛡️ OBJECTIONS & PROACTIVE REFRAIMING"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ORANGE

    objections = [
        ("Objection: 'Is it really free or a sales pitch?'", 
         "Reframing: '100% Free hands-on live build. Code repository provided upfront. No credit card required. Build live, leave with code.'"),
        ("Objection: 'Will I get an accredited certificate?'", 
         "Reframing: 'Yes, a cryptographically verifiable digital certificate with QR code issued upon completing the live build session.'"),
        ("Objection: 'I don't know Python or AI math.'", 
         "Reframing: 'Workshop uses modern AI APIs + starter templates. You will understand architecture & ship without writing 500 lines of boilerplate.'"),
        ("Objection: 'I have semester exams / lab internals.'", 
         "Reframing: '60 minutes crisp format on a weekend evening (7:00 PM). High ROI per minute spent vs. self-study.'")
    ]
    for bold_txt, norm_txt in objections:
        p = tf3.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = bold_txt + "\n"
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = "↳ " + norm_txt
        r2.font.size = Pt(9)
        r2.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 2: PRIORITIZED 4-CHANNEL GROWTH ENGINE
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    bg2 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg2.fill.solid()
    bg2.fill.fore_color.rgb = LIGHT_BG
    bg2.line.fill.background()

    add_header(s2, "02", "Campaign Strategy & Channel Prioritization", 
               "4-Channel Growth Engine: Reaching 500 Registrations with ₹2,000", 
               "Strictly prioritized channels based on Tier-2/3 student consumption habits. No wasted spread.")

    # 4 horizontal cards
    card_w2 = Inches(5.66)
    card_h2 = Inches(2.45)
    row_gap = Inches(0.35)
    col_gap = Inches(0.4)

    channels = [
        {
            "rank": "PRIORITY 1 // 44% OF GOAL",
            "name": "College WhatsApp Groups & Campus Ambassadors",
            "regs": "220 Registrations (Est.)",
            "color": PRIMARY_BLUE,
            "col": 0, "row": 0,
            "bullets": [
                "Recruit 15-20 active student ambassadors (CRs, coding club heads, active placement reps) across 20 targeted engineering campuses.",
                "Provide a pre-approved 'WhatsApp Message Kit' with personalized tracking links (UTM tagged).",
                "Why it works: WhatsApp has 95%+ open rate in student cohorts. Peer recommendation bypasses institutional spam filters."
            ]
        },
        {
            "rank": "PRIORITY 2 // 32% OF GOAL",
            "name": "Viral Post-Registration Referral Loop ('Invite 3 Friends')",
            "regs": "160 Registrations (Est.)",
            "color": EMERALD,
            "col": 1, "row": 0,
            "bullets": [
                "Upon form submission, each registrant gets an immediate unique referral link and 1-tap WhatsApp share button.",
                "Incentive milestone: 'Refer 3 batchmates to unlock the VIP AI Project Pack (50 Resume AI Ideas + Code Architecture Templates)'.",
                "Why it works: Viral coefficient K = 0.32 turns every 3 registrations into 1 organic referral with zero ad spend."
            ]
        },
        {
            "rank": "PRIORITY 3 // 16% OF GOAL",
            "name": "College Coding Clubs, Placement Cells & HOD Forwarded Mails",
            "regs": "80 Registrations (Est.)",
            "color": ORANGE,
            "col": 0, "row": 1,
            "bullets": [
                "Targeted outreach to Placement Officers & Technical Club faculty in 30 tier-2/3 engineering colleges.",
                "Positioned as 'Skill Enrichment Activity' aligned with AICTE placement readiness guidelines.",
                "Why it works: High institutional authority. When an HOD or Placement Officer drops an official circular, trust is 100%."
            ]
        },
        {
            "rank": "PRIORITY 4 // 8% OF GOAL",
            "name": "Short-Form Content on LinkedIn & Instagram + Micro-Boost",
            "regs": "40 Registrations (Est.)",
            "color": CYAN,
            "col": 1, "row": 1,
            "bullets": [
                "Hooks: 'Why recruiters reject your Weather App in 2026' and 'Build an AI Agent in 60 mins'.",
                "Allocate ₹600 Meta micro-boost targeted strictly at Tier-2/3 college pins + engineering demographics (age 20-22).",
                "Why it works: Captures late-night scrolling students during study/placement breaks and feeds them into the WhatsApp funnel."
            ]
        }
    ]

    for ch in channels:
        x = Inches(0.8) + (card_w2 + col_gap) * ch["col"]
        y = Inches(1.7) + (card_h2 + row_gap) * ch["row"]
        add_card(s2, x, y, card_w2, card_h2)

        tb = s2.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), card_w2 - Inches(0.4), card_h2 - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = ch["rank"]
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = ch["color"]

        p1 = tf.add_paragraph()
        r1 = p1.add_run()
        r1.text = ch["name"] + "  "
        r1.font.size = Pt(12)
        r1.font.bold = True
        r1.font.color.rgb = NAVY

        r2 = p1.add_run()
        r2.text = f"[{ch['regs']}]"
        r2.font.size = Pt(11)
        r2.font.bold = True
        r2.font.color.rgb = ch["color"]

        for b in ch["bullets"]:
            p = tf.add_paragraph()
            p.space_before = Pt(4)
            p.text = "• " + b
            p.font.size = Pt(9)
            p.font.color.rgb = DARK_BLUE

    # ==========================================
    # SLIDE 3: 7-DAY DAY-BY-DAY EXECUTION CALENDAR
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    bg3 = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg3.fill.solid()
    bg3.fill.fore_color.rgb = LIGHT_BG
    bg3.line.fill.background()

    add_header(s3, "03", "Operational Timeline & Cadence", 
               "7-Day Sprint: Day-by-Day Execution Calendar", 
               "Carefully staged momentum curve ensuring continuous compounding and mid-campaign safety check.")

    # 7 Columns for the 7 Days
    day_w = Inches(1.58)
    day_gap = Inches(0.11)
    day_top = Inches(1.7)
    day_h = Inches(5.3)

    days_data = [
        {
            "day": "DAY 1",
            "title": "Foundation & Assets",
            "target": "+35 Regs",
            "cum": "35 Cumulative",
            "color": PRIMARY_BLUE,
            "tasks": [
                "Deploy Registration & Referral web engine.",
                "Recruit 15 Campus Ambassadors across 15 colleges.",
                "Distribute Ambassador WhatsApp Kits & unique tracking links.",
                "Initial soft-launch in 5 core college groups."
            ]
        },
        {
            "day": "DAY 2",
            "title": "Community Wave 1",
            "target": "+75 Regs",
            "cum": "110 Cumulative",
            "color": PRIMARY_BLUE,
            "tasks": [
                "Full push across 40+ engineering college WhatsApp/Telegram groups.",
                "First wave of referral loop activations ('Unlock VIP Project Pack').",
                "Email drop to 30 Technical Club leads and Placement Officers.",
                "Monitor real-time signup speed on Admin Dashboard."
            ]
        },
        {
            "day": "DAY 3",
            "title": "Midpoint & Review",
            "target": "+105 Regs",
            "cum": "215 Cumulative",
            "color": ORANGE,
            "tasks": [
                "🚨 CRITICAL MILESTONE: Audit against 215 target line.",
                "Launch ₹600 Meta micro-boost ad campaign on Instagram.",
                "Announce Ambassador Daily Leaderboard (Top 3 get ₹200 vouchers).",
                "If behind pace: trigger contingency flash sprint."
            ]
        },
        {
            "day": "DAY 4",
            "title": "Institutional Push",
            "target": "+95 Regs",
            "cum": "310 Cumulative",
            "color": EMERALD,
            "tasks": [
                "Placement cell / HOD follow-ups and official reminder notices.",
                "LinkedIn student spotlight: '3 Final-years share why they need AI projects'.",
                "Push reminder in WhatsApp groups highlighting 'Only 190 seats remaining'.",
                "Ambassador mid-sprint check-in."
            ]
        },
        {
            "day": "DAY 5",
            "title": "Referral Acceleration",
            "target": "+85 Regs",
            "cum": "395 Cumulative",
            "color": EMERALD,
            "tasks": [
                "Automated WhatsApp nudges to registrants with 1 or 2 referrals: '1 more friend to unlock VIP pack'.",
                "College vs. College leaderboard release in WhatsApp status.",
                "Second creative refresh for Meta ads focusing on resume boost."
            ]
        },
        {
            "day": "DAY 6",
            "title": "Final 24h Countdown",
            "target": "+65 Regs",
            "cum": "460 Cumulative",
            "color": CYAN,
            "tasks": [
                "T-24h Scarcity blast: 'Final 40 seats for Live Project Build'.",
                "Ambassadors host 5-min Q&A voice notes in batch groups.",
                "Pre-workshop software requirements sent (Node/Python/browser).",
                "Targeted reminders to unverified clicks."
            ]
        },
        {
            "day": "DAY 7",
            "title": "D-Day & Workshop",
            "target": "+45 Regs",
            "cum": "505 Total Regs",
            "color": DARK_BLUE,
            "tasks": [
                "T-3h and T-1h WhatsApp reminder sequence with live meeting link.",
                "Final last-chance registration surge (closes 30 mins before call).",
                "Execute 60-min live workshop (Target: 275+ live attendees ~55% show rate).",
                "Live Lucky Draw prize announced & project certificate link shared."
            ]
        }
    ]

    for i, d in enumerate(days_data):
        x = Inches(0.8) + (day_w + day_gap) * i
        add_card(s3, x, day_top, day_w, day_h)

        tb = s3.shapes.add_textbox(x + Inches(0.1), day_top + Inches(0.15), day_w - Inches(0.2), day_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = d["day"]
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = d["color"]

        p1 = tf.add_paragraph()
        p1.text = d["title"]
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = NAVY

        p_t = tf.add_paragraph()
        p_t.space_before = Pt(2)
        r_t = p_t.add_run()
        r_t.text = d["target"]
        r_t.font.size = Pt(10)
        r_t.font.bold = True
        r_t.font.color.rgb = d["color"]

        p_c = tf.add_paragraph()
        p_c.text = f"({d['cum']})"
        p_c.font.size = Pt(8.5)
        p_c.font.color.rgb = TEXT_MUTED

        for t in d["tasks"]:
            p = tf.add_paragraph()
            p.space_before = Pt(6)
            p.text = "• " + t
            p.font.size = Pt(8)
            p.font.color.rgb = DARK_BLUE

    # ==========================================
    # SLIDE 4: FUNNEL MATH & ₹2,000 BUDGET BREAKDOWN
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    bg4 = s4.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg4.fill.solid()
    bg4.fill.fore_color.rgb = LIGHT_BG
    bg4.line.fill.background()

    add_header(s4, "04", "Conversion Economics & Budget Allocation", 
               "Funnel Math Table & Exact ₹2,000 Budget Breakdown", 
               "All figures stated as clearly labelled estimates based on Tier-2/3 student acquisition benchmarks.")

    # Left: Funnel Math Table (Width: 6.8 Inches)
    left_w = Inches(6.8)
    add_card(s4, Inches(0.8), Inches(1.7), left_w, Inches(5.3))
    tb_fn = s4.shapes.add_textbox(Inches(1.0), Inches(1.85), left_w - Inches(0.4), Inches(5.0))
    tf_fn = tb_fn.text_frame
    tf_fn.word_wrap = True

    p = tf_fn.paragraphs[0]
    p.text = "📊 REGISTRATION FUNNEL MATHEMATICS (SUMS TO 500)"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    p_sub = tf_fn.add_paragraph()
    p_sub.text = "*Note: Reach, CTR, and Conversion Rates are explicitly estimated benchmark assumptions."
    p_sub.font.size = Pt(8.5)
    p_sub.font.italic = True
    p_sub.font.color.rgb = TEXT_MUTED

    # Table layout inside card
    fn_rows = [
        ("Channel", "Est. Reach", "CTR %", "Visits", "CVR %", "Registrations"),
        ("1. WhatsApp & Ambassadors", "3,150", "20.0%", "630", "34.9%", "220"),
        ("2. Viral Referral Loop", "340 base", "Share:80%", "480", "33.3%", "160"),
        ("3. Clubs & Placement Cells", "800", "25.0%", "200", "40.0%", "80"),
        ("4. Short-form & Meta Boost", "2,000", "8.0%", "160", "25.0%", "40"),
        ("TOTAL CAMPAIGN FUNNEL", "6,290", "23.4%", "1,470", "34.0%", "500")
    ]

    table_shape = s4.shapes.add_table(6, 6, Inches(1.0), Inches(2.5), left_w - Inches(0.4), Inches(2.2))
    table = table_shape.table
    table.columns[0].width = Inches(2.1)
    table.columns[1].width = Inches(0.9)
    table.columns[2].width = Inches(0.85)
    table.columns[3].width = Inches(0.8)
    table.columns[4].width = Inches(0.85)
    table.columns[5].width = Inches(0.9)

    for r_idx, row in enumerate(fn_rows):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            cell.text = val
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            cp = cell.text_frame.paragraphs[0]
            cp.alignment = PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT
            cp.font.size = Pt(8.5)
            if r_idx == 0:
                cp.font.bold = True
                cp.font.color.rgb = WHITE
                cell.fill.solid()
                cell.fill.fore_color.rgb = DARK_BLUE
            elif r_idx == 5:
                cp.font.bold = True
                cp.font.color.rgb = PRIMARY_BLUE
                cell.fill.solid()
                cell.fill.fore_color.rgb = RGBColor(238, 242, 255)
            else:
                cp.font.color.rgb = NAVY
                cell.fill.solid()
                cell.fill.fore_color.rgb = WHITE if r_idx % 2 == 1 else RGBColor(248, 250, 252)

    # Narrative explanations below table
    tb_notes = s4.shapes.add_textbox(Inches(1.0), Inches(4.85), left_w - Inches(0.4), Inches(2.0))
    tf_notes = tb_notes.text_frame
    tf_notes.word_wrap = True
    
    p = tf_notes.paragraphs[0]
    p.text = "Key Funnel Assumptions & Rationale:"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = NAVY

    notes = [
        "WhatsApp Open & Click Rates: High CTR (20%) reflects high trust when shared directly by classmates or CRs.",
        "Landing Page Conversion (34% avg): Boosted by frictionless 1-page form, zero credit card, and immediate AI Idea Hook value.",
        "Referral Multiplier: 340 baseline signups × 80% share intention × 1.76 friends clicked = 480 clicks -> 160 new signups (K = 0.32).",
        "CAC: ₹2,000 / 500 = ₹4.00 per registered engineering student."
    ]
    for n in notes:
        pn = tf_notes.add_paragraph()
        pn.space_before = Pt(3)
        pn.text = "• " + n
        pn.font.size = Pt(8.5)
        pn.font.color.rgb = DARK_BLUE

    # Right: Exact ₹2,000 Budget Breakdown (Width: 4.6 Inches)
    right_w = Inches(4.6)
    right_x = Inches(0.8) + left_w + Inches(0.33)
    add_card(s4, right_x, Inches(1.7), right_w, Inches(5.3))

    tb_bg = s4.shapes.add_textbox(right_x + Inches(0.2), Inches(1.85), right_w - Inches(0.4), Inches(5.0))
    tf_bg = tb_bg.text_frame
    tf_bg.word_wrap = True

    p = tf_bg.paragraphs[0]
    p.text = "💰 EXACT ₹2,000 BUDGET ALLOCATION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = EMERALD

    budget_items = [
        ("Campus Ambassador Incentives", "₹1,000", "50.0%", 
         "₹200 Amazon Gift Cards × 5 Top Performing Ambassadors who drive 30+ verified signups. Guarantees campus hustle & competitive pride."),
        ("Meta / Instagram Micro-Boost", "₹600", "30.0%", 
         "₹200/day for 3 days (Days 3-5). Hyper-targeted to Tier-2/3 college geolocation pins, Age 20-22, Interests: Python, AI, Campus Placement."),
        ("Workshop Live Hackathon Prize", "₹400", "20.0%", 
         "1 × ₹400 voucher (Amazon/BookMyShow) awarded live during minute 50 to a student who deploys their project live. Drives live attendance & show rate."),
        ("Hosting & Tooling Stack", "₹0", "0.0%", 
         "Vercel (Free), Supabase (Free tier), Google Sheets Apps Script (Free), Canva (Free), Gemini API (Free tier), WhatsApp Web (Free).")
    ]

    for title, amt, pct, desc in budget_items:
        p_item = tf_bg.add_paragraph()
        p_item.space_before = Pt(8)
        r_t = p_item.add_run()
        r_t.text = f"{title} — {amt} ({pct})\n"
        r_t.font.bold = True
        r_t.font.size = Pt(9.5)
        r_t.font.color.rgb = NAVY

        r_d = p_item.add_run()
        r_d.text = desc
        r_d.font.size = Pt(8.5)
        r_d.font.color.rgb = TEXT_MUTED

    p_tot = tf_bg.add_paragraph()
    p_tot.space_before = Pt(14)
    r_sum = p_tot.add_run()
    r_sum.text = "TOTAL BUDGET: ₹1,000 + ₹600 + ₹400 + ₹0 = ₹2,000 EXACT"
    r_sum.font.bold = True
    r_sum.font.size = Pt(10)
    r_sum.font.color.rgb = EMERALD

    # ==========================================
    # SLIDE 5: METRICS, RISKS & DAY-3 CONTINGENCY
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    bg5 = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg5.fill.solid()
    bg5.fill.fore_color.rgb = LIGHT_BG
    bg5.line.fill.background()

    add_header(s5, "05", "Risk Management & Measurement", 
               "Metrics, Diagnostic Triggers & Day-3 Contingency Plan", 
               "Systematic risk mitigation to ensure the 500 registration target is hit regardless of initial channel drag.")

    # 3 Column Cards
    top_pos5 = Inches(1.7)
    card_h5 = Inches(5.3)

    # Card 1: Core North Star & Supporting KPIs
    add_card(s5, Inches(0.8), top_pos5, col_w, card_h5)
    tb_m = s5.shapes.add_textbox(Inches(1.0), top_pos5 + Inches(0.2), col_w - Inches(0.4), card_h5 - Inches(0.4))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True

    p = tf_m.paragraphs[0]
    p.text = "📈 KPI FRAMEWORK & NORTH STAR"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    kpis = [
        ("North Star Metric: ", "500 Verified Registrations (unique email + WhatsApp number, final-year engineering)."),
        ("Viral Coefficient (K-Factor): ", "Target K ≥ 0.30 (currently modeled at 0.32). Every 10 registrants generate 3+ referrals."),
        ("Ambassador Velocity: ", "Target 15+ registrations per active ambassador across top 15 colleges."),
        ("Landing Page Conversion Rate: ", "Target 30-35% on mobile visits."),
        ("Live Show Rate (Downstream): ", "Target 55%+ (275+ students live in workshop) driven by 3-stage WhatsApp reminder sequence.")
    ]
    for b_txt, n_txt in kpis:
        p = tf_m.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + b_txt
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = n_txt
        r2.font.size = Pt(9)
        r2.font.color.rgb = DARK_BLUE

    # Card 2: Strategic Risks & Built-in Defenses
    add_card(s5, Inches(0.8) + col_w + gap, top_pos5, col_w, card_h5)
    tb_r = s5.shapes.add_textbox(Inches(0.8) + col_w + gap + Inches(0.2), top_pos5 + Inches(0.2), col_w - Inches(0.4), card_h5 - Inches(0.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True

    p = tf_r.paragraphs[0]
    p.text = "⚠️ IDENTIFIED RISKS & DEFENSES"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ORANGE

    risks = [
        ("Risk: WhatsApp link marking as spam or admin deletion", 
         "Defense: Ambassadors post personal intro notes explaining why they are attending before posting link; share to CRs first."),
        ("Risk: Referral drop-off (students don't share)", 
         "Defense: Immediate psychological hook: instant progress bar (0/3), previewing the exact VIP Project Pack download lock."),
        ("Risk: Low attendance despite high registrations", 
         "Defense: Multi-touch reminder sequence (T-24h, T-1h, T-10m) + ₹400 live deployment hackathon voucher incentive."),
        ("Risk: Non-final year student dilution", 
         "Defense: Form branch and graduation year dropdown validation (2025/2026/2027 priority).")
    ]
    for b_txt, n_txt in risks:
        p = tf_r.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = b_txt + "\n"
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = "↳ " + n_txt
        r2.font.size = Pt(8.5)
        r2.font.color.rgb = TEXT_MUTED

    # Card 3: Day-3 Behind Pace Contingency Playbook
    add_card(s5, Inches(0.8) + (col_w + gap)*2, top_pos5, col_w, card_h5)
    tb_c = s5.shapes.add_textbox(Inches(0.8) + (col_w + gap)*2 + Inches(0.2), top_pos5 + Inches(0.2), col_w - Inches(0.4), card_h5 - Inches(0.4))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True

    p = tf_c.paragraphs[0]
    p.text = "🚨 DAY-3 BEHIND-PACE CONTINGENCY"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(220, 38, 38) # RED

    p_trig = tf_c.add_paragraph()
    p_trig.space_before = Pt(4)
    r_tr = p_trig.add_run()
    r_tr.text = "DIAGNOSTIC TRIGGER:\nIf Total Registrations < 175 by Day 3, 11:59 PM (Target: 215):"
    r_tr.font.bold = True
    r_tr.font.size = Pt(9)
    r_tr.font.color.rgb = RGBColor(185, 28, 28)

    actions = [
        ("Lever A: Flash Ambassador Sprint", 
         "Double referral points for 24 hours. Instant ₹100 Swiggy voucher to the first 5 ambassadors to add 10 new signups."),
        ("Lever B: WhatsApp Group Direct Audio Drop", 
         "Ambassadors drop a 45-second informal voice note: 'Guys, I checked the curriculum, they're teaching real API integration, not basic slides.'"),
        ("Lever C: Reallocate Ad Spend", 
         "Immediately divert remaining ₹400 Meta ad budget directly to top-performing college clusters with highest historical CVR."),
        ("Lever D: Placement Rep Circular", 
         "Trigger pre-written urgent notice template to college placement WhatsApp groups emphasizing placement eligibility boost.")
    ]
    for b_txt, n_txt in actions:
        p = tf_c.add_paragraph()
        p.space_before = Pt(6)
        r1 = p.add_run()
        r1.text = "• " + b_txt + "\n"
        r1.font.bold = True
        r1.font.size = Pt(9)
        r1.font.color.rgb = NAVY
        r2 = p.add_run()
        r2.text = n_txt
        r2.font.size = Pt(8.5)
        r2.font.color.rgb = DARK_BLUE

    # Save presentation
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_file = os.path.join(out_dir, "NxtWave_Growth_Plan_500_Registrations.pptx")
    create_deck(out_file)
