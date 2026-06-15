const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


export const data = 
  {
    image: `${path_image}ISTH_sponsor_medals.png`,
    title: "Join us",
    title1: "Advancing Bleed Solutions for Personalized Care",
    location: "at ISTH, Washington DC",
    date: "21-25 June 2025",
  }
;
export const data1 = [
  {
    id: 0,
    card_title: "Symposium",
    card_heading:
      "Developing a Novel <br/> Ultra-Long Half-Life rFVIII for Hemophilia A",
    event_date: "Sunday, 22 June",
    event_time: "12:15 <span> - </span> 13:30 EDT",
    event_location: "Room 204 A-C",
    event_calander_img: `${path_image}event-calendar.svg`,
    event_clock_img: `${path_image}event-clock.svg`,
    event_location_img: `${path_image}event-location.svg`,
    className: "event-card-1",
    event_ics_file: `${path_image}Developing-a-Novel-Ultra-Long-Half-Life-rFVIII-for-Hemophilia-A.ics`,
  },
  {
    id: 1,
    card_title: "Symposium",
    card_heading:"Equitable Access to Prophylaxis in Severe VWD vs Severe Hemophilia A? Worth Thinking About.",
    event_date: "Monday, 23 June",
    event_time: "12:15 <span> - </span> 13:30 EDT",
    event_location: ``,
    event_calander_img: `${path_image}event-calendar-o.svg`,
    event_clock_img: `${path_image}event-clock-o.svg`,
    event_location_img: `${path_image}event-location-o.svg`,
    className: "event-card-2",
    event_ics_file: `${path_image}ISTH-symposium-Equitable-Access-to-Prophylaxis-in-Severe-VWD-vs-Severe-Hemophilia-A-Worth-Thinking-About.ics`,
  },
  {
    id: 2,
    card_title: "Symposium",
    card_heading:
      "Evolving Evidence for Factor Concentrates in Surgical Bleeding",
    event_date: "Tuesday, 24 June",
    event_time: "12:15 <span> - </span> 13:30 EDT",
    event_location: "Room 206",
    event_calander_img: `${path_image}event-calendar-p.svg`,
    event_clock_img: `${path_image}event-clock-p.svg`,
    event_location_img: `${path_image}event-location-p.svg`,
    className: "event-card-3",
    event_ics_file: `${path_image}Game-Changing-Evidence-for-Factor-Concentrates-in-Surgical-Bleeding.ics`,
  },
  {
    id: 3,
    card_title: "Presentation Theater Session",
    card_heading:
    `Understanding the Role of FVIII in Hemophilia A ${isMobile ? `<br/>` : ``}Hemostasis and Beyond`,
    event_date: "Tuesday, 24 June",
    event_time: "13:45 <span> - </span> 14:30 EDT",
    event_location: "Presentation Theater 1 Exhibition Area",
    event_calander_img: `${path_image}event-calendar-g.svg`,
    event_clock_img: `${path_image}event-clock-g.svg`,
    event_location_img: `${path_image}event-location-g.svg`,
    className: "event-card-4",
    event_ics_file: `${path_image}Understanding-the-Role-of-FVIII-in-Hemophilia-A-Hemostasis-and-Beyond.ics`,
  },
];

export const agenda_details = [
  {
    id: 0,
    agenda_heading:
      "Developing a Novel Ultra-Long Half-Life rFVIII for Hemophilia A",
    agenda_details:
      "Join us for the novel research on revolutionary ultra-long half-life FVIII technology! <br/> Gain first-hand insights into the latest advancements aimed at improving hemophilia A care.",
    speakers: [
      {
        img: `${path_image}andreas-img.png`,
        intro: "Welcome and Introduction",
        details: "FVIII: A Therapy of </br> Enduring Importance",
        name: "Chair: Andreas Tiede, DE",
      },
      {
        img: `${path_image}thomas-img.png`,
        details: "Considerations for Developing an Ultra-Long Half-Life FVIII",
        name: "Thomas Güttler, DE",
      },
      {
        img: `${path_image}barbara.png`,
        details: "Evidence and<br/> Experience",
        name: "Barbara Solecka-Witulska, DEE",
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
    event_Date: "Sunday, 22 June. 2025",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 EDT",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room 204 A-C",
    event_agenda_link: `${path_image}isth-2025-agenda-product.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2025 Symposium Agenda :",
    symposium_agenda_sub_heading:
      "Developing a Novel Ultra-Long Half-Life rFVIII for Hemophilia A",
    symposium_agenda_video_poster: `${path_image}video-agenda-lines-green.png`,
    symposium_agenda_video_poster_mobile: `${path_image}video-agenda-lines-green-lite-mobile.png`,
    agenda_play_icon: `${path_image}play_button_green.svg`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH_2025_Agenda_video_New_product_symposium_out.mp4",
    disclamer_text:
      "This scientific symposium is for healthcare professionals only and is organized and sponsored by Octapharma.",
      className: "symposium-product",
  },
  {
    id: 1,
    agenda_heading:"Equitable Access to Prophylaxis in Severe VWD vs Severe Hemophilia A? Worth Thinking About.",
    agenda_details:
      "Join us for an insightful session on the (in)equity in treating severe VWD vs. severe hemophilia A! We will delve into groundbreaking data from WIL-31, the largest prophylaxis study in VWD, and spotlight ongoing research efforts to meet the unmet needs of children and females with VWD.",
    speakers: [
      {
        img: `${path_image}veronica-img.png`,
        details: "Welcome and <br/> Introduction",
        name: "Chair: Veronica Flood, US",
      },
      {
        img: `${path_image}nathan-img.png`,
        details:
          "Understanding the Causes and the Consequences of Undertreatment in VWD",
        name: "Nathan Connell, US",
      },
      {
        img: `${path_image}robert-img.png`,
        details:
          "Optimizing Bleed <br/> Protection in VWD: Present and Future Strategies",
        name: "Robert F. Sidonio Jr., US",
      },
      {
        img: `${path_image}jill-johnsen-img.png`,
        details: "Tackling Unmet Needs in Females with VWD",
        name: "Jill Johnsen, US",
      },
    ],
    speaker_videos: [], // Add if needed
    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Monday, 23 June. 2025",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 EDT",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room 201 ",
    event_agenda_link: `${path_image}isth-2025-agenda-wilate.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2025 Symposium Agenda :",
    symposium_agenda_sub_heading:"Equitable Access to Prophylaxis in Severe VWD vs Severe Hemophilia A? Worth Thinking About.",
    symposium_agenda_video_poster: `${path_image}video-agenda-lines-orange.png`,
    symposium_agenda_video_poster_mobile: `${path_image}video-agenda-lines-orange-mobile.png`,
    agenda_play_icon: `${path_image}play-button-orange.svg`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH_2025_Agenda_video_VWD_symposium_out.mp4",
    disclamer_text:
      "This symposium is for healthcare professionals only and is organized and sponsored by Octapharma. This is a promotional symposium and products will be discussed. Prescribing information may vary depending on local approval in each country. Before prescribing any product, always refer to local materials such as the prescribing information and/or the summary of product characteristics.",
      className: "symposium-wilate",
  },
  {
    id: 2,
    agenda_heading:
      "Evolving Evidence for Factor Concentrates in Surgical Bleeding",
    agenda_details:
      "The symposium will explore innovative approaches for managing surgical bleeding by assessing safety, efficacy, and cost effectiveness. It will also showcase emerging best practices designed to enhance patient outcomes in cardiac surgery.",
    speakers: [
      {
        img: `${path_image}schulman-img.png`,
        details: "Welcome and <br/> Introduction",
        name: "Chair: Sam Schulman, CA",
      },
      {
        img: `${path_image}oliver-img.png`,
        details: "When and How to Reverse Anticoagulants",
        name: "Oliver Grottke, DE",
      },
      {
        img: `${path_image}jeannie-img.png`,
        details: "The Fibrinogen  <br/> Concentrate vs. Cryoprecipitate Decision",
        name: "Jeannie Callum, CA",
      },
      {
        img: `${path_image}kenichi-img.png`,
        details:
          "4F-PCC: Setting New Standards for Restoring Thrombin Generation",
        name: "Kenichi Tanaka, US",
      },
    ],
    speaker_videos: [], // Add if needed
    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Tuesday, 24 June. 2025",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "12:15<span> - </span>13:30 EDT",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Room 206",
    event_agenda_link: `${path_image}isth-2025-agenda-critical-care.pdf`,
    show_symposium_agenda_heading_section: true,
    symposium_agenda_heading: "ISTH 2025 Symposium Agenda :",
    symposium_agenda_sub_heading:
      "Evolving Evidence for Factor Concentrates in Surgical Bleeding",
    symposium_agenda_video_poster: `${path_image}video-agenda-lines-pink.png`,
    symposium_agenda_video_poster_mobile: `${path_image}video-agenda-lines-pink-mobile.png`,
    agenda_play_icon: `${path_image}play-button-pink.svg`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH-2025_Agenda_video_Critical_care_symposium_out.mp4",
    disclamer_text:
      "This scientific symposium is for healthcare professionals only and is organized and sponsored by Octapharma. Products will be discussed, and prescribing information may vary depending on local approval in each country. Before prescribing any product always refer to local materials such as the prescribing information and/or the summary of product characteristics.",
      className: "symposium-critical-care",
  },
  {
    id: 3,
    agenda_heading:
      "Understanding the Role of FVIII in Hemophilia A Hemostasis and Beyond",
    agenda_details:
      "Join this thrilling session on the role of FVIII beyond classical hemostasis! We will explore how FVIII impacts platelet and endothelium functions, paving the way for future discoveries.",
    speakers: [
      {
        img: `${path_image}craig-img.png`,
        details: "Welcome and <br/> Introduction",
        name: "Chair: Craig Kessler, US",
      },
      {
        img: `${path_image}fabrizio-img.png`,
        details: "Exploring the Influence <br/> of FVIII on <br/>Platelet Dynamics",
        name: "Fabrizio Pennacchio, CH",
      },
      {
        img: `${path_image}antonia-img.png`,
        details: "The Role of FVIII on <br/>Endothelial Cell Function",
        name: "Antonia Follenzi, IT",
      },
    ],
speaker_videos: [
      {
        id: 0,
        video_img: `${path_image}oct104_endothelial_cell_animation.png`,
        play_icon: `${path_image}play-button-green.svg`,
        video_text: "Learn more about FVIII role on endothelial cell function",
        video_poster: `${path_image}oct104_endothelial_cell_animation`,
        video_url:
          "https://docintel.s3.eu-west-1.amazonaws.com/oct104_endothelial_cell_animation.mp4", // <-- Add URL here
      },
      { 
      video_img: `${path_image}video-agenda-lines-yellow-small.png`,
        play_icon: `${path_image}play-button-green.svg`,
        video_text: "ISTH 2025 Presentation Theater Session Agenda :",
        video_text_render: "<h5 class='symposium-agenda-heading'>ISTH 2025 Presentation Theater Session Agenda : </h5> <h5> Understanding the Role of FVIII in Hemophilia A Hemostasis and Beyond </h5>",
        video_poster: `${path_image}video-agenda-lines-yellow-small.png`,
        video_url:
          "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH_2025_Agenda_video_Hemophilia_A_presentation_th_out.mp4", // <-- Add URL here
      },
    ],    event_calander_img: `${path_image}calendar-white.svg`,
    event_Date: "Tuesday, 24 June. 2025",
    event_clock_img: `${path_image}clock-white.svg`,
    event_time: "13:45<span> - </span>14:30 EDT",
    event_location_img: `${path_image}maps-white.svg`,
    event_location: "Presentation Theater 1 Exhibition Area",
    event_agenda_link: `${path_image}isth-2025-genda-nuwiq.pdf`,
    show_symposium_agenda_heading_section: false,
    symposium_agenda_heading: "ISTH 2025 Presentation Theater Session Agenda :",
    symposium_agenda_sub_heading:
      "Understanding the Role of FVIII in Hemophilia A Hemostasis and Beyond",
    symposium_agenda_video_poster: `${path_image}video-agenda-lines-yellow.png`,
    symposium_agenda_video_poster_mobile: `${path_image}video-agenda-lines-green-mobile.png`,
    agenda_play_icon: `${path_image}play-button-green.svg`,
    agenda_play_video_url:
      "https://docintel.s3.eu-west-1.amazonaws.com/video/video/ISTH_2025_Agenda_video_Hemophilia_A_presentation_th_out.mp4",
    disclamer_text:
      "This presentation theater session is for healthcare professionals only and is organized and sponsored by Octapharma. This is a promotional presentation theater session and products will be discussed. Prescribing information may vary depending on local approval in each country. Before prescribing any product, always refer to local materials such as the prescribing information and/or the summary of product characteristics.",
   className: "symposium-nuwiq agenda-video",
  },
];

export const oral_communication = [
  {
    session_heading: "Novel mechanisms in hemophilia",
    session_time: "13:00 - 14:15 EDT",
    speaker_img: `${path_image}antonia-follenzi.png`,
    session_subtitle: "OC 03.2",
    session_details:
      "Role of factor VIII as a regulator of angiogenesis and promoter of endothelial barrier stability",
    speaker_name: "Antonia Follenzi et al",
    session_date: "Saturday. 21 June. 2025",
    session_time_1: "13:15 - 13:30 EDT", 
    session_location: "207 A&B",
  },
  {
    session_heading: "Factor VIII/Von willebrand factor structure and function",
    session_time: "9:45 - 10:00 EDT",
    speaker_img: `${path_image}cristina-olgasi.png`,
    session_subtitle: "OC 18.2",
    session_details:
      "Role of FVIII in regulating endothelial cell function and extracellular matrix protein expression",
    speaker_name: "Cristina Olgasi et al",
    session_date: "Sunday. 22 June. 2025",
    session_time_1: "9:45 - 10:00 EDT",
    session_location: "201",
  },
  {
    session_heading: "Predicting outcomes in inherited and acquired hemophilia",
    session_time: "9:45 - 10:00 EDT",
    speaker_img: `${path_image}robert-sidonio.png`,
    session_subtitle: "OC 36.2",
    session_details:
      "Immune tolerance induction in hemophilia A patients with inhibitors: MOTIVATE study interim analysis",
    speaker_name: "Robert F. Sidonio et al",
    session_date: "Monday. 23 June. 2025",
    session_time_1: "9:45 - 10:00 EDT",
    session_location: "145 A&B",
  },
  {
    session_heading: "Perioperative bleeding management",
    session_time: "14:45 PM - 15:00 EDT",
    speaker_img: `${path_image}jeannie-callum.png`,
    session_subtitle: "OC 62.1",
    session_details:
      "Superior efficacy and reduced transfusions with 4F-PCC vs. FP in cardiac surgery: LEX-211 (FARES-II)",
    speaker_name: "Jeannie Callum et al",
    session_date: "Tuesday. 24 June. 2025",
    session_time_1: "14:45 - 15:00 EDT",
    session_location: "207 A&B",
  },
];

export const scientific_development = [
  {
    clinical_img: `${path_image}development-icon1.png`,
    session_code: "PB0119",
    session_details:
      "Two Phase 3 studies on antithrombin concentrate in congenital and acquired antithrombin deficiency",
    scientific_name: "Jerrold Levy et al",
    session_date: "Sunday. 22 June. 2025",
    session_time: "13:45 - 14:45 EDT",
    session_location: "Exhibition Hall",
  },
  {
    clinical_img: `${path_image}development-icon3.png`,
    session_code: "PB0330",
    session_details:
      "Why genotype? Results of a survey of U.S. providers utilizing a hemophilia A genotyping program",
    scientific_name: "Barbara Konkle et al",
    session_date: "Sunday. 22 June. 2025",
    session_time: "13:45 - 14:45 EDT",
    session_location: "Exhibition Hall",
  },
  {
    clinical_img: `${path_image}development-icon2.png`,
    session_code: "PB1044",
    session_details:
      "Influence of recombinant factor VIII binding to platelets on fibrin clot formation and stability",
    scientific_name: "Fabrizio A. Pennacchio et al",
    session_date: "Monday. 23 June. 2025",
    session_time: "13:45 - 14:45 EDT",
    session_location: "Exhibition Hall",
  },
  {
    clinical_img: `${path_image}development-icon4.png`,
    session_code: "PB1435",
    session_details:
      "Long-Term Secondary Factor VIII Prophylaxis in a Hemophilia A Mouse Model Lacking Inhibitor Response",
    scientific_name: "Lara Monica et al",
    session_date: "Tuesday. 24 June. 2025",
    session_time: "13:45 - 14:45 EDT",
    session_location: "Exhibition Hall",
  },
];
