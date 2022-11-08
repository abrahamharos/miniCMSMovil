import React from 'react';
import { Stack, Box, HStack, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressCard = ({ title, author, date, progress, color }) => {
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
          <Stack alignItems="center">
          <Progress.Circle progress={progress} size={150} showsText={true} color={color ?? '#8b5cf6'} formatText={() => {
                  return `${progress * 100}%`
                }} />
                </Stack>
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
export default ProgressCard;