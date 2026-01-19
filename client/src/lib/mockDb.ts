// Mock Database Helper
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  provider: 'email' | 'google' | 'microsoft' | 'apple';
  joinedAt: string;
  profilePic?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string; // denormalized for easier display
  serviceName: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'Credit Card' | 'PayPal' | 'WeChat Pay' | 'Alipay';
  date: string;
}

const INITIAL_SERVICES: Service[] = [
  { id: 's1', name: 'Online Specialist Consultation', price: 17.99, duration: '30 mins', description: 'One-on-one consultation with a specialist.' },
  { id: 's2', name: 'Basic Medical Check-up', price: 199, duration: '1 day', description: 'Comprehensive basic health screening.' },
  { id: 's3', name: 'Premium Medical Tourism Package', price: 5999, duration: '14 days', description: 'Full service medical travel package.' },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'o1', userId: 'u2', userName: 'Alice Smith', serviceName: 'Online Specialist Consultation', amount: 17.99, status: 'completed', paymentMethod: 'Credit Card', date: '2023-10-15' },
  { id: 'o2', userId: 'u2', userName: 'Alice Smith', serviceName: 'Basic Medical Check-up', amount: 199, status: 'pending', paymentMethod: 'PayPal', date: '2023-10-20' },
];

const INITIAL_USERS: User[] = [
  { id: 'u1', email: 'admin@vitacross.com', name: 'Admin User', role: 'admin', provider: 'email', joinedAt: '2023-01-01' },
  { id: 'u2', email: 'alice@example.com', name: 'Alice Smith', role: 'user', provider: 'google', joinedAt: '2023-10-15' },
];

export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem('vc_users') || JSON.stringify(INITIAL_USERS)),
  saveUser: (user: User) => {
    const users = db.getUsers();
    if (!users.find(u => u.id === user.id)) {
      users.push(user);
      localStorage.setItem('vc_users', JSON.stringify(users));
    }
  },
  deleteUser: (id: string) => {
    const users = db.getUsers().filter(u => u.id !== id);
    localStorage.setItem('vc_users', JSON.stringify(users));
  },
  getServices: (): Service[] => JSON.parse(localStorage.getItem('vc_services') || JSON.stringify(INITIAL_SERVICES)),
  saveService: (service: Service) => {
    const services = db.getServices();
    const idx = services.findIndex(s => s.id === service.id);
    if (idx >= 0) services[idx] = service;
    else services.push(service);
    localStorage.setItem('vc_services', JSON.stringify(services));
  },
  deleteService: (id: string) => {
    const services = db.getServices().filter(s => s.id !== id);
    localStorage.setItem('vc_services', JSON.stringify(services));
  },
  getOrders: (): Order[] => JSON.parse(localStorage.getItem('vc_orders') || JSON.stringify(INITIAL_ORDERS)),
  addOrder: (order: Order) => {
    const orders = db.getOrders();
    orders.push(order);
    localStorage.setItem('vc_orders', JSON.stringify(orders));
  }
};
