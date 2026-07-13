export function mountClickToPlayEmbed(placeholderId: string, youtubeSrc: string) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  placeholder.addEventListener(
    "click",
    () => {
      const rect = placeholder.getBoundingClientRect();
      const borderRadius = getComputedStyle(placeholder).borderRadius;

      const iframe = document.createElement("iframe");
      iframe.src = youtubeSrc;
      iframe.title = "YouTube video player";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      iframe.style.width = `${rect.width}px`;
      iframe.style.height = `${rect.height}px`;
      iframe.style.borderRadius = borderRadius;
      iframe.style.display = "block";
      iframe.style.flexShrink = "0";

      placeholder.replaceWith(iframe);
    },
    { once: true },
  );
}
