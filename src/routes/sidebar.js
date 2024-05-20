/** Icons are imported separatly to reduce build time */

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';

import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
    role: ['Admin', 'Moderator'],
  },
  {
    path: '/app/users', // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: 'Users',
    role: ['Admin'], // name that appear in Sidebar
  },
  {
    path: '/app/investors', // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: 'Investors',
    role: ['Moderator'], // name that appear in Sidebar
  },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Pages',
    role: ['Admin', 'Moderator'],
    submenu: [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: 'Login',
      },

      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses} />,
        name: 'Forgot Password',
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: 'Blank Page',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: '404',
      },
    ],
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Settings',
    role: ['Admin', 'Moderator'], // name that appear in Sidebar
    submenu: [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      // {
      //   path: '/app/settings-billing',
      //   icon: <WalletIcon className={submenuIconClasses}/>,
      //   name: 'Billing',
      // },
      // {
      //   path: '/app/settings-team', // url
      //   icon: <UsersIcon className={submenuIconClasses}/>, // icon component
      //   name: 'Team Members', // name that appear in Sidebar
      // },
    ],
  },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/app/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses}/>,
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses}/>,
  //       name: 'Components',
  //     }
  //   ]
  // },
];

export default routes;
