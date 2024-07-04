import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  
  const labelClassName =
    'block mb-2 text-sm font-medium text-gray-strong dark:text-white';
  const inputClassName =
    'bg-gray-lighter border border-gray-light text-gray-strong text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-strong dark:border-gray-strong dark:placeholder-gray dark:text-white dark:focus:ring-secondary dark:focus:border-secondary';

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-24 xl:mx-40">
      <div className="px-4 sm:px-0">
        <h1>My Profile</h1>
        <div className="flex justify-between">
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
          {!isEditing ? (
            <Button color="secondary" onClick={handleEdit}>
              Edit Profile
            </Button>
          ) : (
            <Button color="primary" onClick={() => setIsEditing(false)}>
              Save
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6 border-t border-gray-light">
        <dl className="divide-y divide-gray-light">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-strong">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {isEditing ? (
                <Input
                  id="name"
                  type="text"
                  value={name}
                  labelClassName={labelClassName}
                  inputClassName={inputClassName}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                name
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {isEditing ? (
                <Input
                  id="email"
                  type="text"
                  value={email}
                  labelClassName={labelClassName}
                  inputClassName={inputClassName}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
