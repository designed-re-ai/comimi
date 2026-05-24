import type { ImagePage } from "../types";

export class AssetLoader {
  private objectUrls = new Set<string>();

  async resolveImageSource(mangaId: string, page: ImagePage): Promise<string> {
    void mangaId;
    return page.src;
  }

  revokeAll(): void {
    for (const url of this.objectUrls) {
      URL.revokeObjectURL(url);
    }

    this.objectUrls.clear();
  }
}
