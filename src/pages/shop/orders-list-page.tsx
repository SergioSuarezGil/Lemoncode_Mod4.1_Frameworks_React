import React from "react";
import { useSearchParams } from "react-router-dom";
import { SelectablePicturesPage } from "../../components/shop";
import { getPageOnePictures, getPageTwoPictures } from "../../services/shop";

export const OrdersListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") === "2" ? 2 : 1;

  const loadPictures = page === 2 ? getPageTwoPictures : getPageOnePictures;

  return (
    <SelectablePicturesPage
      pageClassName="orders-page"
      loadPictures={loadPictures}
    />
  );
};
