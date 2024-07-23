export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral text-center dark:bg-neutral-strong lg:text-left fixed bottom-0 left-0 w-full">
      <div className="p-4 text-center text-neutral-strong dark:text-neutral">
        © {currentYear} Copyright: blah blah blah
      </div>
    </footer>
  );
}
