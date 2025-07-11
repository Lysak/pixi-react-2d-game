# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 2D game built with React, TypeScript, and PixiJS using the @pixi/react library. The game features a hero character that can move around a tile-based world with collision detection, smooth camera following, and sprite animations.

## Development Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (runs TypeScript check then Vite build)
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm preview` - Preview production build locally

## Code Formatting and Linting

The project uses Biome for formatting and linting alongside ESLint:
- Biome configuration in `biome.jsonc` with 2-space indentation, single quotes, and strict style rules
- ESLint configuration in `eslint.config.js` for additional React-specific rules
- TypeScript configuration split across multiple files for different contexts

## Architecture

### Core Structure
- `src/App.tsx` - Main app component that extends PixiJS components and renders the Experience
- `src/components/Experience/Experience.tsx` - Main game container with responsive canvas sizing
- `src/components/Experience/MainContainer/MainContainer.tsx` - Primary game logic container

### Game Systems
- **Hero System**: Character movement, animation, and controls (`src/components/Hero/`)
- **Camera System**: Smooth camera following with lerp interpolation (`src/components/Camera/`)
- **Level System**: Tile-based world rendering (`src/components/Levels/`)
- **Coin System**: Collectible items with animations (`src/components/Coin/`)

### Game Constants
- `src/constants/game-world.ts` - Core game dimensions, speeds, and positioning
- `src/constants/collision-map.ts` - Tile-based collision detection data
- Tile size: 32px, Game world: 26x17 tiles, Zoom level: 3x

### Key Features
- Tile-based movement system with collision detection
- Smooth interpolated camera following the hero
- Sprite sheet animations with frame-based rendering
- Keyboard controls for hero movement
- Responsive canvas that adapts to window size

### Asset Management
- Sprites and textures stored in `src/assets/`
- Uses PixiJS Texture system for efficient rendering
- Supports sprite sheets for character animations

## Technical Notes

- Uses `@pixi/react` v8+ with PixiJS v8+ for modern React integration
- Vite alias `@` points to `src/` directory
- TypeScript strict mode enabled with proper type definitions
- Game loop uses PixiJS ticker system for smooth 60fps updates
- Movement system uses grid-based positioning with smooth interpolation