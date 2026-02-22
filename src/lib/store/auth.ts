import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, Address } from '@/types';

interface AuthStore {
  isAuthenticated: boolean;
  isAdmin: boolean;
  customer: Customer | null;
  login: (email: string, password: string) => boolean;
  adminLogin: (password: string) => boolean;
  logout: () => void;
  adminLogout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
}

const demoCustomer: Customer = {
  id: 'cust-1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  birthday: '1992-06-15',
  addresses: [
    {
      id: 'addr-1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: '42 Marine Drive',
      addressLine2: 'Apt 12B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      country: 'India',
      isDefault: true,
    },
  ],
  totalOrders: 5,
  totalSpent: 185000,
  status: 'active',
  notes: '',
  joinDate: '2024-08-15T10:00:00Z',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isAdmin: false,
      customer: null,
      login: (email: string, _password: string) => {
        if (email) {
          set({ isAuthenticated: true, customer: { ...demoCustomer, email } });
          return true;
        }
        return false;
      },
      adminLogin: (password: string) => {
        if (password === 'lumiere2025') {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, customer: null });
      },
      adminLogout: () => {
        set({ isAdmin: false });
      },
      updateProfile: (data) => {
        const current = get().customer;
        if (current) {
          set({ customer: { ...current, ...data } });
        }
      },
      addAddress: (address) => {
        const customer = get().customer;
        if (customer) {
          set({
            customer: {
              ...customer,
              addresses: [...customer.addresses, address],
            },
          });
        }
      },
      updateAddress: (id, data) => {
        const customer = get().customer;
        if (customer) {
          set({
            customer: {
              ...customer,
              addresses: customer.addresses.map((a) =>
                a.id === id ? { ...a, ...data } : a
              ),
            },
          });
        }
      },
      deleteAddress: (id) => {
        const customer = get().customer;
        if (customer) {
          set({
            customer: {
              ...customer,
              addresses: customer.addresses.filter((a) => a.id !== id),
            },
          });
        }
      },
    }),
    { name: 'lumiere-auth' }
  )
);
