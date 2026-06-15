import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loader } from "./CommonComponent/Loader";

const agendaByRoute = {
  "/isth26_1": "/images/ISTH-2026-ultra8-agenda.pdf",
  "/isth26_2": "/images/ISTH-2026-VWD-agenda.pdf",
  "/isth26_3": "/images/ISTH-2026-CC-agenda.pdf",
  "/isth26i_1": "/images/ISTH-2026-ultra8-agenda-1.pdf",
  "/isth26i_2": "/images/ISTH-2026-VWD-agenda-1.pdf",
  "/isth26i_3": "/images/ISTH-2026-CC-agenda-1.pdf",
  "/isth26m_1": "/images/ISTH-2026-Marketing-ultra8-agenda.pdf",
  "/isth26m_2": "/images/ISTH-2026-Marketing-VWD-agenda.pdf",
  "/isth26m_3": "/images/ISTH-2026-Marketing-CC-agenda.pdf",
};

const ISTH2026Agenda = () => {
  const location = useLocation();
  const pdfUrl = agendaByRoute[location.pathname.toLowerCase()];

  useEffect(() => {
    loader("hide");
  }, []);

  return (
    <iframe
      src={pdfUrl}
      title="ISTH 2026 Agenda"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
};

export default ISTH2026Agenda;
