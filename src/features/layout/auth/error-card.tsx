import { AlertTriangleIcon } from "lucide-react";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Une erreur est survenue"
      backButtonLabel="Retour"
      backButtonHref="/"
      showSocial={false}
    >
      <div className="flex items-center justify-center">
        <AlertTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
