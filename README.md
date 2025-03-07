# CTF Registration Portal

This is a [Next.js](https://nextjs.org) project with Express backend for team registration in Capture The Flag events.

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. First, install the dependencies:

```bash
pnpm install
```

Then, run the development servers:

```bash
# Start the backend server
pnpm dev

# In a new terminal, start the frontend
pnpm frontend
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Create new teams or join existing ones
- View team details and members
- Real-time validation
- Responsive design

## Project Structure

```
├── server/         # Backend Express server
├── src/
│   ├── app/       # Next.js app directory
│   └── components/ # React components
```

## Learn More

### .env STRUCTURE

PORT=5000

MONGODB_URI=mongodb+srv://xx:xx@xx.xx.xx.xx/registeration-portal

NODE_ENV=development
