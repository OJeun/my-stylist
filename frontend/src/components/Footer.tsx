export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    // <footer className="text-center">
    //   <p>© {currentYear} Developed by Julie Oh and Diane Choi</p>
    // </footer>
    <footer className="bg-neutral text-center dark:bg-neutral-strong lg:text-left">
      <div className="p-4 text-center text-neutral-strong dark:text-neutral">
        © {currentYear} Copyright: blah blah blah
      </div>
    </footer>
  );
}
