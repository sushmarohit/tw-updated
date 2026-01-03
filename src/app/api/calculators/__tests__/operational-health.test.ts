/**
 * @jest-environment node
 */
import { POST } from '../operational-health/route';
import { prisma } from '@/lib/db';
import { upsertHubSpotContact } from '@/lib/integrations/hubspot';
import { sendCalculatorReportEmail } from '@/lib/integrations/sendgrid';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      upsert: jest.fn(),
    },
    assessmentSession: {
      create: jest.fn(),
    },
    indexScore: {
      create: jest.fn(),
    },
    userResponse: {
      create: jest.fn(),
    },
  },
}));

jest.mock('@/lib/integrations/hubspot');
jest.mock('@/lib/integrations/sendgrid');

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockUpsertHubSpotContact = upsertHubSpotContact as jest.MockedFunction<typeof upsertHubSpotContact>;
const mockSendCalculatorReportEmail = sendCalculatorReportEmail as jest.MockedFunction<typeof sendCalculatorReportEmail>;

describe('/api/calculators/operational-health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process calculator request successfully', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [
          { questionId: 'q1', score: 80 },
          { questionId: 'q2', score: 90 },
        ],
      }),
    });

    mockPrisma.user.upsert = jest.fn().mockResolvedValue({ id: 'user-123', email: 'test@example.com' });
    mockPrisma.assessmentSession.create = jest.fn().mockResolvedValue({ id: 'session-123' });
    mockPrisma.indexScore.create = jest.fn().mockResolvedValue({});
    mockPrisma.userResponse.create = jest.fn().mockResolvedValue({});

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('result');
    expect(data).toHaveProperty('sessionId');
  });

  it('should handle invalid input', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: null,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('should handle empty answers array', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('should sync to HubSpot when user info provided', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [{ questionId: 'q1', score: 80 }],
        userInfo: {
          email: 'test@example.com',
          name: 'John Doe',
        },
      }),
    });

    mockPrisma.user.upsert = jest.fn().mockResolvedValue({ id: 'user-123', email: 'test@example.com' });
    mockPrisma.assessmentSession.create = jest.fn().mockResolvedValue({ id: 'session-123' });
    mockPrisma.indexScore.create = jest.fn().mockResolvedValue({});
    mockPrisma.userResponse.create = jest.fn().mockResolvedValue({});
    mockUpsertHubSpotContact.mockResolvedValue('contact-123');

    await POST(request);

    expect(mockUpsertHubSpotContact).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      })
    );
  });

  it('should send email when user info provided', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [{ questionId: 'q1', score: 80 }],
        userInfo: {
          email: 'test@example.com',
          name: 'John Doe',
        },
      }),
    });

    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

    mockPrisma.user.upsert = jest.fn().mockResolvedValue({ id: 'user-123', email: 'test@example.com' });
    mockPrisma.assessmentSession.create = jest.fn().mockResolvedValue({ id: 'session-123' });
    mockPrisma.indexScore.create = jest.fn().mockResolvedValue({});
    mockPrisma.userResponse.create = jest.fn().mockResolvedValue({});
    mockSendCalculatorReportEmail.mockResolvedValue(true);

    await POST(request);

    expect(mockSendCalculatorReportEmail).toHaveBeenCalled();
  });

  it('should handle database errors gracefully', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [{ questionId: 'q1', score: 80 }],
      }),
    });

    mockPrisma.user.upsert = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await POST(request);
    const data = await response.json();

    // Should still return result even if DB fails
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('result');
  });

  it('should handle HubSpot sync errors gracefully', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: JSON.stringify({
        answers: [{ questionId: 'q1', score: 80 }],
        userInfo: {
          email: 'test@example.com',
        },
      }),
    });

    mockPrisma.user.upsert = jest.fn().mockResolvedValue({ id: 'user-123', email: 'test@example.com' });
    mockPrisma.assessmentSession.create = jest.fn().mockResolvedValue({ id: 'session-123' });
    mockPrisma.indexScore.create = jest.fn().mockResolvedValue({});
    mockPrisma.userResponse.create = jest.fn().mockResolvedValue({});
    mockUpsertHubSpotContact.mockRejectedValue(new Error('HubSpot error'));

    const response = await POST(request);
    const data = await response.json();

    // Should still succeed even if HubSpot fails
    expect(data).toHaveProperty('success', true);
  });

  it('should handle malformed JSON', async () => {
    const request = new Request('http://localhost/api/calculators/operational-health', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
  });
});

