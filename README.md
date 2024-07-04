# Industrial Energy Battery Site Layout

## Project Description
This project is a site layout webpage that allows users to mockup the build of materials and site layout of an Industrial Energy Battery site. The site provides an intuitive UI for customers to configure the assembly of batteries they want on their site.

## Features
- Users can enter the number of each type of battery.
- The UI calculates and displays the total price, land dimension required, and site's energy density.
- Auto-generated site layout showing an arrangement of batteries based on user configuration.
   - The interface was built using Three.js to render boxes representative of batteries and transformers to scale. This was my first time using this library and a fun learning experience.
- The layout does not exceed 100ft in width.

## Technologies Used
- [Next.js 14](https://nextjs.org/)
- TypeScript

## Getting Started

### Prerequisites
Make you have the following installed:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/KentHHarris/industrial-energy-site
   cd https://github.com/KentHHarris/industrial-energy-site


2. Install and run the application
   ```bash
   docker-compose up --build

## Next Steps
- No database was used; data is stored locally as the data is static. I would use Prisma and Postgres to manage device (and any other necessary) data if building this website out more.

- I would use custom models for the *Three.js* materials of the devices rendered on the site layout, for better visual distinction of which device is what. And, perhaps, provide the ability for users to click on the devices and see a tooltip with more information about it.
