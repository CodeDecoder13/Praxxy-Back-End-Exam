![image](https://github.com/user-attachments/assets/5f1f7305-c4a4-4dea-9e9e-36b14aa0cf4b)

# Praxxy Backend Exam Project


A modern web application built with Laravel 11 and Vue 3, featuring a responsive and maintainable design using Tailwind CSS.

## 🚀 Features

- Modern and responsive UI using Tailwind CSS
- Vue 3 for interactive frontend components
- Laravel 11 backend with robust API architecture
- Interactive charts and data visualization
- Map integration with Leaflet
- Rich text editing capabilities
- Calendar functionality

## 📋 Prerequisites

- PHP >= 8.2
- Node.js (Latest LTS version recommended)
- Composer
- MySQL or SQLite

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Praxxy
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Set up environment file:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env` file

6. Run migrations:
```bash
php artisan migrate
```

7. Seed the database:
```bash
# Seed the main database (creates admin user)
php artisan db:seed

# Seed products (creates 50 random products)
php artisan db:seed --class=ProductSeeder

# For verbose output during seeding, add the -v flag
php artisan db:seed --class=ProductSeeder -v
```

8. Start the development server:
```bash
php artisan serve
```

9. In a separate terminal, compile assets:
```bash
npm run dev
```

## 📦 Key Dependencies

### Backend (Laravel)
- Laravel Framework v11.31
- Laravel Sanctum v4.0
- Laravel Breeze v2.3
- Inertia.js v2.0

### Frontend
- Vue.js v3.4.0
- Tailwind CSS v3.2.1
- Headless UI v1.7.23
- Chart.js v4.4.8
- ECharts v5.6.0
- Leaflet (Vue Leaflet v0.10.1)
- Video.js v8.21.0
- V-Calendar v3.1.2

## 🎨 Design Philosophy

This project follows several key principles:
1. **Responsive Design**: Built with Tailwind CSS for a fully responsive experience
2. **Code Simplicity**: Maintaining clean and straightforward code structure
3. **Maintainability**: Well-organized components and services
4. **Reusability**: Component-based architecture for maximum code reuse
5. **Modern Practices**: Following latest Laravel and Vue.js best practices

## 🔧 Development

The project uses Vite for asset compilation. Available commands:

```bash
# Run development server
npm run dev

# Build for production
npm run build
```

## 📄 License

This project is open-sourced software licensed under the MIT license.
