import { useGetOfferByUID, useGetOffersActions } from 'hooks';
import React from 'react';
import { Action } from './Action';

interface OfferProps {
  iconName: string;
  label: string;
  isPrimaryColor?: boolean;
  offerId: string;
}

export const Offer: React.FC<OfferProps> = ({
  label,
  iconName,
  isPrimaryColor = false,
  offerId,
}) => {
  const { offer } = useGetOfferByUID(offerId);

  const { onOfferDetails } = useGetOffersActions();

  if (!offer) {
    return null;
  }

  return (
    <Action
      iconName={iconName}
      label={label}
      isPrimaryColor={isPrimaryColor}
      onPress={() => onOfferDetails({
        offerId: offer?.uuid,
        businessId: offer?.content.business,
        offerType: offer?.content.offer_type,
      })}
    />
  );
};
