import { ReactionType } from 'api';
import { isIOS, touchableConfig } from 'helpers';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  Box, Colors, Images, Text,
} from 'themes';

const ReactionButton = styled.TouchableOpacity<{ isActive: boolean }>`
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px 9px;
  background-color: ${({ isActive }) => (isActive ? Colors.primary_500 : 'transparent')}
`;

const Emoji = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin: 2px 4px;
`;

const Layout = styled(Box)`
  position: absolute;
  top: -40px;
  left: 0px;
  border: 1px solid ${Colors.basic_150};
`;

interface AddEmojiProps {
  items: ReactionType[];
  onAddReaction: (id: string, content: string) => void;
  color?: string;
}

export const AddEmoji: React.FC<AddEmojiProps> = ({
  items,
  onAddReaction,
  color = Colors.basic_100,
}) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  const onAdd = (id: string, content: string) => {
    setIsShowEmoji(false);

    onAddReaction(id, content);
  };

  return (
    <Box shadowed>
      <ReactionButton
        {...touchableConfig}
        isActive={isShowEmoji}
        onPress={() => setIsShowEmoji(!isShowEmoji)}
      >
        <Box mb={2}>
          <Images.Smile color={isShowEmoji ? Colors.basic_100 : color} />
        </Box>
      </ReactionButton>

      {isShowEmoji && (
        <Layout p={[0, 8, isIOS ? 4 : 0]} br="50px" fd="row" bgc={Colors.basic_150}>
          {items.map((item) => (
            <Emoji key={item.uid} {...touchableConfig} onPress={() => onAdd(item.uid, item.emoji)}>
              <Text>{item.emoji}</Text>
            </Emoji>
          ))}

        </Layout>
      )}
    </Box>
  );
};
