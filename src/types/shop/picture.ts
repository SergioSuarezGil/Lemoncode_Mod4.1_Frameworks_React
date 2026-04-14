export interface PictureInfo {
  id: string;
  picUrl: string;
  title: string;
}

export interface PictureCatalogItem extends PictureInfo {
  priceEur: number;
}

export interface PictureViewModel extends PictureCatalogItem {
  selected: boolean;
}
