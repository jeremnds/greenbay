# 🌿 Greenbay

Greenbay is an e-commerce platform specializing in plants and accessories, providing a fully-featured dashboard for administrators and a smooth shopping experience for users. This project showcases a modern stack with authentication, payments, and a responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?logo=nextdotjs&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green)

## 📑 Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Environment Variables](#environment-variables)
7. [Database Schema](#database-schema)
8. [Screenshots](#screenshots)
9. [Live Demo](#live-demo)
10. [License](#license)

## Features ✨

- **User Authentication**: Secure sign-up and log-in using Auth.js.
- **Dashboard Management**: Add, edit, delete products and categories, and upload images for both products and categories.
- **Order Placement**: Users can place orders and view them in their personal space.
- **Payment Integration**: Integrated with Stripe for secure payment processing.
- **Search Bar**: A search bar is available both on the dashboard and the storefront to quickly find products and categories.
- **Responsive UI**: Designed with TailwindCSS for a seamless experience across devices.
- **Dark Mode**: Provides a toggleable dark mode for users, improving readability and reducing eye strain in low-light environments.

## Technologies Used 🛠

Greenbay was built using the following technologies:

### Framework 🧩

- **[Next.js](https://nextjs.org/)**: For the React-based framework optimized for production.

### Frontend - Styling and UI 🎨

- **[TailwindCSS](https://tailwindcss.com/)**: For the styling of the user interface.
- **[shadcn/ui](https://shadcn.dev/)**: For custom UI components.
- **[Lucide](https://lucide.dev/)**: For iconography.
- **[HyperUI](https://hyperui.dev/)**: For UI components such as inputs and tables.

### Backend - Database and APIs 🔗

- **[Supabase](https://supabase.com/)**: As the backend database solution.
- **[Stripe](https://stripe.com/)**: For processing payments.

### State Management and Logic 🧠

- **[Zustand](https://zustand-demo.pmnd.rs/)**: For state management.
- **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)**: For form validation and handling.

### Authentication 🔒

- **[Auth.js](https://authjs.dev/)**: For managing authentication.

### File Handling 📂

- **[React Dropzone](https://react-dropzone.js.org/)**: For handling file uploads.

## Prerequisites 🔧️

- Node.js >= 14.x
- npm or yarn

## Installation ⚙️

To run Greenbay locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/greenbay.git
cd greenbay
```

2. Install the required dependencies:

```bash
npm install
```

3. Set up your environment variables (use the `.env.example` file for reference):

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Usage 🚀

To start using Greenbay:

- **Admin**: Log in to access the Dashboard, ensure the user's role is set to "admin" in Supabase to enable access.
- **User**: Create an account to place orders, manage your orders, and explore plant products through the storefront.

### Example Commands

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Environment Variables 🔐

The project uses environment variables to manage sensitive data like database URLs, Stripe keys, and authentication secrets. Ensure that you set these variables in your `.env` file:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret


# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Refer to the `.env.example` file for more information on required environment variables.

## Database Schema 🗄️

To set up the database schema for Greenbay, you need to execute the SQL commands that will create the necessary tables and relationships. These tables include products, categories, orders, and users.

### Importing the Database Schema

1. Clone the repository and navigate to the root of your project.

2. Ensure you have a working Supabase project set up. You will need your Supabase URL and API keys.

3. Run the provided SQL schema file to create the necessary tables in your Supabase database:

```bash
psql -h your-supabase-url -U your-username -d your-database-name -f schema.sql
```

Or you can use the SQL editor in the Supabase dashboard to manually execute the SQL commands.

You can find the `schema.sql` file in the root of the project: [schema.sql](./schema.sql)

This file contains the following tables:

- **products**: Contains the product information, including price, category, and availability.
- **categories**: Holds the categories for organizing products.
- **orders**: Manages orders, linking users to purchased items.
- **users**: Stores user account details, including roles and authentication information.

Executing this file will set up your database for use with the Greenbay project.

## Screenshots 🖼️

Here are some screenshots of the Greenbay project:

1. **Storefront** - Explore plant products, search, and place orders.  
   ![Landing Page](https://i.imgur.com/0rGtyS3.png)
   ![Products Page](https://i.imgur.com/sZcSr1k.png)
   ![Cart Page](https://i.imgur.com/N98xmuz.png)

2. **Admin Dashboard** - Manage products and categories, upload images, and search for items.  
   ![Admin Products Page](https://i.imgur.com/lgrGbqD.png)
   ![Product Edit Page](https://i.imgur.com/KoZVfw7.png)

3. **Order Summary (in Dark Mode)** - Users can view their order history, see order details, and track the status of their purchases.  
   ![Order History](https://i.imgur.com/i7yP5Rb.png)  
   ![Order Details](https://i.imgur.com/dC4xRBJ.png)

## Live Demo 🌐

Check out the live version of Greenbay to explore the features and user interface:  
[Click here](https://greenbay-mu.vercel.app/)

## License 📜

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
