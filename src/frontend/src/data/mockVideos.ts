export type Video = {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  views: string;
  timeAgo: string;
  duration: string;
  category: string;
  description: string;
  likes: string;
  dislikes: string;
};

export const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Sports",
  "Education",
  "News",
  "Entertainment",
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Epic Guitar Solo - Master Class in Blues Rock",
    channel: "Guitar World",
    channelAvatar: "https://picsum.photos/seed/ch1/40/40",
    thumbnail: "https://picsum.photos/seed/v1/320/180",
    views: "2.4M",
    timeAgo: "3 days ago",
    duration: "12:45",
    category: "Music",
    description:
      "Join master guitarist Alex Rivera as he breaks down the most iconic blues rock solos of all time. In this comprehensive lesson, you'll learn techniques used by legends like Hendrix, Clapton, and SRV.",
    likes: "98K",
    dislikes: "1.2K",
  },
  {
    id: "v2",
    title: "FIFA World Cup 2026 - Top 10 Goals of the Tournament",
    channel: "Sports Central",
    channelAvatar: "https://picsum.photos/seed/ch2/40/40",
    thumbnail: "https://picsum.photos/seed/v2/320/180",
    views: "8.7M",
    timeAgo: "1 week ago",
    duration: "8:32",
    category: "Sports",
    description:
      "Relive the most stunning goals from the 2026 FIFA World Cup. From impossible long-range strikes to sublime team moves, these are the moments that defined the tournament.",
    likes: "420K",
    dislikes: "5.1K",
  },
  {
    id: "v3",
    title: "Learn Python in 2 Hours - Complete Beginner's Guide",
    channel: "CodeWithMike",
    channelAvatar: "https://picsum.photos/seed/ch3/40/40",
    thumbnail: "https://picsum.photos/seed/v3/320/180",
    views: "1.1M",
    timeAgo: "2 weeks ago",
    duration: "2:03:18",
    category: "Education",
    description:
      "A complete Python programming tutorial for absolute beginners. By the end of this video, you'll understand variables, loops, functions, and how to build your first real application.",
    likes: "67K",
    dislikes: "890",
  },
  {
    id: "v4",
    title: "Elden Ring - All Boss Fights Ranked Hardest to Easiest",
    channel: "GamingWithJay",
    channelAvatar: "https://picsum.photos/seed/ch4/40/40",
    thumbnail: "https://picsum.photos/seed/v4/320/180",
    views: "4.2M",
    timeAgo: "5 days ago",
    duration: "25:14",
    category: "Gaming",
    description:
      "We rank every single boss in Elden Ring from the absolute most brutal to surprisingly easy. Do you agree with our list? Let us know in the comments!",
    likes: "185K",
    dislikes: "8.3K",
  },
  {
    id: "v5",
    title: "Breaking: Major Climate Summit Reaches Historic Agreement",
    channel: "Global News Network",
    channelAvatar: "https://picsum.photos/seed/ch5/40/40",
    thumbnail: "https://picsum.photos/seed/v5/320/180",
    views: "560K",
    timeAgo: "12 hours ago",
    duration: "6:47",
    category: "News",
    description:
      "World leaders at the annual Climate Summit have signed a landmark agreement pledging to reduce carbon emissions by 60% before 2040. Here's what it means for you.",
    likes: "22K",
    dislikes: "3.4K",
  },
  {
    id: "v6",
    title: "Stranger Things Season 5 - Official Trailer Reaction",
    channel: "PopCulture Zone",
    channelAvatar: "https://picsum.photos/seed/ch6/40/40",
    thumbnail: "https://picsum.photos/seed/v6/320/180",
    views: "3.8M",
    timeAgo: "2 days ago",
    duration: "15:22",
    category: "Entertainment",
    description:
      "The final season of Stranger Things is almost here and the trailer gave us so much to talk about! We break down every Easter egg, hidden detail, and theory from the epic Season 5 trailer.",
    likes: "210K",
    dislikes: "2.1K",
  },
  {
    id: "v7",
    title: "Lofi Hip Hop Radio - Beats to Study and Relax To",
    channel: "ChillBeats",
    channelAvatar: "https://picsum.photos/seed/ch7/40/40",
    thumbnail: "https://picsum.photos/seed/v7/320/180",
    views: "15.2M",
    timeAgo: "1 month ago",
    duration: "3:42:00",
    category: "Music",
    description:
      "The ultimate lofi hip hop study playlist. Perfect background music for studying, coding, working, or just relaxing. No ads, just vibes.",
    likes: "890K",
    dislikes: "4.5K",
  },
  {
    id: "v8",
    title: "NBA Finals 2026 - Game 7 Full Highlights",
    channel: "Hoops Highlights",
    channelAvatar: "https://picsum.photos/seed/ch8/40/40",
    thumbnail: "https://picsum.photos/seed/v8/320/180",
    views: "6.1M",
    timeAgo: "4 days ago",
    duration: "18:09",
    category: "Sports",
    description:
      "The greatest Game 7 in NBA Finals history! Watch every stunning play from a night that will go down in basketball legend. Who do you think was the MVP?",
    likes: "310K",
    dislikes: "7.8K",
  },
  {
    id: "v9",
    title: "How the Universe Works - Dark Matter Explained",
    channel: "Cosmos Academy",
    channelAvatar: "https://picsum.photos/seed/ch9/40/40",
    thumbnail: "https://picsum.photos/seed/v9/320/180",
    views: "890K",
    timeAgo: "3 weeks ago",
    duration: "22:37",
    category: "Education",
    description:
      "Dark matter makes up 27% of the universe, yet we can't see it or detect it directly. In this video, we explore the evidence for dark matter and the leading theories about what it might be.",
    likes: "54K",
    dislikes: "620",
  },
  {
    id: "v10",
    title: "Minecraft 1.22 Update - Everything You Need to Know",
    channel: "BlockMaster",
    channelAvatar: "https://picsum.photos/seed/ch10/40/40",
    thumbnail: "https://picsum.photos/seed/v10/320/180",
    views: "2.9M",
    timeAgo: "6 days ago",
    duration: "11:53",
    category: "Gaming",
    description:
      "The massive Minecraft 1.22 update is here! New biomes, new mobs, new mechanics — here's everything that's changed and what it means for your survival world.",
    likes: "145K",
    dislikes: "1.9K",
  },
  {
    id: "v11",
    title: "Hollywood's Most Shocking Oscar Moments Ever",
    channel: "Entertainment Tonight",
    channelAvatar: "https://picsum.photos/seed/ch11/40/40",
    thumbnail: "https://picsum.photos/seed/v11/320/180",
    views: "7.4M",
    timeAgo: "2 weeks ago",
    duration: "20:11",
    category: "Entertainment",
    description:
      "From surprise winners to unforgettable speeches and the moments that broke the internet — we count down the most jaw-dropping Oscar moments in Academy Awards history.",
    likes: "380K",
    dislikes: "12K",
  },
  {
    id: "v12",
    title: "Live: World Economic Summit 2026 - Opening Ceremony",
    channel: "Reuters Live",
    channelAvatar: "https://picsum.photos/seed/ch12/40/40",
    thumbnail: "https://picsum.photos/seed/v12/320/180",
    views: "230K",
    timeAgo: "1 hour ago",
    duration: "LIVE",
    category: "News",
    description:
      "Watch live coverage of the 2026 World Economic Summit opening ceremony, featuring speeches from global leaders on trade, technology, and climate change.",
    likes: "9.1K",
    dislikes: "1.7K",
  },
  {
    id: "v13",
    title: "Taylor Swift - Eras Tour Full Concert (Official)",
    channel: "Taylor Swift",
    channelAvatar: "https://picsum.photos/seed/ch13/40/40",
    thumbnail: "https://picsum.photos/seed/v13/320/180",
    views: "22.8M",
    timeAgo: "3 months ago",
    duration: "3:12:44",
    category: "Music",
    description:
      "The full official recording of Taylor Swift's legendary Eras Tour concert. Experience all the eras, from debut to Midnights, in stunning HD.",
    likes: "1.4M",
    dislikes: "18K",
  },
  {
    id: "v14",
    title: "Web Dev Crash Course - React 19 + TypeScript in 90 Minutes",
    channel: "DevMentor",
    channelAvatar: "https://picsum.photos/seed/ch14/40/40",
    thumbnail: "https://picsum.photos/seed/v14/320/180",
    views: "445K",
    timeAgo: "1 week ago",
    duration: "1:32:05",
    category: "Education",
    description:
      "Get up to speed with the latest React 19 features and TypeScript best practices. We build a real-world app from scratch covering hooks, state management, and deployment.",
    likes: "31K",
    dislikes: "410",
  },
];
