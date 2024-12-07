import { z } from 'zod';

// Define Zod schemas
const emailSchema = z.string().email();
const teamNameSchema = z.string().min(3).max(30).regex(/^[a-zA-Z0-9-_\s]+$/);
const teamCodeSchema = z.string().length(8).regex(/^[A-Za-z0-9-_]{8}$/);

// Validation functions
export const validateEmail = (email) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateTeamName = (teamName) => {
  try {
    teamNameSchema.parse(teamName);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateTeamCode = (teamCode) => {
  try {
    teamCodeSchema.parse(teamCode);
    return true;
  } catch (e) {
    return false;
  }
};