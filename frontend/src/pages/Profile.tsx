import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearToast, setToast } from '../stores/features/toast';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const dispatch = useDispatch();

  const labelClassName =
    'bloc text-sm font-medium text-gray-strong dark:text-white';
  const inputClassName =
    'w-full p-2.5 bg-gray-lighter border-gray-light text-gray-strong text-sm rounded-lg focus:ring-gray-light focus:border-gray-light block dark:bg-gray-strong dark:border-gray-strong dark:placeholder-gray dark:text-white dark:focus:ring-secondary dark:focus:border-secondary';

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    axios
      .get(`/api/username?userId=${userId}`)
      .then((response) => {
        setName(response.data.name);
        setInitialName(response.data.name);
      })
      .catch((error) => {
        console.error('Error getting user name:', error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!name || /\d/.test(name)) {
      dispatch(
        setToast({
          message: 'Name cannot be empty or contain numbers!',
          type: 'warning',
          visible: true,
        })
      );
      setTimeout(() => {
        dispatch(clearToast());
      }, 2000);
      return;
    }

    if (name === initialName) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);

    axios
      .post('/api/update-username', {
        userId: localStorage.getItem('uid'),
        newName: name,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(
          setToast({
            message: 'Profile updated successfully!',
            type: 'success',
            visible: false,
          })
        );
        setInitialName(name); 
        setTimeout(() => {
          dispatch(clearToast());
        }, 2000);
      })
      .catch((error) => {
        console.error('Error saving profile:', error);
      });
  };

  return (
    <div>
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
            <Button color="primary" onClick={handleSave}>
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
              {localStorage.getItem('email')}
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
