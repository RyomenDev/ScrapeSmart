import linkedinLogo from "../assets/icons8-linkedin.svg";
import emailLogo from "../assets/icons8-mail-50.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#4E342E] via-[#3B2F2F] to-[#212121] text-white py-4 px-4">
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/akash-mishra-2b2348224"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img
            src={linkedinLogo}
            alt="LinkedIn"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-all"
          />
        </a>
        <a href="mailto:ai.akash.mishra@gmail.com" className="hover:opacity-80">
          <img
            src={emailLogo}
            alt="Email"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-all"
          />
        </a>
      </div>
      <div className="text-center text-xs sm:text-sm opacity-70 mt-2">
        &copy;2025 Made by Akash Mishra
      </div>
    </footer>
  );
}

export default Footer;
