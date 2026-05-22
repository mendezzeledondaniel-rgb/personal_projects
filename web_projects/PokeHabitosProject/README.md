# PokeHabitos

PokeHabitos is a web application for tracking daily habits, inspired by the Pokémon universe. Users can create, modify, and delete habits, track their progress, gain experience (XP), and unlock Pokémon as rewards. The application includes an achievements system, streaks, and data export/import functionality.

## How to Use the Application

1. **Login**: Access with an existing user or register to create a new account.
2. **Main Dashboard**: Once logged in, you'll see your HUD with level, XP, and main Pokémon. Manage your daily, weekly, and other habits.
3. **Habit Management**: Add habits with name, category, type (binary or quantity), frequency, and goal (if applicable).
4. **Progress**: Mark habits as completed to gain XP and level up.
5. **Pokémon**: Unlock and train Pokémon based on your progress.
6. **Achievements and Streaks**: Review your obtained achievements and active streaks.
7. **Export/Import**: Save or load your data in JSON format.

## Main Features

- **Registration and Login**: Simple authentication with predefined or new users.
- **Habit Management**: Create, edit, and delete habits with different frequencies (daily, weekly, biweekly, monthly) and types (binary or quantity with goal).
- **Progress Tracking**: Progress bars for daily and weekly habits, activity history.
- **Rewards System**: Gain XP, level up, unlock and train Pokémon.
- **Achievements and Streaks**: Achievement system for milestones and streaks for consecutive days.
- **Pokémon Management**: View collection, change main Pokémon, add new ones based on level.
- **Export/Import Data**: Download profile in JSON or import to transfer data.

## Application Pages

### index.html (Login)
- Login form with username and password.
- Button to register.
- Redirects to `pages/principal.html` if successful.

### pages/registro.html (Registration)
- Form to create new user with name, password, and initial Pokémon selection.
- Validates data and saves to localStorage.

### pages/principal.html (Main Dashboard)
- **HUD**: Shows name, level, XP, and main Pokémon with Pokémon list.
- **Daily/Weekly Progress**: Progress bars for completed habits.
- **Today's Tasks**: List of habits by frequency (daily, weekly, etc.), with checkboxes or quantity inputs.
- **Activity History**: List of recent actions (completed habits, etc.).
- **Management Buttons**: Add, modify, delete habits (with modals).
- **Export/Import Data**: Buttons to download/upload profile JSON.

### pages/perfil.html (My Profile)
- User information: level, XP, main Pokémon, and list.
- Change main Pokémon.
- Habit records history by date.

### pages/logros.html (Streaks and Achievements)
- **Streaks**: Shows active streaks (consecutive days completing habits).
- **Achievements**: List of obtained achievements with descriptions.

### pages/mispokemon.html (My Pokémon)
- List of obtained Pokémon with images and levels.
- Button to add new Pokémon (based on user level).
- Explanation of requirements to add Pokémon.

## Test Users

To review the application, use these predefined users:

- **Ash**
  - Username: Ash
  - Password: pikachu123
  - Habits: Exercise (daily, quantity, goal 8), Eat healthy (daily, quantity, goal 5), Exercise (daily, binary).
  - Pokémon: Pikachu (level 5), Bulbasaur (level 3).
  - Level: 1, XP: 20.

- **Misty**
  - Username: Misty
  - Password: starmie456
  - Habits: Read a book (weekly, quantity, goal 1), Drink glasses of water (daily, quantity, goal 8).
  - Pokémon: Starmie (level 5).
  - Level: 1, XP: 15.

- **Brock**
  - Username: Brock
  - Password: onix789
  - Habits: Sleep 8 hours (daily, quantity, goal 8).
  - Pokémon: Onix (level 5).
  - Level: 2, XP: 25.

You can register to create new users.

## Technologies Used

- **HTML/CSS/JavaScript**: Vanilla frontend.
- **localStorage**: User data storage.
- **PokeAPI**: To get Pokémon images and data.
- **JSON**: For exporting/importing data.

## Installation and Deployment

1. Clone or download the project.
2. Open `index.html` in a web browser (Chrome recommended for compatibility).
3. No server required; works locally.
4. For development, edit files in `pages/`, `scripts/`, and `styles.css`.

## Notes

- Data is stored in the browser's localStorage.
- Export your data before logging out to avoid losing progress.
- The application is responsive and works on mobile devices.

Enjoy building habits with PokeHabitos!