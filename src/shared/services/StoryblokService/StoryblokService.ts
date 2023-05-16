import { AnyType } from 'helpers';
import Config from 'react-native-config';
import StoryblokClient from 'storyblok-js-client';

const client: AnyType = new StoryblokClient({
  accessToken: Config.STORY_BLOK_API_KEY,
});

export const StoryblokService = {
  client,
};
