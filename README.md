Project Documentation
Project Title
MMU RHSF Fellowship Management System

Description
This database system is designed for the Multimedia University Repentance and Holiness Student Fellowship (RHSF) to manage their members, track attendance at various events, organize fellowship activities, and monitor spiritual growth of members. The system provides a comprehensive solution for:

Member registration and management
Event planning and attendance tracking
Departmental service assignments
Spiritual follow-up and growth monitoring
Testimony recording and announcement dissemination
How to Setup and Run
Ensure you have MySQL installed on your system
Create a new database (or use an existing one)
Execute the provided SQL script to create all tables and relationships
The database is now ready for use with your application
ER Diagram Description
The database consists of 10 interrelated tables:

members: Core table storing all member information
events: Records all fellowship events and activities
attendance: Tracks member participation in events
departments: Manages different service departments
member_departments: Junction table for many-to-many relationship between members and departments
testimonies: Stores member spiritual testimonies
follow_ups: Tracks spiritual follow-up activities
announcements: Manages fellowship announcements
member_exits: Records information about members who leave
spiritual_growth: Monitors members' spiritual development
Relationships include:

One-to-many: Members to Events (through attendance)
Many-to-many: Members to Departments (through member_departments)
One-to-one: Members to their exit records (if applicable)
Implementation Notes
The database is normalized to 3NF with appropriate constraints
All tables include proper primary and foreign key relationships
Data integrity is enforced through constraints and checks
Indexes are created for performance optimization on frequently queried columns
The design accommodates all the fellowship activities mentioned in your requirements
This implementation provides a solid foundation for building a complete fellowship management system that can scale as the ministry grows.

Simply visit the [Lovable Project](https://lovable.dev/projects/46bd5419-a497-44ad-af50-1da13c0445ea) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/46bd5419-a497-44ad-af50-1da13c0445ea) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
