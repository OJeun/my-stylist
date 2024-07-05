import Button from './Button';
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { categories } from '../../pages/OutfitGenerator';

type DropdownProps = {
  title: string;
  categories: string[];
};

export default function Dropdown({title, categories}: DropdownProps) {
  const buttonClassName =
    'w-full block px-4 py-2 text-sm text-gray-strong data-[focus]:bg-gray-lighter data-[focus]:font-semibold';

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className="">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-2 text-mb font-semibold text-gray-strong hover:text-gray">
            {title}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-strong"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-20 mt-1 min-w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray ring-opacity-5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <div>
              {categories.map((category) => (
                <MenuItem>
                  <Button className={buttonClassName}>{category}</Button>
                </MenuItem>
              ))}
            </div>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
