import type { Video } from "@/data/mockVideos";
import { Link } from "@tanstack/react-router";

type VideoCardProps = {
  video: Video;
  index: number;
};

export default function VideoCard({ video, index }: VideoCardProps) {
  return (
    <Link
      to="/watch"
      search={{ v: video.id }}
      data-ocid={`video.item.${index}`}
      className="group block cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-vsi-card video-thumb-hover">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </div>
      </div>

      {/* Info row */}
      <div className="mt-3 flex gap-3">
        {/* Channel avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className="mt-0.5 h-9 w-9 flex-shrink-0 rounded-full object-cover"
        />
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-foreground">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-vsi-muted hover:text-foreground transition-colors">
            {video.channel}
          </p>
          <p className="text-xs text-vsi-muted">
            {video.views} views &middot; {video.timeAgo}
          </p>
        </div>
      </div>
    </Link>
  );
}
