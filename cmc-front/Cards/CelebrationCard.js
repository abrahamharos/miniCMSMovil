import React from 'react';
import { Stack, Box, HStack, AspectRatio, Image, Center, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const CelebrationCard = ({ photo, title, author, text, date }) => {
  var explosion;

  return <Box alignItems="center">
    <Box width={Dimensions.get('window').width} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="10" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <ConfettiCannon count={200} origin={{ x: -10, y: -10 }} ref={ref => (explosion = ref)} onAnimationEnd={() => { explosion && explosion.start(); }} />
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{
            uri: photo
          }} alt="image" />
        </AspectRatio>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {title}
          </Heading>
          <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
            {author}
          </Text>
        </Stack>
        <Text fontWeight="400">
          {text}
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              {date}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  </Box>;
};
export default CelebrationCard;