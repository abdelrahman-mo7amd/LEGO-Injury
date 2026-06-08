<p align="center">
  <img src="assets/banner.png" alt="You Stepped On A LEGO Banner" width="100%">
</p>

# LEGO Injury Report

### *The Only Officially Unofficial Survivor Document You Never Asked For*

<div align='center'>

![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)
![Bricks Stepped On](https://img.shields.io/badge/bricks%20stepped%20on-too%20many-orange?style=for-the-badge)

**A full-stack, multi-screen, legally-binding-in-no-jurisdiction web experience for people who have suffered enough from walking on lego bricks**

</div>

---

> *"I stepped on a LEGO at 3AM. I needed closure. I built an enitre wep app instead of going back to sleep. No regrets."*
> --> The developer, probably.


## What Is This?

**LEGO Injury Report** is a multi-screen comedy web experience that walks LEGO brick victims through the full bureaucratic nightmare of filing an official injury report - complete with: 

- A **911 emergency call transcript** (animated, obviously)
- A **forensic crime scene photo** (SVG rendered, because we're professionals)
- A **Most Wanted Poster** for the brick
- An **official NHS-style form** you have to sign
- A **Waiting Room** with a real queue of other patients. You have to wait also
- A **Survivor Certificate** you can actually download and share, be proud.

- A **Hall of Shame** leaderboard, more hurt, higher rank.
- **Achievements** for special kinds of suffering (stepping on a transparent 1x1 unlocks *"Found the Invisible"*)

It's a joke. It's also a surprisingly complete single-page web app. make of that what you will.

---

## Screenshots
| Screen | Description |
|--------|-------------|
| ![Intro Screen](assets/intro.png) | **Splash Screen** - Where it all begins. Animated bricks floating in the background like your dignity, slowly drifting away. |
| ![Setup Form](assets/setup.png) | **Injury Setup** - Select your brick, assess your pain in real time, and confirm you were indeed barefoot at 3AM. |
| ![911 Call](assets/911.png) | **Emergency Call** - A full animated transcript of your 911 call. The operator has seen worse. Probably. |
| ![Wanted Poster](assets/wanted.png) | **Wanted Poster** - Every brick is a criminal. This is their mugshot. |
| ![Crime Scene](assets/crime-scene.png) | **Crime Scene** - A forensic SVG reconstruction of the incident. EXHIBIT A. |
| ![Official Report](assets/report.png) | **Official Report** - Fill it out, sign it, submit it. This is going on your permanent record. |
| ![Waiting Room](assets/waiting.png) | **Waiting Room** - Three other patients ahead of you. Abdelrahman Mohamed stepped on a Technic Connector. He has a PowerPoint. |
| ![Certificate](assets/certificate.png) | **Survivor Certificate** - You made it. Download it. Frame it. Put it on your LinkedIn. |


---

## Features:
### The full experience
- **8 fully animated screens**: each one a different stage of grief
- **8 brick types** to choose from, each with a unique pain level, crime scene photo, 911 call, wanted poster, charges, and story
- **Real-time pain meter** - watch it fill up as you select your brick. The 1×1 transparent plate hits 99%. We're sorry.
- **Animated 911 call transcript** - messages appear one by one with typing indicators, like a real conversation, except the emergency is a toy

### 📋 The Paperwork
- **Official injury form** with diagnosis, ICD code, treatment prescription, and a damages section that includes *"Lost Dignity"*
- **Click-to-sign** signature field, it writes your name in cursive because of course it does
- **Prescription pad** with three randomised treatments (e.g. *"Write a strongly-worded letter to LEGO HQ, Billund, Denmark"*)
- **Downloadable Survivor Certificate** via `html2canvas` - actually saves to your device


# Getting Started! 

### Prerequisties 

```
- A web browser (any will do, even that one you haven't updated since 2019)
- A LEGO-related injury (strongly recommended for authenticity)
- Socks (in hindsight)
```

### Installation
This project has **zero dependencies**, **zero build steps**, and **zero excueses**.

```bash
# clone teh repo
git clone https://github.com/abdelrahman-mo7amd/LEGO-Injury.git
cd LEGO-Injury
open index.html
```

That's it. 

## Project Structure:
```
lego-injury-report/
│
├── index.html
│
├── css/
│   ├── variables.css
│   ├── screens.css
│   └── components.css
│
├── js/
│   ├── data.js
│   ├── utils.js
│   ├── sound.js
│   ├── navigation.js
│   ├── ticker.js
│   ├── achievements.js
│   ├── setup.js
│   ├── crimeScene.js
│   ├── reportForm.js
│   ├── waitingRoom.js
│   ├── results.js
│   ├── call911.js
│   ├── wantedPoster.js
│   └── init.js
│
└── assets/
```

---

## 🛠 Tech Stack

Built entirely with **vanilla everything**. No frameworks were harmed in the making of this project.

| Layer | Technology | Why |
|-------|-----------|-----|
| Markup | HTML5 | It's a webpage. Come on. |
| Styling | CSS3 + Custom Properties | Variables, animations, the works |
| Logic | Vanilla JavaScript (ES6+) | Zero dependencies. Pure chaos. |
| Audio | Web Audio API | All sounds generated in real time - no audio files |
| Graphics | Inline SVG | Crime scene photos, dynamically generated |
| Certificate Export | `html2canvas` (CDN) | The only external library. It earns its keep. |
| Fonts | Google Fonts | Bebas Neue, DM Mono, Permanent Marker |
| Build Tool | None | `open index.html`. We're done here. |



## 🤝 Contributing

Found a bug? Want to add a new brick? Want to make Abdelrahman's pain score even higher? PRs are welcome.

```bash
# fork the repo
# create your feature branch
git checkout -b feat/add-new-brick-type

# make your changes
# commit with a descriptive message
git commit -m "feat: add Technic gear wheel - rotating hazard, 85/100 pain"

# push and open a PR
git push origin feat/add-new-brick-type
```

### Contribution Guidelines

- New bricks need: a pain level, emoji, crime scene SVG, wanted poster charges, 911 call responses, and a story. They are criminals. Treat them as such.
- Keep the tone: bureaucratic, deadpan, slightly unhinged.
- No `npm install`. If you find yourself writing a `package.json`, please lie down until the feeling passes.
- All injuries must be LEGO-related. This is not a general injury report app. We have standards.

---

## 📜 License

MIT | do whatever you want with it.

MIT isn't mean the Massachusetts Institute of tech, hahaha, i hope i got accepted.

Though if you use this to actually sue LEGO Group, Billund, Denmark, please let us know how it goes.

```
MIT License

Copyright (c) 2026 LEGO Injury Report

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to step on it barefoot at 3AM and file a report about it.
```

---

## 🙏 Acknowledgements

- **LEGO Group, Billund, Denmark**: for creating the most painful flooring accessory in human history. We owe you everything. We are also suing you.
- **The 1×1 Transparent Plate**: for proving that the most dangerous things in life are the ones you can't see.
- **Abdelrahman Mohamed**: for his continued patience in the waiting room and for not actually showing us the PowerPoint.
- **Every barefoot parent who ever walked to the kitchen at 3AM**: this one's for you. You know who you are. Your suffering was not in vain.
- **The cat**: we know it was you.

---

<div align="center">

⭐ **Star this repo** if you've ever stepped on a LEGO brick.
⭐ **Star this repo twice** if it was a Technic Connector.

</div>
