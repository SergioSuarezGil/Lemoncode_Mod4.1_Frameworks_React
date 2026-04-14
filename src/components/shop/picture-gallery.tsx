import React from "react";
import { PictureViewModel } from "../../types/shop";

type PictureGalleryProps = {
  pictures: PictureViewModel[];
  onSelectionChange: (pictureId: string, selected: boolean) => void;
};

export const PictureGallery: React.FC<PictureGalleryProps> = ({
  pictures,
  onSelectionChange
}) => {
  return (
    <div className="picture-gallery" aria-label="Picture gallery">
      {pictures.map((picture) => (
        <article className="picture-gallery__card" key={picture.id}>
          <img
            className="picture-gallery__image"
            src={picture.picUrl}
            alt={picture.title}
          />
          <div className="picture-gallery__content">
            <h3 className="picture-gallery__title">{picture.title}</h3>
            <p className="picture-gallery__price">
              {picture.priceEur.toFixed(2)} €
            </p>
            <label className="picture-gallery__check">
              <input
                type="checkbox"
                checked={picture.selected}
                onChange={(event) =>
                  onSelectionChange(picture.id, event.target.checked)
                }
              />
              Añadir al carrito
            </label>
          </div>
        </article>
      ))}
    </div>
  );
};
