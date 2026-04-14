import { PictureCatalogItem } from "../../types/shop";

type PicsumImage = {
  id: string;
  author: string;
  download_url: string;
};

const PICSUM_BASE_URL = "https://picsum.photos/v2/list";

const fallbackPageOnePictures: PictureCatalogItem[] = [
  {
    id: "img-001",
    title: "Nature Collection 1",
    picUrl: "https://picsum.photos/id/10/800/500",
    priceEur: 12.5
  },
  {
    id: "img-002",
    title: "Nature Collection 2",
    picUrl: "https://picsum.photos/id/11/800/500",
    priceEur: 9.99
  },
  {
    id: "img-003",
    title: "Nature Collection 3",
    picUrl: "https://picsum.photos/id/12/800/500",
    priceEur: 14.25
  },
  {
    id: "img-004",
    title: "Nature Collection 4",
    picUrl: "https://picsum.photos/id/13/800/500",
    priceEur: 16.4
  }
];

const fallbackPageTwoPictures: PictureCatalogItem[] = [
  {
    id: "img-005",
    title: "Urban Collection 1",
    picUrl: "https://picsum.photos/id/20/800/500",
    priceEur: 11.9
  },
  {
    id: "img-006",
    title: "Urban Collection 2",
    picUrl: "https://picsum.photos/id/21/800/500",
    priceEur: 8.5
  },
  {
    id: "img-007",
    title: "Urban Collection 3",
    picUrl: "https://picsum.photos/id/22/800/500",
    priceEur: 13.75
  },
  {
    id: "img-008",
    title: "Urban Collection 4",
    picUrl: "https://picsum.photos/id/23/800/500",
    priceEur: 10.8
  }
];

let pageOnePicturesCache: PictureCatalogItem[] = fallbackPageOnePictures;
let pageTwoPicturesCache: PictureCatalogItem[] = fallbackPageTwoPictures;

const toCatalogItems = (
  images: PicsumImage[],
  startIndex: number,
  titlePrefix: string
): PictureCatalogItem[] =>
  images.map((image, index) => ({
    id: `img-${String(startIndex + index).padStart(3, "0")}`,
    title: `${titlePrefix} ${index + 1}`,
    picUrl: image.download_url,
    priceEur: Number((8.5 + ((startIndex + index) % 7) * 1.45).toFixed(2))
  }));

const fetchPicturesFromDb = async (
  page: number,
  startIndex: number,
  titlePrefix: string,
  fallbackPictures: PictureCatalogItem[]
): Promise<PictureCatalogItem[]> => {
  try {
    const response = await fetch(`${PICSUM_BASE_URL}?page=${page}&limit=4`);

    if (!response.ok) {
      throw new Error("Failed to fetch images from API");
    }

    const images = (await response.json()) as PicsumImage[];

    if (!Array.isArray(images) || images.length === 0) {
      return fallbackPictures;
    }

    return toCatalogItems(images, startIndex, titlePrefix);
  } catch {
    return fallbackPictures;
  }
};

export const getPageOnePictures = async (): Promise<PictureCatalogItem[]> => {
  pageOnePicturesCache = await fetchPicturesFromDb(
    1,
    1,
    "Nature Collection",
    fallbackPageOnePictures
  );

  return pageOnePicturesCache;
};

export const getPageTwoPictures = async (): Promise<PictureCatalogItem[]> => {
  pageTwoPicturesCache = await fetchPicturesFromDb(
    2,
    5,
    "Urban Collection",
    fallbackPageTwoPictures
  );

  return pageTwoPicturesCache;
};

export const getAllPictures = (): PictureCatalogItem[] => [
  ...pageOnePicturesCache,
  ...pageTwoPicturesCache
];

export const getPictureById = (id: string): PictureCatalogItem | undefined =>
  getAllPictures().find((picture) => picture.id === id);

export const getPicturesByIds = (ids: string[]): PictureCatalogItem[] => {
  const pictures: PictureCatalogItem[] = [];

  for (const id of ids) {
    const picture = getPictureById(id);
    if (picture) {
      pictures.push(picture);
    }
  }

  return pictures;
};
