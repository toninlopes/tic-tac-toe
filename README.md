# Tic Tac Toe - React Native Technical Assessment

This is a React Native/Expo project implementing a basic Tic Tac Toe game. Your task is to complete one or more of the challenges listed below.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator, or Expo Go app on your device

### Installation

1. Install dependencies:
  ```bash
   npm install
  ```
2. Start the development server:
  ```bash
   npx expo start
  ```
   Or use a development build:
3. Run on your preferred platform:
  - Press `i` for iOS Simulator
  - Press `a` for Android Emulator
  - Scan the QR code with Expo Go app on your device

## Project Structure

```
├── app/                    # Expo Router screens (file-based routing)
│   ├── _layout.tsx         # Root layout with navigation
│   ├── index.tsx           # Home screen
│   └── board.tsx           # Game board screen
├── components/             # Reusable UI components
│   └── TicTacToe/          # Game-specific components
│       └── board/          # Board and Tile components
├── modules/                # Business logic and state management
│   └── TicTacToe/          # Game context, types, and constants
├── styles/                 # Theme and styling utilities
└── types/                  # Global type definitions and extensions
```

## Current Implementation

The app includes:

- A 3x3 Tic Tac Toe game board
- Two-player local gameplay (X and O)
- Victory detection with highlighted winning tiles
- Game reset functionality
- Dark/light mode support
- Move history tracking with timestamps

---

## Rules

### Code like you would on the job

Your delivery must be committed and pushed to the repository you were provided with. Please organise your commits to help reviewers follow your thought process.

### Help us follow your abstractions

You may add and extend types as you wish. If you set out to modify any types already provided, please write comments explaining your reasoning for doing so.

### Show us what *you* can do

For all of these challenges, you are encouraged to write code yourself. You may install external packages, but you must provide your reasoning for each of them.

## Challenges

- You should deliver as many as you can; you need not deliver all of them.
- Which you deliver and the order in which to do them is up to you. Time management is part of the test.
- In our evaluation, we will consider the complexity of the challenges you chose to deliver, the quality of those deliveries, and lastly how many of them you delivered in total. Focus on quality over quantity. We will also consider which challenges are more closely aligned with the role you are applying for, if applicable.
- Focus on code quality, proper TypeScript usage, and React Native best practices.

### Challenge 1: Undo Last Move

Implement an "Undo" button that reverts the last move. The button should be disabled when there are no moves to undo or when the game is over.

**Acceptance Criteria:**

- Add an "Undo" button visible during gameplay
- Clicking undo removes the last move and switches back to the previous player
- Button is disabled when no moves exist or game has ended

---

### Challenge 2: Optimize Re-renders

Profile the app and identify unnecessary re-renders.

**Acceptance Criteria:**

- Document which components were re-rendering unnecessarily
- Apply appropriate memoization techniques
- Verify improvements with React DevTools profiler

---

### Challenge 3: Display Current Player

Add a UI element that shows whose turn it is (Player X or Player O) above the board.

**Acceptance Criteria:**

- Display current player's symbol prominently
- Update immediately when turns change
- Hide or modify when game ends

---

### Challenge 4: AI Opponent (Minimax)

Implement a single-player mode with an unbeatable AI opponent using the Minimax algorithm. Add a menu option to choose between "Play vs Friend" and "Play vs Computer".

**Acceptance Criteria:**

- Add game mode selection on home screen
- Computer makes moves of some kind on its own against the user
- Bonus 1: AI is capable of making optimal moves, such that it either always wins or draws, never loses.
- Bonus 2: Three difficulty level selections, where AI behaves differently depending on the setting. If this is implemented, then the highest difficulty should be the only one where the AI never loses as specified on bonus 1.

---

### Challenge 5: Unit & Integration Tests

Write comprehensive tests for the game logic and components.

**Acceptance Criteria:**

- Test `Victory.evaluateGame()` function with various board states
- Test the `TicTacToeProvider` context behavior
- Test the `Tile` component interactions
- Achieve reasonable coverage of critical paths

The official [Expo Unit Testing Documentation]([https://docs.expo.dev/develop/unit-testing/) was used to do this challenge.

---

### Challenge 6: Draw Detection

The game currently doesn't detect when the board is full with no winner (a draw). Implement draw detection and display an appropriate message to the user.

**Acceptance Criteria:**

- Detect when all tiles are filled with no winner
- Display a "Draw" message to users
- Allow resetting the game after a draw

*Bonus: predictive draw detection. Extra points if the draw detection mechanism is able to detect a draw not only when the board is completely filled, but also when there are no more ways for either player to win, even if there are tiles available.*

---

### Challenge 7: Score Tracking

Persist wins/losses/draws across multiple game sessions. Display the scoreboard on the home screen.

**Acceptance Criteria:**

- Track X wins, O wins, and draws
- Persist scores across app restarts
- Display scoreboard on home screen
- Add option to reset scores

---

### Challenge 8: State Machine Architecture

Refactor the game state management using a state machine pattern (e.g., with XState or a custom implementation). States should include: `idle`, `playing`, `won`, `draw`.

**Acceptance Criteria:**

- Define clear game states and transitions
- Prevent invalid state transitions
- Document the state machine design

---

### Challenge 9: Improve Accessibility

Add proper accessibility labels to the tiles so screen readers can announce the game state.

**Acceptance Criteria:**

- All interactive elements have appropriate accessibility labels
- Screen reader can announce: empty tiles, played tiles, whose turn it is
- Game outcome is announced to screen readers

---

### Challenge 10: Configurable Board Size

Make the board size configurable (3x3, 4x4, 5x5). Update the victory conditions dynamically based on board size. Ensure the UI scales properly.

**Acceptance Criteria:**

- Add board size selection before starting game
- Victory conditions adapt to board size (e.g., 4-in-a-row for 4x4)
- UI scales appropriately for different board sizes

---

### Challenge 11: Code Review

Review the existing `modules/TicTacToe/types.ts` file. Write a brief document identifying potential improvements regarding:

- Type safety issues
- Code organization
- The `Victory.evaluateGame` method implementation
- Any other concerns or suggestions

**Deliverable:** A markdown file with your code review notes and suggested improvements.

---

### Challenge 12: Animated Winning Tiles

Add an animation to the winning tiles when a player wins (e.g., pulse, scale, or color fade). Use `react-native-reanimated` (already installed).

**Acceptance Criteria:**

- Winning tiles animate when victory is detected
- Animation is smooth and performant
- Animation doesn't interfere with reset functionality

---

### Challenge 13: Extract Custom Hook

Extract the game logic from `TicTacToeContext.tsx` into a custom hook (`useTicTacToe`). The context should only be responsible for providing the hook's return value.

**Acceptance Criteria:**

- Create `useTicTacToe` hook with all game logic
- Context becomes a thin wrapper around the hook
- Existing functionality remains unchanged
- Hook is independently testable

---

## Summary of Submission Guidelines

1. Create a new branch for your work
2. Commit your changes with clear, descriptive messages
3. Push your branch and create a pull request
4. Include in your PR description:
  - Which challenge(s) you completed
  - Any assumptions you made

Good luck!