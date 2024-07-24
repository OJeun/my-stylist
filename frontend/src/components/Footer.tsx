export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral text-center dark:bg-neutral-strong lg:text-left w-full mt-auto">
      <div className="p-4 text-center text-neutral-strong dark:text-neutral">
        © {currentYear} Copyright: blah blah blah
      </div>
    </footer>
  );
}
