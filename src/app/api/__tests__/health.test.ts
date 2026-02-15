import { GET } from '../health/route';
import { prisma } from '@/lib/db';

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return health status when database is connected', async () => {
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('database', 'connected');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('environment');
  });

  it('should return disconnected status when database fails', async () => {
    (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('database', 'disconnected');
  });

  it('should include environment variable status', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.HUBSPOT_API_KEY = 'test-key';
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_USER = 'user';
    process.env.SMTP_PASSWORD = 'pass';
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-TEST';

    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(data.environment).toHaveProperty('supabase', true);
    expect(data.environment).toHaveProperty('hubspot', true);
    expect(data.environment).toHaveProperty('nodemailer', true);
    expect(data.environment).toHaveProperty('ga4', true);
  });

  it('should handle errors gracefully', async () => {
    (prisma.$queryRaw as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('status', 'error');
    expect(data).toHaveProperty('message');
  });
});

