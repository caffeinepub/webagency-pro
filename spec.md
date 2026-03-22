# VideoShareIt

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- VideoShareIt branding with play button logo
- Homepage with recommended video grid
- Sample video data (title, description, category, thumbnail, views, likes)
- Video player page with play/pause/volume/fullscreen controls
- Search bar with basic search filtering
- Category browsing (All, Music, Gaming, Sports, Education, News, Entertainment)
- Dark mode / Light mode toggle
- Responsive design (mobile + desktop)

### Modify
N/A - new project

### Remove
N/A

## Implementation Plan
1. Backend: Store videos (id, title, description, category, thumbnailUrl, videoUrl, views, likes, dislikes, channelName, createdAt) and categories in Motoko
2. Backend: Query videos by category, search by title/description, get single video, increment views
3. Frontend: App shell with navbar (logo, search, dark/light toggle)
4. Frontend: Homepage - video grid cards with thumbnail, title, channel, views
5. Frontend: Video player page - HTML5 video with custom controls, video info, related videos sidebar
6. Frontend: Category filter tabs on homepage
7. Frontend: Search results page
8. Frontend: Dark/light mode with CSS variables
