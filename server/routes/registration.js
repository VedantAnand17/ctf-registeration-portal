import express from 'express';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { validateEmail, validateTeamName, validateTeamCode } from '../utils/validation.js';

export const router = express.Router();

// Create new team and register user
router.post('/register/new-team', async (req, res) => {
  try {
    const { name, email, collegeName, teamName } = req.body;

    // Validation
    if (!name || !email || !collegeName || !teamName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validateTeamName(teamName)) {
      return res.status(400).json({ 
        error: 'Invalid team name. Must be 3-30 characters and contain only letters, numbers, spaces, hyphens, and underscores' 
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team name already taken' });
    }

    // Create new team
    const team = new Team({ teamName });
    await team.save();

    // Create new user
    const user = new User({
      name,
      email,
      collegeName,
      team: team._id
    });
    await user.save();

    // Add user to team
    team.members.push(user._id);
    await team.save();

    res.status(201).json({
      message: 'Team created and user registered successfully',
      teamCode: team.teamCode,
      teamName: team.teamName,
      teamId: team._id
    });
  } catch (error) {
    console.error('Error in new team registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Join existing team
router.post('/register/join-team', async (req, res) => {
  try {
    const { name, email, collegeName, teamCode } = req.body;

    // Validation
    if (!name || !email || !collegeName || !teamCode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validateTeamCode(teamCode)) {
      return res.status(400).json({ error: 'Invalid team code format' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Find team
    const team = await Team.findOne({ teamCode });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check team size limit (max 4 members)
    if (team.members.length >= 4) {
      return res.status(400).json({ error: 'Team is already full (max 4 members)' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      collegeName,
      team: team._id
    });
    await user.save();

    // Add user to team
    team.members.push(user._id);
    await team.save();

    res.status(201).json({
      message: 'Successfully joined team',
      teamName: team.teamName,
      teamId: team._id
    });
  } catch (error) {
    console.error('Error in joining team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team details
router.get('/team/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error fetching team details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});