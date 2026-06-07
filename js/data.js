// App state
const state = {
    name: '',
    brick:'',
    brickPain:0,
    brickEmoji: '🧱',
    time: '',
    sock: '',
    blame: '',
    signed: false,
    _diag: '',
    _icd: '',
    _rx: [],
    _date: '',
    _case: '',
    _rank: '',
    _score: 0,
    _prevScreen: 'screen-intro'
};

let sessionSurvivors = [];

const DIAGNOSES = [
    "Acute Podiatric LEGO Trauma (APLT)",
    "Stud Impression Syndrome (SIS)",
    "Nocturnal Navigation Failure (NNF)",
    "Critical 1x1 Encounter Disorder",
    "Post-Traumatic Brick Stress (PTBS)",
    "Technic Connector Penetration (TCP)",
    "Preventable Self-Inflicated Suffering", 
    "Domestic Hazard Overexposure (DHO)"
];

const ICD_CODES = [
    "S90.112A - LEGO stud contusion, initial encounter",
    "W22.19XA - Struck by small plastic building element",
    "Z91.89 - Personal history of preventable suffering",
    "X58.XXXA - Domestic construction toy hazard exposure",
    "F43.12 - Post-traumatic brick stress disorder",
    "T14.90XA - Unspecified LEGO-related foot injury"
];

const PRESCRIPTIONS = [
    'Wear shows at all hours, including inside the house',
    'Scream once, loadly, then move on (1x per incident, supervised)',
    'Write a strongly-worded letter to LEGO HQ, Billund, Denmark',
    'Install infrared brick-detection floor sensors (patent pending)',
    '30-day ban from walking barefoot near toy areas',
    'Night vision goggles, wear them at all times, no exceptions',
    'LEGO floor sweep ritual, 3x daily, before every meal',
    'Acknowledge that socks exist and are completely free',
    "Meditate on the impermanence of toe comfort",
    'Sue the brick (small claims court, jurisdiction: Denmark',
    'Mandatory sock subscription box, monthly, auto-renewing',
    'Seek counselling for denial of brick-related dangers'
];

const RANKS = [
    "LEGO SURVIVOR | BASIC CLASS",
    'CERTIFIED BRICK VICTIM (LEVEL 1)',
    'VETERAN FOOT SOLDIER',
    'MASTER OF UNNECESSARY SUFFERING',
    'GRAND WIZARD OF STUD INJURIES'
];

const PAIN_VERDICTS = {
    low: ["Soft. Embarrassing.", "Duplo doesn't count.", "try stepping on a real brick.", "Our lawyers call this 'a tickle.'"],
    mid: ["That definitely hurt", "We believe you. Mostly.", "Solid mid-tier suffering.", "Not bad. Not good. Painful."],
    high: ["Legitimate agony.", "Full foot catastrophe.", "We are so sorry.", "This qualifies for compensation."],
    max: ["MAXIMUM SUFFERING.", "We cann't legally show the x-ray.", "You have our deepest condolences.", "The brick wins. It always wins."]
};

const STORIES = {
  "Classic 2x4 Red Brick":
    "Victim was walking to the kitchen when a 2x4 red brick, stud-side up, was encountered dead center of the hallway floor. Victim reports seeing colours. The brick was still there in the morning.",
  "Tiny 1x1 Transparent Plate":
    "A transparent 1x1 plate - invisible against the floor - was encountered at 100% body weight. Victim states this is maximum pain per unit area and has requested a full investigation.",
  "Gray Technic Connector":
    "A Technic connector with four studs pointing vertically upward was left at the base of the stairs. Victim's heel landed at a perfect 90° angle. Victim reports a sound they cannot unhear.",
  "Giant Duplo Brick":
    "A large Duplo brick was encountered in what should have been a clear path. While the victim insists it wasn't that bad, the fact they are here filing this report tells a different story.",
  "Sharp Technic Axle":
    "A Technic axle was found on the floor. Investigators describe it as a tiny spear. Full foot contact was made. The axle left a mark classified as the Brickland Brand.",
  "Unknown Brick (it was dark)":
    "At approximately 3AM, victim encountered an unidentified LEGO element in total darkness. The brick has not been identified. Forensics are pending. Victim stepped on something, and that is enough.",
  "Multiple Bricks in Ambush Formation":
    "Three or more bricks were arranged in a pattern inconsistent with random dispersal. Victim suspects deliberate placement by a household member. A full investigation is open. No arrests have been made.",
  "LEGO Wheel (rolling hazard)":
    "A LEGO wheel was found near the impact zone. Witnesses report the wheel was in motion, rolling the foot outward upon contact. The wheel has been classified as a rolling hazard."
};

const FAKE_PATIENTS = [
    { name: "Ahmed Mohamed", emoji: "😤", brick: "Classic 2x4 Red Brick", score: 8700 },
    { name: "Abdullah Omar", emoji: "😭", brick: "Technic Connector", score: 9400 },
    { name: "Omar Abdelrahman", emoji: "🦵", brick: "Transparent 1x1 Plate", score: 9900 },
    { name: "Yassin Mohamed", emoji: "👵", brick: "All 847 of them", score: 7600 },
    { name: "Baraa Khaled", emoji: "🌙", brick: "Unknown brick (3AM)", score: 8100 },
    { name: "ALi Mohamed", emoji: "💪", brick: "Duplo (the coward's brick)", score: 4500 },
];

const QUEUE_PATIENTS = [
    { name: 'Ahmed Mohamed', emoji: "😤", complaint: "3AM cereal run. Red 2x4. Pressing charges." },
    { name: 'Abdullah Omar', emoji: "😭", complaint: "Technic connector. Full body weight." },
    { name: 'Omar Abdelrahman', emoji: "🦵", complaint: "1x1 plate. Maximum pain. Has a PowerPoint." },
];

const WAIT_FACTS = [
    "The average LEGO brick can support 4,240 Newtons of force before breaking. Your foot could not.",
    "There are approximately 80 LEGO bricks for every person on Earth. They are winning.",
    "The 1x1 round plate is scientifically the most painful LEGO element. You know this now.",
    "LEGO produces around 306 million tiny tires per year. Every single one is a threat.",
    "LEGO bricks are made to a tolerance of 0.002mm. They are more precise than your hospital.",
    "In 2015, a British man ran a half-marathon barefoot on LEGO bricks. He is considered legally insane.",
    "The LEGO Group has never publicly acknowledged the pain it has caused. This website is the resistance."
];

const TICKER_TEMPLATES = [
  "BREAKING: {name} STEPS ON LEGO BRICK AT {time} — FULL STORY AT 11",
  "EXCLUSIVE: Local {name} suffers {brick} encounter — Brick still at large",
  "URGENT: Brickland NHS overwhelmed following {name}'s {brick} incident",
  "SOURCES CONFIRM: {name} was barefoot at time of {brick} attack",
  "DEVELOPING: {name} files official report against rogue {brick} — legal team assembled",
  "ALERT: {brick} spotted in {name}'s residence — public warned to wear shoes",
  "LIVE COVERAGE: {name} spotted limping — {brick} suspected — investigation ongoing",
  "WORLD EXCLUSIVE: {name} survives {brick} — claims 'will never build LEGO again'"
];

const BRICK_ALIASES = {
    'Classic 2x4 Red Brick': '"The Red Terror" | "Public Enemy No. 4x2"',
    'Tiny 1x1 Transparent Plate': '"The Invisible Menace" | "Ghost Stud"',
    'Gray Technic Connector': '"The Four-Headed Beast" | "Sergeant Stud"',
    'Giant Duplo Brick' : '"Big Easy" | "The Embarrassing One"',
    'Sharp Technic Axle': '"The Needle" | "Tiny Spear"',
    'Unknown Brick (it was dark)': '"John Doe" | "The Shadow" | Unknown Perp"',
    'Multiple Bricks in Ambush Formation': '"The Cartel" | "Brick Gang" | "The Formation"',
    'LEGO Wheel (rolling hazard)': '"Rolly" | "The Getaway Wheel"'
};

const BRICK_CHARGES = {
    'Classic 2x4 Red Brick': ['Aggravated stud assault', 'Domestic floor contamination', 'Willful placement in high-traffic area'],
    'Tiny 1x1 Transparent Plate': ['Operating while invisible', 'Evading foot detection', 'Causing maximum pain per unit area'],
    'Gray Technic Connector': ['Four-count assault (one per stud)', 'Failure to lay flat', 'Terrorising unprotected feet'],
    'Giant Duplo Brick' : ['Impersonating a serious hazard', 'Causing disproportionate reaction', 'Being embarrassingly large'],
    'Sharp Technic Axle': ['Possession of a pointy end', 'War crimes against the sole', 'Deliberately failing to be blunt'],
    'Unknown Brick (it was dark)': ['Operating under cover of darkness', 'Refusing to be identified', 'Forensic evasion'],
    'Multiple Bricks in Ambush Formation': ['Conspiracy to cause foot pain', 'Operating as an organised unit', 'Premeditated floor trap'],
    'LEGO Wheel (rolling hazard)': ['Operating as a rolling hazard', 'Fleeing the scene post-impact', 'Vehicular foot assault']
}

const BRICK_DANGER = {
    'Classic 2x4 Red Brick': 'HIGH ⚠️',
    'Tiny 1x1 Transparent Plate': 'EXTREME ☠️',
    'Gray Technic Connector': 'CRITICAL ☠️',
    'Giant Duplo Brick': 'LOW (Embarrassing)',
    'Sharp Technic Axle': 'SEVERE ⚠️',
    'Unknown Brick (it was dark)': 'UNKNOWN ❓',
    'Multiple Bricks in Ambush Formation':'EXTREME ☠️',
    'LEGO Wheel (rolling hazard)': 'MODERATE ⚠️'
};

const ALL_BADGES = [
  { id: 'first_step', emoji: '🩸', name: 'First Blood',   desc: 'Complete your first injury report',  cond: () => true },
  { id: 'three_am', emoji: '🌙', name: '3AM Warrior',desc: 'Stepped on a brick at 3AM',cond: () => state.time && state.time.includes('3:17') },
  { id: 'barefoot', emoji: '👣', name: 'No Protection',desc: 'Was completely barefoot',cond: () => state.sock && state.sock.includes('Barefoot') },
  { id: 'technic', emoji: '⚙️', name: 'Technic Survivor',desc: 'Survived a Technic Connector',cond: () => state.brick && state.brick.includes('Technic') },
  { id: 'max_pain', emoji: '💀', name: 'Maximum Suffering',  desc: 'Brick pain level reached 95+',cond: () => state.brickPain >= 95 },
  { id: 'ambush', emoji: '💥', name: 'Ambush Victim',desc: 'Stepped on multiple bricks',cond: () => state.brick && state.brick.includes('Ambush') },
  { id: 'invisible',emoji: '🔬', name: 'Found The Invisible', desc: 'Stepped on a transparent 1x1',cond: () => state.brick && state.brick.includes('1×1') },
  { id: 'blame_cat', emoji: '🐱', name: 'Cat Conspiracy',desc: 'Blamed the cat',cond: () => state.blame && state.blame.includes('cat') },
  { id: 'blame_lego',emoji: '⚖️', name: 'Going To Court',desc: 'Blamed LEGO Group HQ',cond: () => state.blame && state.blame.includes('LEGO Group') },
  { id: 'duplo', emoji: '🟦', name: 'Duplo Disgrace',desc: 'Stepped on a Duplo brick (really?)', cond: () => state.brick && state.brick.includes('Duplo') }
];

const CALL_SCRIPT = [
    { role: 'operator', text: 'Brickland Emergency Services, what is your emergency?' },
    { role: 'caller', text: () => `I stepped on a LEGO brick. ${state.brick || 'A brick'}. Please send me help.`},
    { role: 'operator', text: "Can you confirm the type of brick involved, sir/madam?" },
    { role: 'caller', text: () => `It was a ${state.brick || 'brick'}. I cannot describe the pain. There are no words.`},
    { role: 'operator', text: 'Were you wearing protective footwear at the time of the incident?'},
    { role: 'caller', text: ()=> `${state.sock ? state.sock.split('(')[0].trim() : "No socks"}. I know. I know.` },
    { role: 'operator', text: 'Units are being dispatched. Do you know who is the responsible for placing the brick?'},
    { role: 'caller', text: () => `${state.blame ? state.blame.split('(')[0].trim() : "I don't know"}. I have my suspicions.` },
    { role: 'operator', text: 'Please remain calm. Our LEGO Specialist Unit will arrive shortly. You are not alone.' },
    { role: 'caller', text: 'Thank you. Please hurry. It still hurts. It always hurts.' },
    { role: 'operator', text: 'One final question, have you been offered an Official Injury Report Form?' },
    { role: 'caller', text: 'No, but I would like one immediately. This is going on record.' },
    { role: 'operator', text: 'Confirmed. Case number assigned. Please proceed to the Brickland NHS Online Portal. Stay strong.' }
]

