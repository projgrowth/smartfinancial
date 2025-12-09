import { z } from 'zod';

export const meetingRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 digits"),
  preferred_date: z.string().optional(),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

export type MeetingRequest = z.infer<typeof meetingRequestSchema>;
