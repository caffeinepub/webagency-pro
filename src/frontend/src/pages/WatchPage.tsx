import { Button } from "@/components/ui/button";
import { MOCK_VIDEOS } from "@/data/mockVideos";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function WatchPage() {
  const search = useSearch({ from: "/watch" });
  const videoId = (search as { v?: string }).v ?? "v1";
  const video = useMemo(
    () => MOCK_VIDEOS.find((v) => v.id === videoId) ?? MOCK_VIDEOS[0],
    [videoId],
  );
  const relatedVideos = useMemo(
    () => MOCK_VIDEOS.filter((v) => v.id !== video.id).slice(0, 8),
    [video.id],
  );
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Player + info */}
          <div className="flex-1 min-w-0">
            {/* Video player */}
            <div
              data-ocid="video.canvas_target"
              className="aspect-video w-full overflow-hidden rounded-xl bg-black"
            >
              {/* biome-ignore lint/a11y/useMediaCaption: mock player with no real captions available */}
              <video
                className="h-full w-full"
                controls
                poster={video.thumbnail}
                src=""
                preload="none"
              >
                <track kind="captions" />
              </video>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-lg font-semibold leading-snug text-foreground">
              {video.title}
            </h1>

            {/* Meta row */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={video.channelAvatar}
                  alt={video.channel}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {video.channel}
                  </p>
                  <p className="text-xs text-vsi-muted">
                    {video.views} views &middot; {video.timeAgo}
                  </p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  data-ocid="watch.primary_button"
                  className="ml-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Subscribe
                </Button>
              </div>

              {/* Like/Dislike/Share */}
              <div className="flex items-center gap-2">
                <div className="flex overflow-hidden rounded-full border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="watch.toggle"
                    onClick={() => {
                      setLiked((p) => !p);
                      setDisliked(false);
                    }}
                    className={`gap-1.5 rounded-none rounded-l-full px-3 text-xs ${
                      liked ? "text-vsi-red" : "text-foreground"
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {video.likes}
                  </Button>
                  <div className="w-px bg-border" />
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="watch.secondary_button"
                    onClick={() => {
                      setDisliked((p) => !p);
                      setLiked(false);
                    }}
                    className={`rounded-none rounded-r-full px-3 text-xs ${
                      disliked ? "text-vsi-red" : "text-foreground"
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 rounded-full px-3 text-xs"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 rounded-full px-3 text-xs hidden sm:flex"
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 rounded-xl bg-vsi-card p-4">
              <button
                type="button"
                data-ocid="watch.toggle"
                className="w-full text-left"
                onClick={() => setExpanded((p) => !p)}
              >
                <div
                  className={`text-sm text-foreground ${
                    expanded ? "" : "line-clamp-2"
                  }`}
                >
                  {video.description}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-foreground">
                  {expanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" /> Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" /> Show more
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right: Related videos */}
          <aside className="w-full lg:w-80 xl:w-96">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Up next
            </h2>
            <div className="flex flex-col gap-3">
              {relatedVideos.map((v, i) => (
                <Link
                  key={v.id}
                  to="/watch"
                  search={{ v: v.id }}
                  data-ocid={`related.item.${i + 1}`}
                  className="group flex cursor-pointer gap-2"
                >
                  <div className="relative h-20 w-36 flex-shrink-0 overflow-hidden rounded-lg bg-vsi-card">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] text-white">
                      {v.duration}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                      {v.title}
                    </p>
                    <p className="mt-1 text-[11px] text-vsi-muted">
                      {v.channel}
                    </p>
                    <p className="text-[11px] text-vsi-muted">
                      {v.views} views
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
