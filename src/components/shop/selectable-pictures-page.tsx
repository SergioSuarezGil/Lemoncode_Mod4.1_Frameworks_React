import React from "react";
import { PageFeedback } from "../common";
import { useShopCart } from "../../context";
import { PictureCatalogItem, PictureViewModel } from "../../types/shop";
import {
  SHOP_EMPTY_TEXT,
  SHOP_LOAD_ERROR_TEXT,
  SHOP_LOADING_TEXT
} from "../../pages/shop/shop.constants";
import { PictureGallery } from "./picture-gallery";

type SelectablePicturesPageProps = {
  pageClassName: string;
  loadPictures: () => Promise<PictureCatalogItem[]>;
};

const mapToViewModel = (
  selectedPictureIds: string[],
  pictures: PictureCatalogItem[]
): PictureViewModel[] =>
  pictures.map((picture) => ({
    ...picture,
    selected: selectedPictureIds.includes(picture.id)
  }));

export const SelectablePicturesPage: React.FC<SelectablePicturesPageProps> = ({
  pageClassName,
  loadPictures
}) => {
  const { selectedPictureIds, setPictureSelection } = useShopCart();
  const [pictures, setPictures] = React.useState<PictureViewModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const loadedPictures = await loadPictures();

        if (!isMounted) {
          return;
        }

        setPictures(mapToViewModel(selectedPictureIds, loadedPictures));
      } catch {
        if (!isMounted) {
          return;
        }

        setPictures([]);
        setErrorMessage(SHOP_LOAD_ERROR_TEXT);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [loadPictures]);

  React.useEffect(() => {
    setPictures((previousPictures) =>
      mapToViewModel(selectedPictureIds, previousPictures)
    );
  }, [selectedPictureIds]);

  const handleSelectionChange = (pictureId: string, selected: boolean) => {
    setPictures((previousPictures) =>
      previousPictures.map((picture) =>
        picture.id === pictureId ? { ...picture, selected } : picture
      )
    );
    setPictureSelection(pictureId, selected);
  };

  return (
    <section className={pageClassName}>
      <PageFeedback
        isLoading={isLoading}
        loadingText={SHOP_LOADING_TEXT}
        errorMessage={errorMessage}
        showEmptyState={!isLoading && !errorMessage && pictures.length === 0}
        emptyMessage={SHOP_EMPTY_TEXT}
      />

      <PictureGallery
        pictures={pictures}
        onSelectionChange={handleSelectionChange}
      />
    </section>
  );
};
