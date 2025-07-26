const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <h3 className="text-xl font-bold mb-4">Sparkle Scrub</h3>
        
        {/* Social links */}
        <div className="flex gap-4 justify-center mb-6">
          <a href="https://facebook.com/sparklescrub" className="text-blue-400 hover:text-blue-300">
            Facebook
          </a>
          <a href="https://instagram.com/sparklescrub" className="text-pink-400 hover:text-pink-300">
            Instagram
          </a>
          <a href="https://tiktok.com/@sparklescrub" className="text-gray-400 hover:text-gray-300">
            TikTok
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {currentYear} Sparkle Scrub • Knoxville, TN
        </p>
      </div>
    </footer>
  );
};

export default Footer;