import { uniqueKey } from "highcharts";

const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


export const data =
{
  image: `${path_image}isth2026-banner-img.png`,
  title: "Join us",
  title1: "Advancing Bleed Solutions for Personalised Care",
  location: "at ISTH, Paris I 11-15 July 2026",
}
  ;
export const data1 = [
  {
    id: 0,
    card_title: "Symposium",
    card_heading: "Closer to Nature. <br/>Designed for Protection.",
    card_dis: "Scientific symposium on ultra8, an <br/>investigational FVIII in development",
    event_date: "Sunday, 12 July. 2026",
    event_time: "12:15 <span> - </span> 13:30 CEST",
    event_location: "Room W05-06",
    event_calander_img: `${path_image}event-calendar-u.svg`,
    event_clock_img: `${path_image}event-clock-u.svg`,
    event_location_img: `${path_image}event-location-u.svg`,
    className: "event-card-1",
    event_ics_file: `${path_image}Closer to Nature Designed for Protection.ics`,
  },
  {
    id: 1,
    card_title: "Symposium",
    card_heading: "From Evidence to Individualisation:",
    card_dis: "Redefining Prophylaxis in von  Willebrand Disease",
    event_date: "Monday, 13 July. 2026",
    event_time: "12:15 <span> - </span> 13:30 CEST",
    event_location: ``,
    event_calander_img: `${path_image}event-calendar-o.svg`,
    event_clock_img: `${path_image}event-clock-o.svg`,
    event_location_img: `${path_image}event-location-o.svg`,
    className: "event-card-2",
    event_ics_file: `${path_image}From Evidence to Individualisation Redefining Prophylaxis in von Willebran Disease.ics`,
  },
  {
    id: 2,
    card_title: "Symposium",
    card_heading:
      "Same Goals, New Paths:",
    card_dis: "Evaluating Today’s Haemostatic <br/> Therapies",
    event_date: "Tuesday, 14 July. 2026",
    event_time: "12:15 <span> - </span> 13:30 CEST",
    event_location: "Room E03-04",
    event_calander_img: `${path_image}event-calendar-p.svg`,
    event_clock_img: `${path_image}event-clock-p.svg`,
    event_location_img: `${path_image}event-location-p.svg`,
    className: "event-card-3",
    event_ics_file: `${path_image}Same Goals New Paths Evaluating Todays Haemostatic Therapies.ics`,
  },

];

export const agenda_details = [
  {
    uniqueId: 101,
    id: 0,
    agenda_heading:
      "Closer to Nature. Designed for Protection.",
    agenda_dis: "Scientific symposium on ultra8, an investigational FVIII in development",
    agenda_details:
      "Join this scientific symposium to review the latest research on ultra8, an innovative ultra–long half-life FVIII technology. Discover new data and expert perspectives on its potential to advance haemophilia A care",
    speakers: [
      {
        img: `${path_image}ultra-andreas-tiede1.png`,
        intro: "Welcome and Introduction",
        details: "Factor VIII: A Foundation of <br/>Haemophilia A Care",
        name: "Chair: Andreas Tiede, DE",
      },
      {
        img: `${path_image}ultra-thomas-guttler1.png`,
        details: "Closer to Nature:<br/> Bringing Native Elements into Factor VIII",
        name: "Thomas Güttler, DE",
      },
      {
        img: `${path_image}ultra-barbara-solecka1.png`,
        details: "Designed for Protection: Functional Evidence",
        name: "Barbara Solecka-Witulska, DE",
      },
    ],

    speaker_videos: [
      {
        id: 0,
        video_img: `${path_image}product-andreas.png`,
        play_icon: `${path_image}play_button_green.svg`,
        video_text: "Listen to Andreas Tiede (Chair) Symposium Teaser",
        video_poster: `${path_image}video-agenda-lines-green.png`,
        video_url:
          "https://docintel.s3.eu-west-1.amazonaws.com/video/Andreas_Q1_v03.mp4", // <-- Add URL here
      },
      {
        video_img: `${path_image}product-thomas.png`,
        play_icon: `${path_image}play_button_green.svg`,
        video_text: "Do not miss Thomas Güttler (Speaker) Symposium Highlight",
        video_poster: `${path_image}video-agenda-lines-green.png`,
        video_url:
          "https://docintel.s3.eu-west-1.amazonaws.com/video/Thomas_Q1_v03_combination.mp4", // <-- Add URL here
      },
    ],
    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Sunday, 12 July. 2026",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 CEST",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room W05-06",
    event_agenda_link: `${path_image}ISTH 2026 Octapharma ultra8.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2026 Symposium Agenda",
    symposium_agenda_sub_heading: "Closer to Nature. Designed for Protection. ",
    symposium_agenda_sub_title: "Scientific symposium on ultra8, an investigational FVIII in development",
    symposium_agenda_video_poster: `${path_image}ultra-green-arrow.png`,
    symposium_agenda_video_poster_mobile: `${path_image}agenda-thumbnail01.png`,
    agenda_play_icon: `${path_image}play-button-green.svg`,
    agenda_bottom_img: `${path_image}paris-skyline-ultra.png`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/ISTH2026ultra8_Agenda_video_09.mp4",
    disclamer_text:
      "This scientific symposium is for healthcare professionals only and is organized and sponsored by Octapharma.",
    className: "symposium-product",
  },
  {
    uniqueId: 102,
    id: 1,
    agenda_heading: "From Evidence to Individualisation: ",
    agenda_dis: "Redefining Prophylaxis in von Willebrand Disease",
    agenda_details:
      "Advances in von Willebrand disease have improved care, but translating them into optimal prophylaxis remains a challenge. Join this interactive symposium to explore new clinical and real-world evidence, and learn how data-driven and PopPK-guided approaches can help individualise treatment strategies.",
    speakers: [
      {
        img: `${path_image}vwd-jill-johnsen1.png`,
        intro: "Welcome and Introduction",
        details: "Gaps in VWD Care: <br/>Are We Doing Enough?",
        name: "Chair: Jill Johnsen, US",
      },
      {
        img: `${path_image}vwd-robert-sidonio1.png`,
        details: "What is “Severe”: <br/> Rethinking Who Needs Prophylaxis in VWD",
        name: "Robert F. Sidonio Jr., US",
      },
      {
        img: `${path_image}vwd-ron-mathot1.png`,
        details: "How Pharmacokinetic Modelling Enables Personalised Prophylaxis in VWD",
        name: "Ron Mathot, NL",
      },
    ],
    speaker_videos: [], // Add if needed
    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Monday, 13 July. 2026",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 CEST",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room W03-04",
    event_agenda_link: `${path_image}ISTH 2026 Octapharma VWD.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2026 Symposium Agenda :",
    symposium_agenda_sub_heading: "From Evidence to Individualisation:",
    symposium_agenda_sub_title: "Redefining Prophylaxis in von Willebrand Disease",
    symposium_agenda_video_poster: `${path_image}wilate-orange-arrow.png`,
    symposium_agenda_video_poster_mobile: `${path_image}agenda-thumbnail02.png`,
    agenda_play_icon: `${path_image}play-button-red.svg`,
    agenda_bottom_img: `${path_image}paris-skyline-vwd.png`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/ISTH_2026wilateAgenda_video_02.mp4",
    disclamer_text:
      "This symposium is for healthcare professionals only and is organised and sponsored by Octapharma. This is a promotional symposium and products will be discussed. Prescribing information may vary depending on local approval in each country. Before prescribing any product, always refer to local materials such as the prescribing information and/or the summary of product characteristics.",
    className: "symposium-wilate",
  },
  {
    uniqueId: 103,
    id: 2,
    agenda_heading: "Same Goals, New Paths:",
    agenda_dis: "Evaluating Today’s Haemostatic Therapies",
    agenda_details:
      "As new data continue to reshape haemostatic care, clinicians are faced with critical choices across multiple treatment pathways. Join this interactive symposium to examine the evidence behind current therapeutic options, compare strategies across key clinical scenarios, and gain insights into optimising patient outcomes through informed decision-making.",
    speakers: [
      {
        img: `${path_image}cc-anne-godier1.png`,
        details: "Welcome and Introduction",
        name: "Chair: Anne Godier, FR",
      },
      {
        img: `${path_image}cc-nicola-curry1.png`,
        details: "Fibrinogen Replacement Therapies: Do Product Differences Matter?",
        name: "Nicola Curry, UK",
      },
      {
        img: `${path_image}cc-joseph-shaw1.png`,
        details: "Choosing the Right FXai Reversal Strategy: An Evidence-Based Look",
        name: "Joseph R. Shaw, CA",
      },
      {
        img: `${path_image}cc-jeannie-callum1.png`,
        details: "Restoring Thrombin Generation in Cardiac Surgery: How Do Current Options Compare?",
        name: "Jeannie Callum, CA",
      },
    ],
    speaker_videos: [], // Add if needed
    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Tuesday, 14 July. 2026",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 CEST",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room E03-04",
    event_agenda_link: `${path_image}ISTH 2026 Octapharma CC.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2025 Symposium Agenda :",
    symposium_agenda_sub_heading: "Same Goals, New Paths:",
    symposium_agenda_sub_title: "Evaluating Today’s Haemostatic Therapies",
    symposium_agenda_video_poster: `${path_image}critical-care-arrow.png`,
    symposium_agenda_video_poster_mobile: `${path_image}agenda-thumbnail03.png`,
    agenda_play_icon: `${path_image}play-button-pink.svg`,
    agenda_bottom_img: `${path_image}paris-skyline-wide.png`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/ISTH_2026Critical_Care_Agenda_video_04.mp4",
    disclamer_text:
      "This scientific symposium is for healthcare professionals only and is organised and sponsored by Octapharma.",
    className: "symposium-critical-care",
  },
];

export const oral_communication = [
  {
    session_heading: "Non-canonical roles of hemostatic proteins in organ biology",
    session_time: "Sunday, 12 July. 2026 | 10:00 - 10:15  CEST",
    speaker_img: `${path_image}baker-terkawi.png`,
    session_subtitle: "OC 16.3",
    session_details:
      "FVIII Deficiency Compromises In Vitro Osteoblasts Mineralization and Their Secretome Profile",
    speaker_name: "Baker Terkawi et al.",
    session_time_1: "10:00 – 10:15 CEST",
  },
  {
    session_heading: "Non-canonical roles of hemostatic proteins in organ biology",
    session_time: "Sunday, 12 July. 2026 | 09:30 - 10:45  CEST",
    speaker_img: `${path_image}giorgia-venturin.png`,
    session_subtitle: "OC 16.5",
    session_details:
      "Restoration of Cerebral Microvascular Structure and Function in Hemophilia A Mice Through FVIII Gene Therapy",
    speaker_name: "Giorgia Venturin et al.",
    session_time_1: "09:30 – 10:45 CEST",
  },
  {
    session_heading: "Endothelial cells in thrombosis",
    session_time: "Tuesday, 14 July. 2026 | 09:45 - 10:00  CEST",
    speaker_img: `${path_image}cristina-olgasi3.png`,
    session_subtitle: "OC 60.2",
    session_details:
      "New Insights into Hemophilia A: Factor VIII–Integrin β1 Pathway as Key Regulator of Endothelial Cell Function",
    speaker_name: "Cristina Olgasi et al.",
    session_time_1: "09:30 – 10:45 CEST",
  }

];

export const scientific_development = [
  {
    clinical_img: `${path_image}isth-dev-icon1.png`,
    session_code: "PB1451",
    session_details:
      "Immune Tolerance Induction in Haemophilia A Patients with Inhibitors: Updated Analysis from MOTIVATE",
    scientific_name: "Carmen Escuriola Ettinghshausen et al.",
    session_date: "Sunday, 12 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon2.png`,
    session_code: "PB2168",
    session_details:
      "Real-World Pharmacokinetic Profiles of Recombinant and Plasma-Derived Factor VIII in Haemophilia A Using WAPPS-HEMO in a Single Centre in Chile",
    scientific_name: "José Luis Lamas Castellano et al.",
    session_date: "Monday, 13 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon3.png`,
    session_code: "PB2096",
    session_details:
      "Surgical prophylaxis with simoctocog alfa in people with severe haemophilia A on emicizumab prophylaxis: The NuPOWER study",
    scientific_name: "Alok Srivastava et al.",
    session_date: "Monday, 13 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon4.png`,
    session_code: "PB2444",
    session_details:
      "rFVIII restores structured fibrin architecture and promotes a procoagulant platelet phenotype in Hemophilia A plasma-derived blood clots",
    scientific_name: "Anja Strebel et al.",
    session_date: "Monday, 13 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon5.png`,
    session_code: "PB2135",
    session_details:
      "Protect-NOW: Real-world treatment of previously untreated and minimally treated patients with severe haemophilia A",
    scientific_name: "Susan Halimeh et al.",
    session_date: "Monday, 13 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon6.png`,
    session_code: "PB3417",
    session_details:
      "Evidence of efficacy for prophylaxis with plasma-derived VWF/FVIII 1:1 in children with severe von Willebrand Disease: WIL 33 extends WIL 31 paediatric findings to <6 years",
    scientific_name: "Akshat Jain et al.",
    session_date: "Tuesday, 14 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon7.png`,
    session_code: "PB2144",
    session_details:
      "Real-world use of simoctocog alfa prophylaxis in severe haemophilia A: preliminary results from the Hungarian Long-Term Non-Interventional Investigation (Nuwiq NIS)",
    scientific_name: "Csongor Kiss et al.",
    session_date: "Monday, 13 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
  {
    clinical_img: `${path_image}isth-dev-icon8.png`,
    session_code: "PB3431",
    session_details:
      "Challenges for pharmacokinetic-guided dosing of plasma-derived VWF/FVIII 1:1 concentrate: insights from a population pharmacokinetic model. ",
    scientific_name: "Jelien den Hollander et al.",
    session_date: "Tuesday, 14 July. 2026",
    session_time: "13:45 – 14:45 CEST",
  },
];
