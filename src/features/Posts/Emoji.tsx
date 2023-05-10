/* eslint-disable camelcase */
import { touchableConfig } from 'helpers';
import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { useTypedSelector } from 'stores';
import { reactionsSelectors } from 'stores/reactions';
import { userSelectors } from 'stores/user';
import { TouchableOpacity } from 'react-native';
import { usePostReactions } from 'hooks';
import { ReactionType, getAvailableReactions } from 'api';
import { AddEmoji } from './AddEmoji';

const ReactionButton = styled.TouchableOpacity`
  width: 30px;
  padding: 5px 9px;
  align-items: center;
  justify-content: center;
`;

interface EmojiProps {
  contentId: string;
  color?: string;
}

export const Emoji: React.FC<EmojiProps> = ({
  contentId,
  color = Colors.basic_100,
}) => {
  const { reactions: data, onAddReaction, onDeleteReaction } = usePostReactions(contentId);

  const userId = useTypedSelector(userSelectors.userId);
  const reactions = useTypedSelector(reactionsSelectors.reactions);

  const heart = reactions.find((reaction) => reaction.emoji === '💜') as ReactionType;

  const availableReaction = useMemo(() => getAvailableReactions({
    reactions, data, userId,
  }), [data]);

  return (
    <Box f={1} fd="row" ai="center">
      {!data.length && (
        <ReactionButton
          {...touchableConfig}
          onPress={() => onAddReaction(heart?.uid, heart?.emoji)}
        >
          <Images.Heart color={color} />
        </ReactionButton>
      )}

      <Box f={1} fd="row" fw="wrap" ai="center">
        {data.map(({ items, reaction_type_id }) => {
          const userEmoji = items.find((item) => item.user_id === userId);

          const onPress = () => {
            if (userEmoji) {
              onDeleteReaction(userEmoji.uid);

              return;
            }

            onAddReaction(items[0].reaction_type_id, items[0].reaction_content);
          };

          return (
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              key={reaction_type_id}
              {...touchableConfig}
              onPress={onPress}
            >
              <Box shadowed br="50px" p={[5, 12]} mr={8} bgc={userEmoji ? Colors.primary_500 : Colors.basic_150} fd="row" ai="center" jc="center">
                <Text mr={6}>{items[0].reaction_content}</Text>

                <Text
                  color={userEmoji ? Colors.basic_150 : Colors.primary_500}
                  fnw="600"
                  fs={18}
                  ff={FontFamily.PoppinsMedium}
                  mb={-2}
                >
                  {items.length}
                </Text>
              </Box>
            </TouchableOpacity>
          );
        })}

        {userId && !!availableReaction.length && (
          <AddEmoji
            items={availableReaction}
            onAddReaction={(id: string, content: string) => onAddReaction(id, content)}
            color={color}
          />
        )}
      </Box>

    </Box>
  );
};
