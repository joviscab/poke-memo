import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {currentYear} John Schmutzler | Follow me on
        <a
          href="https://github.com/joviscab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-github" style={{ fontSize: "18px" }}></i> GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
