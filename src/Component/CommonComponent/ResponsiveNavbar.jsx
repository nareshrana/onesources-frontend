import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import ScrollContext from "../ScrollContext";
import "intersection-observer";

const ResponsiveNavbar = () => {
  const [activeLink, setActiveLink] = useState("highlight");

  const {
    highlightRef,
    expertOpinionRef,
    yourOpinionRef,
    eventRef,
    mostPopularContentRef,
    oneSourceLibraryRef,
    podcastRef,
    webinarRef,
    symposiumRef,
    footerRef,

    shouldObserveElements,
    setShouldObserveElements,
  } = useContext(ScrollContext);
  const highlightContainerRef = useRef(null);
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute("data-section");
          setActiveLink((prev) => {
            return target;
          });

          const activeLinkElement = document.getElementById(target);

          if (activeLinkElement && scrollableDivRef.current) {
            const scrollableDivWidth = scrollableDivRef.current.clientWidth;
            const activeLinkOffsetLeft = activeLinkElement.offsetLeft;
            const scrollPosition =
              activeLinkOffsetLeft -
              scrollableDivWidth / 2 +
              activeLinkElement.clientWidth / 2;
            scrollableDivRef.current.scrollLeft = scrollPosition;
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1, // Percentage of element visibility in the viewport
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (shouldObserveElements && window.innerWidth <= 1200) {
      observer.observe(highlightRef.current);
      if(expertOpinionRef.current){
        observer.observe(expertOpinionRef.current);
      }
      if(yourOpinionRef.current){
        observer.observe(yourOpinionRef.current);
      }
      if(eventRef.current){
        observer.observe(eventRef.current);
      }
      if(mostPopularContentRef.current){
        observer.observe(mostPopularContentRef.current);
      }
      if(podcastRef.current){
        observer.observe(podcastRef.current);
      }
      if(oneSourceLibraryRef.current){
        observer.observe(oneSourceLibraryRef.current);
      }
    
      if(symposiumRef.current){
        observer.observe(symposiumRef.current);
      }

      if(webinarRef.current){
        observer.observe(webinarRef.current);
      }
      // observer.observe(webinarRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldObserveElements]);

  useEffect(()=>{
    if(webinarRef.current){
      setActiveLink("")
    }else{
      setActiveLink("highlight")
    }
  },[webinarRef.current])

  useEffect(() => {
    const handleIntersect = () => {
      setShouldObserveElements(true);
    };
    window.addEventListener("wheel", handleIntersect);
    window.addEventListener("touchmove", handleIntersect);
    return () => {
      window.removeEventListener("wheel", handleIntersect);
      window.removeEventListener("touchmove", handleIntersect);
    };
  }, [shouldObserveElements]); // Include the condition in the dependency array

  const scrollToSection = (sectionId, link = "highlight") => {
    setActiveLink((prev) => {
      return link;
    });
    setShouldObserveElements(false);

    const sectionElement = sectionId.current;
    const scrollContainerRef = document.getElementById("root");
    if (sectionElement) {
      const scrollContainer = scrollContainerRef;
      const containerOffsetTop = scrollContainer.getBoundingClientRect().top;
      const sectionOffsetTop = sectionElement.getBoundingClientRect().top;
      const scrollToPosition =
        sectionOffsetTop - containerOffsetTop + scrollContainer.scrollTop - 100;
      scrollContainer.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }

    const activeLinkElement = document.getElementById(link);
    if (activeLinkElement && scrollableDivRef.current) {
      const scrollableDivWidth = scrollableDivRef.current.clientWidth;
      const activeLinkOffsetLeft = activeLinkElement.offsetLeft;
      const scrollPosition =
        activeLinkOffsetLeft -
        scrollableDivWidth / 2 +
        activeLinkElement.clientWidth / 2;
      scrollableDivRef.current.scrollLeft = scrollPosition;
    }
  };

  return (
    <>
      <Navbar className="responsive-nav">
        <div className="section-scroll-link" ref={scrollableDivRef}>
          {/*<Link
              onClick={() => {
                handleLinkClick("webinar");

              }}
              className={activeLink === "webinar" ? "active" : ""}
            >
              ISTH 2023 - Octapharma symposium
            </Link>
            */}
          <Link
            onClick={() => {
              scrollToSection(highlightRef, "highlight");
            }}
            className={activeLink === "highlight" ? "active" : ""}
            ref={highlightContainerRef}
            id="highlight"
          >
            Highlights
          </Link>
          <Link
            onClick={() => {
              scrollToSection(expertOpinionRef, "expertOpinion");
            }}
            className={activeLink === "expertOpinion" ? "active" : ""}
            id="expertOpinion"
          >
            Expert opinions
          </Link>

          <Link
            onClick={() => {
              scrollToSection(yourOpinionRef, "yourOpinion");
            }}
            className={activeLink === "yourOpinion" ? "active" : ""}
            id="yourOpinion"
          >
            Your opinion
          </Link>
          {/* {localStorage?.getItem("un") == 2147501106 && ( */}

             <Link
            onClick={() => {
              scrollToSection(symposiumRef, "symposium");
            }}
            className={activeLink === "symposium" ? "active" : ""}
            id="symposium"
          >
          Symposium highlight
          </Link>
          {/* )} */}
          <Link
            onClick={() => {
              scrollToSection(eventRef, "events");
            }}
            className={activeLink === "events" ? "active" : ""}
            id="events"
          >
            Events
          </Link>
          <Link
            onClick={() => {
              scrollToSection(podcastRef, "podcasts");
            }}
            className={activeLink === "podcasts" ? "active" : ""}
            id="podcasts"
          >
            Podcasts
          </Link>
          {/* <Link
            onClick={() => {
              handleLinkClick("suggestions");
            }}
            className={activeLink === "suggestions" ? "active" : ""}
          >
            Suggestions for you
          </Link> */}

          <Link
            onClick={() => {
              scrollToSection(mostPopularContentRef, "mostPopularContent");
            }}
            className={activeLink === "mostPopularContent" ? "active" : ""}
            id="mostPopularContent"
          >
            Most popular content{" "}
          </Link>

          <Link
            onClick={() => {
              scrollToSection(oneSourceLibraryRef, "oneSourceLibrary");
            }}
            className={activeLink === "oneSourceLibrary" ? "active" : ""}
            id="oneSourceLibrary"
          >
            One Source library
          </Link>
        </div>
      </Navbar>
    </>
  );
};

export default ResponsiveNavbar;
