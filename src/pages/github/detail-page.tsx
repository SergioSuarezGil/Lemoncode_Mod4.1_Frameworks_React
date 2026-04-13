import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DetailRow } from "../../components/github";
import { getGitHubUserDetail } from "../../services/github";
import { GitHubUserDetail } from "../../types/github";

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const backToListPath = `/list${location.search}`;
  const login = id ?? "";

  const [userDetail, setUserDetail] = React.useState<GitHubUserDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    const loadUserDetail = async () => {
      if (!login) {
        setErrorMessage("No se encontro el usuario seleccionado.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getGitHubUserDetail(login);
        setUserDetail(response);
      } catch (error) {
        setUserDetail(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Se produjo un error inesperado."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDetail();
  }, [login]);

  // Es la mejor manera que se me ha ocurrido para evitar repetir el código de creación de filas :=)
  const detailRows = userDetail
    ? [
        { label: "Usuario", value: userDetail.login },
        { label: "Nombre", value: userDetail.name ?? "Sin nombre público" },
        { label: "Compañía", value: userDetail.company ?? "No disponible" },
        { label: "Ubicación", value: userDetail.location ?? "No disponible" },
        { label: "Bio", value: userDetail.bio ?? "Sin biografía" }
      ]
    : [];

  return (
    <section className="detail-page">
      <div className="detail-page__card">
        <h2 className="detail-page__title">Detalle del usuario</h2>

        {isLoading && <p className="detail-page__text">Cargando detalle...</p>}

        {!isLoading && errorMessage && (
          <p className="detail-page__text detail-page__text--error">
            {errorMessage}
          </p>
        )}

        {!isLoading && userDetail ? (
          <div className="detail-page__content">
            <img
              className="detail-page__avatar"
              src={userDetail.avatar_url}
              alt={userDetail.login}
            />

            <div className="detail-page__info">
              <p className="detail-page__text detail-page__text--highlight">
                @{userDetail.login}
              </p>

              <dl className="detail-page__list">
                {detailRows.map((row) => (
                  <DetailRow
                    key={row.label}
                    label={row.label}
                    value={row.value}
                  />
                ))}
              </dl>

              <div className="detail-page__actions">
                <Link className="detail-page__link" to={backToListPath}>
                  Volver a la lista
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
