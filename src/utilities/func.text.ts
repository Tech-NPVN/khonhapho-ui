const isTextClamped = (elm: HTMLDivElement): boolean => {
  return elm?.scrollHeight > elm?.clientHeight || elm?.scrollWidth > elm?.clientWidth;
};

const youtubeIdRegex: RegExp =
  /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/g;
function convertYouTubeLinksToIframe(text: string): string {
  const regex =
    /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/g;
  return text.replace(regex, (match, p1, p2, p3, p4, videoId) => {
    return `
      <iframe
        class="w-full aspect-video"
        width="auto"
        height="auto"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>`;
  });
}

export { convertYouTubeLinksToIframe, isTextClamped };
