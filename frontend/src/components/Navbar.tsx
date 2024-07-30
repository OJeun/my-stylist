import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { UserIcon as UserIconFilled } from '@heroicons/react/24/solid';
import { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between sm:justify-between">
          <div className="flex justify-center flex-grow">
            <a
              href="/"
              className="h-8 w-auto hover:text-primary-strong font-bold font-mono text-2xl justify-center text-primary"
            >
              AI Stylist
            </a>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Favorite button */}
            <a
              href="/favorites"
              className="relative rounded-full bg-white p-1 text-gray-600 hover:text-gray-strong focus:text-primary focus:text-bold focus:ring-primary"
              onFocus={() => setIsHeartClicked(true)}
              onBlur={() => setIsHeartClicked(false)}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View favorite outfits</span>
              {isHeartClicked ? (
                <HeartIconFilled className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </a>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              {({ open }) => (
                <>
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {open ? (
                        <UserIconFilled
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-strong ring-opacity-5 transition focus:outline-primary data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="/profile"
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          My Profile
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="/my-closet"
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          My Closet
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="/recently-viewed"
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Recently Viewed
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
