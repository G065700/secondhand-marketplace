# Secondhand Marketplace

This is a full-stack Next.js application designed to be a secondhand marketplace. Users can buy and sell used items, manage their profiles, and interact with other users.

## Features

- User authentication (sign up, sign in, sign out) with NextAuth.js (Google and Credentials providers)
- Product listing and management (upload, update, view products)
- User profile management
- Image uploads (Cloudinary integration)
- Location-based services (Kakao Maps integration)
- Admin functionalities (user and product management - inferred)
- Responsive UI with Tailwind CSS and Material UI (Joy UI)

## Technologies Used

**Frontend:**

- Next.js 14 (React 19)
- TypeScript
- React Hook Form
- NextAuth.js
- Tailwind CSS
- Emotion (for @mui/joy)
- @mui/joy (Material UI Joy)
- React Icons
- React Kakao Maps SDK
- React Toastify
- SWR (for data fetching)

**Backend:**

- Next.js API Routes
- Prisma (ORM)
- PostgreSQL (Database)
- bcryptjs (password hashing)
- Axios (HTTP client)

**Development Tools:**

- ESLint
- Prettier
- Yarn (package manager)
- Docker Compose (for PostgreSQL)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn (v4 or later)
- Docker (for PostgreSQL)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/secondhand-marketplace.git
    cd secondhand-marketplace
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.avhvbfixtqlmvsjccaul.supabase.co:5432/postgres"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
    NEXT_PUBLIC_KAKAO_MAP_APP_KEY="YOUR_KAKAO_MAP_APP_KEY"
    ```

    _Replace `[YOUR-PASSWORD]` with your Supabase database password and other placeholders with your actual values._

4.  **Generate Prisma client and push database schema:**
    ```bash
    yarn prisma:generate
    yarn prisma:db
    ```
    _Ensure your Supabase database is running and accessible before running this command._

### Running the Application

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
yarn start
```

## Project Structure (Key Directories)

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable React components.
- `src/helpers`: Utility functions (e.g., `prismadb.ts`, `uploadImage.ts`).
- `prisma`: Prisma schema and migrations.
- `public`: Static assets.

## Linting and Formatting

- **Lint:** `yarn lint`
- **Format:** `yarn prettier --write .`

## Contributing

Feel free to contribute to this project. Please follow the existing code style and submit pull requests.

## License

[Specify your license here, e.g., MIT License]
