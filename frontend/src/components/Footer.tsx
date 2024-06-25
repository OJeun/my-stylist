export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    // <footer className="text-center">
    //   <p>© {currentYear} Developed by Julie Oh and Diane Choi</p>
    // </footer>
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © {currentYear} Copyright: blah blah blah
      </div>
    </footer>
  );
}
