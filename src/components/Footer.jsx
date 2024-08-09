import { useSelector } from "react-redux";

const Footer = () => {
    const theme = useSelector((state) => state.theme.currentTheme);
  
    return (
      <footer
        className={`py-4 ${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <div className="container mx-auto text-center flex flex-col items-center">
          <p
            className={`text-sm font-light mb-2 ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Made with <span className="text-red-500">❤</span> by{' '}
            <span className="font-semibold">Jash</span>
          </p>
          <p className="text-xs font-light">© 2024</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  