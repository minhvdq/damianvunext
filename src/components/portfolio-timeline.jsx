"use client";

/* eslint-disable @next/next/no-img-element -- mirrors static portfolio HTML (native img) */

import Link from "next/link";
import { useEffect, useState } from "react";

const ASSET = (name) => `/portfolio-assets/${name}`;

/** Stable <img src> when modal has no image yet — avoids src="" and a conditional tree (hydration-safe). */
const TRANSPARENT_PIXEL_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const PROJECTS = [
  {
    id: "quarantio",
    navLabel: "Quarantio",
    title: "Quarantio",
    images: [
      { src: ASSET("quarantio-1.png"), alt: "Quarantio Landing Page" },
      { src: ASSET("quarantio-2.png"), alt: "Quarantio Dashboard" },
    ],
    children: (
      <ul>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://quarantio.app/"
            target="_blank"
          >
            quarantio.app
          </a>
          .
        </li>
        <li>
          <b>What:</b> A multi-tenant SaaS platform for automated email compliance monitoring, enabling SMBs to detect and quarantine policy-violating outbound emails before delivery — without
          requiring MX record changes or IT infrastructure.
        </li>
        <li>
          <b>How:</b>{"  "}
          Built a Go microservices architecture with RabbitMQ async processing, integrating Mistral AI (mistral-small-latest) for agentic compliance analysis and mistral-embed for
          1024-dim semantic embeddings stored in pgvector. Implemented RAG-augmented policy enforcement, Gmail Push Notifications via Google Pub/Sub for real-time inbox scanning,
          role-scoped audit logs, per-tenant plan enforcement (Free/Starter/Pro/Business), and Stripe billing — deployed on Docker with a React frontend.
        </li>
      </ul>
    ),
  },
  {
    id: "rice-leaf-dsease-classification",
    navLabel: "Rice Leaf Disease Classification",
    title: "Rice Leaf Disease Classification",
    images: [],
    children: (
      <ul>
        <li>
          <b>When:</b> October 2025.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://github.com/minhvdq/CSCI435-Rice-Leaf-Disease-Classification/tree/damian"
            target="_blank"
          >
            GitHub
          </a>
          .
        </li>
        <li>
          <b>What:</b> A deep learning-based system for automatic detection and
          classification of rice leaf diseases using computer vision, addressing
          food security challenges in rice-dependent nations like Bangladesh.
        </li>
        <li>
          <b>How:</b>{"  "}
          Implemented transfer learning with a pre-trained ResNet-18 CNN
          architecture on 1,106 images across 5 disease classes. Applied
          advanced preprocessing including image augmentation (flips, rotation,
          color jitter) and normalization. Employed Bayesian optimization for
          hyperparameter tuning and a dual-learning-rate strategy for
          fine-tuning. Achieved 79.99% accuracy on white background images and
          74.61% on mixed testsets through 5-fold stratified cross-validation,
          demonstrating practical viability for real-world agricultural
          applications.
        </li>
      </ul>
    ),
  },
  {
    id: "project-event-hub",
    navLabel: "CS Event Hub",
    title: "Gettysburg College CS Event Hub",
    images: [
      { src: ASSET("Event-Hub-1.png"), alt: "CS Event Hub - Main Page" },
      { src: ASSET("Event-Hub-2.png"), alt: "CS Event Hub - Event Details" },
    ],
    children: (
      <ul>
        <li>
          <b>When:</b> June-July 2025.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a href="https://github.com/minhvdq/csEventManager" target="_blank">
            GitHub
          </a>{" "}
          &{" "}
          <a href="http://acm.gettysburg.edu/eventHub/" target="_blank">
            Live Demo
          </a>
          .
        </li>
        <li>
          <b>What:</b> A comprehensive event management web application for the
          Gettysburg CS department, streamlining event creation, registration,
          and attendance tracking.
        </li>
        <li>
          <b>How:</b> A full-stack app using React and Ant Design on the
          frontend. The Node.js/Express.js backend features a three-layer
          architecture, MySQL database, JWT for authentication, and a barcode
          scanning system for attendance.
        </li>
      </ul>
    ),
  },
  {
    id: "project-rate-my-classes",
    navLabel: "Rate My Classes",
    title: "Rate My Classes Gettysburg College",
    images: [
      { src: ASSET("rmc1.png"), alt: "Rate My Classes - Home" },
      { src: ASSET("rmc2.png"), alt: "Rate My Classes - Review Page" },
    ],
    children: (
      <ul>
        <li>
          <b>When:</b> May 2025.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://github.com/minhvdq/rate_my_classes_gb"
            target="_blank"
          >
            GitHub
          </a>{" "}
          &{" "}
          <a href="https://rate-my-classes-gb.fly.dev/" target="_blank">
            Live Demo
          </a>
          .
        </li>
        <li>
          <b>What:</b> A web application that allows Gettysburg College
          students to rate and review their classes, helping peers make
          informed decisions about course selections.
        </li>
      </ul>
    ),
  },
  {
    id: "project-cold-email",
    navLabel: "Cold Email Generator",
    title: "Cold Email Generator",
    images: [{ src: ASSET("coldEmailShot.png"), alt: "Cold Email Generator UI" }],
    children: (
      <ul>
        <li>
          <b>When:</b> February 2025.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://github.com/minhvdq/Job_Postings_Scraping"
            target="_blank"
          >
            GitHub
          </a>
          .
        </li>
        <li>
          <b>What:</b> A tool that generates personalized cold emails by scraping
          job postings and aligning keywords with a user&apos;s resume,
          leveraging NLP to craft compelling outreach messages.
        </li>
      </ul>
    ),
  },
  {
    id: "project-ghack",
    navLabel: "GHack Damini",
    title: "GHack Damini",
    images: [{ src: ASSET("ghack.png"), alt: "Damini Chatbot Interface" }],
    children: (
      <ul>
        <li>
          <b>When:</b> Nov 2024.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://github.com/minhvdq/google_chatbot/tree/main"
            target="_blank"
          >
            GitHub
          </a>
          .
        </li>
        <li>
          <b>What:</b> A voice-interactive chatbot developed for Gettysburg
          College&apos;s inaugural GHackathon. Damini integrates Gemini 1.5 on
          an Express.js backend and uses Socket.IO for real-time communication
          with an HTML frontend.
        </li>
      </ul>
    ),
  },
  {
    id: "project-disaster-relief",
    navLabel: "Disaster Relief",
    title: "Disaster Relief Project",
    images: [
      { src: ASSET("DRP_seeker.png"), alt: "Disaster Relief - Seeker View" },
      { src: ASSET("DRP_supplier.png"), alt: "Disaster Relief - Supplier View" },
    ],
    children: (
      <ul>
        <li>
          <b>When:</b> Sep 2024.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://devpost.com/software/project-ip8frs?ref_content=user-portfolio&ref_feature=in_progress"
            target="_blank"
          >
            Devpost
          </a>
          .
        </li>
        <li>
          <b>What:</b> A UMBCHack 2024 project developed by a team of 4. It
          connects natural disaster victims with resource suppliers by matching
          seekers with the nearest available resources within a 100km radius.
        </li>
      </ul>
    ),
  },
  {
    id: "project-calendar",
    navLabel: "Calendar 2.0",
    title: "Calendar 2.0",
    images: [
      { src: ASSET("Calendar_Log.png"), alt: "Calendar Authentication" },
      { src: ASSET("mainpage.png"), alt: "Calendar Main Page" },
    ],
    children: (
      <ul>
        <li>
          <b>When:</b> March 2024 - May 2024.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a href="https://github.com/minhvdq/calendar2_0_FE" target="_blank">
            Frontend
          </a>{" "}
          &{" "}
          <a href="https://github.com/minhvdq/Calendar2_0" target="_blank">
            Backend
          </a>
          .
        </li>
        <li>
          <b>What:</b> A task-management application with features similar to
          Apple Calendar, allowing users to manage tasks on a calendar-like UI.
        </li>
        <li>
          <b>How:</b> The backend uses Express.js, Mongoose for authentication
          with MongoDB Atlas, and a separate SQL API with OracleDB for task
          data. The frontend is built with React for real-time updates.
        </li>
      </ul>
    ),
  },
  {
    id: "project-book-searcher",
    navLabel: "Book Searcher",
    title: "Book Searcher System",
    images: [{ src: ASSET("Booksearcher.png"), alt: "Book Searcher Demo" }],
    children: (
      <ul>
        <li>
          <b>When:</b> December 2023.
        </li>
        <li>
          <b>Where:</b>{" "}
          <a
            href="https://github.com/minhvdq/book-search-frontend/tree/main"
            target="_blank"
          >
            Frontend
          </a>{" "}
          &{" "}
          <a href="https://github.com/minhvdq/dis-books-search" target="_blank">
            Backend
          </a>
          .
        </li>
        <li>
          <b>What:</b> A highly scalable, distributed backend system that
          powers a book-searching UI.
        </li>
        <li>
          <b>How:</b> The system uses the TF-IDF algorithm to rank books by
          relevance and integrates Apache Zookeeper for high availability,
          consistency, and automatic failure recovery.
        </li>
      </ul>
    ),
  },
];

export default function PortfolioTimeline() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalCaption, setModalCaption] = useState("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(
        document.documentElement.scrollTop > 100 ||
          document.body.scrollTop > 100,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setModalOpen(false);
      setModalSrc("");
      setModalCaption("");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".timeline-item");
    const navLinks = document.querySelectorAll("#timeline-nav a");
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove("active"));
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(
          `#timeline-nav a[href="#${id}"]`,
        );
        activeLink?.classList.add("active");
      });
    }, options);
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function openModal(src, alt) {
    setModalSrc(src);
    setModalCaption(alt);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalSrc("");
    setModalCaption("");
  }

  return (
    <>
      <header id="top">
        <div className="header-content">
          <h1 className="main-title">Damian Vu</h1>
          <p className="subtitle">
            Welcome to my portfolio. Below is a timeline of my experiences
            working on personal and collaborative projects.
          </p>
          <Link href="/" className="btn-home">
            Back to Main Site
          </Link>
        </div>
      </header>

      <div className="portfolio-container">
        <aside id="timeline-nav">
          <div className="timeline-nav-inner">
            <h2>Timeline</h2>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`}>{p.navLabel}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main id="projects-content">
          {PROJECTS.map((p) => (
            <section className="timeline-item" id={p.id} key={p.id}>
              <div className="timeline-dot" />
              <div className="project-card">
                <h2>{p.title}</h2>
                {p.children}
                {p.images.length > 0 ? (
                  <div className="image-wrapper">
                    {p.images.map((img) => (
                      <img
                        key={img.src}
                        className="myImage"
                        src={img.src}
                        alt={img.alt}
                        onClick={() => openModal(img.src, img.alt)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </main>
      </div>

      <div
        id="myModal"
        className="modal"
        style={{ display: modalOpen ? "block" : "none" }}
      >
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img
          className="modal-content"
          id="img01"
          src={modalSrc || TRANSPARENT_PIXEL_GIF}
          alt={modalCaption || ""}
          aria-hidden={!modalSrc}
        />
        <div id="caption">{modalCaption}</div>
      </div>

      <a
        href="#top"
        id="back-to-top-arrow"
        style={{ display: showTop ? "block" : "none" }}
      >
        <img src="/upload.png" alt="Go to top" className="icon" />
      </a>

      <footer>
        <div id="contact">
          <a
            href="https://www.linkedin.com/in/minh-vu-a0617225a/"
            target="_blank"
          >
            <img
              src="/linkedin.png"
              alt="LinkedIn Profile"
              className="icon"
            />
          </a>
          <a href="https://www.instagram.com/minh.vdq/" target="_blank">
            <img
              src="/instagram.png"
              alt="Instagram Profile"
              className="icon"
            />
          </a>
          <a href="https://www.facebook.com/minh.vdq" target="_blank">
            <img
              src="/facebook.png"
              alt="Facebook Profile"
              className="icon"
            />
          </a>
        </div>
        <p>Copyright © 2025 Damian Vu. All Rights Reserved.</p>
      </footer>
    </>
  );
}
