import { mySocials } from "../constants";
import { Link } from "react-router-dom"; // <-- correct import

const Footer = () => {
  return (
    <section className="flex  flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 px-5 sm:px-10 lg:px-16">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      <div className="flex gap-2">
        <Link to="/terms" className="text-white hover:underline">
          Conditions d'utilisation
        </Link>
        <p>|</p>
        <Link to="/privacy" className="text-white hover:underline">
          Politique de confidentialité
        </Link>
      </div>

      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a
            href={social.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </a>
        ))}
      </div>

      <p>© 2025 Frédérick Ahobaut. Tous droits réservés.</p>
    </section>
  );
};

export default Footer;
