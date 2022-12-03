import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Admin',
    icon: 'settings',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Accounts',
            link: '/admin/accounts'
          },
          {
            label: 'Customers',
            link: '/admin/customers'
          },
          {
            label: 'Users',
            link: '/admin/users'
          },
          {
            label: 'Suppliers',
            link: '/admin/suppliers'
          },
          {
            label: 'Taxes',
            link: '/admin/taxes'
          },
          {
            label: 'Configuration',
            link: '/admin/configuration'
          },
          {
            label: 'Inventory',
            link: '/admin/inventory'
          },
          {
            label: 'GL Codes',
            link: '/admin/glcodes'
          },
          {
            label: 'temporary edit inventory',
            link: '/admin/editinventory'
          },
        ]
      }
    ]
  },
  {
    label: 'Orders',
    icon: 'credit-card',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Abhinandan',
            link: '/orders/order',
          },
          {
            label: 'Search Orders',
            link: '/orders/search-orders',
          },
          {
            label: 'Work Orders',
            link: '/orders/work-orders',
          }
        ]
      }
    ]
  },
  {
    label: 'Invoice',
    icon: 'file-text',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Search Existing Invoices',
            link: '/invoice/search-existing-invoices',
          },
          
        ]
      }
    ]
  },
  {
    label: 'Shipping',
    icon: 'truck',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Submenu 1',
            link: '/dashboard',
          },
          {
            label: 'Submenu 2',
            link: '/dashboard',
          }
        ]
      }
    ]
  },
  {
    label: 'Purchasing',
    icon: 'shopping-cart',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'New Purchase Order',
            link: '/purchasing/posupplier'
          },
          {
            label: 'View Purchase Orders',
            link: '/purchasing/polist'
          },
          {
            label: 'Ordering by Supplier',
            link: '/purchasing/bolist'
          },
          {
            label: 'Receiving',
            link: '/purchasing/receivinglist'
          },
        ]
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'database',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Submenu 1',
            link: '/dashboard',
          },
          {
            label: 'Submenu 2',
            link: '/dashboard',
          }
        ]
      }
    ]
  },
  {
    label: 'Other',
    icon: 'eye',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Test API',
            link: '/other/test-api',
          },
          {
            label: 'Submenu 2',
            link: '/dashboard',
          }
        ]
      }
    ]
  }
];
