// Enhanced Jest mock for Supabase

const mockSelectChain = {
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: {}, error: null }),
  order: jest.fn().mockReturnThis(),
  then: jest.fn(), // for async/await compatibility
};

const mockFrom = jest.fn(() => ({
  select: jest.fn(() => mockSelectChain),
  insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
  update: jest.fn().mockResolvedValue({ data: {}, error: null }),
  delete: jest.fn().mockResolvedValue({ data: {}, error: null }),
}));

const mockSubscription = {
  unsubscribe: jest.fn(),
};

const mockChannel = jest.fn(() => ({
  on: jest.fn().mockReturnThis(),
  subscribe: jest.fn().mockReturnValue(mockSubscription),
}));

export const supabase = {
  auth: {
    signIn: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
  from: mockFrom,
  channel: mockChannel,
};

export default supabase; 