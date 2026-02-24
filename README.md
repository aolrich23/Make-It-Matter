
# Make It Matter – Charity Craft Project Finder

A production-ready web application for discovering craft projects that support Australian charities.

## Features
- **Dynamic Data Loading**: Sourced from `/data/projects.json`.
- **Powerful Filtering**: Multi-select filters for Urgency, Craft, Materials, Category, Location, and Time.
- **Smart Search**: Instant fuzzy matching on titles and organization names.
- **Responsive Design**: Modern mobile-first UI with a warm, optimistic aesthetic.
- **Accessible UI**: High-contrast typography and intuitive navigation.

## Local Development

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.

### Adding Data
Simply update the `public/data/projects.json` file with new project entries following the established schema.

## Deployment to Google Cloud

This application is built as a static site, making it ideal for **Google Cloud Storage** (Static Website Hosting) or **Firebase Hosting**.

### Option A: Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
   - Select your project.
   - Set public directory to `dist`.
   - Configure as a single-page app: `Yes`.
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Option B: Google Cloud Storage
1. Build the project: `npm run build`.
2. Create a bucket in GCS.
3. Upload the contents of the `dist/` folder.
4. Set the `Main page` to `index.html`.
5. Set permissions to `allUsers` with `Storage Object Viewer` access.

## Architecture
- **React 18+**: Functional components with Hooks.
- **TypeScript**: Full type safety for data and props.
- **Tailwind CSS**: Utility-first styling with a custom warm palette.
- **Single Source of Truth**: Data-driven UI derived from a central JSON source.

## Data Transformation (ETL)

The project uses a Python-based ETL (Extract, Transform, Load) process to manage data from various sources.

### Structure
- **`etl/sources/`**: Contains raw JSON data files (e.g., `manual.json`, `sewforcharity.json`).
- **`etl/transformers/`**: Python classes responsible for normalizing specific source data into the application schema.
- **`etl/merge.py`**: The main script that aggregates all sources.

### Running the Transformation
To update `data/projects.json` with the latest source data:

1. Open a terminal in the project root.
2. Run the merge script:
   ```bash
   python3 etl/merge.py
   ```
3. The script will process the sources and overwrite `data/projects.json`.
