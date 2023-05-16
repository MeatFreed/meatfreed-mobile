import { useEffect } from 'react';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { AnyType, getFirebaseDeepLinkParam } from 'helpers';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';

export const useDynamicLinkListener = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
    const formattedLink = getFirebaseDeepLinkParam(link, true) as AnyType;

    if (formattedLink.contentId) {
      RouteService.navigate(Routes.POST_NAVIGATOR, {
        screen: Routes.POST_DETAILS,
        params: { contentId: formattedLink.contentId },
      });
    }

    if (!userId && formattedLink.code) {
      RouteService.navigate(Routes.WELCOME, { code: formattedLink.code });
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => unsubscribe();
  }, []);
};
