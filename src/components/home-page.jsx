"use client";

import Image from "next/image";
import Link from "next/link";

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu?.classList.toggle("open");
  icon?.classList.toggle("open");
}

export default function HomePage() {
  return (
    <>
      <div id="top" />
      <nav id="desktop-nav">
        <div className="logo">Damian Vu</div>
        <div>
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <nav id="hamburger-nav">
        <div className="logo">Damian Vu</div>
        <div className="hamburger-menu">
          <div
            className="hamburger-icon"
            onClick={toggleMenu}
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
            role="button"
            tabIndex={0}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </div>
          <div className="menu-links">
            <li>
              <a href="#about" onClick={toggleMenu}>
                About
              </a>
            </li>
            <li>
              <Link href="/portfolio" onClick={toggleMenu}>
                Portfolio
              </Link>
            </li>
            <li>
              <a href="#contact" onClick={toggleMenu}>
                Contact
              </a>
            </li>
          </div>
        </div>
      </nav>
      <section id="profile">
        <div className="section__pic-container">
          <Image
            src="/profile-pic.jpeg"
            alt="Damian profile picture"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="section__text">
          <p className="section__text__p1">Hi, my name is</p>
          <h1 className="title">Minh (Damian) Vu</h1>
          <p className="section__text__p2">Software Developer</p>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-color-2"
              onClick={() => window.open("/Minh_Vu.pdf", "_blank")}
            >
              Download CV
            </button>
            <button
              type="button"
              className="btn btn-color-1 btn-fiverr"
              onClick={() =>
                window.open("https://www.fiverr.com/s/99rX3Kd", "_blank")
              }
            >
              My Fiverr Gig
            </button>
            <button
              type="button"
              className="btn btn-color-1"
              onClick={() => {
                window.location.hash = "#contact";
              }}
            >
              Contact Info
            </button>
          </div>
          <div id="socials-container">
            <Image
              src="/linkedin.png"
              alt="My LinkedIn profile"
              className="icon"
              width={32}
              height={32}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/minh-vu-a0617225a/",
                  "_blank",
                )
              }
            />
            <Image
              src="/github.png"
              alt="My Github profile"
              className="icon"
              width={32}
              height={32}
              onClick={() => window.open("https://github.com/minhvdq", "_blank")}
            />
          </div>
        </div>
      </section>
      <section id="about">
        <h1 className="title">About Me</h1>
        <div className="main-content">
          <div id="intro-text" className="section__pic-container">
            <p>
              Hi, my name is Minh Vu, but people call me Damian. I’m a
              tech-driven math lover based in the lovely town of Gettysburg,
              PA. I am currently pursuing a Bachelor’s Degree in Computer
              Science and Math at Gettysburg College.
              <br />
              <br />
              I have a variety of hobbies that keep me busy. From engaging in
              programming competitions and projects to playing sports, I make
              it a point to always sharpen my knowledge while keeping myself
              healthy and in shape.
              <br />
              <br />
              With a passion for technology, I’m excited to see where my career
              takes me. I’m always open to learning opportunities.
            </p>
          </div>
          <div id="crap">
            <div className="details-container">
              <h3>Education</h3>
              <p>
                B.Sc in Computer Science <br />
                B.Sc in Math
              </p>
            </div>
            <div id="socials-container">
              <Image
                src="/facebook.png"
                alt="My facebook profile"
                className="icon"
                width={32}
                height={32}
                onClick={() =>
                  window.open("https://www.facebook.com/minh.vdq/", "_blank")
                }
              />
              <Image
                src="/instagram.png"
                alt="My Instagram profile"
                className="icon"
                width={32}
                height={32}
                onClick={() =>
                  window.open("https://www.instagram.com/minh.vdq/", "_blank")
                }
              />
            </div>
            <div
              id="ghost-contain"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Image
                style={{ width: "20vw", height: "auto" }}
                src="/ghost.png"
                alt=""
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="contact">
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <Image
              src="/email.png"
              alt="Email icon"
              className="icon contact-icon email-icon"
              width={40}
              height={40}
            />
            <p>
              <a href="mailto:vuminh300805@gmail.com">vuminh300805@gmail.com</a>
            </p>
          </div>
          <div className="contact-info-container">
            <Image
              src="/linkedin.png"
              alt="LinkedIn icon"
              className="icon contact-icon"
              width={32}
              height={32}
            />
            <p>
              <a href="https://www.linkedin.com/in/minh-vu-a0617225a/">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
      <a
        href="#top"
        className="icon arrow"
        style={{
          position: "fixed",
          /* Above ChatWidget FAB: bottom-6/right-6 + max FAB h-14 (3.5rem) + gap */
          bottom:
            "calc(1.5rem + 3.5rem + 0.625rem + env(safe-area-inset-bottom, 0px))",
          right: "calc(1.5rem + (3rem - 2rem) / 2)",
        }}
        aria-label="Back to top"
      >
        <Image src="/upload.png" alt="" width={32} height={32} />
      </a>
      <footer>
        <p>Copyright © 2025 Minh Vu. All Rights Reserved.</p>
      </footer>
    </>
  );
}
