/**
 * ATHLETE SINGLE SOURCE OF TRUTH — YASHAS GOWDA (YASHU)
 * Strictly verified district-level volleyball player information.
 * Easily editable by athlete or team management.
 */

export const ATHLETE_DATA = {
  identity: {
    fullName: "YASHAS GOWDA",
    displayName: "YASHU",
    age: 20,
    location: "Bangalore, Karnataka, India",
    sport: "Volleyball",
    level: "District Level",
    position: "Outside Attacker",
    jerseyNumber: 17,
    dominantHand: "Right",
    experienceYears: 3,
    startedPlayingYear: 2021,
    club: "EPCET Volleyball Club",
    motto: "THIS IS ONLY THE BEGINNING.",
    supportingTaglines: [
      "BUILT TO ATTACK.",
      "RISE. ATTACK. REPEAT.",
      "EVERY POINT STARTS WITH PASSION.",
      "THE NEXT LEVEL STARTS HERE."
    ],
    bioStatement: "Started with passion. Built through repetition. Driven by the next point.",
    personalQuote: "I play volleyball because on the court, every fraction of a second is an opportunity to rise above limitations."
  },

  stats: [
    { label: "YEARS OLD", value: 20, suffix: "", caption: "Prime athletic growth" },
    { label: "JERSEY NUMBER", value: 17, prefix: "#", caption: "Outside Attacker" },
    { label: "YEARS PLAYING", value: 3, suffix: " YRS", caption: "Continuous dedication" },
    { label: "STARTED PLAYING", value: 2021, prefix: "", caption: "Found the court" },
    { label: "DISTRICT TOURNAMENTS", value: 2, suffix: "", caption: "Competitive arena experience" },
    { label: "CORE WEAPONS", value: 3, suffix: " SKILLS", caption: "Spike · Serve · Attack" }
  ],

  strengths: [
    {
      id: "spiking",
      name: "SPIKING",
      role: "PRIMARY ATTACK WEAPON",
      description: "High-reach vertical elevation combined with rapid right-hand arm swing mechanics and precision cross-court angle targeting.",
      metrics: {
        focus: "Explosive Takeoff & Penetration",
        style: "Outside Pin Hitter",
        power: "High Velocity Drive"
      }
    },
    {
      id: "serving",
      name: "SERVING",
      role: "TACTICAL OFFENSE",
      description: "Aggressive topspin and hybrid float service designed to disrupt opponent defensive formations and create offensive break points.",
      metrics: {
        focus: "Trajectory Control & Speed",
        style: "Jump / Tactical Serve",
        pressure: "Deep Baseline Attack"
      }
    },
    {
      id: "attacking",
      name: "ATTACKING",
      role: "OVERALL PLAY IDENTITY",
      description: "Dynamic transition footwork from defensive coverage into explosive offensive approaches across out-of-system rallies.",
      metrics: {
        focus: "Rally Transition & Momentum",
        style: "Front-Row Outside Pressure",
        mindset: "Fearless Net Aggression"
      }
    }
  ],

  futureSkills: [
    { name: "BLOCKING", status: "In Development", description: "Pin-to-pin penetration and reading setter tempo" },
    { name: "RECEIVING", status: "In Development", description: "Platform stability against heavy jump servers" },
    { name: "DEFENSE", status: "In Development", description: "Deep court positioning and floor roll recovery" },
    { name: "FOOTWORK", status: "Continuous Polish", description: "4-step acceleration mechanics and kinetic plant transfer" }
  ],

  journey: [
    {
      year: "2021",
      title: "THE START",
      subtitle: "First Touch on the Court",
      description: "Yashu picked up the volleyball driven by raw passion and curiosity, discovering the rhythm and kinetic energy of the sport.",
      verified: true
    },
    {
      year: "2022",
      title: "THE GRIND",
      subtitle: "Fundamentals & Conditioning",
      description: "Relentless daily repetitions: refining the approach footwork, vertical leap mechanics, arm swing acceleration, and physical endurance.",
      verified: true
    },
    {
      year: "2023",
      title: "THE COMPETITION",
      subtitle: "Tournament Experience",
      description: "Stepping onto competitive club and inter-collegiate courts, facing fast-paced attacks and earning valuable match experience.",
      verified: true
    },
    {
      year: "CURRENT",
      title: "DISTRICT LEVEL",
      subtitle: "EPCET Volleyball Club",
      description: "Competing as a primary Outside Attacker wearing #17, contesting 2 District-Level Tournaments and driving team offense.",
      verified: true
    },
    {
      year: "HORIZON",
      title: "THE NEXT LEVEL",
      subtitle: "Ascension & Growth",
      description: "Training toward state-level selection, tournament championships, and expanding offensive versatility. The story is being written.",
      verified: false,
      isOpenSlot: true
    }
  ],

  achievements: [
    {
      title: "DISTRICT LEVEL ATHLETE",
      organization: "Bangalore Volleyball Circuit",
      tag: "COMPETITIVE STATUS",
      description: "Active competitive player in the Bangalore district volleyball competitive circuit representing EPCET.",
      verified: true
    },
    {
      title: "2 DISTRICT TOURNAMENTS",
      organization: "District Association",
      tag: "COMPETITIVE MATCHES",
      description: "Contested 2 full district-tier competitive volleyball championships as primary starting Outside Attacker.",
      verified: true
    },
    {
      title: "EPCET VOLLEYBALL CLUB",
      organization: "EPCET Athletics",
      tag: "STARTING OUTSIDE ATTACKER #17",
      description: "Key attacking asset for EPCET Volleyball Club, directing offensive spikes and defensive rally transitions.",
      verified: true
    },
    {
      title: "NEXT ACHIEVEMENT",
      organization: "In Progress",
      tag: "ROADMAP",
      description: "Currently preparing for upcoming district and state invitational championships. This slot awaits the next victory.",
      verified: false,
      isOpenSlot: true
    },
    {
      title: "NEXT ACHIEVEMENT",
      organization: "In Progress",
      tag: "ROADMAP",
      description: "Expanding tournament appearances and club honors.",
      verified: false,
      isOpenSlot: true
    }
  ],

  gallery: [
    {
      id: "gal-1",
      category: "PORTRAITS",
      title: "Athlete Profile — #17",
      caption: "Yashas Gowda (YASHU) · EPCET Volleyball Club",
      src: "./images/profile/yashu_portrait.jpg",
      featured: true
    },
    {
      id: "gal-2",
      category: "ACTION",
      title: "Aerial Smash Takeoff",
      caption: "Explosive vertical jump spike above the net",
      src: "./images/action/spike_action.jpg",
      featured: true
    },
    {
      id: "gal-3",
      category: "ACTION",
      title: "Jump Serve Release",
      caption: "High-toss topspin tactical serve execution",
      src: "./images/action/serve_action.jpg",
      featured: true
    },
    {
      id: "gal-4",
      category: "TRAINING",
      title: "The Arena Grind",
      caption: "Dark court training facility — repetition builds mastery",
      src: "./images/training/training_facility.jpg",
      featured: false
    },
    {
      id: "gal-5",
      category: "TOURNAMENT",
      title: "District Championship Round",
      caption: "District-level tournament competition in Bangalore",
      src: "./images/tournaments/district_tournament_1.jpg",
      featured: false
    },
    {
      id: "gal-6",
      category: "TEAM",
      title: "EPCET Club Attack Unit",
      caption: "Starting Outside Attacker #17 with the squad",
      src: "./images/team/epcet_team.jpg",
      featured: false
    }
  ],

  contact: {
    email: "yashasgowda.volleyball@example.com",
    instagram: "@yashu_17_vb",
    location: "Bangalore, Karnataka, India",
    club: "EPCET Volleyball Club",
    opportunities: [
      "Club & University Team Opportunities",
      "District & State Tournament Rosters",
      "Athletic Sponsorship & Brand Collaborations",
      "Exhibition Matches & Training Camps"
    ]
  }
};
